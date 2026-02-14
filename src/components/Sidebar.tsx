import { LayoutDashboard, ShoppingBag, Settings, LogOut, PlusCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
    return (
        <div className="flex flex-col h-screen w-64 bg-card border-r border-border p-4 shadow-xl z-50">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-xl font-bold tracking-tight">SocialPOS</div>
            </div>

            <nav className="flex-1 space-y-1">
                <Button variant="secondary" className="w-full justify-start gap-2 mb-6" asChild>
                    <Link href="/new">
                        <PlusCircle className="h-4 w-4" />
                        <span>New Product</span>
                    </Link>
                </Button>

                <Link href="/" className="flex items-center space-x-2 px-3 py-2 bg-secondary/50 text-secondary-foreground rounded-lg transition-all hover:bg-secondary hover:translate-x-1">
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </Link>
                <Link href="#" className="flex items-center space-x-2 px-3 py-2 hover:bg-muted/50 text-muted-foreground hover:text-foreground rounded-lg transition-all hover:translate-x-1">
                    <ShoppingBag size={18} />
                    <span>Products</span>
                </Link>
                <Link href="#" className="flex items-center space-x-2 px-3 py-2 hover:bg-muted/50 text-muted-foreground hover:text-foreground rounded-lg transition-all hover:translate-x-1">
                    <Settings size={18} />
                    <span>Settings</span>
                </Link>
            </nav>

            <div className="mt-auto pt-4 border-t border-border">
                <button className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg w-full transition-colors font-medium text-sm">
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

