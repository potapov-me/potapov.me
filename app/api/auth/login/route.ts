import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { password } = await req.json();

    if (password === process.env.ADMIN_PASSWORD) {
        const session = Math.random().toString(36).substring(2);

        // Create response and set cookie
        const response = NextResponse.json(
            { message: "Logged in" },
            { status: 200 }
        );

        response.cookies.set({
            name: "session",
            value: session,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return response;
    } else {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}