import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Address from "@/models/Address";
import { AuthUser } from "@/middleware";


connect();
export const dynamic = 'force-dynamic'

export async function PUT(req: NextRequest) {
    try {
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const data = await req.json();
            const { _id, fullName, address, city, country, postalCode } = data;
            const updateAddress = await Address.findOneAndUpdate({ _id: _id }, { fullName, address, city, country, postalCode }, { new: true })
            if(updateAddress){
                return NextResponse.json({
                    success: true,
                    message: "Address updated successfully "
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message: "failed to update the address! try again ..."
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not authenticated "
            })
        }
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "something went wong ! please try again later"
        })
    }
}
