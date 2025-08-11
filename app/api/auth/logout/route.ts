import { NextResponse } from "next/server";

export async function POST() {
    // Create response first
    const response = NextResponse.json(
        { message: "Logged out" },
        { status: 200 }
    );

    // Set cookie to expire immediately
    response.cookies.set({
        name: "session",
        value: "",
        expires: new Date(0),  // Set to Unix epoch (1970) to expire immediately
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    return response;
}