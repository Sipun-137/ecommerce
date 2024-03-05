import connect from "@/dbConfig/dbConfig";
import { AuthUser } from "@/middleware";
import Cart from "@/models/CartModel";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';


connect()
export async function POST(req: NextRequest) {
    try {
        const isAuthUser=await AuthUser(req);
        if(!isAuthUser){
            const  data=await req.json();
            const {user}=data
            const saveNEwOrder=await Order.create(data);
            if(saveNEwOrder){
                await Cart.deleteMany({userID:user})
                return NextResponse.json({
                    success:true,
                    message:"Products are on the way ! "
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:"failed to create a Order"
                })
            }
        }else{
            return NextResponse.json({
                success: false,
                message:"you are not Authenticated"
            })
        }
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message:"something went wrong! try again later"
        })
    }
}