"use client"

import ProductForm from "@/components/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewPostPage() {
    return (
        <div className="space-y-6 fade-in-up">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create New Post</h1>
                    <p className="text-muted-foreground">Upload your product content and publish instantly.</p>
                </div>
            </div>

            <ProductForm />
        </div>
    );
}
