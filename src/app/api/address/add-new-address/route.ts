import connect from "@/dbConfig/dbConfig";
import {AuthUser} from "@/middleware";
import { NextRequest, NextResponse } from "next/server";
import Address from "@/models/Address";


connect();
export const dynamic = 'force-dynamic'


export async function POST(req: NextRequest) {
    try {
        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const data=await req.json();
            const {fullName,address,city,country,PostalCode,userID}=data;
            
            const newlyAddedAddress=await Address.create(data)
            if(newlyAddedAddress){
                return NextResponse.json({
                    success: true,
                    message: "address added successfully",
                })
            }else{
                return NextResponse.json({
                    success:true,
                    message:"something went wrong! Please try again"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not authorized"
            })
        }
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "something went wong ! please try again later"
        })
    }
}