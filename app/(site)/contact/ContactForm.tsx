"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/hooks/use-toast";

export function ContactForm() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Не удалось отправить сообщение");
      }
      setName("");
      setEmail("");
      setMessage("");
      toast({
        title: "Отправлено",
        description:
          "Ваше сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.",
      });
    } catch (error: unknown) {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error ? error.message : "Произошла ошибка",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border">
      <h2 className="font-heading text-2xl font-bold mb-4">Форма обратной связи</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="name">Имя</Label>
          <Input
            id="name"
            name="name"
            placeholder="Как к вам обращаться"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="message">Сообщение</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Опишите задачу или вопрос"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Отправка..." : "Отправить"}
          </Button>
        </div>
      </form>
    </div>
  );
}
