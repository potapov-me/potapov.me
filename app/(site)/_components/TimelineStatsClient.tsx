"use client";

import { TimelineProvider, useTimeline } from "@/app/contexts/TimelineContext";
import { getProjectWordForm } from "@/app/lib/utils";

function Stats() {
  const { timelineItems } = useTimeline();
  const startupsCount = timelineItems.filter((item) => item.isStartup).length;
  return <span>Реализовал {startupsCount} {getProjectWordForm(startupsCount)}</span>;
}

export default function TimelineStatsClient() {
  return (
    <TimelineProvider>
      <Stats />
    </TimelineProvider>
  );
}
