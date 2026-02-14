"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SocialPreview from "@/components/SocialPreview";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ProductForm() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        imageUrl: "",
        platforms: {
            fb: true,
            ig: true,
            tt: false
        }
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlatformToggle = (platform: 'fb' | 'ig' | 'tt') => {
        setFormData(prev => ({
            ...prev,
            platforms: { ...prev.platforms, [platform]: !prev.platforms[platform] }
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setFormData(prev => ({ ...prev, imageUrl: url })); // For preview purposes
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Upload logic (if file selected)
            let finalImageUrl = formData.imageUrl;

            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append("file", imageFile);
                uploadFormData.append("upload_preset", "products_unsigned"); // Need to set this up or use API route

                // We will send file to our API route to handle upload securely
                // Actually, better to send everything to API route as FormData
            }

            const formPayload = new FormData();
            formPayload.append("title", formData.title);
            formPayload.append("price", formData.price);
            formPayload.append("description", formData.description);
            formPayload.append("platforms", JSON.stringify(formData.platforms));
            if (imageFile) {
                formPayload.append("image", imageFile); // Send file to server
            }

            const response = await fetch("/api/publish", {
                method: "POST",
                body: formPayload,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to publish");
            }

            toast.success("Product published successfully!", {
                description: "Your product is now live on selected platforms.",
                icon: <CheckCircle2 className="text-green-500" />
            });

            // Reset form
            setFormData({
                title: "",
                price: "",
                description: "",
                imageUrl: "",
                platforms: { fb: true, ig: true, tt: false }
            });
            setImageFile(null);
            setPreviewUrl("");

        } catch (error: any) {
            console.error(error);
            toast.error("Error publishing product", {
                description: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle>New Product Post</CardTitle>
                    <CardDescription>Create a product listing and publish to social media.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Product Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="e.g. Vintage Leather Jacket"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Product details, features, etc."
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Product Image</Label>
                            <div className="border-2 border-dashed border-input rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <span className="text-sm text-muted-foreground">Click to upload image</span>
                                {imageFile && <span className="text-xs text-primary mt-2 font-medium">{imageFile.name}</span>}
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <Label>Publish to Platforms</Label>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="fb" className="cursor-pointer">Facebook</Label>
                                    </div>
                                    <Switch
                                        id="fb"
                                        checked={formData.platforms.fb}
                                        onCheckedChange={() => handlePlatformToggle('fb')}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="ig" className="cursor-pointer">Instagram</Label>
                                    </div>
                                    <Switch
                                        id="ig"
                                        checked={formData.platforms.ig}
                                        onCheckedChange={() => handlePlatformToggle('ig')}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="tt" className="cursor-pointer">TikTok</Label>
                                    </div>
                                    <Switch
                                        id="tt"
                                        checked={formData.platforms.tt}
                                        onCheckedChange={() => handlePlatformToggle('tt')}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Publishing...
                                </>
                            ) : (
                                "Publish Product"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Preview Section */}
            <div className="space-y-6">
                <div className="sticky top-6">
                    <h3 className="text-lg font-semibold mb-4">Live Previews</h3>
                    <div className="space-y-6">
                        {formData.platforms.fb && (
                            <SocialPreview
                                width="100%"
                                title={formData.title || "Product Title"}
                                price={formData.price}
                                description={formData.description || "Product description will appear here..."}
                                imageUrl={previewUrl}
                                platform="fb"
                            />
                        )}
                        {formData.platforms.ig && (
                            <SocialPreview
                                width="100%"
                                title={formData.title || "Product Title"}
                                price={formData.price}
                                description={formData.description || "Product description..."}
                                imageUrl={previewUrl}
                                platform="ig"
                            />
                        )}
                        {formData.platforms.tt && (
                            <SocialPreview
                                width="100%"
                                title={formData.title || "Product Title"}
                                price={formData.price}
                                description={formData.description || "Product description..."}
                                imageUrl={previewUrl}
                                platform="tt"
                            />
                        )}
                        {!formData.platforms.fb && !formData.platforms.ig && !formData.platforms.tt && (
                            <div className="text-center p-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                                Enable a platform to see preview
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
