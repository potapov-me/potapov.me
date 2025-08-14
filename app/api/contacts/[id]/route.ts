import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { z } from "zod";
import { cookies } from "next/headers";

const updateSchema = z.object({
  isRead: z.boolean().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = cookies().get("session");
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const resolved = await params;
    const existing = await prisma.contactSubmission.findUnique({
      where: { id: resolved.id },
    });
    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await prisma.contactSubmission.update({
      where: { id: resolved.id },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating contact submission:", error);
    return NextResponse.json(
      { message: "Error updating contact submission" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = cookies().get("session");
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const resolved = await params;
    const existing = await prisma.contactSubmission.findUnique({
      where: { id: resolved.id },
    });
    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await prisma.contactSubmission.delete({ where: { id: resolved.id } });
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    return NextResponse.json(
      { message: "Error deleting contact submission" },
      { status: 500 }
    );
  }
}
