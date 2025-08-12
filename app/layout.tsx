import type {Metadata} from "next";
import "./globals.css";
import MainMenu from "./components/MainMenu";

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
            className={`antialiased`}>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
            <MainMenu />

            <main className="flex-grow">{children}</main>

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
                            <a href="https://habr.com/ru/users/potapov-me/" target="_blank" rel="noopener"
                               className="hover:font-black transition-colors">Habr</a>
                            <a href="mailto:constantin@potapov.me" target="_blank" rel="noopener"
                               className="hover:font-black transition-colors">Email</a>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-sm">
                        ИП Потапов К.С. ОГРНИП 312668617300033 <br />
                        © {new Date().getFullYear()} Все права защищены.
                    </div>
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
}
