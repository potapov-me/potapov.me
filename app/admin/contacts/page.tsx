"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/hooks/use-toast";
import { FiTrash2, FiCheckCircle } from "react-icons/fi";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function ContactsAdminPage() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const load = async () => {
    setIsLoading(true);
    const res = await fetch("/api/contacts");
    const data = await res.json();
    setItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: string, isRead: boolean) => {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead }),
      });
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, isRead } : i)));
    } catch {
      toast({ title: "Ошибка", description: "Не удалось обновить статус", variant: "destructive" });
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Удалить заявку?")) return;
    try {
      await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast({ title: "Успех", description: "Заявка удалена" });
    } catch {
      toast({ title: "Ошибка", description: "Не удалось удалить", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Заявки с формы</h1>
        <Button variant="outline" onClick={load}>Обновить</Button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Когда</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Имя</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сообщение</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">Загрузка...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">Заявок пока нет.</td>
                </tr>
              ) : (
                items.map((i) => (
                  <tr key={i.id} className={!i.isRead ? "bg-yellow-50" : undefined}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(i.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                      <a href={`mailto:${i.email}`}>{i.email}</a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xl">
                      <div className="whitespace-pre-wrap break-words">{i.message}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant={i.isRead ? "outline" : "default"} size="sm" className="mr-2" onClick={() => markRead(i.id, !i.isRead)}>
                        <FiCheckCircle className="sm:mr-1" />
                        {i.isRead ? "Пометить как новое" : "Пометить как прочитано"}
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => remove(i.id)}>
                        <FiTrash2 className="sm:mr-1" />
                        Удалить
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
