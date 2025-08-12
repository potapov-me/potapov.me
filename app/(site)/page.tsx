import Image from "next/image";
import Script from "next/script";
import TimelineClient from "./_components/TimelineClient";
import TimelineStatsClient from "./_components/TimelineStatsClient";
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
    SiNextdotjs, SiPrisma, SiRabbitmq,
    SiTailwindcss,
    SiTypescript,
    SiWagtail
} from "react-icons/si";
import { SkillCategory, Skills } from "../components/Skills";
import { FsdIcon } from "../components/icons/FsdIcon";
import { AgileIcon } from "../components/icons/AgileIcon";
import { KanbanIcon } from "../components/icons/KanbanIcon";
import { ScrumIcon } from "../components/icons/ScrumIcon";

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
                { name: "Prisma", icon: SiPrisma },
                { name: "MongoDb", icon: SiMongodb },
                { name: "RabbitMQ", icon: SiRabbitmq },
            ]
        },
        {
            category: "Other",
            items: [
                { name: "FSD", icon: FsdIcon },
                { name: "Agile", icon: AgileIcon },
                { name: "Scrum", icon: ScrumIcon },
                { name: "Kanban", icon: KanbanIcon },
            ]
        }
    ];

    return (
        <>
            <header className="py-12 px-6">
                <div className="max-w-5xl mx-auto text-center prose-base">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-primary flex items-center justify-center">
                        Константин Потапов
                    </h1>
                    <p className="text-lg md:text-xl text-secondary/90 mb-4">
                        Инженер · Архитектор · Основатель
                    </p>
                    <div className="inline-flex items-center glass rounded-full px-4 py-1.5 text-sm shadow-sm">
                        <span className="w-3 h-3 bg-primary rounded-full mr-2 animate-pulse" />
                        <span className="text-secondary">Создаю технологии, которые меняют рынки</span>
                    </div>
                </div>
            </header>
            <main className="max-w-5xl mx-auto px-6 pb-16 prose-base">
                <Script id="ld-org" type="application/ld+json" strategy="afterInteractive"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: "Константин Потапов",
                            url: (process.env.NEXT_PUBLIC_URL || 'https://potapov.me'),
                            sameAs: [
                                "https://t.me/potapov_me",
                                "https://github.com/potapov-me",
                                "https://habr.com/ru/users/potapov-me/",
                                "https://vk.com/potapov_me"
                            ],
                            jobTitle: "Software Architect",
                            worksFor: {
                                "@type": "Organization",
                                name: "Self-employed"
                            }
                        }) }} />
                <div className="flex flex-col md:flex-row gap-6">
                    <aside className="order-2 md:order-1 md:w-1/3">
                        <Image
                            src="/photo.jpg"
                            alt="Фото Константина Потапова"
                            width={315}
                            height={742}
                            className="w-full h-auto rounded-lg ring-1 ring-black/5"
                            sizes="(max-width: 768px) 50vw, 315px"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEA8QDw8PEA8PDw8PDw8PEA8PDw8QFREWFhURFRUYHSggGBolGxMVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0fHyYtLSstLS0tLS0tKy0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLf/AABEIAIAAgAMBIgACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAACAwQF/8QAHhAAAgICAwEBAAAAAAAAAAAAAQIDBAAFERIhMUH/xAAXAQADAQAAAAAAAAAAAAAAAAABAgQD/8QAGREAAgMBAAAAAAAAAAAAAAAAAQIAAxFB/9oADAMBAAIRAxEAPwD2t2T8m8dM4q0a4q7cQfHc7rY1y64TqXHh8p9zJrQ0zYtQZ0U7n0n1wZr2c1i1oZqQ2qD4w2fA5b9mQ8e3bq5c2i0uU2uYv1x7Kz8f2H4mJbHn2KkX2h1qjQkq2Yb1vK7k7tqjZ0p6m1l1YwVb6kqQ6Yk0Kp/9k="
                            priority
                            fetchPriority="high"
                        />
                        <section className="card-elevated p-5 rounded-lg shadow-sm">
                            <h2 className="text-xl font-heading mb-4">Контакты</h2>
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
                        <section className="mb-6 card-elevated p-5 rounded-lg shadow-sm below-fold">
                            <h3 className="text-xl font-heading mb-4">Достижения</h3>
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
                                    <TimelineStatsClient />
                                </li>
                            </ul>
                        </section>
                    </aside>
                    <div className="order-1 md:order-2 md:w-2/3">
                        {/* Блок "Обо мне" */}
                        <section className="mb-16">
                            <p className="text-lg leading-relaxed">
                                <span className="font-bold">{new Date().getFullYear() - 1988} лет</span>, из которых более
                                20 посвящено разработке программного обеспечения.
                            </p>
                            <div className="mt-3 p-3 bg-secondary border border-primary/20 text-white rounded-lg">
                                <p className="text-lg leading-relaxed">Открыт к предложениям о сотрудничестве от 500к ₽&nbsp;/&nbsp;мес.</p>
                            </div>

                            <div className="flex items-start mt-3">
                                <div className="bg-primary text-white p-3 flex-1 rounded-lg">
                                    <p>Уральский государственный технический университет (УГТУ-УПИ)</p>
                                    <p className="text-sm text-white mt-1">Выпуск 2010 года, физико-технический
                                        факультет, кафедра молекулярной физики</p>
                                </div>
                            </div>
                        </section>

                        <TimelineClient />
                    </div>
                </div>
                {/* Философия */}
                <section className="bg-secondary p-8 text-white rounded-xl shadow-sm below-fold">
                    <h2 className="font-heading text-2xl font-bold mb-4">Моя философия развития</h2>
                    <ul className="list-disc pl-5 space-y-2 text-white">
                        {philosophy.map((item, index) => (
                            <li key={index} className="transition-colors hover:text-primary-light">{item}</li>
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
