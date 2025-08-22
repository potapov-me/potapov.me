"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/app/hooks/use-toast";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({password}),
        });

        if (res.ok) {
            toast({
                title: "Успех",
                description: "Вы успешно вошли в систему.",
            });
            router.push("/admin");
            router.refresh();
        } else {
            setError("Неверный пароль");
        }
    };

    return (
        <main className="max-w-md mx-auto pt-10">
            <h1 className="text-4xl font-bold text-center">Вход в админку</h1>
            <form onSubmit={handleSubmit} className="mt-8">
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>

                {error && <p className="text-error text-sm">{error}</p>}

                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Войти
                </button>
            </form>
        </main>
    );
}