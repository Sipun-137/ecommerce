import connect from "@/dbConfig/dbConfig";
import { AuthUser } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";
import Address from "@/models/Address";
connect();
export const dynamic = 'force-dynamic'

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ success: false, message: "Address id is required" })

        const isAuthuser = await AuthUser(req);
        if (isAuthuser) {
            const res = await Address.findByIdAndDelete({ _id: id });
            if (res) {
                return NextResponse.json({ success: true, message: "address removed successfully" });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "failed to delete the address ! please try again later"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not authorized"
            })
        }
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "something went wong ! please try again later"
        })
    }
}