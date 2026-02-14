import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import SystemConfig from "@/models/SystemConfig";

// GET: Get current config
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        let config = await SystemConfig.findOne();

        if (!config) {
            config = await SystemConfig.create({});
        }

        return NextResponse.json({ config });
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

// POST: Update config (Admin only)
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { makeWebhookUrl } = await req.json();

        await dbConnect();

        let config = await SystemConfig.findOne();
        if (!config) {
            config = await SystemConfig.create({ makeWebhookUrl });
        } else {
            config.makeWebhookUrl = makeWebhookUrl;
            config.updatedAt = new Date();
            await config.save();
        }

        return NextResponse.json({ success: true, config });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update config (Admin only) - alternative method
export async function PUT(req: NextRequest) {
    return POST(req);
}
