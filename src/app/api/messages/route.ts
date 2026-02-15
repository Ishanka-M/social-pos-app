// @ts-nocheck
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        await dbConnect();
        const sessionUser = (session.user as any) || {};
        
        await Message.create({
            senderId: String(sessionUser.id || "system"),
            senderName: String(sessionUser.name || "User"),
            content: String(body.content || "")
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
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