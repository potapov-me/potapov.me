"use client";

import {useEffect, useState} from "react";
import {FiEdit, FiPlus, FiSave, FiTrash2, FiX} from "react-icons/fi";

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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setFormData(project || {name: '', description: '', stack: '', icon: ''});
        setErrors({}); // Clear errors on project change
    }, [project]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors(prev => ({ ...prev, [name]: '' })); // Clear error when user types
    };
    
    const handleStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, stack: e.target.value});
        setErrors(prev => ({ ...prev, stack: '' })); // Clear error when user types
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name || formData.name.trim() === '') {
            newErrors.name = 'Название обязательно.';
        }
        if (!formData.description || formData.description.trim() === '') {
            newErrors.description = 'Описание обязательно.';
        }
        if (!formData.stack || formData.stack.trim() === '') {
            newErrors.stack = 'Стек обязателен.';
        }
        if (!formData.icon || formData.icon.trim() === '') {
            newErrors.icon = 'Иконка обязательна.';
        }
        if (formData.url && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.url)) {
            newErrors.url = 'Введите корректный URL.';
        }
        if (formData.repo && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.repo)) {
            newErrors.repo = 'Введите корректный URL.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">{project?.id ? "Редактировать проект" : "Добавить проект"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Название</label>
                        <input type="text" name="name" id="name" value={formData.name || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-error' : 'border-gray-300'} rounded-md shadow-sm`} required />
                        {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Описание</label>
                        <textarea name="description" id="description" value={formData.description || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-error' : 'border-gray-300'} rounded-md shadow-sm`} required />
                        {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stack" className="block text-sm font-medium text-gray-700">Стек (через запятую)</label>
                        <input type="text" name="stack" id="stack" value={formData.stack || ""} onChange={handleStackChange} className={`mt-1 block w-full px-3 py-2 border ${errors.stack ? 'border-error' : 'border-gray-300'} rounded-md shadow-sm`} required />
                        {errors.stack && <p className="text-error text-sm mt-1">{errors.stack}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Иконка</label>
                        <input type="text" name="icon" id="icon" value={formData.icon || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border ${errors.icon ? 'border-error' : 'border-gray-300'} rounded-md shadow-sm`} required />
                        {errors.icon && <p className="text-error text-sm mt-1">{errors.icon}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                        <input type="text" name="url" id="url" value={formData.url || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border ${errors.url ? 'border-error' : 'border-gray-300'} rounded-md shadow-sm`} />
                        {errors.url && <p className="text-error text-sm mt-1">{errors.url}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="repo" className="block text-sm font-medium text-gray-700">Репозиторий</label>
                        <input type="text" name="repo" id="repo" value={formData.repo || ""} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border ${errors.repo ? 'border-error' : 'border-gray-300'} rounded-md shadow-sm`} />
                        {errors.repo && <p className="text-error text-sm mt-1">{errors.repo}</p>}
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

    const handleDelete = async (id: string) => {
        if (window.confirm("Вы уверены, что хотите удалить этот проект?")) {
            await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });
            setProjects(projects.filter((p) => p.id !== id));
        }
    };

    const handleSave = async (project: Partial<Project>) => {
        const projectData = {
            ...project,
            stack: (project.stack || '').split(',').map(s => s.trim()),
        };

        if (project.id) {
            // Edit
            const response = await fetch(`/api/projects/${project.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(projectData),
            });
            const updatedProject = await response.json();
            setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
        } else {
            // Add
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(projectData),
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
                                    <td className="py-2 px-4">{project.name}</td>
                                    <td className="py-2 px-4">{project.description}</td>
                                    <td className="py-2 px-4 flex">
                                        <button key={`${project.id}-edit`} type="button" title="Edit project" onClick={() => {
                                            setEditingProject(project);
                                            setIsModalOpen(true);
                                            }} className="text-secondary hover:text-white hover:bg-secondary mr-4 p-4 flex items-center">
                                            <FiEdit />
                                        </button>
                                        <button key={`${project.id}-delete`} type="button" title="Delete project" onClick={() => handleDelete(project.id)} className="text-primary hover:text-white hover:bg-primary p-4 flex items-center">
                                            <FiTrash2 />
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