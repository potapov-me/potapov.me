import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const awaitedParams = await params;
    const post = await prisma.post.findUnique({
      where: { id: awaitedParams.id },
    });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }>  }) {
  try {
    const awaitedParams = await params;
    const data = await request.json();
    const { title, content, slug, coverImage, published } = data;

    const post = await prisma.post.update({
      where: { id: awaitedParams.id },
      data: {
        title,
        content,
        slug,
        coverImage,
        published,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }>  }) {
  try {
    const awaitedParams = await params;
    await prisma.post.delete({
      where: { id: awaitedParams.id },
    });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}
