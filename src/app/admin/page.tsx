"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Users,
    MessageSquare,
    Settings,
    Lock,
    UserPlus,
    Trash2,
    Eye,
    EyeOff,
    Loader2
} from "lucide-react";
import { toast } from "sonner";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

interface Message {
    _id: string;
    senderName: string;
    content: string;
    isRead: boolean;
    createdAt: string;
}

interface SystemConfig {
    _id?: string;
    makeWebhookUrl?: string;
    updatedAt?: string;
}

export default function AdminPanel() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [systemConfig, setSystemConfig] = useState<SystemConfig>({});

    // User form
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserRole, setNewUserRole] = useState("user");

    // Password change form
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Webhook configuration
    const [webhookUrl, setWebhookUrl] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
        if (status === "authenticated" && (session?.user as any)?.role !== "admin") {
            toast.error("Access denied. Admin only.");
            router.push("/");
        }
    }, [status, session, router]);

    useEffect(() => {
        if (status === "authenticated") {
            fetchUsers();
            fetchMessages();
            fetchSystemConfig();
        }
    }, [status]);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users");
            const data = await res.json();
            if (res.ok) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/messages");
            const data = await res.json();
            if (res.ok) {
                setMessages(data.messages);
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };

    const fetchSystemConfig = async () => {
        try {
            const res = await fetch("/api/system-config");
            const data = await res.json();
            if (res.ok && data.config) {
                setSystemConfig(data.config);
                setWebhookUrl(data.config.makeWebhookUrl || "");
            }
        } catch (error) {
            console.error("Failed to fetch system config", error);
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newUserName,
                    email: newUserEmail,
                    password: newUserPassword,
                    role: newUserRole,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("User created successfully!");
                setNewUserName("");
                setNewUserEmail("");
                setNewUserPassword("");
                setNewUserRole("user");
                fetchUsers();
            } else {
                toast.error(data.error || "Failed to create user");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            const res = await fetch(`/api/users?id=${userId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("User deleted successfully!");
                fetchUsers();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to delete user");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Password changed successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error(data.error || "Failed to change password");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateWebhook = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/system-config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ makeWebhookUrl: webhookUrl }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Webhook URL updated successfully!");
                fetchSystemConfig();
            } else {
                toast.error(data.error || "Failed to update webhook");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (messageId: string) => {
        try {
            const res = await fetch(`/api/messages?id=${messageId}`, {
                method: "PUT",
            });

            if (res.ok) {
                toast.success("Message marked as read");
                fetchMessages();
            }
        } catch (error) {
            toast.error("Failed to update message");
        }
    };

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if ((session?.user as any)?.role !== "admin") {
        return null;
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Admin Panel</h1>
                    <p className="text-muted-foreground">Manage your system settings and users</p>
                </div>
                <Button variant="outline" onClick={() => router.push("/")}>
                    Back to Dashboard
                </Button>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-2 border-b">
                <button
                    onClick={() => setActiveTab("users")}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === "users"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Users className="inline h-4 w-4 mr-2" />
                    Users
                </button>
                <button
                    onClick={() => setActiveTab("messages")}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === "messages"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <MessageSquare className="inline h-4 w-4 mr-2" />
                    Messages
                </button>
                <button
                    onClick={() => setActiveTab("password")}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === "password"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Lock className="inline h-4 w-4 mr-2" />
                    Change Password
                </button>
                <button
                    onClick={() => setActiveTab("automation")}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === "automation"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Settings className="inline h-4 w-4 mr-2" />
                    Automation
                </button>
            </div>

            {/* Users Tab */}
            {activeTab === "users" && (
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Add User Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <UserPlus className="inline h-5 w-5 mr-2" />
                                Add New User
                            </CardTitle>
                            <CardDescription>Create a new user account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddUser} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={newUserName}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={newUserEmail}
                                        onChange={(e) => setNewUserEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={newUserPassword}
                                        onChange={(e) => setNewUserPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <select
                                        id="role"
                                        value={newUserRole}
                                        onChange={(e) => setNewUserRole(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md bg-background"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                    Add User
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Users List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <Users className="inline h-5 w-5 mr-2" />
                                All Users ({users.length})
                            </CardTitle>
                            <CardDescription>Manage existing users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                {users.map((user) => (
                                    <div
                                        key={user._id}
                                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                                    >
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary">
                                                    {user.role}
                                                </span>
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteUser(user._id)}
                                            disabled={user.email === session?.user?.email}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                                {users.length === 0 && (
                                    <p className="text-center text-muted-foreground py-8">No users found</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <MessageSquare className="inline h-5 w-5 mr-2" />
                            User Messages ({messages.length})
                        </CardTitle>
                        <CardDescription>View messages from users</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 max-h-[600px] overflow-y-auto">
                            {messages.map((message) => (
                                <div
                                    key={message._id}
                                    className={`p-4 border rounded-lg ${message.isRead ? "bg-background" : "bg-accent/30 border-primary/50"
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <p className="font-semibold">{message.senderName}</p>
                                                {!message.isRead && (
                                                    <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm mb-2">{message.content}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(message.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        {!message.isRead && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleMarkAsRead(message._id)}
                                            >
                                                Mark as Read
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {messages.length === 0 && (
                                <p className="text-center text-muted-foreground py-8">No messages found</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Change Password Tab */}
            {activeTab === "password" && (
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle>
                            <Lock className="inline h-5 w-5 mr-2" />
                            Change Password
                        </CardTitle>
                        <CardDescription>Update your admin password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <div className="relative">
                                    <Input
                                        id="currentPassword"
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        {showCurrentPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        {showNewPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Change Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Automation Configuration Tab */}
            {activeTab === "automation" && (
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle>
                            <Settings className="inline h-5 w-5 mr-2" />
                            Automation Configuration
                        </CardTitle>
                        <CardDescription>Configure Make.com webhook for social media automation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpdateWebhook} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="webhookUrl">Make.com Webhook URL</Label>
                                <Input
                                    id="webhookUrl"
                                    type="url"
                                    placeholder="https://hook.us1.make.com/..."
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    This URL will be used to trigger social media posts
                                </p>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Update Webhook URL
                            </Button>
                        </form>
                        {systemConfig.updatedAt && (
                            <p className="text-xs text-muted-foreground mt-4">
                                Last updated: {new Date(systemConfig.updatedAt).toLocaleString()}
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
