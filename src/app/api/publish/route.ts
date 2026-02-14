import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import User from "@/models/User";
import SystemConfig from "@/models/SystemConfig";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const price = formData.get("price") as string;
        const description = formData.get("description") as string;
        const platformsStr = formData.get("platforms") as string;
        const platforms = JSON.parse(platformsStr);
        const imageFile = formData.get("image") as File;
        const scheduledFor = formData.get("scheduledFor") as string | null; // Optional scheduled date

        if (!title || !price) {
            return NextResponse.json(
                { error: "Title and Price are required" },
                { status: 400 }
            );
        }

        await dbConnect();

        // Get user's webhook URL or fallback to system default
        const user = await User.findById((session.user as any).id);
        let webhookUrl = user?.webhookUrl;

        if (!webhookUrl) {
            // Fallback to system webhook if user hasn't set one
            const systemConfig = await SystemConfig.findOne();
            webhookUrl = systemConfig?.makeWebhookUrl;
        }

        // If still no webhook, check env variable
        if (!webhookUrl) {
            webhookUrl = process.env.MAKE_WEBHOOK_URL;
        }

        // handle image upload
        let imageUrl = "";
        if (imageFile) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Upload to Cloudinary using promise
            const uploadResult: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "onlinepos_products" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(buffer);
            });

            imageUrl = uploadResult.secure_url;
        }

        // Determine if this is a scheduled post
        const isScheduled = scheduledFor ? new Date(scheduledFor) > new Date() : false;

        // Save to MongoDB
        const newProduct = await Product.create({
            userId: (session.user as any).id,
            merchantId: (session.user as any).id, // Using userId as merchantId
            title,
            price,
            description,
            imageUrl,
            platforms,
            scheduledFor: scheduledFor ? new Date(scheduledFor) : undefined,
            isScheduled,
            isPosted: !isScheduled, // If not scheduled, mark as posted immediately
            postedAt: !isScheduled ? new Date() : undefined
        });

        // Only trigger webhook if NOT scheduled (scheduled posts will be handled by a cron job later)
        if (!isScheduled && webhookUrl) {
            try {
                await fetch(webhookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: (session.user as any).id,
                        userName: session.user?.name,
                        merchantId: (session.user as any).id,
                        title,
                        price,
                        description,
                        imageUrl,
                        platforms,
                        productId: newProduct._id
                    }),
                });
            } catch (webhookError) {
                console.error("Webhook trigger failed", webhookError);
                // We don't fail the whole request if webhook fails
            }
        }

        return NextResponse.json({
            success: true,
            product: newProduct,
            scheduled: isScheduled,
            message: isScheduled
                ? `Product scheduled for ${new Date(scheduledFor!).toLocaleString()}`
                : "Product posted successfully!"
        });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

