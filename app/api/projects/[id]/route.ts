import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs/promises";
import * as path from "path";
import { Project } from "@/app/types";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const updatedProject = await req.json();
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const projects: Project[] = JSON.parse(jsonData);

    const projectIndex = projects.findIndex((p: Project) => p.id === id);

    if (projectIndex === -1) {
        return new NextResponse("Project not found", { status: 404 });
    }

    projects[projectIndex] = { ...projects[projectIndex], ...updatedProject };

    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

    return NextResponse.json(projects[projectIndex]);
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const projects: Project[] = JSON.parse(jsonData);

    const newProjects = projects.filter((p: Project) => p.id !== id);

    if (projects.length === newProjects.length) {
        return new NextResponse("Project not found", { status: 404 });
    }

    await fs.writeFile(filePath, JSON.stringify(newProjects, null, 2));

    return NextResponse.json({ message: "Project deleted" });
}