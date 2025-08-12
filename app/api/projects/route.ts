import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { z } from "zod";

// Validation schema for project creation
const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  url: z.preprocess(
    (val) => (val === "" || val === null ? undefined : val),
    z.string().url().optional()
  ),
  icon: z.string(),
  stack: z.array(z.string()),
  repo: z.preprocess(
    (val) => (val === "" || val === null ? undefined : val),
    z.string().url().optional()
  ),
});

export async function GET(req: NextRequest) {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Error fetching projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Validate input data
    const validationResult = projectSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { stack, ...rest } = validationResult.data;

    // Create new project
    const newProject = await prisma.project.create({
      data: {
        ...rest,
        stack: stack.join(","),
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { message: "Error creating project" },
      { status: 500 }
    );
  }
}
