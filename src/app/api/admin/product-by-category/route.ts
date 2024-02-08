import connect from "@/dbConfig/dbConfig";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
connect();
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const getData = await Product.find({ category: id })
        if (getData) {
            return NextResponse.json({
                success: true,
                data: getData,
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "no products Found"
            })
        }

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "something went wrong please try after some time"
        })
    }

}