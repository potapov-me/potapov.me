'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiSave, FiX } from 'react-icons/fi';
import { TimelineItem } from '@/app/types';

interface TimelineFormProps {
  timelineItem: Partial<TimelineItem> | null;
  onSave: (item: Partial<TimelineItem>) => void;
  onCancel: () => void;
}

export default function TimelineForm({ timelineItem, onSave, onCancel }: TimelineFormProps) {
  const [formData, setFormData] = useState<Partial<TimelineItem>>(timelineItem || { title: '', description: '', link: '', isBlink: false, isStartup: false });

  useEffect(() => {
    setFormData(timelineItem || { title: '', description: '', link: '', isBlink: false, isStartup: false });
  }, [timelineItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      year: Number(e.target.value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{timelineItem?.id ? 'Редактировать Запись' : 'Добавить Новую Запись'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">Год</label>
            <input
              type="number"
              id="year"
              name="year"
              min="1900"
              max={Number(new Date().getFullYear())}
              title='Введите год'
              value={formData.year || ''}
              onChange={handleYearChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Заголовок</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Описание</label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows={3}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">Ссылка (необязательно)</label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="lessons" className="block text-sm font-medium text-gray-700">Уроки (необязательно)</label>
            <textarea
              id="lessons"
              name="lessons"
              value={formData.lessons || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows={3}
            ></textarea>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isBlink"
              name="isBlink"
              checked={formData.isBlink || false}
              onChange={handleChange}
              className="h-4 w-4 text-primary border-gray-300 rounded"
            />
            <label htmlFor="isBlink" className="text-sm font-medium text-gray-700">Мигает (isBlink)</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isStartup"
              name="isStartup"
              checked={formData.isStartup || false}
              onChange={handleChange}
              className="h-4 w-4 text-primary border-gray-300 rounded"
            />
            <label htmlFor="isStartup" className="text-sm font-medium text-gray-700">Стартап (isStartup)</label>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-md hover:bg-gray-100 flex items-center"
            >
              <FiX className="mr-2"/>
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 flex items-center bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              {timelineItem?.id ? <FiSave className="mr-2"/> : <FiPlus className="mr-2"/> }
              {timelineItem?.id ? 'Сохранить' : 'Добавить Запись'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
