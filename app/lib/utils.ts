import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getProjectWordForm = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'стартап-проектов';
  }

  if (lastDigit === 1) {
    return 'стартап-проект';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'стартап-проекта';
  }

  return 'стартап-проектов';
};
