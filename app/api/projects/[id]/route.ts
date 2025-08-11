import {NextResponse} from "next/server";
import * as fs from "fs/promises";
import * as path from "path";

export async function PUT(req: Request, {params}: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    const updatedProject = await req.json();
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    let projects = JSON.parse(jsonData);

    const projectIndex = projects.findIndex((p: any) => p.id === id);

    if (projectIndex === -1) {
        return new NextResponse("Project not found", {status: 404});
    }

    projects[projectIndex] = {...projects[projectIndex], ...updatedProject};

    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

    return NextResponse.json(projects[projectIndex]);
}

export async function DELETE(req: Request, {params}: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    let projects = JSON.parse(jsonData);

    const projectIndex = projects.findIndex((p: any) => p.id === id);

    if (projectIndex === -1) {
        return new NextResponse("Project not found", {status: 404});
    }

    projects.splice(projectIndex, 1);

    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

    return NextResponse.json({message: "Project deleted"});
}