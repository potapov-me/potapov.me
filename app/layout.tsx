import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Персональный сайт Константина Потапова",
    description: "Пока временная заглушка",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`antialiased`}
        >
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
            <header className="py-16 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                        Константин Потапов
                    </h1>
                    <p className="text-xl text-secondary mb-6">
                        Инженер · Предприниматель · Исследователь
                    </p>
                    <div className="inline-flex items-center bg-primary bg-texture text-white rounded-full px-4 py-2 text-sm">
                        <span className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></span>
                        <span>Инженерный подход к проектам</span>
                    </div>
                </div>
            </header>

            {children}

            <footer className="bg-texture bg-black text-white py-10 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-bold text-white">Константин Потапов</h3>
                            <p>Инженерный подход к проектам</p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="https://t.me/potapov_me" target="_blank" rel="noopener"
                               className="hover:font-black transition-colors">Telegram</a>
                            <a href="https://github.com/potapov-me" target="_blank" rel="noopener"
                               className="hover:font-black transition-colors">GitHub</a>
                            <a href="mailto:constantin@potapov.me" target="_blank" rel="noopener"
                               className="hover:font-black transition-colors">Email</a>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-sm">
                        © {new Date().getFullYear()} Все права защищены. История продолжается...
                    </div>
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
}
