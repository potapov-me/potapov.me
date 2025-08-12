"use client";

import Logo from "@/public/logo.svg";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";


const MainMenu = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        {href: "/", label: "Обо мне"},
        {href: "/projects", label: "Проекты"},
        {href: "/contact", label: "Контакты"},
        {href: "/admin", label: "Админка", isAdmin: true},
    ];

    return (
        <nav className="sticky top-0 z-40 bg-white/85 shadow-sm">
            <div className="max-w-5xl mx-auto px-6 prose-base">
                <div className="flex justify-between items-center h-16">
                    <Link prefetch={false} href="/" className="fill-primary hover:fill-primary-dark hover:text-primary-dark text-2xl font-bold text-primary flex">
                        <Logo className="size-9 mr-2" />
                        Константин Потапов
                    </Link>
                    <div className="hidden md:flex space-x-1.5">
                        {menuItems.map((item) => (
                            <Link prefetch={false}
                                key={item.href}
                                href={item.href}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors-200 ${
                                    pathname === item.href
                                        ? "bg-primary bg-texture text-white"
                                        : "text-secondary hover:bg-gray-100"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            title='Открыть меню'
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-secondary focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {menuItems.map((item) => (
                            <Link prefetch={false}
                                key={item.href}
                                href={item.href}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    pathname === item.href
                                        ? "bg-primary bg-texture text-white"
                                        : "text-secondary hover:bg-gray-100"
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default MainMenu;
