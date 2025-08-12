"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TimelineItem } from "@/app/types";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { useState } from "react";

const timelineSchema = z.object({
  year: z.coerce.number().int().positive(),
  title: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  lessons: z.string().optional(),
  link: z.string().url().optional().or(z.literal("")),
  isBlink: z.boolean().default(false),
  isStartup: z.boolean().default(false),
});

type TimelineFormData = z.infer<typeof timelineSchema>;

interface TimelineFormProps {
  initialData?: Partial<TimelineItem>;
  onSubmit: (data: TimelineFormData) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export function TimelineForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Сохранить",
}: TimelineFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TimelineFormData>({
    resolver: zodResolver(timelineSchema),
    defaultValues: {
      year: initialData?.year || new Date().getFullYear(),
      title: initialData?.title || "",
      description: initialData?.description || "",
      lessons: initialData?.lessons || "",
      link: initialData?.link || "",
      isBlink: initialData?.isBlink || false,
      isStartup: initialData?.isStartup || false,
    },
  });

  const handleFormSubmit = async (data: TimelineFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-6">{initialData?.id ? "Редактировать событие" : "Добавить событие"}</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="year">Год</Label>
                        <Input id="year" type="number" {...register("year")} />
                        {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="title">Название</Label>
                        <Input id="title" {...register("title")} />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>
                </div>

                <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea id="description" rows={4} {...register("description")} />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div>
                    <Label htmlFor="lessons">Выводы (опционально)</Label>
                    <Textarea id="lessons" rows={3} {...register("lessons")} />
                </div>

                <div>
                    <Label htmlFor="link">Ссылка (опционально)</Label>
                    <Input id="link" type="url" placeholder="https://example.com" {...register("link")} />
                    {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>}
                </div>

                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <input id="isStartup" type="checkbox" {...register("isStartup")} className="h-4 w-4 rounded border-gray-300" />
                        <Label htmlFor="isStartup">Это стартап?</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input id="isBlink" type="checkbox" {...register("isBlink")} className="h-4 w-4 rounded border-gray-300" />
                        <Label htmlFor="isBlink">Выделить событие?</Label>
                    </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Отмена</Button>
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Сохранение..." : submitLabel}</Button>
                </div>
            </form>
        </div>
    </div>
  );
}
