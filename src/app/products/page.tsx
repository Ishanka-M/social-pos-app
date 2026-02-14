"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const products = [
    { id: 1, title: "Vintage Leather Jacket", price: "15,000", status: "Active", date: "2024-02-14", image: "https://images.unsplash.com/photo-1551028919-ac66e62469d2?w=800&auto=format&fit=crop&q=60" },
    { id: 2, title: "Summer Floral Dress", price: "4,500", status: "Draft", date: "2024-02-13", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=60" },
    { id: 3, title: "Denim Jeans Slim Fit", price: "6,800", status: "Active", date: "2024-02-12", image: "https://images.unsplash.com/photo-1542272454324-4c17b781560d?w=800&auto=format&fit=crop&q=60" },
    { id: 4, title: "Cotton T-Shirt Basic", price: "2,200", status: "Active", date: "2024-02-12", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60" },
];

export default function ProductsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground">Manage your product catalog.</p>
                </motion.div>
                <motion.div
                    className="flex gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                    <Button>Export</Button>
                </motion.div>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search products..." className="max-w-xs border-0 bg-secondary/50 focus-visible:ring-0" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium text-sm">
                            <div className="col-span-5">Product</div>
                            <div className="col-span-2 text-right">Price (LKR)</div>
                            <div className="col-span-2 text-center">Status</div>
                            <div className="col-span-2 text-right">Date</div>
                            <div className="col-span-1"></div>
                        </div>
                        <div className="divide-y">
                            {products.map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/20 transition-colors"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="col-span-5 flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-md bg-muted overflow-hidden">
                                            <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="font-medium">{product.title}</div>
                                    </div>
                                    <div className="col-span-2 text-right text-sm">Rs. {product.price}</div>
                                    <div className="col-span-2 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </div>
                                    <div className="col-span-2 text-right text-sm text-muted-foreground">{product.date}</div>
                                    <div className="col-span-1 flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
