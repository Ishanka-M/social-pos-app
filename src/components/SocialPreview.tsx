import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Facebook, Instagram, Video, ShoppingBag } from "lucide-react";

interface SocialPreviewProps {
    title: string;
    price: string;
    description: string;
    imageUrl: string;
    platform: 'fb' | 'ig' | 'tt';
}

export default function SocialPreview({ title, price, description, imageUrl, platform }: SocialPreviewProps) {
    const getIcon = () => {
        switch (platform) {
            case 'fb': return <Facebook className="w-4 h-4 text-blue-600" />;
            case 'ig': return <Instagram className="w-4 h-4 text-pink-600" />;
            case 'tt': return <Video className="w-4 h-4 text-black dark:text-white" />;
        }
    };

    const getName = () => {
        switch (platform) {
            case 'fb': return 'Facebook Feed';
            case 'ig': return 'Instagram Feed';
            case 'tt': return 'TikTok Feed';
        }
    };

    return (
        <Card className="w-full h-fit overflow-hidden border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <div className="bg-muted/30 p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-background flex items-center justify-center shadow-sm">
                        {getIcon()}
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">{getName()}</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 animate-pulse-slow"></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold leading-none">Your Store</span>
                        <span className="text-[10px] text-muted-foreground">Sponsored · Just now</span>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <p className="text-sm leading-relaxed">
                        <span className="font-semibold">{title}</span>
                        {price && <span className="ml-2 px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-bold">${price}</span>}
                        <br />
                        <span className="text-muted-foreground text-xs">{description}</span>
                    </p>
                </div>

                {/* Media */}
                <div className="relative aspect-square w-full rounded-md overflow-hidden bg-muted border border-border/50 shadow-inner flex items-center justify-center group">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Preview" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                        <div className="text-xs text-muted-foreground flex flex-col items-center gap-2">
                            <ShoppingBag className="h-8 w-8 opacity-20" />
                            <span>Upload an image to preview</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="h-8 w-20 rounded bg-muted/50"></div>
                    <div className="h-8 w-20 rounded bg-muted/50"></div>
                    <div className="h-8 w-20 rounded bg-muted/50"></div>
                </div>
            </div>
        </Card>
    )
}
