'use client';

import { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

interface AnalyticsData {
  totalClicks: number;
  clicksPerDay: { date: string; count: number }[];
  topLinks: { id: string; slug: string; originalUrl: string; _count: { visits: number } }[];
  recentVisits: { id: string; timestamp: string; ipAddress: string | null; userAgent: string | null; shortUrl: { slug: string } }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/short-urls/analytics')
      .then((res) => res.json())
      .then((data) => {
        if(data.error) throw new Error(data.error);
        setData(data)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Загрузка аналитики...</div>;
  }

  if (!data) {
    return <div>Не удалось загрузить данные.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Аналитика ссылок</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего переходов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalClicks}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Переходы за последние 30 дней</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.clicksPerDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="Переходы" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Топ-5 ссылок</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ссылка</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Переходы</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.topLinks.map(link => (
                    <tr key={link.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">/{link.slug}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-500">{link._count.visits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Последние переходы</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ссылка</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Время</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User Agent</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.recentVisits.map(visit => (
                    <tr key={visit.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">/{visit.shortUrl.slug}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{new Date(visit.timestamp).toLocaleString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{visit.ipAddress ?? 'N/A'}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">{visit.userAgent ?? 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
