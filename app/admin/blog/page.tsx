'use client';

import { useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Button } from '@/app/components/ui/button';
import { useToast } from '@/app/hooks/use-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  published: boolean;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/blog')
      .then((res) => res.json())
      .then(setPosts)
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      try {
        await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
        });
        setPosts(posts.filter((p) => p.id !== id));
        toast({
          title: 'Успех',
          description: 'Пост успешно удален',
        });
      } catch {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить пост',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Управление блогом</h1>
        <Link href="/admin/blog/new">
          <Button>
            <FiPlus className="sm:mr-2" />
            <span className="hidden sm:inline">Новый пост</span>
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заголовок</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Опубликовано</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Создано</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">Загрузка...</td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">Постов не найдено.</td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.published ? (
                        <span title="Опубликовано">
                          <FaEye className="text-green-500" />
                        </span>
                      ) : (
                        <span title="Черновик">
                          <FaEyeSlash className="text-red-500" />
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/blog/${post.id}`}>
                        <Button variant="outline" size="sm" className="mr-2">
                          <FiEdit className="mr-1" />
                          Редактировать
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
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
