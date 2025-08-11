import React from 'react';

export interface TimelineItemProps {
    year: number;
    title: string;
    description: string;
    lessons?: string;
    isBlink?: boolean;
    isStartup?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({year, title, description, lessons, isBlink, isStartup}) => {
    return (
        <div className="relative pl-8 border-l-2 border-primary">
            <div
                className={`absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full ${isBlink ? 'animate-pulse' : ''}`}></div>
            <h3 className="text-xl font-bold">{title} {isStartup && '🚀'} <span className="text-gray-500 text-sm">({year})</span></h3>
            <p className="mt-2">{description}</p>
            {lessons && (
                <div className="mt-4 bg-green-50 rounded-lg p-4 border border-primary">
                    <p className="font-medium text-primary">
                        &quot;{lessons}&quot;
                    </p>
                </div>
            )}
        </div>
    );
};