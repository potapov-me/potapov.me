"use client";

import {useEffect, useState} from "react";
import {FiEdit, FiPlus, FiSave, FiTrash2, FiX} from "react-icons/fi";

interface Project {
    id: number;
    name: string;
    description: string;
    stack: string[];
    url?: string;
    repo?: string;
}

const ProjectForm = ({project, onSave, onCancel}: { project: Partial<Project> | null, onSave: (project: Partial<Project>) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState(project || {});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    
    const handleStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, stack: e.target.value.split(",").map(s => s.trim())});
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">{project?.id ? "Редактировать проект" : "Добавить проект"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Название</label>
                        <input type="text" name="name" id="name" value={formData.name || ""} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Описание</label>
                        <textarea name="description" id="description" value={formData.description || ""} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stack" className="block text-sm font-medium text-gray-700">Стек (через запятую)</label>
                        <input type="text" name="stack" id="stack" value={formData.stack?.join(", ") || ""} onChange={handleStackChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                        <input type="text" name="url" id="url" value={formData.url || ""} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="repo" className="block text-sm font-medium text-gray-700">Репозиторий</label>
                        <input type="text" name="repo" id="repo" value={formData.repo || ""} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onCancel} className="mr-4 px-4 py-2 rounded-md hover:bg-gray-100 flex items-center">
                            <FiX className="mr-2"/>
                            Отмена
                        </button>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark flex items-center">
                            <FiSave className="mr-2"/>
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then(setProjects);
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Вы уверены, что хотите удалить этот проект?")) {
            await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });
            setProjects(projects.filter((p) => p.id !== id));
        }
    };

    const handleSave = async (project: Partial<Project>) => {
        if (project.id) {
            // Edit
            const response = await fetch(`/api/projects/${project.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(project),
            });
            const updatedProject = await response.json();
            setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
        } else {
            // Add
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(project),
            });
            const newProject = await response.json();
            setProjects([...projects, newProject]);
        }
        setIsModalOpen(false);
        setEditingProject(null);
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-center">Админка проектов</h1>
            <div className="mt-8">
                <button onClick={() => { setEditingProject({}); setIsModalOpen(true); }} className="bg-primary text-white px-4 py-2 rounded-md mb-4 hover:bg-secondary flex items-center">
                    <FiPlus className="mr-2"/>
                    Добавить проект
                </button>
                <div className="overflow-x-auto mb-8">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Название</th>
                                <th className="py-2 px-4 border-b">Описание</th>
                                <th className="py-2 px-4 border-b">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td className="py-2 px-4 border-b">{project.name}</td>
                                    <td className="py-2 px-4 border-b">{project.description}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button onClick={() => { setEditingProject(project); setIsModalOpen(true); }} className="text-[var(--color-blue-500)] hover:underline mr-4 flex items-center">
                                            <FiEdit className="mr-1"/>
                                            Редактировать
                                        </button>
                                        <button onClick={() => handleDelete(project.id)} className="text-[var(--color-red-500)] hover:underline flex items-center">
                                            <FiTrash2 className="mr-1"/>
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <ProjectForm project={editingProject} onSave={handleSave} onCancel={() => { setIsModalOpen(false); setEditingProject(null); }} />}
        </div>
    );
}