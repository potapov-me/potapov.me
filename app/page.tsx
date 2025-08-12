'use client';

import Image from "next/image";
import {TimelineItemComponent} from "./components/TimelineItem";
import {
    FaDocker,
    FaGitAlt,
    FaLinux,
    FaPython,
    FaReact,
    FaVuejs,
} from "react-icons/fa";
import {
    SiDjango,
    SiFastapi,
    SiGo,
    SiJavascript, SiMongodb,
    SiMysql,
    SiNextdotjs, SiRabbitmq,
    SiTailwindcss,
    SiTypescript,
    SiWagtail
} from "react-icons/si";
import { SkillCategory, Skills } from "./components/Skills";
import { useState, useEffect } from 'react';
import {TimelineItem, TimelineItem as TimelineItemType} from './types';


export default function Home() {
    const philosophy = [
        "аналитическое мышление",
        "надежность",
        "рациональность",
        "установка на рост",
        "ориентация на результат",
    ];

    const skills: SkillCategory[] = [
        {
            category: "Backend",
            items: [
                { name: "Python", icon: FaPython },
                { name: "Django", icon: SiDjango },
                { name: "FastAPI", icon: SiFastapi },
                { name: "Go", icon: SiGo },
                { name: "Wagtail", icon: SiWagtail },
                { name: "NextJS", icon: SiNextdotjs },
            ]
        },
        {
            category: "Frontend",
            items: [
                { name: "React", icon: FaReact, hideName: true },
                { name: "VueJS", icon: FaVuejs, hideName: true },
                { name: "JS", icon: SiJavascript, hideName: true },
                { name: "TypeScript", icon: SiTypescript, hideName: true },
                { name: "Tailwind", icon: SiTailwindcss },
            ]
        },
        {
            category: "DevOps & Databases",
            items: [
                { name: "Docker", icon: FaDocker },
                { name: "Linux", icon: FaLinux },
                { name: "Git", icon: FaGitAlt },
                { name: "MySQL", icon: SiMysql },
                // {name: "Postgres", icon: SiPostgresql},
                { name: "MongoDb", icon: SiMongodb },
                { name: "RabbitMQ", icon: SiRabbitmq },
            ]
        },
        {
            category: "Other",
            items: [
                { name: "FSD" },
                { name: "Agile" },
                { name: "Scrum" },
                { name: "Kanban" },
            ]
        }
    ];

    const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);

    useEffect(() => {
        const fetchTimeline = async () => {
            const res = await fetch('/api/timeline');
            if (res.ok) {
                const data: TimelineItemType[] = await res.json();
                const formattedData = data.map((item: TimelineItemType) => ({
                    ...item,
                    year: item.year,
                }));
                // Sort by year
                formattedData.sort((a, b) => a.year - b.year);
                setTimelineData(formattedData);
            } else {
                console.error('Failed to fetch timeline data');
            }
        };
        fetchTimeline();
    }, []);

    return (
        <>
            <header className="py-16 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                        Константин Потапов
                    </h1>
                    <p className="text-xl text-secondary mb-6">
                        Инженер · Предприниматель · Архитектор
                    </p>
                    <div className="inline-flex items-center bg-primary bg-texture text-white rounded-full px-4 py-2 text-sm">
                        <span className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></span>
                        <span>Инженерный подход к проектам</span>
                    </div>
                </div>
            </header>
            <main className="max-w-5xl mx-auto px-6 pb-20">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="md:w-1/3">
                        <Image
                            src="/photo.jpg"
                            alt="Photo"
                            width={315}
                            height={742}
                            className="w-full h-auto rounded-lg"
                        />
                        <section className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">Контакты</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <span className="font-bold mr-2">Email:</span>
                                    <a href="mailto:constantin@potapov.me"
                                        className="text-primary hover:underline">constantin@potapov.me</a>
                                </li>
                                <li className="flex items-center">
                                    <span className="font-bold mr-2">Telegram:</span>
                                    <a href="https://t.me/potapov_me" target="_blank" rel="noopener noreferrer"
                                        className="text-primary hover:underline">@potapov_me</a>
                                </li>
                                <li className="flex items-center">
                                    <span className="font-bold mr-2">GitHub:</span>
                                    <a href="https://github.com/potapov-me" target="_blank" rel="noopener noreferrer"
                                        className="text-primary hover:underline">potapov-me</a>
                                </li>
                                <li className="flex items-center">
                                    <span className="font-bold mr-2">Телефон:</span>
                                    <a href="tel:+79965916268" className="text-primary hover:underline">+7 996 591 62 68</a>
                                </li>
                            </ul>
                        </section>
                        <Skills skills={skills} />
                        <section className="mb-8 bg-gray-100 p-6">
                            <h3 className="text-xl font-bold mb-4">Достижения</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <span className="text-2xl mr-3">🏆</span>
                                    <span>Достижение 1</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-2xl mr-3">🥇</span>
                                    <span>Достижение 2</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-2xl mr-3">🚀</span>
                                    <span>Реализовал {timelineData.filter(item => item.isStartup).length} стартап‑проектов</span>
                                </li>
                            </ul>
                        </section>
                    </aside>
                    <div className="md:w-2/3">
                        {/* Блок "Обо мне" */}
                        <section className="mb-16">
                            <p className="text-lg leading-relaxed">
                                <span className="font-bold">{new Date().getFullYear() - 1988} лет</span>, из которых более
                                20 посвящено разработке программного обеспечения.
                            </p>
                            <div className="mt-4 p-4 bg-secondary border border-primary text-white rounded-lg">
                                <p className="text-lg leading-relaxed">Открыт к предложениям о работе от 500к ₽&nbsp;/&nbsp;мес.</p>
                            </div>

                            <div className="flex items-start mt-4">
                                <div className="bg-primary bg-texture text-white p-4 flex-1 rounded-lg shadow-md">
                                    <p>Уральский государственный технический университет (УГТУ-УПИ)</p>
                                    <p className="text-sm text-white mt-1">Выпуск 2010 года, физико-технический
                                        факультет, кафедра молекулярной физики</p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-16">
                            <h2 className="text-3xl font-bold mb-6 text-center">Профессиональная эволюция</h2>
                            <div className="space-y-10">
                                {timelineData.map((item, index) => (
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
                        </section>
                    </div>
                </div>
                {/* Философия */}
                <section className=" bg-secondary p-8 text-white">
                    <h2 className="text-2xl font-bold mb-4">Моя философия развития</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {philosophy.map((item, index) => (
                            <li key={index} className="transition-colors hover:text-blue-600">{item}</li>
                        ))}
                    </ul>
                    <p className="mt-4 font-light italic">
                        &ldquo;Прошел путь от чистого кода к пониманию: ценность создается на стыке технологий,
                        бизнес-модели и человеческих отношений&ldquo;
                    </p>
                </section>
            </main>
        </>
    );
}
