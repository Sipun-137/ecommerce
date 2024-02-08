import connect from "@/dbConfig/dbConfig";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
connect();
export async function GET(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('id');
        console.log(productId)
        if (!productId) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "Product is is required"
            })
        }
        const getData = await Product.findOne({_id:productId })
        console.log(getData)
        if (getData) {
            return NextResponse.json({
                success: true,
                data: getData,
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "no Products Found"
            })
        }

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "something went wrong please try after some time"
        })
    }

}