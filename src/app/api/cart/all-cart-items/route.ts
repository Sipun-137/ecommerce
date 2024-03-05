import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import { AuthUser } from "@/middleware";
import Cart from "@/models/CartModel";

export const dynamic = "force-dynamic"
connect();
export async function GET(req: NextRequest) {
    try {
        const isAuthUser: any = await AuthUser(req)
        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');
            console.log(id)
            if (!id) return NextResponse.json({ success: false, message: "please login" })

            const extractAllcartItem = await Cart.find({ userID: id }).populate('productID')
            if (extractAllcartItem) {
                return NextResponse.json({
                    success: true,
                    data: extractAllcartItem
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "no cart item found",
                    status: 204
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not Authrorized to perform this opeartion"
            })
        }
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    }
}