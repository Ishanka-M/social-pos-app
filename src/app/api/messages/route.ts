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

        await Message.create({
            senderId: (session.user as any).id,
            senderName: (session.user as any).name || "Unknown User",
            content: body.content
        });

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
