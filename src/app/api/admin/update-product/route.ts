import connect from "@/dbConfig/dbConfig";
import { AuthUser } from "@/middleware";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
connect();

export async function PUT(req: NextRequest) {
    try {
        const isAuthUser: any = AuthUser(req)
        const user = isAuthUser?.role
        if (user === "admin") {
            const extractData = await req.json();
            console.log(extractData)
            const { _id, name, price, description, category, sizes, deliveryinfo, onsale, priceDrop, imgUrl } = extractData

            const updatedProduct = await Product.findOneAndUpdate({ _id: _id }, { name, price, description, category, sizes, deliveryinfo, onsale, priceDrop, imgUrl }, { new: true })
            if (updatedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "product Updated successfully"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "unable to update!!! please try after some time"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not Authorized to perform the operation..."
            })
        }
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later."
        })
    }
}