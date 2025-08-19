import { redirect, notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

async function getIp(headersList: Headers) {
    return headersList.get('x-forwarded-for')?.split(',')[0] ||
        headersList.get('x-real-ip') ||
        headersList.get('cf-connecting-ip') ||
        '';
}

export default async function ShortUrlRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  // These are static pages, not short links
  const reservedSlugs = ['blog', 'contact', 'projects', 'admin', 'api'];
  if (reservedSlugs.includes(slug)) {
    notFound();
  }

  const shortUrl = await prisma.shortUrl.findUnique({
    where: { slug },
  });

  if (!shortUrl) {
    notFound();
  }

  const head = await headers()

  // Run analytics in the background
  prisma.urlVisit.create({
    data: {
      shortUrlId: shortUrl.id,
      ipAddress: await getIp(head),
      userAgent: head.get('user-agent'),
      referer: head.get('referer'),
    },
  }).catch(console.error); // Log errors but don't block the redirect

  redirect(shortUrl.originalUrl);
}
