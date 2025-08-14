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
        <div className="space-y-12">
          {posts.map((post, index) => (
            <div key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <div className="block group">
                  <div className="md:flex items-start">
                    {post.coverImage && (
                      <div className="md:w-1/3 mr-8 mb-4 md:mb-0">
                        <Image src={post.coverImage} alt={post.title} width={400} height={225} className="object-cover w-full h-full rounded-lg group-hover:opacity-90 transition-opacity duration-300" />
                      </div>
                    )}
                    <div className={post.coverImage ? "md:w-2/3" : ""}>
                      <h2 className="text-2xl font-bold text-primary group-hover:underline">{post.title}</h2>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{new Date(post.publishedAt).toLocaleDateString()}</p>
                      {/* You can add a short excerpt here if you have it in your data */}
                      {/* <p className="mt-4 text-gray-700 dark:text-gray-300">{post.excerpt}</p> */}
                    </div>
                  </div>
                </div>
              </Link>
              {index < posts.length - 1 && <hr className="my-12 border-gray-200 dark:border-gray-700" />} 
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
