"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(1, "Укажите имя"),
  email: z.string().email("Некорректный email"),
  message: z.string().min(5, "Слишком краткое сообщение"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPageClient() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        let message = "Не удалось отправить сообщение";
        try {
          const resp = await response.json();
          if (resp?.message) message = resp.message as string;
        } catch {}
        toast({
          title: "Ошибка",
          description: message,
          variant: "destructive",
        });
        return;
      }
      reset();
      toast({
        title: "Отправлено",
        description:
          "Ваше сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Проверьте соединение.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="max-w-5xl mx-auto py-12 px-6 pb-20 prose-base">
      <h1 className="font-heading text-4xl md:text-5xl font-bold my-4 text-primary text-center">
        Контакты
      </h1>
      <p className="text-xl text-secondary text-center max-w-3xl mx-auto">
        Свяжитесь со мной через форму ниже или любым удобным способом.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h2 className="font-heading text-2xl font-bold mb-4 mt-1">
            Форма обратной связи
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                placeholder="Как к вам обращаться"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="message">Сообщение</Label>
              <Textarea
                id="message"
                placeholder="Опишите задачу или вопрос"
                rows={6}
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              {errors.message && (
                <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
              )}
            </div>
            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Отправить"}
              </Button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h2 className="font-heading text-2xl font-bold mb-4 mt-1">
            Другие способы связи
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Telegram: <a className="text-primary" href="https://t.me/potapov_me" target="_blank" rel="noopener">@potapov_me</a>
            </li>
            <li>
              Email: <a className="text-primary" href="mailto:constantin@potapov.me">constantin@potapov.me</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
