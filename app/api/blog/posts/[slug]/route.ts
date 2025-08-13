import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params:  Promise<{ slug: string }> }) {
  const awaitedParams = await params;
  const post = await prisma.post.findUnique({
    where: { slug: awaitedParams.slug },
  });
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}
