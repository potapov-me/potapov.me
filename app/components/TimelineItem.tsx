import React from 'react';
import { TimelineItem } from "@/app/types";
import { FiExternalLink } from 'react-icons/fi';

export const TimelineItemComponent: React.FC<TimelineItem> = ({ year, title, description, lessons, isBlink, isStartup, link }) => {
    const titleContent = (
        <>
            {title} {isStartup && '🚀'} <span className="text-secondary text-sm">({year})</span>
            {link && <FiExternalLink className="inline-block ml-2 text-primary" />}
        </>
    );

    return (
        <div className="relative pl-6 border-l border-primary">
            <div className={`absolute -left-2.5 top-0 w-5 h-5 bg-primary rounded-full ${isBlink ? 'animate-pulse' : ''}`}></div>
            <h3 className="text-lg md:text-xl font-heading font-semibold">
                {link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-2xl">
                        {titleContent}
                    </a>
                ) : (
                    titleContent
                )}
            </h3>
            <p className="mt-1.5 not-prose" dangerouslySetInnerHTML={{ __html: description }}></p>
            {lessons && (
                <div className="mt-3 rounded-lg p-3 border border-primary/20 bg-primary/5 not-prose">
                    <p className="font-medium text-primary" dangerouslySetInnerHTML={{ __html: `${lessons}` }}></p>
                </div>
            )}
        </div>
    );
};