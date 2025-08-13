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
import { FiX, FiTrash2, FiSave } from 'react-icons/fi';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/app/components/editor/Editor').then((mod) => mod.Editor), { ssr: false });

const postSchema = z.object({
  title: z.string().min(3, 'Заголовок должен быть не менее 3 символов'),
  content: z.string().min(10, 'Содержимое должно быть не менее 10 символов'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Слаг может содержать только строчные буквы, цифры и дефисы'),
  coverImage: z.string().url('Неверный URL').optional().or(z.literal('')),
  published: z.boolean().default(false),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostEditorPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const title = watch('title');

  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', slug);
    }
  }, [title, setValue]);

  useEffect(() => {
    if (params.id !== 'new') {
      fetch(`/api/blog/${params.id}`)
        .then((res) => res.json())
        .then((post) => {
          setValue('title', post.title);
          setValue('content', post.content);
          setValue('slug', post.slug);
          setValue('coverImage', post.coverImage);
          setValue('published', post.published);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [params.id, setValue]);

  const onSubmit = async (data: PostFormData) => {
    const method = params.id === 'new' ? 'POST' : 'PUT';
    const url = params.id === 'new' ? '/api/blog' : `/api/blog/${params.id}`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Не удалось сохранить пост');
      }

      toast({
        title: 'Успех',
        description: `Пост успешно ${params.id === 'new' ? 'создан' : 'обновлен'}`,
      });

      router.push('/admin/blog');
    } catch {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить пост',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      try {
        await fetch(`/api/blog/${params.id}`, {
          method: 'DELETE',
        });
        toast({
          title: 'Успех',
          description: 'Пост успешно удален',
        });
        router.push('/admin/blog');
      } catch {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить пост',
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
      <div className="flex justify-between items-center flex-col md:flex-row gap-10">
        <h1 className="text-3xl font-bold">{params.id === 'new' ? 'Новый' : 'Редактировать'}</h1>

        <div className="flex space-x-2">
          <Button type="button" variant="outline" onClick={() => router.push('/admin/blog')}>
            <FiX className="lg:mr-2"/>
            <span className="hidden lg:inline">Отмена</span>
          </Button>
          {params.id !== 'new' && (
              <Button type="button" variant="destructive" onClick={handleDelete}>
                <FiTrash2 className="lg:mr-2"/>
                <span className="hidden lg:inline">Удалить</span>
              </Button>
          )}
          <Button type="submit">
            <FiSave className="sm:mr-2"/>
            <span className="hidden lg:inline">Сохранить</span>
          </Button>
        </div>
      </div>
      <div>
        <Label htmlFor="title">Заголовок</Label>
        <Input id="title" {...register('title')} />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="slug">Слаг</Label>
        <Input id="slug" {...register('slug')} />
        {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
      </div>
      <div>
        <Label htmlFor="coverImage">URL обложки</Label>
        <Input id="coverImage" {...register('coverImage')} />
      </div>
      <div>
        <Label>Содержимое</Label>
        <Editor
          initialContent={getValues('content')}
          onChange={(content) => setValue('content', content)}
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>
      <div className="flex items-center space-x-2">
        <input id="published" type="checkbox" {...register('published')} className="h-4 w-4 rounded border-gray-300" />
        <Label htmlFor="published">Опубликовано</Label>
      </div>
    </form>
  );
}
