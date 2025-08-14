'use client';

import { useEffect, useState, useRef } from 'react';
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
import ReactCrop, { Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Image from 'next/image';
import 'react-image-crop/dist/ReactCrop.css';

const Editor = dynamic(() => import('@/app/components/editor/Editor').then((mod) => mod.Editor), { ssr: false });

const postSchema = z.object({
  title: z.string().min(3, 'Заголовок должен быть не менее 3 символов'),
  content: z.string().min(10, 'Содержимое должно быть не менее 10 символов'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Слаг может содержать только строчные буквы, цифры и дефисы'),
  coverImage: z.string().optional().or(z.literal('')),
  published: z.boolean().default(false),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostEditorPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [originalFilename, setOriginalFilename] = useState<string | null>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const coverImage = watch('coverImage');

  

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

  const handleCoverImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalFilename(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = async () => {
    if (image && completedCrop && originalFilename && imgRef.current) {
      setIsUploading(true);
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.clientWidth;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.clientHeight;
      const outputWidth = Math.round(completedCrop.width);
      const outputHeight = Math.round(completedCrop.height);
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(
          imgRef.current,
          Math.round(completedCrop.x * scaleX),
          Math.round(completedCrop.y * scaleY),
          Math.round(completedCrop.width * scaleX),
          Math.round(completedCrop.height * scaleY),
          0,
          0,
          outputWidth,
          outputHeight
        );

        canvas.toBlob(async (blob) => {
          if (blob) {
            const croppedFilename = originalFilename.includes('.')
              ? originalFilename.replace(/(\.[^./]+)$/i, '-cropped$1')
              : `${originalFilename}-cropped.png`;
            const formData = new FormData();
            formData.append('file', blob, croppedFilename);

            try {
              const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
              });

              const data = await response.json();

              if (data.success) {
                setValue('coverImage', data.path, { shouldValidate: true });
                toast({
                  title: 'Успех',
                  description: 'Обложка успешно загружена',
                });
              } else {
                throw new Error('Не удалось загрузить обложку');
              }
            } catch {
              toast({
                title: 'Ошибка',
                description: 'Не удалось загрузить обложку',
                variant: 'destructive',
              });
            } finally {
              setIsUploading(false);
              setImage(null);
              setOriginalFilename(null);
              setCompletedCrop(null);
            }
          }
        }, 'image/png');
      }
    }
  };

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
          <Button type="submit" disabled={isUploading}>
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
        <Label htmlFor="coverImage">Обложка</Label>
        <Input id="coverImage" type="file" onChange={handleCoverImageSelect} disabled={isUploading} />
        {coverImage && <Image src={coverImage} alt="Обложка" width={400} height={225} className="mt-4 w-full max-w-xs" />}
        {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage.message}</p>}
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

      {image && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[80vh] overflow-auto w-[600px] h-[400px]">
            <ReactCrop
              crop={crop}
              onChange={c => setCrop(c)}
              onComplete={c => setCompletedCrop(c)}
            >
              <Image
                ref={imgRef}
                src={image}
                alt="Crop preview"
                width={600}
                height={400}
                style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
              />
            </ReactCrop>
            <div className="flex justify-end mt-2">
              <button type="button" onClick={() => setImage(null)} className="mr-2 px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
              <button type="button" onClick={handleCrop} className="px-4 py-2 bg-primary text-white rounded-md">Crop & Insert</button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
