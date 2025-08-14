import type { Metadata } from "next";
import {Project} from "@/app/types";

export const metadata: Metadata = {
    title: "Проекты",
    description: "Реализованные и текущие проекты: стек, ссылки на репозитории и сайты.",
    alternates: { canonical: "/projects" },
};

async function getProjects(): Promise<Project[]> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects`, {cache: "no-store"});
    if (!res.ok) {
        throw new Error('Failed to fetch projects');
    }
    return res.json();
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <main className="max-w-5xl mx-auto py-12 px-6 pb-16 prose-base">
            <h1 className="font-heading text-4xl md:text-5xl font-bold my-4 text-primary text-center">Проекты</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                {projects.map((project) => (
                    <div key={project.id} className="glass rounded-lg overflow-hidden hover:shadow-sm transition-transform-300 hover:-translate-y-0.5">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-primary mb-2 mt-1">{project.name}</h2>
                            <p className="text-secondary mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.stack.split(',').map((tech: string) => (
                                    <span key={tech} className="bg-gray-100 text-secondary text-sm font-medium px-2.5 py-0.5 rounded-full">{tech.trim()}</span>
                                ))}
                            </div>
                            <div className="flex justify-end gap-4">
                                {project.repo && (
                                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Репозиторий</a>
                                )}
                                {project.url && (
                                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Сайт</a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
