import { AuthUser } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";
//hidden key from the dashboard stripe developer
const stripe = require('stripe')('sk_test_51OkOZnSCjvp7H6WhbsOjHw5ZSDUooZzkob7MNhZT8jzmvbkm1GOgSAtoZrnZUJCkAGdjjYfgwS8WiK5OBkGA7lMe00EfNpkWtZ')

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const res = await req.json()
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: res,
                mode: 'payment',
                success_url: 'http://localhost:3000/checkout' + '?status=success',
                cancel_url:  'http://localhost:3000/checkout' + '?status=success'
            })
            return NextResponse.json({
                success: true,
                id: session.id
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "you are not authorized"
            })
        }

    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            success: false,
            message: "something went wrong!please try again"
        })
    }
}

