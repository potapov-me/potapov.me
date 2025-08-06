export default function Home() {
    return (
        <main className="max-w-5xl mx-auto px-6 pb-20">
            {/* Блок "Обо мне" */}
            <section className="mb-16">
                <p className="text-lg leading-relaxed">
                    <span className="font-bold">{new Date().getFullYear() - 1988} лет</span>, из которых более 20 посвящено разработке программного обеспечения.
                </p>

                <div className="flex items-start">
                    <div className="bg-primary bg-texture text-white p-4 flex-1 rounded-lg shadow-md">
                        <h3 className="font-bold mb-2">Образование</h3>
                        <p>Уральский государственный технический университет (УГТУ-УПИ)</p>
                        <p className="text-sm text-white mt-1">Выпуск 2010 года, физико-технический
                            факультет</p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6 text-center">Профессиональная эволюция</h2>

                <div className="space-y-10">
                    <div className="relative pl-8 border-l-2 border-primary">
                        <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full"></div>
                        <h3 className="text-xl font-bold">MultiGaminator (2008)</h3>
                        <p className="mt-2">
                            Как фрилансер разработал сначала сервер управления для казино и зала игровых автоматов, а затем
                            и сами игровые автоматы. Первые большие для студента деньги, но и первые серьезные
                            ошибки. Каждая из 38 известных мне интеграций была продана от 1,2м рублей,
                            не считая доп модулей, но я как разработчик получил крохи.
                            Справедливости ради, для казино бизнеса нужен не только софт, но и связи в криминале. 
                            Это было очень вдохновляющее время, когда я впервые увидел, что могу создавать что-то
                            действительно сложное и полезное.
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