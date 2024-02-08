import connect from "@/dbConfig/dbConfig";
import middleware from "@/middleware";
import Cart from "@/models/CartModel";
import { NextRequest, NextResponse } from "next/server";



export const dynamic = "force-dynamic"


connect();
export async function DELETE(req: NextRequest) {
    try {
        const AuthUser: any = await middleware(req)
        if (AuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');
            if (!id) return NextResponse.json({ success: false, message: "cart Item id is required " })

            const deleteCartItem = await Cart.findByIdAndDelete(id);
            if (deleteCartItem) {
                return NextResponse.json({
                    success:true,
                    message:"cart item removed successfully"
                })
            } else {
                return NextResponse.json({
                    success:false,
                    message:"failed to remove the item from cart"
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
            message: "something went wrong"
        })
    }

}
