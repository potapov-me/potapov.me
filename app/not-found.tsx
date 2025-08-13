import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <>
      <main className="max-w-4xl mx-auto py-16 px-6 text-center">
        <div className="glass rounded-2xl p-10 shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <Image src="/logo.svg" alt="logo" fill className="opacity-80" />
            </div>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary">404</h1>
          <p className="mt-3 text-secondary text-lg">Страница не найдена</p>
          <p className="mt-2 text-sm text-gray-500">Возможно, ссылка устарела или страница была перемещена.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link prefetch={false} href="/" className="px-4 py-2 rounded-full bg-primary bg-texture text-white">На главную</Link>
            <Link prefetch={false} href="/blog" className="px-4 py-2 rounded-full hover:bg-gray-100 text-secondary">В блог</Link>
            <Link prefetch={false} href="/projects" className="px-4 py-2 rounded-full hover:bg-gray-100 text-secondary">Проекты</Link>
          </div>
        </div>
      </main>
    </>
  );
}
