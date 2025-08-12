import React from 'react';
import {TimelineItem} from "@/app/types";

export const TimelineItemComponent: React.FC<TimelineItem> = ({year, title, description, lessons, isBlink, isStartup}) => {
    return (
        <div className="relative pl-8 border-l-2 border-primary">
            <div className={`absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full ${isBlink ? 'animate-pulse' : ''}`}></div>
            <h3 className="text-xl font-heading font-bold">{title} {isStartup && '🚀'} <span className="text-gray-500 text-sm">({year})</span></h3>
            <p className="mt-2" dangerouslySetInnerHTML={{ __html: description }}></p>
            {lessons && (
                <div className="mt-4 rounded-xl p-4 border border-primary/30 bg-primary/5">
                    <p className="font-medium text-primary" dangerouslySetInnerHTML={{ __html: `"${lessons}"` }}></p>
                </div>
            )}
        </div>
    );
};