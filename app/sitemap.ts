import type { MetadataRoute } from 'next';
import { prisma } from '@/app/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://potapov.me';

  const staticRoutes = ['', '/blog', '/contact', '/projects'].map((path) => ({
    url: `${baseUrl}${path || '/'}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}