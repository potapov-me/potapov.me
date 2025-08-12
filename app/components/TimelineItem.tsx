import React from 'react';
import {TimelineItem} from "@/app/types";

export const TimelineItemComponent: React.FC<TimelineItem> = ({year, title, description, lessons, isBlink, isStartup}) => {
    return (
        <div className="relative pl-6 border-l border-primary">
            <div className={`absolute -left-2.5 top-0 w-5 h-5 bg-primary rounded-full ${isBlink ? 'animate-pulse' : ''}`}></div>
            <h3 className="text-lg md:text-xl font-heading font-semibold">{title} {isStartup && '🚀'} <span className="text-gray-500 text-sm">({year})</span></h3>
            <p className="mt-1.5" dangerouslySetInnerHTML={{ __html: description }}></p>
            {lessons && (
                <div className="mt-3 rounded-lg p-3 border border-primary/20 bg-primary/5">
                    <p className="font-medium text-primary" dangerouslySetInnerHTML={{ __html: `"${lessons}"` }}></p>
                </div>
            )}
        </div>
    );
};