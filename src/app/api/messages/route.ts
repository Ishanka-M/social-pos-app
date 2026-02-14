// BUILD_TAG: 2026-02-14-22-45
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        await dbConnect();

        const sessionUser = (session.user as any) || {};
        const senderId: string = String(sessionUser.id || "system");
        const senderName: string = String(sessionUser.name || "Unknown User");
        const contentStr: string = String(body.content || "");

        if (!contentStr) {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        const messageData = {
            senderId: senderId,
            senderName: senderName,
            content: contentStr
        };

        await Message.create(messageData);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    // Only admin can read messages
    if (!session || (session.user as any).role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const messages = await Message.find().sort({ createdAt: -1 });
        return NextResponse.json({ messages });
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

// PUT: Mark message as read (Admin only)
export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const messageId = searchParams.get('id');

        if (!messageId) {
            return NextResponse.json({ error: "Message ID required" }, { status: 400 });
        }

        await dbConnect();
        await Message.findByIdAndUpdate(messageId, { isRead: true });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
