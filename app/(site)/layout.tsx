import MainMenu from "../components/MainMenu";
import dynamic from "next/dynamic";
import {FaTelegramPlane, FaGithub, FaEnvelope, FaYoutube} from "react-icons/fa";
import {SiHabr, SiVk} from "react-icons/si";
import FooterConnectionsClient from "./_components/FooterConnectionsClient";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const socialLinks = [
        {
            href: "https://t.me/potapov_me",
            label: "Telegram",
            icon: <FaTelegramPlane/>,
        },
        {
            href: "https://github.com/potapov-me",
            label: "GitHub",
            icon: <FaGithub/>,
        },
        {
            href: "https://habr.com/ru/users/potapov-me/",
            label: "Habr",
            icon: <SiHabr/>,
        },
        {
            href: "https://www.youtube.com/@potapovme",
            label: "YouTube",
            icon: <FaYoutube/>,
        },
        {
            href: "mailto:constantin@potapov.me",
            label: "Email",
            icon: <FaEnvelope/>,
        },
        {
            href: "https://vk.com/potapov_me",
            label: "VK",
            icon: <SiVk/>,
        },
    ];

    const Toaster = dynamic(() => import("../components/ui/toaster").then(m => m.Toaster));
    return (
        <>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800 prose-base">
                <MainMenu/>

                <main className="flex-grow">{children}</main>

                <footer className="bg-black text-white bg-texture py-6 px-6 mt-8 not-prose">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-xl font-heading font-bold text-white">Константин Потапов</h3>
                                <p>Инженерный подход к проектам</p>
                            </div>
                            <div className="flex space-x-4">
                                {socialLinks.map(link => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener"
                                        aria-label={link.label}
                                        className="text-2xl hover:text-primary-light transition-colors"
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8 text-center text-sm">
                            ИП Потапов К.С. ОГРНИП 312668617300033 <br/>
                            © {new Date().getFullYear()} Все права защищены.
                        </div>
                        <FooterConnectionsClient />
                    </div>
                </footer>
            </div>
            <Toaster/>
        </>
    );
}
