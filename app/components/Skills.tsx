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
                        <h4 className="text-lg font-semibold mb-2 text-primary">{category.category}</h4>
                        <ul className="flex flex-wrap gap-4">
                            {category.items.map((skill, skillIndex) => (
                                <li key={skillIndex} title={skill.name} className="flex items-center bg-white py-2 px-4 rounded-lg shadow-sm">
                                    {skill.icon && <skill.icon className="text-2xl"/>}
                                    {!skill.hideName && <span className={skill.icon && 'ml-3'}>{skill.name}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};