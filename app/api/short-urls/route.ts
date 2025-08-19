import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const shortUrls = await prisma.shortUrl.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(shortUrls);
  } catch {
    return NextResponse.json({ error: 'Error fetching short URLs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { slug, originalUrl } = data;

    const shortUrl = await prisma.shortUrl.create({
      data: {
        slug,
        originalUrl,
      },
    });

    return NextResponse.json(shortUrl, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creating short URL' }, { status: 500 });
  }
}
