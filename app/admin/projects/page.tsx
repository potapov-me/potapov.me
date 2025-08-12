"use client";

import {useEffect, useState} from "react";
import {FiEdit, FiPlus, FiTrash2} from "react-icons/fi";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { useToast } from "@/app/hooks/use-toast";

interface Project {
    id: string;
    name: string;
    description: string;
    stack: string;
    icon: string;
    url?: string;
    repo?: string;
}

const ProjectForm = ({project, onSave, onCancel}: { project: Partial<Project> | null, onSave: (project: Partial<Project>) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState<Partial<Project>>(project || {name: '', description: '', stack: '', icon: ''});

    useEffect(() => {
        setFormData(project || {name: '', description: '', stack: '', icon: ''});
    }, [project]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl">
                <h2 className="text-2xl font-bold mb-6">{project?.id ? "Редактировать проект" : "Добавить проект"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Название</Label>
                        <Input type="text" name="name" id="name" value={formData.name || ""} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="description">Описание</Label>
                        <Textarea name="description" id="description" value={formData.description || ""} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="stack">Стек (через запятую)</Label>
                        <Input type="text" name="stack" id="stack" value={formData.stack || ""} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="icon">Иконка</Label>
                        <Input type="text" name="icon" id="icon" value={formData.icon || ""} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="url">URL</Label>
                        <Input type="text" name="url" id="url" value={formData.url || ""} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="repo">Репозиторий</Label>
                        <Input type="text" name="repo" id="repo" value={formData.repo || ""} onChange={handleChange} />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <Button type="button" variant="outline" onClick={onCancel}>Отмена</Button>
                        <Button type="submit">Сохранить</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/projects")
            .then((res) => res.json())
            .then(setProjects)
            .finally(() => setIsLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Вы уверены, что хотите удалить этот проект?")) {
            try {
                await fetch(`/api/projects/${id}`, {
                    method: "DELETE",
                });
                setProjects(projects.filter((p) => p.id !== id));
                toast({
                    title: "Успех",
                    description: "Проект успешно удален",
                });
            } catch (error) {
                toast({
                    title: "Ошибка",
                    description: "Не удалось удалить проект",
                    variant: "destructive",
                });
            }
        }
    };

    const handleSave = async (project: Partial<Project>) => {
        const projectData = {
            ...project,
            stack: (project.stack || '').split(',').map(s => s.trim()),
        };

        try {
            if (project.id) {
                // Edit
                const response = await fetch(`/api/projects/${project.id}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(projectData),
                });
                const updatedProject = await response.json();
                setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
                toast({
                    title: "Успех",
                    description: "Проект успешно обновлен",
                });
            } else {
                // Add
                const response = await fetch("/api/projects", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(projectData),
                });
                const newProject = await response.json();
                setProjects([...projects, newProject]);
                toast({
                    title: "Успех",
                    description: "Проект успешно добавлен",
                });
            }
            setIsModalOpen(false);
            setEditingProject(null);
        } catch (error) {
            toast({
                title: "Ошибка",
                description: "Не удалось сохранить проект",
                variant: "destructive",
            });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Управление проектами</h1>
                <Button onClick={() => { setEditingProject({}); setIsModalOpen(true); }}>
                    <FiPlus className="mr-2"/>
                    Добавить проект
                </Button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-center">Загрузка...</td>
                                </tr>
                            ) : projects.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-center">Проектов не найдено.</td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">{project.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Button variant="outline" size="sm" className="mr-2" onClick={() => { setEditingProject(project); setIsModalOpen(true); }}>
                                                <FiEdit className="mr-1" /> Редактировать
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                                                <FiTrash2 className="mr-1" /> Удалить
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <ProjectForm project={editingProject} onSave={handleSave} onCancel={() => { setIsModalOpen(false); setEditingProject(null); }} />}
        </div>
    );
}
