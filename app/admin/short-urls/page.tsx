'use client';

import { useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Button } from '@/app/components/ui/button';
import { useToast } from '@/app/hooks/use-toast';
import Link from 'next/link';

interface ShortUrl {
  id: string;
  slug: string;
  originalUrl: string;
  createdAt: string;
}

export default function ShortUrlsPage() {
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/short-urls')
      .then((res) => res.json())
      .then(setShortUrls)
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту ссылку?')) {
      try {
        await fetch(`/api/short-urls/${id}`, {
          method: 'DELETE',
        });
        setShortUrls(shortUrls.filter((url) => url.id !== id));
        toast({
          title: 'Успех',
          description: 'Ссылка успешно удалена',
        });
      } catch {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить ссылку',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Короткие ссылки</h1>
        <Link href="/admin/short-urls/new">
          <Button>
            <FiPlus className="sm:mr-2" />
            <span className="hidden sm:inline">Новая ссылка</span>
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Короткий код (slug)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Оригинальный URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Создано</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">Загрузка...</td>
                </tr>
              ) : shortUrls.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">Ссылок не найдено.</td>
                </tr>
              ) : (
                shortUrls.map((url) => (
                  <tr key={url.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">/{url.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                      <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {url.originalUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(url.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/short-urls/${url.id}`}>
                        <Button variant="outline" size="sm" className="mr-2">
                          <FiEdit className="mr-1" />
                          Редактировать
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(url.id)}>
                        <FiTrash2 className="mr-1" />
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
