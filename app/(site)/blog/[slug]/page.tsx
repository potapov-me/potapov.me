import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/app/components/ui/Breadcrumbs';
import Image from 'next/image';
import { prisma } from '@/app/lib/db';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params;
  const post = await prisma.post.findUnique({
    where: { slug: awaitedParams.slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Главная', href: '/' },
    { label: 'Блог', href: '/blog' },
    { label: post.title },
  ];

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="text-center my-8">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">{post.title}</h1>
        {post.publishedAt && (
          <p className="mt-2 text-sm text-gray-500">Опубликовано {new Date(post.publishedAt).toLocaleDateString()}</p>
        )}
      </div>
      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={630}
          className="w-full h-auto rounded-lg mb-8"
        />
      )}
      <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
