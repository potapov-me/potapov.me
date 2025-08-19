import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalClicks = await prisma.urlVisit.count();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const clicksInLast30Days = await prisma.urlVisit.findMany({
        where: {
            timestamp: {
                gte: thirtyDaysAgo,
            },
        },
        select: {
            timestamp: true
        }
    });

    const dailyCounts = clicksInLast30Days.reduce((acc, visit) => {
        const date = visit.timestamp.toISOString().split('T')[0];
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date]++;
        return acc;
    }, {} as Record<string, number>);

    const formattedDailyCounts = Object.entries(dailyCounts).map(([date, count]) => ({
        date,
        count
    })).sort((a, b) => a.date.localeCompare(b.date));


    const topLinks = await prisma.shortUrl.findMany({
      take: 5,
      orderBy: {
        visits: {
          _count: 'desc',
        },
      },
      include: {
        _count: {
          select: { visits: true },
        },
      },
    });

    const recentVisits = await prisma.urlVisit.findMany({
      take: 10,
      orderBy: {
        timestamp: 'desc',
      },
      include: {
        shortUrl: {
          select: { slug: true },
        },
      },
    });

    return NextResponse.json({
      totalClicks,
      clicksPerDay: formattedDailyCounts,
      topLinks,
      recentVisits,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching analytics data' }, { status: 500 });
  }
}
