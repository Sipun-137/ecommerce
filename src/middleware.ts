import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'

export default function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/register'

    const token = request.cookies.get('token')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

}

export const config = {
    matcher: [ '/login', '/register' ]
};

export async function AuthUser(req:NextRequest){
    const token=req.headers.get("Authorization")?.split(" ")[1];
    if(!token){
      return false
    }
    try {
        const extractAuthUserinfo = jwt.verify(token,'thequicklittlefoxjumpsoverthelazydogs');
        if (extractAuthUserinfo) {
            // Return the decoded token if authentication is successful
            return extractAuthUserinfo;
        }
    } catch (error: any) {
        console.log(error);
    }
}
