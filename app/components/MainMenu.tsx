"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

const MainMenu = () => {
    const pathname = usePathname();

    const menuItems = [
        {href: "/", label: "Обо мне"},
        {href: "/projects", label: "Проекты"},
        {href: "/contact", label: "Контакты"},
    ];

    return (
        <nav className="bg-gray-100 bg-texture shadow-md">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-2xl font-bold text-primary">
                        Константин Потапов
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    pathname === item.href
                                        ? "bg-primary bg-texture text-white"
                                        : "text-secondary hover:bg-gray-100"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MainMenu;
