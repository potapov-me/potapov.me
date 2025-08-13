import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, content, slug, coverImage, published } = data;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        coverImage,
        published,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}
