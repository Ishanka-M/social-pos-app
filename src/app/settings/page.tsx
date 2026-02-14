"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Save,
    Webhook,
    Facebook,
    Instagram,
    Video,
    CheckCircle2,
    XCircle,
    Loader2,
    Link as LinkIcon,
    Unlink
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function SettingsPage() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState("");
    const [socialAccounts, setSocialAccounts] = useState({
        facebook: { connected: false, pageName: "" },
        instagram: { connected: false, username: "" },
        tiktok: { connected: false, username: "" }
    });

    useEffect(() => {
        fetchUserSettings();
    }, []);

    const fetchUserSettings = async () => {
        try {
            const res = await fetch("/api/user-settings");
            const data = await res.json();

            if (res.ok && data.user) {
                setWebhookUrl(data.user.webhookUrl || "");
                if (data.user.socialAccounts) {
                    setSocialAccounts({
                        facebook: {
                            connected: data.user.socialAccounts.facebook?.connected || false,
                            pageName: data.user.socialAccounts.facebook?.pageName || ""
                        },
                        instagram: {
                            connected: data.user.socialAccounts.instagram?.connected || false,
                            username: data.user.socialAccounts.instagram?.username || ""
                        },
                        tiktok: {
                            connected: data.user.socialAccounts.tiktok?.connected || false,
                            username: data.user.socialAccounts.tiktok?.username || ""
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch settings", error);
        }
    };

    const handleSaveWebhook = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/user-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ webhookUrl })
            });

            if (res.ok) {
                toast.success("Webhook URL saved successfully!");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to save webhook");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleConnectSocial = async (platform: 'facebook' | 'instagram' | 'tiktok') => {
        // For now, this is a mock connection
        // In production, you'd redirect to OAuth flow or show a modal for credentials
        const accountName = prompt(`Enter your ${platform} account name/ID:`);

        if (!accountName) return;

        setLoading(true);
        try {
            const res = await fetch("/api/user-settings/social", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    platform,
                    connected: true,
                    accountName
                })
            });

            if (res.ok) {
                toast.success(`${platform} connected successfully!`);
                fetchUserSettings();
            } else {
                toast.error(`Failed to connect ${platform}`);
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnectSocial = async (platform: 'facebook' | 'instagram' | 'tiktok') => {
        if (!confirm(`Are you sure you want to disconnect ${platform}?`)) return;

        setLoading(true);
        try {
            const res = await fetch("/api/user-settings/social", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    platform,
                    connected: false
                })
            });

            if (res.ok) {
                toast.success(`${platform} disconnected`);
                fetchUserSettings();
            } else {
                toast.error(`Failed to disconnect ${platform}`);
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your automation and social media connections.</p>
            </motion.div>

            <div className="grid gap-6">
                {/* Webhook Configuration */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Webhook className="h-5 w-5" />
                                Your Webhook URL
                            </CardTitle>
                            <CardDescription>
                                Add your Make.com or Zapier webhook URL for automated posting
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="webhook">Webhook URL</Label>
                                <Input
                                    id="webhook"
                                    type="url"
                                    placeholder="https://hook.us1.make.com/..."
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    This URL will be triggered when you post products. Leave empty to use the system default.
                                </p>
                            </div>
                            <Button onClick={handleSaveWebhook} disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Save Webhook
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Social Accounts */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <LinkIcon className="h-5 w-5" />
                                Social Media Accounts
                            </CardTitle>
                            <CardDescription>
                                Track your connected social media accounts
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Facebook */}
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Facebook className="h-6 w-6 text-blue-600" />
                                    <div>
                                        <p className="font-medium">Facebook</p>
                                        {socialAccounts.facebook.connected ? (
                                            <p className="text-sm text-muted-foreground">
                                                {socialAccounts.facebook.pageName || "Connected"}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">Not connected</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {socialAccounts.facebook.connected ? (
                                        <>
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDisconnectSocial('facebook')}
                                                disabled={loading}
                                            >
                                                <Unlink className="h-4 w-4 mr-1" />
                                                Disconnect
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="h-5 w-5 text-muted-foreground" />
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => handleConnectSocial('facebook')}
                                                disabled={loading}
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                <LinkIcon className="h-4 w-4 mr-1" />
                                                Connect
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Instagram */}
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Instagram className="h-6 w-6 text-pink-600" />
                                    <div>
                                        <p className="font-medium">Instagram</p>
                                        {socialAccounts.instagram.connected ? (
                                            <p className="text-sm text-muted-foreground">
                                                @{socialAccounts.instagram.username || "Connected"}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">Not connected</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {socialAccounts.instagram.connected ? (
                                        <>
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDisconnectSocial('instagram')}
                                                disabled={loading}
                                            >
                                                <Unlink className="h-4 w-4 mr-1" />
                                                Disconnect
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="h-5 w-5 text-muted-foreground" />
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => handleConnectSocial('instagram')}
                                                disabled={loading}
                                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                            >
                                                <LinkIcon className="h-4 w-4 mr-1" />
                                                Connect
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* TikTok */}
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Video className="h-6 w-6" />
                                    <div>
                                        <p className="font-medium">TikTok</p>
                                        {socialAccounts.tiktok.connected ? (
                                            <p className="text-sm text-muted-foreground">
                                                @{socialAccounts.tiktok.username || "Connected"}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">Not connected</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {socialAccounts.tiktok.connected ? (
                                        <>
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDisconnectSocial('tiktok')}
                                                disabled={loading}
                                            >
                                                <Unlink className="h-4 w-4 mr-1" />
                                                Disconnect
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="h-5 w-5 text-muted-foreground" />
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => handleConnectSocial('tiktok')}
                                                disabled={loading}
                                            >
                                                <LinkIcon className="h-4 w-4 mr-1" />
                                                Connect
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                <p className="text-sm text-muted-foreground">
                                    💡 <strong>Tip:</strong> Connect your social accounts to track your posting status.
                                    Use the webhook URL from Make.com or Zapier to enable automated posting.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
