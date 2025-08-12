"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendarAlt, FaBriefcase, FaCog, FaChartLine } from "react-icons/fa";
import { ReactNode } from "react";

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: FaChartLine,
    },
    {
      name: "Timeline",
      href: "/admin/timeline",
      icon: FaCalendarAlt,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: FaBriefcase,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: FaCog,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto shadow-md">
            <div className="flex items-center flex-shrink-0 px-4 mb-5">
              <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-5 w-5 ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <Link href="/" className="text-sm text-blue-500 hover:text-blue-700">
                ← Back to Site
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile header */}
        <div className="md:hidden bg-white shadow-sm py-2 px-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
          <div className="dropdown dropdown-end">
            <button title="Menu" type="button" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={pathname === item.href ? "active" : ""}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/">Back to Site</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}