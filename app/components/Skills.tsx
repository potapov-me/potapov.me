import {IconType} from 'react-icons';

export interface Skill {
    name: string;
    hideName?: boolean;
    icon?: IconType;
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
        <section className="my-8">
            <div className="space-y-4">
                {skills.map((category, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-heading mb-2 text-primary">{category.category}</h3>
                        <ul className="flex flex-wrap gap-2.5">
                            {category.items.map((skill, skillIndex) => (
                                <li key={skillIndex} title={skill.name} className="flex items-center card-elevated py-1.5 px-2.5">
                                    {skill.icon && <skill.icon className="text-xl text-secondary"/>}
                                    {!skill.hideName && <span className={skill.icon && 'ml-1.5'}>{skill.name}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};