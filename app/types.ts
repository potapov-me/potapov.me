export interface Project {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: string;
  stack: string;
  repo?: string;
}

export interface TimelineItem {
  id: string;
  year: number;
  title: string;
  description: string;
  link?: string;
  lessons?: string;
  isBlink?: boolean;
  isStartup?: boolean;
}
