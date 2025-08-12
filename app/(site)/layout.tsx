import MainMenu from "../components/MainMenu";
import dynamic from "next/dynamic";
import {FaTelegramPlane, FaGithub, FaEnvelope} from "react-icons/fa";
import {SiHabr, SiVk} from "react-icons/si";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const Toaster = dynamic(() => import("../components/ui/toaster").then(m => m.Toaster));
    return (
        <>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800 prose-base">
                <MainMenu/>

                <main className="flex-grow">{children}</main>

                <footer className="bg-black text-white py-10 px-6 mt-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-xl font-heading font-bold text-white">Константин Потапов</h3>
                                <p>Инженерный подход к проектам</p>
                            </div>
                            <div className="flex space-x-4">
                                <a href="https://t.me/potapov_me" target="_blank" rel="noopener" aria-label="Telegram"
                                   className="text-2xl hover:text-primary transition-colors"><FaTelegramPlane/></a>
                                <a href="https://github.com/potapov-me" target="_blank" rel="noopener"
                                   aria-label="GitHub"
                                   className="text-2xl hover:text-primary transition-colors"><FaGithub/></a>
                                <a href="https://habr.com/ru/users/potapov-me/" target="_blank" rel="noopener"
                                   aria-label="Habr"
                                   className="text-2xl hover:text-primary transition-colors"><SiHabr/></a>
                                <a href="mailto:constantin@potapov.me" target="_blank" rel="noopener" aria-label="Email"
                                   className="text-2xl hover:text-primary transition-colors"><FaEnvelope/></a>
                                <a href="https://vk.com/potapov_me" target="_blank" rel="noopener" aria-label="Email"
                                   className="text-2xl hover:text-primary transition-colors"><SiVk/></a>
                            </div>
                        </div>
                        <div className="mt-8 text-center text-sm">
                            ИП Потапов К.С. ОГРНИП 312668617300033 <br/>
                            © {new Date().getFullYear()} Все права защищены.
                        </div>
                    </div>
                </footer>
            </div>
            <Toaster/>
        </>
    );
}
