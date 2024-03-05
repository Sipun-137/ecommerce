import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Address from "@/models/Address";
import { AuthUser } from "@/middleware";


connect();
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, message: "you are not logged in ! please login.." })
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {

            const extractAddress = await Address.find({ userID: id });
            if (extractAddress) {
                return NextResponse.json({
                    success: true,
                    data: extractAddress
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "failed to fetch address ! please try again"
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