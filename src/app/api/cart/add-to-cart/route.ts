import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import  { AuthUser } from "@/middleware";
import Cart from "@/models/CartModel";

connect();
export const dynamic = 'force-dynamic'
export async function POST(req: NextRequest) {
    try {
        const isAuthUser: any = await AuthUser(req)
        if (isAuthUser) {
            const data = await req.json();
            const { productID, userID } = data;

            const currentCartItemIsAlreadyExist = await Cart.findOne({
                productID: productID,
                userID: userID
            })

            if (currentCartItemIsAlreadyExist) {
                return NextResponse.json({
                    success: false,
                    message: "product is already in cart ! please add different product"
                })
            }

            const saveProductTOCart = await Cart.create(data)
            if (saveProductTOCart) {
                return NextResponse.json({
                    success: true,
                    message: "product added to the cart"
                })
            }

            else {
                return NextResponse.json({
                    success: false,
                    message: "failed to add the product to the cart ! please try again after some time"
                })
            }

        }else {
            return NextResponse.json({
                success: false,
                message: "you are not Authrorized"
            })
        }

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "something went wrong ! please try again later.."
        })
    }

}