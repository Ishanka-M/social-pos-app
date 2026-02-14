"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";
    const { data: session, status } = useSession();

    if (isLoginPage) {
        return <main className="bg-background h-screen w-full flex items-center justify-center p-4">{children}</main>;
    }

    // Optional: protect routes here or use middleware
    // For better UX, we might want to redirect if not authenticated, but we'll stick to visual hiding first.

    if (status === "loading") {
        return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
    }

    if (!session) {
        // If not logged in and not on login page, we might want to show login or redirect
        // But for now, let's assume middleware handles redirection, or we render children if public
        // Actually, let's just return children (Start Layout) but Sidebar might not make sense if public
        // Given the requirement, everything is behind login.

        // Let's redirect in component or rely on middleware.
        // We will assume middleware redirects to /login.
        return <main>{children}</main>;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background start-layout">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                {children}
            </main>
        </div>
    );
}
