export default function Home() {
    return (
        <main className="max-w-5xl mx-auto px-6 pb-20">
            {/* Блок "Обо мне" */}
            <section className="my-16">
                <h2 className="text-3xl font-bold mb-6 text-center">Мой путь</h2>
                <div className="bg-white shadow-lg p-8">
                    <div className="space-y-6">
                        <p className="text-lg leading-relaxed">
                            <span className="font-bold">{new Date().getFullYear() - 1988} лет</span>, из которых более 20 посвящено программированию.
                            Моя профессиональная история — это постоянный поиск баланса между техническим мастерством
                            и предпринимательским видением.
                        </p>

                        <div className="flex items-start">
                            <div className="bg-primary bg-texture text-white rounded-lg p-4 flex-1">
                                <h3 className="font-bold mb-2">Образование</h3>
                                <p>Уральский государственный технический университет (УГТУ-УПИ)</p>
                                <p className="text-sm text-white mt-1">Выпуск 2010 года, физико-технический
                                    факультет</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6 text-center">Профессиональная эволюция</h2>

                <div className="space-y-10">
                    {/* Этап 1 */}
                    <div className="relative pl-8 border-l-2 border-primary">
                        <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full"></div>
                        <h3 className="text-xl font-bold">Раннее предпринимательство (2008)</h3>
                        <p className="mt-2">
                            Создал бизнес-структуру с друзьями фрилансерами.
                            Получил бесценный опыт разработки сложных проектов и коллаборации.
                        </p>
                    </div>

                    {/* Этап 2 */}
                    <div className="relative pl-8 border-l-2 border-primary">
                        <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full"></div>
                        <h3 className="text-xl font-bold">Самостоятельная попытка (2012)</h3>
                        <p className="mt-2">
                            После расхождения с партнерами пробовал построить бизнес самостоятельно. <br/>
                            <span className="font-semibold text-red-600"> Ключевые уроки:</span> отсутствие навыков
                            продаж
                            и ошибки в финансовой модели привели к закрытию проекта.
                        </p>
                    </div>

                    {/* Этап 3 */}
                    <div className="relative pl-8 border-l-2 border-primary">
                        <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full"></div>
                        <h3 className="text-xl font-bold">Карьера в найме (10 лет)</h3>
                        <p className="mt-2">
                            Сфокусировался на глубоком освоении инженерного мастерства. Прошел путь от разработчика
                            до ведущего технического специалиста. Наработал экспертизу в построении сложных систем.
                        </p>
                    </div>

                    {/* Текущий этап */}
                    <div className="relative pl-8 border-l-2 border-primary">
                        <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                        <h3 className="text-xl font-bold">Текущий этап: трансформация</h3>
                        <p className="mt-2">
                            Интегрирую техническую экспертизу с новоприобретенными бизнес-навыками.
                            Ищу модели, где могу создавать продукты, сочетающие технологическую инновационность
                            и устойчивую бизнес-составляющую.
                        </p>
                        <div className="mt-4 bg-green-50 rounded-lg p-4 border border-primary">
                            <p className="font-medium text-primary">
                                &quot;Извлеченные уроки: Техническое совершенство ≠ бизнес-успех.
                                Сейчас фокусируюсь на целостном подходе к созданию ценности.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Философия */}
            <section className=" bg-secondary p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Моя философия развития</h2>
                <p className="mb-3 text-indigo-100">
                    • Технологии — инструмент, а не цель<br/>
                    • Ошибки — обязательная часть роста<br/>
                    • Устойчивость важнее скорости<br/>
                    • Баланс между инновациями и практичностью<br/>
                </p>
                <p className="mt-4 font-light italic">
                    &quot;Прошел путь от чистого кода к пониманию: ценность создается на стыке технологий,
                    бизнес-модели и человеческих отношений&quot;
                </p>
            </section>
        </main>
    );
};