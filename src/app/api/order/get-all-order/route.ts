import connect from "@/dbConfig/dbConfig";
import { AuthUser } from "@/middleware";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

connect()


export async function GET(req: NextRequest) {
    try {
        const isAuthUser = await AuthUser(req);
        if (!isAuthUser) {
            const { searchParams } = new URL(req.url)
            const id = searchParams.get('id');
            const extractAllORders = await Order.find({
                user: id
            }).populate('orderItems.product')

            if(extractAllORders){
                return NextResponse.json({
                    success:true,
                    data:extractAllORders
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:"Failed to get All Order! Please try again"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not Authenticated"
            })
        }
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "something went wrong! try again later"
        })
    }
}