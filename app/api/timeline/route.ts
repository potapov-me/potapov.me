import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { TimelineItem } from "@/app/types";

const timelineFilePath = path.join(process.cwd(), "data", "timeline.json");

function readTimeline(): TimelineItem[] {
  const data = fs.readFileSync(timelineFilePath, "utf-8");
  return JSON.parse(data);
}

function writeTimeline(timeline: TimelineItem[]) {
  fs.writeFileSync(
    timelineFilePath,
    JSON.stringify(timeline, null, 2),
    "utf-8"
  );
}

export async function GET(req: NextRequest) {
  try {
    const timeline = readTimeline();
    return NextResponse.json(timeline);
  } catch (error) {
    return NextResponse.json(
      { message: "Error reading timeline data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const newTimelineItem: Omit<TimelineItem, "id"> = await req.json();
    const timeline = readTimeline();

    // Assign a new ID (simple increment for demonstration)
    const newId = (
      timeline.length > 0
        ? Math.max(...timeline.map((item: TimelineItem) => parseInt(item.id))) +
          1
        : 1
    ).toString();
    const timelineItemWithId: TimelineItem = { ...newTimelineItem, id: newId };

    timeline.push(timelineItemWithId);
    writeTimeline(timeline);
    return NextResponse.json(timelineItemWithId, { status: 201 });
  } catch (error) {
    console.error("Error adding timeline item:", error);
    return NextResponse.json(
      { message: "Error adding timeline item" },
      { status: 500 }
    );
  }
}
