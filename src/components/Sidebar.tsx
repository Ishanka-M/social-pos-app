"use client"

import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard, ShoppingBag, Settings, LogOut, PlusCircle, Link as LinkIcon, Shield, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const isActive = (path: string) => pathname === path;
    const isAdmin = (session?.user as any)?.role === 'admin';

    return (
        <div className="flex flex-col h-screen w-64 bg-card border-r border-border shadow-xl z-50">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                        <ShoppingBag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <div className="text-xl font-bold tracking-tight">SocialPOS</div>
                        <div className="text-[10px] text-muted-foreground font-medium">
                            {isAdmin ? 'Admin Panel' : 'Merchant Dashboard'}
                        </div>
                    </div>
                </div>

                <nav className="space-y-2">
                    {!isAdmin && (
                        <Button variant="default" className="w-full justify-start gap-2 mb-6 shadow-md hover:shadow-lg transition-all" asChild>
                            <Link href="/new">
                                <PlusCircle className="h-4 w-4" />
                                <span>New Product</span>
                            </Link>
                        </Button>
                    )}

                    <Link href="/" className={cn(
                        "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                        isActive("/") ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}>
                        <LayoutDashboard size={20} className={cn("transition-transform group-hover:scale-110", isActive("/") && "animate-pulse-slow")} />
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    {!isAdmin && (
                        <>
                            <Link href="/products" className={cn(
                                "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                isActive("/products") ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}>
                                <ShoppingBag size={20} className="transition-transform group-hover:scale-110" />
                                <span className="font-medium">Products</span>
                            </Link>

                            <Link href="/social-accounts" className={cn(
                                "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                isActive("/social-accounts") ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}>
                                <LinkIcon size={20} className="transition-transform group-hover:scale-110" />
                                <span className="font-medium">Linked Pages</span>
                            </Link>
                        </>
                    )}

                    {isAdmin && (
                        <Link href="/admin" className={cn(
                            "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                            isActive("/admin") ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        )}>
                            <Shield size={20} className="transition-transform group-hover:scale-110" />
                            <span className="font-medium">Admin Console</span>
                        </Link>
                    )}

                    <Link href="/settings" className={cn(
                        "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                        isActive("/settings") ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}>
                        <Settings size={20} className="transition-transform group-hover:scale-110" />
                        <span className="font-medium">Settings</span>
                    </Link>
                </nav>
            </div>

            <div className="mt-auto p-4 border-t border-border bg-muted/10">
                <div className="mb-4 px-2">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                            {session?.user?.name?.[0] || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{session?.user?.name}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{session?.user?.email}</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => signOut()} className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg w-full transition-colors font-medium text-sm">
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
