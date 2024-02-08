import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export default function middleware(req: NextRequest) {

    // adding a product to the website with authentication
    if (req.nextUrl.pathname.includes("/admin/add-product"||"/admin/delete-product"||"/admin/update-product")) {
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({    
                success: false,
                message: "Unauthorized access!"
            });
        }
        try {
            const extractAuthUserinfo = jwt.verify(token, 'thequicklittlefoxjumpsoverthelazydogs');
            if (extractAuthUserinfo) return extractAuthUserinfo;
        } catch (error: any) {
            console.log(error);
        }
    }
    if(req.nextUrl.pathname.includes("/cart/add-to-cart")){
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({    
                success: false,
                message: "Unauthorized access!"
            });
        }
        try {
            const extractAuthUserinfo = jwt.verify(token, 'thequicklittlefoxjumpsoverthelazydogs');
            if (extractAuthUserinfo) return extractAuthUserinfo;
        } catch (error: any) {
            console.log(error);
        }

    }
    
}

// See "Matching Paths" below to learn more
export const config = {
    matcher:["/admin-view/:path*"]
}