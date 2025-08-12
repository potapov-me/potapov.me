'use client';

import { useState, useEffect } from 'react';
import { FiEdit, FiPlus, FiSave, FiTrash2, FiX } from 'react-icons/fi';
import { TimelineItem } from '@/app/types';
import TimelineForm from './components/TimelineForm';

export default function AdminTimelinePage() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTimelineItem, setEditingTimelineItem] = useState<Partial<TimelineItem> | null>(null);

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    const res = await fetch('/api/timeline');
    if (res.ok) {
      const data = await res.json();
      setTimeline(data);
    } else {
      console.error('Failed to fetch timeline');
    }
  };

  const handleSave = async (item: Partial<TimelineItem>) => {
    if (item.id) {
      // Edit
      const res = await fetch(`/api/timeline/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        fetchTimeline();
      } else {
        console.error('Failed to update timeline item');
      }
    } else {
      // Add
      const res = await fetch('/api/timeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        fetchTimeline();
      } else {
        console.error('Failed to add timeline item');
      }
    }
    setIsModalOpen(false);
    setEditingTimelineItem(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingTimelineItem(null);
  };

  const handleDeleteClick = async (id: string) => {
    if (confirm('Are you sure you want to delete this timeline item?')) {
      const res = await fetch(`/api/timeline/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchTimeline();
      } else {
        console.error('Failed to delete timeline item');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Управление Таймлайном</h1>

      <button
        onClick={() => { setEditingTimelineItem({}); setIsModalOpen(true); }}
        className="bg-primary text-white px-4 py-2 rounded-md mb-4 hover:bg-primary-dark flex items-center"
      >
        <FiPlus className="mr-2"/>
        Добавить Запись
      </button>

      <h2 className="text-xl font-semibold mb-2">Записи таймлайна</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Год</th>
              <th className="py-2 px-4 border-b text-left">Заголовок</th>
              <th className="py-2 px-4 border-b text-left">Описание</th>
              <th className="py-2 px-4 border-b text-left">Ссылка</th>
              <th className="py-2 px-4 border-b text-left">Действия</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((item) => (
              <tr key={item.id} className="hover:bg-primary-light">
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">{item.year}</td>
                <td className="py-2 px-4">{item.title}</td>
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Link
                    </a>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="py-2 px-4 space-x-2 flex">
                  <button
                    role="button"
                    title='редактировать'
                    onClick={() => { setEditingTimelineItem(item); setIsModalOpen(true); }}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                  >
                    <FiEdit />
                  </button>
                  <button
                    role="button"
                    title='удалить'
                    onClick={() => handleDeleteClick(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <TimelineForm
          timelineItem={editingTimelineItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}