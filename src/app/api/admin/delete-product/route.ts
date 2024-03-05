import connect from "@/dbConfig/dbConfig";
import { AuthUser } from "@/middleware";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export const dynamic = 'force-dynamic'


export async function DELETE(req: NextRequest) {

    try {

        const isAuthUser: any = await AuthUser(req)
        const user = isAuthUser?.role
        if (user === "admin") {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');
            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "product id is required"
                })
            }
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (deletedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "product Deleted successfully"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "unable to remove the Product ! Please try again later."
                })
            }
        }
        else {
            return NextResponse.json({
                success: false,
                message: "You are not Authorized to perform the operation..."
            })
        }

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later."
        })
    }
}