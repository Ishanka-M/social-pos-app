import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { currentPassword, newPassword } = await req.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "Current and new passwords are required" }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        }

        await dbConnect();

        // Verify current password
        const user = await User.findById((session.user as any).id);
        if (!user || !user.password) {
            return NextResponse.json({ error: "User or password not found" }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
        }

        // Update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate((session.user as any).id, { password: hashedPassword });

        return NextResponse.json({ success: true, message: "Password updated successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
