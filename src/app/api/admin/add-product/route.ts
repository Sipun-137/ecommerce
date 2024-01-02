import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/ProductModel";

connect()

export const dynamic = 'force-dynamic'
export async function POST(req: NextRequest) {
    try {
        const user = "admin"
        if (user === "admin") {
            const extractData = await req.json();

            const newlyCreatedProduct = await Product.create(extractData)
            if (newlyCreatedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "product added successfully"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to add the product.. please try after some time"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not Authorized to perform the operation..."
            })
        }
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "something went wrong!.. please try again later"
        })
    }
}