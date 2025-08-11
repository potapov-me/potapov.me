"use client";

import Link from "next/link";

export default function AdminPage() {
    return (
        <div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link href="/admin/projects" className="bg-white rounded-lg shadow-md p-8 text-center transform hover:scale-105 hover:bg-gray-50 transition-transform duration-300">
                    <h2 className="text-2xl font-bold text-primary mb-2">Проекты</h2>
                    <p className="text-secondary">Управление проектами</p>
                </Link>
            </div>
        </div>
    );
}