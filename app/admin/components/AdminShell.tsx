"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaCalendarAlt, FaBriefcase, FaRss, FaEnvelope, FaLink } from "react-icons/fa";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { ReactNode, useState } from "react";
import { useToast } from "@/app/hooks/use-toast";

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast({
      title: "Выход",
      description: "Вы успешно вышли из системы.",
    });
    router.push("/admin/login");
  };

  const menuItems = [
    {
      name: "Таймлайн",
      href: "/admin/timeline",
      icon: FaCalendarAlt,
    },
    {
      name: "Проекты",
      href: "/admin/projects",
      icon: FaBriefcase,
    },
    {
      name: "Заявки",
      href: "/admin/contacts",
      icon: FaEnvelope,
    },
    {
      name: "Блог",
      href: "/admin/blog",
      icon: FaRss,
    },
    {
      name: "Ссылки",
      href: "/admin/short-urls",
      icon: FaLink,
    },
  ];

  const renderSidebarContent = () => (
    <div className="flex flex-col flex-grow pt-5 bg-secondary bg-texture text-white overflow-y-auto">
      <div className="flex-1 flex flex-col">
        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex flex-col border-t border-gray-700 p-4 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark flex items-center justify-center"
        >
          <FiLogOut className="mr-2" />
          Выйти
        </button>
        <Link href="/" className="text-sm text-gray-300 hover:text-white text-center">
          ← Назад на сайт
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <FiX className="h-6 w-6 text-white" />
            </button>
          </div>
          {renderSidebarContent()}
        </div>
        <div className="flex-shrink-0 w-14"></div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
        <div className="flex-1 flex flex-col min-h-0">
          {renderSidebarContent()}
        </div>
      </div>

      <div className="md:pl-64 flex flex-col flex-1">
        <div className={`sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100 ${mobileMenuOpen ? 'hidden' : ''}`}>
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <FiMenu className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
