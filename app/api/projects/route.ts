import {NextResponse} from "next/server";
import * as fs from "fs/promises";
import * as path from "path";

export async function GET() {
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const projects = JSON.parse(jsonData);
    return NextResponse.json(projects);
}

export async function POST(req: Request) {
    const newProject = await req.json();
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const projects = JSON.parse(jsonData);

    newProject.id = projects.length > 0 ? Math.max(...projects.map((p: any) => p.id)) + 1 : 1;
    projects.push(newProject);

    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

    return NextResponse.json(newProject, {status: 201});
}