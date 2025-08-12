import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { z } from "zod";

// Validation schema
const timelineItemSchema = z.object({
  year: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string(),
  lessons: z.string().optional(),
  isBlink: z.boolean().optional(),
  isStartup: z.boolean().optional(),
  link: z.preprocess(
    (val) => (val === "" || val === null ? undefined : val),
    z.string().url().optional()
  ),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const timelineItem = await prisma.timelineItem.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!timelineItem) {
      return NextResponse.json(
        { message: "Timeline item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(timelineItem);
  } catch (error) {
    console.error("Error fetching timeline item:", error);
    return NextResponse.json(
      { message: "Error fetching timeline item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const data = await req.json();

    // Validate input data
    const validationResult = timelineItemSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: validationResult.error.format() },
        { status: 400 }
      );
    }

    // Check if item exists
    const existingItem = await prisma.timelineItem.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!existingItem) {
      return NextResponse.json(
        { message: "Timeline item not found" },
        { status: 404 }
      );
    }

    // Update the item
    const updatedItem = await prisma.timelineItem.update({
      where: { id: resolvedParams.id },
      data: validationResult.data,
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating timeline item:", error);
    return NextResponse.json(
      { message: "Error updating timeline item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;

    // Check if item exists
    const existingItem = await prisma.timelineItem.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!existingItem) {
      return NextResponse.json(
        { message: "Timeline item not found" },
        { status: 404 }
      );
    }

    // Delete the item
    await prisma.timelineItem.delete({
      where: { id: resolvedParams.id },
    });

    return NextResponse.json(
      { message: "Timeline item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting timeline item:", error);
    return NextResponse.json(
      { message: "Error deleting timeline item" },
      { status: 500 }
    );
  }
}
