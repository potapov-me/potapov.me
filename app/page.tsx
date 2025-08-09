import Projects from "./components/Projects";

export default function Home() {
    const philosophy = [
        "аналитическое мышление", 
        "надежность", 
        "рациональность", 
        "установка на рост", 
        "ориентация на результат", 
    ];

    return (
        <main className="max-w-5xl mx-auto px-6 pb-20">
            {/* Блок "Обо мне" */}
            <section className="mb-16">
                <p className="text-lg leading-relaxed">
                    <span className="font-bold">{new Date().getFullYear() - 1988} лет</span>, из которых более 20 посвящено разработке программного обеспечения.
                </p>

                <div className="flex items-start">
                    <div className="bg-primary bg-texture text-white p-4 flex-1 rounded-lg shadow-md">
                        <p>Уральский государственный технический университет (УГТУ-УПИ)</p>
                        <p className="text-sm text-white mt-1">Выпуск 2010 года, физико-технический
                            факультет, кафедра молекулярной физики</p>
                    </div>
                </div>
            </section>

            <Projects />

            {/* Философия */}
            <section className=" bg-secondary p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Моя философия развития</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {philosophy.map((item, index) => (
                        <li key={index} className="transition-colors hover:text-blue-600">{item}</li>
                    ))}
                </ul>
                <p className="mt-4 font-light italic">
                    &quot;Прошел путь от чистого кода к пониманию: ценность создается на стыке технологий,
                    бизнес-модели и человеческих отношений&quot;
                </p>
            </section>
        </main>
    );
};