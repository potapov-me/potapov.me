import {IconType} from 'react-icons';
import Link from "next/link";

export interface Skill {
    name: string;
    url: string;
    hideName?: boolean;
    icon: IconType;
}

export interface SkillCategory {
    category: string;
    items: Skill[];
}

interface SkillsProps {
    skills: SkillCategory[];
}

export const Skills = ({skills}: SkillsProps) => {
    return (
        <section className="my-8 not-prose">
            <div className="space-y-4">
                {skills.map((category, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-heading mb-2 text-primary">{category.category}</h3>
                        <ul className="flex flex-wrap gap-2.5">
                            {category.items.map((skill, skillIndex) => (
                                <li key={skillIndex} title={skill.name} className="flex items-center card-elevated py-1.5 px-2.5">
                                    <Link
                                      href={skill.url}
                                      title={skill.name}
                                      target="_blank"
                                      rel="nofollow noopener noreferrer"
                                    >
                                        <skill.icon className="text-xl text-secondary"/>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};