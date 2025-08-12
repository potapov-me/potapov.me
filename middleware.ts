import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
    const session = req.cookies.get("session");

    if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*'
    ],
};