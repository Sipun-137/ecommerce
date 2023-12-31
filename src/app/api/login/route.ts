import User from "@/models/UserModel";
import Joi from "joi";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const schema = Joi.object({
    email: Joi.string().required,
    password: Joi.string().required
})

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()
    const {error}=schema.validate({email,password});

    try {
        if(error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message
            })
        }
        const hashPassword=await bcryptjs.hash(password,12)
        const valid=await User.findOne({email})
        if(valid){
            if(password===hashPassword){
                return NextResponse.json({
                    success:true,
                    message:"user login with credentials successfully"
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:"error in login with the given credentials"
                }) 
            } 
        }
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:"error in login with the given credentials"
        })
    }
}