"use client"

import {AdminShell} from "@/app/admin/components/AdminShell";
import {TimelineProvider} from "@/app/contexts/TimelineContext";
import {Toaster} from "@/app/components/ui/toaster";

export default function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <TimelineProvider>
            <AdminShell>
                {children}
            </AdminShell>
            <Toaster/>
        </TimelineProvider>
    );
}
