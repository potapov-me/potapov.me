'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { useToast } from '@/app/hooks/use-toast';
import { FiSave, FiTrash2, FiX } from 'react-icons/fi';

const shortUrlSchema = z.object({
  slug: z.string().min(1, 'Код не может быть пустым').regex(/^[a-zA-Z0-9_-]+$/, 'Код может содержать только латинские буквы, цифры, дефис и нижнее подчеркивание'),
  originalUrl: z.string().url('Неверный формат URL'),
});

type ShortUrlFormData = z.infer<typeof shortUrlSchema>;

export default function ShortUrlEditorPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ShortUrlFormData>({
    resolver: zodResolver(shortUrlSchema),
  });

  useEffect(() => {
    if (params.id !== 'new') {
      setIsLoading(true);
      fetch(`/api/short-urls/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setValue('slug', data.slug);
          setValue('originalUrl', data.originalUrl);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [params.id, setValue]);

  const onSubmit = async (data: ShortUrlFormData) => {
    const method = params.id === 'new' ? 'POST' : 'PUT';
    const url = params.id === 'new' ? '/api/short-urls' : `/api/short-urls/${params.id}`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Не удалось сохранить ссылку');
      }

      toast({
        title: 'Успех',
        description: `Ссылка успешно ${params.id === 'new' ? 'создана' : 'обновлена'}`,
      });

      router.push('/admin/short-urls');
    } catch (error: unknown) {
      let message = 'Произошла неизвестная ошибка';
      if (error instanceof Error) {
        message = error.message;
      }
      toast({
        title: 'Ошибка',
        description: message,
        variant: 'destructive',
      });
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить эту ссылку?')) {
      try {
        await fetch(`/api/short-urls/${params.id}`, {
          method: 'DELETE',
        });
        toast({
          title: 'Успех',
          description: 'Ссылка успешно удалена',
        });
        router.push('/admin/short-urls');
      } catch {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить ссылку',
          variant: 'destructive',
        });
      }
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{params.id === 'new' ? 'Новая короткая ссылка' : 'Редактировать ссылку'}</h1>
        <div className="flex space-x-2">
          <Button type="button" variant="outline" onClick={() => router.push('/admin/short-urls')}>
            <FiX className="mr-2" />
            Отмена
          </Button>
          {params.id !== 'new' && (
            <Button type="button" variant="destructive" onClick={handleDelete}>
              <FiTrash2 className="mr-2" />
              Удалить
            </Button>
          )}
          <Button type="submit">
            <FiSave className="mr-2" />
            Сохранить
          </Button>
        </div>
      </div>
      <div>
        <Label htmlFor="slug">Короткий код (slug)</Label>
        <Input id="slug" {...register('slug')} />
        {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
      </div>
      <div>
        <Label htmlFor="originalUrl">Оригинальный URL</Label>
        <Input id="originalUrl" {...register('originalUrl')} />
        {errors.originalUrl && <p className="text-red-500 text-sm mt-1">{errors.originalUrl.message}</p>}
      </div>
    </form>
  );
}
