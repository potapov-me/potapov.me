"use client";

import { TimelineItemComponent } from "@/app/components/TimelineItem";
import { TimelineProvider, useTimeline } from "@/app/contexts/TimelineContext";

function TimelineList() {
  const { timelineItems } = useTimeline();
  return (
    <div className="space-y-10">
      {timelineItems.map((item, index) => (
        <TimelineItemComponent
          key={index}
          id={item.id}
          year={item.year}
          title={item.title}
          description={item.description}
          lessons={item.lessons}
          isBlink={item.isBlink}
          isStartup={item.isStartup}
        />
      ))}
    </div>
  );
}

export default function TimelineClient() {
  return (
    <section className="mb-16 below-fold">
      <h2 className="font-heading text-3xl font-bold mb-6 text-center">Профессиональная эволюция</h2>
      <TimelineProvider>
        <TimelineList />
      </TimelineProvider>
    </section>
  );
}
