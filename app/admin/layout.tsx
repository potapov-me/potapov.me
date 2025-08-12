"use client"

import { AdminShell } from "@/app/admin/components/AdminShell";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <AdminShell>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary flex items-center"
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>
      {children}
    </AdminShell>
  );
}