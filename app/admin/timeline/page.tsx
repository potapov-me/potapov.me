"use client";

import { useState } from "react";
import { useTimeline } from "@/app/contexts/TimelineContext";
import { TimelineForm } from "@/app/components/TimelineForm";
import { TimelineItem } from "@/app/types";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/hooks/use-toast";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

export default function AdminTimelinePage() {
  const { timelineItems, isLoading, addTimelineItem, updateTimelineItem, deleteTimelineItem } = useTimeline();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);

  const handleSave = async (data: Omit<TimelineItem, "id">) => {
    try {
      if (editingItem) {
        await updateTimelineItem(editingItem.id, data);
        toast({
          title: "Успех",
          description: "Событие таймлайна успешно обновлено",
        });
      } else {
        await addTimelineItem(data);
        toast({
          title: "Успех",
          description: "Событие таймлайна успешно добавлено",
        });
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to save timeline item:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить событие таймлайна",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить это событие?")) {
      try {
        await deleteTimelineItem(id);
        toast({
          title: "Успех",
          description: "Событие таймлайна успешно удалено",
        });
      } catch (error) {
        console.error("Failed to delete timeline item:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось удалить событие таймлайна",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Управление таймлайном</h1>
            <Button onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>
                <FiPlus className="mr-2"/>
                Добавить событие
            </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Год</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Теги</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center">Загрузка...</td>
                            </tr>
                        ) : timelineItems.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center">Событий не найдено.</td>
                            </tr>
                        ) : (
                            timelineItems
                                .sort((a, b) => b.year - a.year)
                                .map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.year}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">{item.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.isStartup && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">Стартап</span>}
                                            {item.isBlink && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Выделено</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Button variant="outline" size="sm" className="mr-2" onClick={() => { setEditingItem(item); setIsModalOpen(true); }}>
                                                <FiEdit className="mr-1" /> Редактировать
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                                                <FiTrash2 className="mr-1" /> Удалить
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        {isModalOpen && <TimelineForm initialData={editingItem || undefined} onSubmit={handleSave} onCancel={() => { setIsModalOpen(false); setEditingItem(null); }} />}
    </div>
  );
}
