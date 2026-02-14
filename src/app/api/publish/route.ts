import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const price = formData.get("price") as string;
        const description = formData.get("description") as string;
        const platformsStr = formData.get("platforms") as string;
        const platforms = JSON.parse(platformsStr);
        const imageFile = formData.get("image") as File;

        if (!title || !price) {
            return NextResponse.json(
                { error: "Title and Price are required" },
                { status: 400 }
            );
        }

        await dbConnect();

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

        // Save to MongoDB
        const newProduct = await Product.create({
            merchantId: "demo_merchant_123", // Hardcoded for demo
            title,
            price,
            description,
            imageUrl,
            platforms
        });

        // Trigger Make.com Webhook
        const webhookUrl = process.env.MAKE_WEBHOOK_URL;
        if (webhookUrl) {
            try {
                await fetch(webhookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        merchantId: "demo_merchant_123",
                        title,
                        price,
                        description,
                        imageUrl,
                        platforms,
                        productId: newProduct._id
                    }),
                });
            } catch (webhookError) {
                console.error("Webhook triggers failed", webhookError);
                // We generally don't fail the whole request if webhook fails, but log it
            }
        }

        return NextResponse.json({ success: true, product: newProduct });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
