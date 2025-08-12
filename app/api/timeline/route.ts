import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { z } from "zod";

// Validation schema for timeline item creation
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

export async function GET(req: NextRequest) {
  try {
    const timeline = await prisma.timelineItem.findMany({
      orderBy: { year: "asc" },
    });
    return NextResponse.json(timeline);
  } catch (error) {
    console.error("Error fetching timeline items:", error);
    return NextResponse.json(
      { message: "Error fetching timeline items" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate input data
    const validationResult = timelineItemSchema.safeParse(data);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.format());
      return NextResponse.json(
        { message: "Invalid data", errors: validationResult.error.format() },
        { status: 400 }
      );
    }

    // Create new timeline item
    const newTimelineItem = await prisma.timelineItem.create({
      data: validationResult.data,
    });

    return NextResponse.json(newTimelineItem, { status: 201 });
  } catch (error) {
    console.error("Error creating timeline item:", error);
    return NextResponse.json(
      { message: "Error creating timeline item" },
      { status: 500 }
    );
  }
}
