import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { z } from "zod";

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: (await params).id },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { message: "Error fetching project" },
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

    const validationResult = projectSchema.safeParse(data);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: validationResult.error.format() },
        { status: 400 }
      );
    }

    const existingProject = await prisma.project.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    const { stack, ...rest } = validationResult.data;

    const updatedProject = await prisma.project.update({
      where: { id: resolvedParams.id },
      data: {
        ...rest,
        stack: stack.join(","),
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Error updating project" },
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
    const existingProject = await prisma.project.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    await prisma.project.delete({
      where: { id: resolvedParams.id },
    });

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Error deleting project" },
      { status: 500 }
    );
  }
}
