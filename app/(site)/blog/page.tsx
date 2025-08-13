'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  published: boolean;
  publishedAt: string;
}

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data: Post[]) => setPosts(data.filter((p: Post) => p.published)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="font-heading text-4xl md:text-5xl font-bold my-4 text-primary text-center">Блог</h1>
      {isLoading ? (
        <p className="text-center">Загрузка...</p>
      ) : posts.length === 0 ? (
        <p className="text-center">Пока нет ни одного поста.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="block group glass rounded-lg overflow-hidden hover:shadow-sm transition-transform-300 hover:-translate-y-0.5 p-6">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title} width={400} height={225} className="object-cover w-full h-full" />
                  ) : (
                    <div className="w-full h-full bg-gray-200"></div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-primary group-hover:underline">{post.title}</h2>
                <p className="mt-2 text-sm text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
