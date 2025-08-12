"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TimelineItem } from "@/app/types";

interface TimelineContextType {
  timelineItems: TimelineItem[];
  isLoading: boolean;
  error: Error | null;
  addTimelineItem: (item: Omit<TimelineItem, "id">) => Promise<void>;
  updateTimelineItem: (id: string, item: Partial<TimelineItem>) => Promise<void>;
  deleteTimelineItem: (id: string) => Promise<void>;
  refetchTimeline: () => Promise<void>;
}

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export const TimelineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTimeline = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/timeline");
      if (!response.ok) {
        throw new Error("Failed to fetch timeline data");
      }
      const data = await response.json();
      setTimelineItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const addTimelineItem = async (item: Omit<TimelineItem, "id">) => {
    try {
      const response = await fetch("/api/timeline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Failed to add timeline item");
      }

      const newItem = await response.json();
      setTimelineItems((prev) => [...prev, newItem]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    }
  };

  const updateTimelineItem = async (id: string, item: Partial<TimelineItem>) => {
    try {
      const response = await fetch(`/api/timeline/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Failed to update timeline item");
      }

      const updatedItem = await response.json();
      setTimelineItems((prev) =>
        prev.map((i) => (i.id === id ? updatedItem : i))
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    }
  };

  const deleteTimelineItem = async (id: string) => {
    try {
      const response = await fetch(`/api/timeline/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete timeline item");
      }

      setTimelineItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  const value = {
    timelineItems,
    isLoading,
    error,
    addTimelineItem,
    updateTimelineItem,
    deleteTimelineItem,
    refetchTimeline: fetchTimeline,
  };

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error("useTimeline must be used within a TimelineProvider");
  }
  return context;
};