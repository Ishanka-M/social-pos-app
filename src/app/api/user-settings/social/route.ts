import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import User from "@/models/User";

// POST: Connect/Disconnect social accounts
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { platform, connected, accountName } = await req.json();

        if (!['facebook', 'instagram', 'tiktok'].includes(platform)) {
            return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
        }

        await dbConnect();

        const updateData: any = {};

        if (connected) {
            // Connect the account
            if (platform === 'facebook') {
                updateData['socialAccounts.facebook'] = {
                    connected: true,
                    pageName: accountName,
                    connectedAt: new Date()
                };
            } else if (platform === 'instagram') {
                updateData['socialAccounts.instagram'] = {
                    connected: true,
                    username: accountName,
                    connectedAt: new Date()
                };
            } else if (platform === 'tiktok') {
                updateData['socialAccounts.tiktok'] = {
                    connected: true,
                    username: accountName,
                    connectedAt: new Date()
                };
            }
        } else {
            // Disconnect the account
            updateData[`socialAccounts.${platform}.connected`] = false;
        }

        const user = await User.findByIdAndUpdate(
            (session.user as any).id,
            { $set: updateData },
            { new: true }
        ).select('-password');

        return NextResponse.json({
            success: true,
            socialAccounts: user.socialAccounts
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
