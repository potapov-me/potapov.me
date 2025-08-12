import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const timelineFilePath = path.join(process.cwd(), 'data', 'timeline.json');

import { TimelineItem } from '../../../types';

function readTimeline(): TimelineItem[] {
  const data = fs.readFileSync(timelineFilePath, 'utf-8');
  return JSON.parse(data);
}

function writeTimeline(timeline: TimelineItem[]) {
  fs.writeFileSync(timelineFilePath, JSON.stringify(timeline, null, 2), 'utf-8');
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const timeline = readTimeline();
    const timelineItem = timeline.find((item: TimelineItem) => item.id === id);

    if (!timelineItem) {
      return NextResponse.json({ message: 'Timeline item not found' }, { status: 404 });
    }
    return NextResponse.json(timelineItem);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading timeline item' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const updatedItem: TimelineItem = await req.json();
    const timeline = readTimeline();

    const index = timeline.findIndex((item: TimelineItem) => item.id === id);

    if (index === -1) {
      return NextResponse.json({ message: 'Timeline item not found' }, { status: 404 });
    }

    timeline[index] = { ...timeline[index], ...updatedItem, id }; // Ensure ID remains the same
    writeTimeline(timeline);
    return NextResponse.json(timeline[index]);
  } catch (error) {
    console.error('Error updating timeline item:', error);
    return NextResponse.json({ message: 'Error updating timeline item' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    let timeline = readTimeline();

    const initialLength = timeline.length;
    timeline = timeline.filter((item: TimelineItem) => item.id !== id);

    if (timeline.length === initialLength) {
      return NextResponse.json({ message: 'Timeline item not found' }, { status: 404 });
    }

    writeTimeline(timeline);
    return NextResponse.json({ message: 'Timeline item deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting timeline item:', error);
    return NextResponse.json({ message: 'Error deleting timeline item' }, { status: 500 });
  }
}
