"use client"

import Breadcrumbs from "./components/Breadcrumbs";
import {useRouter} from "next/navigation";
import {FiLogOut} from "react-icons/fi";

export default function AdminLayout({children}: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", {method: "POST"});
        router.push("/admin/login");
    };

    return (
        <div className="max-w-4xl mx-auto p-10 my-8">
            <div className="flex justify-between items-center mb-4">
                <Breadcrumbs />
                <button onClick={handleLogout} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary flex items-center">
                    <FiLogOut className="mr-2" />
                    Выйти
                </button>
            </div>
            {children}
        </div>
    );
}