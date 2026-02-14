"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage system configurations.</p>
            </motion.div>

            <div className="grid gap-6">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Merchant Profile</CardTitle>
                            <CardDescription>Update your business details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Business Name</Label>
                                    <Input defaultValue="Infinite Brands Local" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Contact Email</Label>
                                    <Input defaultValue="admin@infinitebrands.lk" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Automation Configuration</CardTitle>
                            <CardDescription>Manage your automation webhooks.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Make.com Webhook URL</Label>
                                <Input type="password" value="https://hook.make.com/..." disabled className="bg-muted" />
                                <p className="text-xs text-muted-foreground">To change this, please contact support.</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <div className="flex justify-end">
                    <Button size="lg" className="w-full md:w-auto"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
                </div>
            </div>
        </div>
    );
}
