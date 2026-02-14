"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Video, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function SocialAccountsPage() {
    const [connected, setConnected] = useState({ fb: true, ig: false, tt: false });

    const handleConnect = (platform: keyof typeof connected) => {
        // Mock connection logic
        setConnected(prev => {
            const newState = { ...prev, [platform]: !prev[platform] };
            if (newState[platform]) {
                toast.success(`Connected to ${platform.toUpperCase()}`);
            } else {
                toast.info(`Disconnected from ${platform.toUpperCase()}`);
            }
            return newState;
        });
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold tracking-tight">Linked Pages</h1>
                <p className="text-muted-foreground">Manage your social media page connections.</p>
            </motion.div>

            <div className="grid gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="overflow-hidden border-l-4 border-l-blue-600">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Facebook className="text-blue-600" /> Facebook Page
                                </CardTitle>
                                <CardDescription>Connect your business page to auto-post.</CardDescription>
                            </div>
                            {connected.fb && <CheckCircle2 className="text-green-500 h-6 w-6" />}
                        </CardHeader>
                        <CardContent className="pt-4">
                            {connected.fb ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                                        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">IB</div>
                                        <div>
                                            <div className="font-semibold">Infinite Brands Official</div>
                                            <div className="text-xs text-muted-foreground">Attached Page</div>
                                        </div>
                                    </div>
                                    <Button variant="destructive" onClick={() => handleConnect('fb')}>Disconnect Page</Button>
                                </div>
                            ) : (
                                <Button onClick={() => handleConnect('fb')} className="bg-blue-600 hover:bg-blue-700">Connect Facebook Page</Button>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="overflow-hidden border-l-4 border-l-pink-600">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Instagram className="text-pink-600" /> Instagram Business
                                </CardTitle>
                                <CardDescription>Connect your professional Instagram account.</CardDescription>
                            </div>
                            {connected.ig && <CheckCircle2 className="text-green-500 h-6 w-6" />}
                        </CardHeader>
                        <CardContent className="pt-4">
                            <Button
                                onClick={() => handleConnect('ig')}
                                variant={connected.ig ? "destructive" : "default"}
                                className={!connected.ig ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" : ""}
                            >
                                {connected.ig ? "Disconnect Instagram" : "Connect Instagram"}
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                    <Card className="overflow-hidden border-l-4 border-l-black dark:border-l-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Video className="text-black dark:text-white" /> TikTok Business
                                </CardTitle>
                                <CardDescription>Share products to your TikTok feed.</CardDescription>
                            </div>
                            {connected.tt && <CheckCircle2 className="text-green-500 h-6 w-6" />}
                        </CardHeader>
                        <CardContent className="pt-4">
                            <Button
                                onClick={() => handleConnect('tt')}
                                variant={connected.tt ? "destructive" : "secondary"}
                            >
                                {connected.tt ? "Disconnect TikTok" : "Connect TikTok"}
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
