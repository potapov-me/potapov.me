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
  const [formData, setFormData] = useState<Partial<TimelineItem>>(timelineItem || { title: '', description: '', link: '', isBlink: false, isStartup: false, lessons: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData(timelineItem || { title: '', description: '', link: '', isBlink: false, isStartup: false, lessons: '' });
    setErrors({}); // Clear errors on item change
  }, [timelineItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error when user types
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      year: Number(e.target.value),
    }));
    setErrors(prev => ({ ...prev, year: '' })); // Clear error when user types
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.year) {
      newErrors.year = 'Год обязателен.';
    } else if (formData.year < 1900 || formData.year > new Date().getFullYear()) {
      newErrors.year = `Год должен быть между 1900 и ${new Date().getFullYear()}.`;
    }
    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = 'Заголовок обязателен.';
    }
    if (!formData.description || formData.description.trim() === '') {
      newErrors.description = 'Описание обязательно.';
    }
    if (formData.link && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.link)) {
      newErrors.link = 'Введите корректный URL.';
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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-50 overflow-y-auto pt-10 md:items-center">
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
              className={`mt-1 block w-full border ${errors.year ? 'border-error' : 'border-gray-300'} rounded-md shadow-sm p-2`}
              required
            />
            {errors.year && <p className="text-error text-sm mt-1">{errors.year}</p>}
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Заголовок</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.title ? 'border-error' : 'border-gray-300'} rounded-md shadow-sm p-2`}
              required
            />
            {errors.title && <p className="text-error text-sm mt-1">{errors.title}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Описание</label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.description ? 'border-error' : 'border-gray-300'} rounded-md shadow-sm p-2`}
              rows={3}
              required
            ></textarea>
            {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
          </div>
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">Ссылка (необязательно)</label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link || ''}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.link ? 'border-error' : 'border-gray-300'} rounded-md shadow-sm p-2`}
            />
            {errors.link && <p className="text-error text-sm mt-1">{errors.link}</p>}
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
