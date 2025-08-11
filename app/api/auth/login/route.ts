import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function POST(req: Request) {
    const {password} = await req.json();

    if (password === process.env.ADMIN_PASSWORD) {
        const session = Math.random().toString(36).substring(2);
        // In a real app, you would store this session in a database.
        // For this simple case, we'll just use a cookie.
        cookies().set("session", session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });
        return NextResponse.json({message: "Logged in"});
    } else {
        return new NextResponse("Unauthorized", {status: 401});
    }
}