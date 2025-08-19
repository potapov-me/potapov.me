import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }) {
    try {
        const awaitedParams = await params
        const shortUrl = await prisma.shortUrl.findUnique({
            where: {id: awaitedParams.id},
            include: {visits: true},
        });
        if (!shortUrl) {
            return NextResponse.json({error: 'Short URL not found'}, {status: 404});
        }
        return NextResponse.json(shortUrl);
    } catch {
        return NextResponse.json({error: 'Error fetching short URL'}, {status: 500});
    }
}

export async function PUT(request: Request, {params}: { params: Promise<{ id: string }> }) {
    try {
        const awaitedParams = await params
        const data = await request.json();
        const {slug, originalUrl} = data;

        const shortUrl = await prisma.shortUrl.update({
            where: {id: awaitedParams.id},
            data: {
                slug,
                originalUrl,
            },
        });

        return NextResponse.json(shortUrl);
    } catch {
        return NextResponse.json({error: 'Error updating short URL'}, {status: 500});
    }
}

export async function DELETE(request: Request, {params}: { params: Promise<{ id: string }> }) {
    try {
        const awaitedParams = await params
        // First, delete all associated visits to avoid foreign key constraint errors
        await prisma.urlVisit.deleteMany({
            where: {shortUrlId: awaitedParams.id},
        });

        // Then, delete the short URL itself
        await prisma.shortUrl.delete({
            where: {id: awaitedParams.id},
        });

        return new NextResponse(null, {status: 204});
    } catch (e) {
        console.error(e);
        return NextResponse.json({error: 'Error deleting short URL'}, {status: 500});
    }
}
