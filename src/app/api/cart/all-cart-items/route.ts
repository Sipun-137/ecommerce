import connect from "@/dbConfig/dbConfig";
import middleware from "@/middleware";
import Cart from "@/models/CartModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"


connect();
export async function GET(req: NextRequest) {
    try {
        const AuthUser: any = await middleware(req)
        if (AuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');

            if (!id) return NextResponse.json({ success: false, message: "please login" })

            const extractAllcartItem = await Cart.find({ userID: id }).populate('userID').populate('productID')
            if (extractAllcartItem) {
                return NextResponse.json({
                    success: true,
                    data: extractAllcartItem
                });
            } else {
                return NextResponse.json({
                    success:false,
                    message:"no cart item found",
                    status:204
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not Authrorized"
            })
        }


    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    }
}