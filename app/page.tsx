import Image from "next/image";

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
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="md:w-1/3">
                    <Image
                        src="/photo.jpg"
                        alt="Photo"
                        width={500}
                        height={500}
                        className="w-full h-auto rounded-lg"
                    />
                    <section className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Контакты</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <span className="font-bold mr-2">Email:</span>
                                <a href="mailto:constantin@potapov.me" className="text-primary hover:underline">constantin@potapov.me</a>
                            </li>
                            <li className="flex items-center">
                                <span className="font-bold mr-2">Telegram:</span>
                                <a href="https://t.me/potapov_me" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@potapov_me</a>
                            </li>
                            <li className="flex items-center">
                                <span className="font-bold mr-2">GitHub:</span>
                                <a href="https://github.com/potapov-me" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">potapov-me</a>
                            </li>
                            <li className="flex items-center">
                                <span className="font-bold mr-2">Телефон:</span>
                                <a href="tel:+79965916268" className="text-primary hover:underline">+7 996 591 62 68</a>
                            </li>
                        </ul>
                    </section>
                </aside>
                <div className="md:w-2/3">
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
                        <div className="flex items-start">
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
                    <div className="relative pl-8 border-l-2 border-primary">
                        <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full"></div>
                        <h3 className="text-xl font-bold">ATCS (2005)</h3>
                        <p className="mt-2">
                            Система проверки задач для турниров по спортивному программированию. Первый опыт в разработке
                            программного обеспечения.
                        </p>
                    </div>
                    <div className="relative pl-8 border-l-2 border-primary">
                        <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full"></div>
                        <h3 className="text-xl font-bold">Psy-Sound (2006)</h3>
                        <p className="mt-2">
                            Попробовал себя в shareware разработке. Создал редактор бинауральной музыки для медитации и
                            внедрения собственных установок.
                        </p>
                    </div>
                    <div className="relative pl-8 border-l-2 border-primary">
                        <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full"></div>
                        <h3 className="text-xl font-bold">U-Infinity (2007)</h3>
                        <p className="mt-2">
                            Мультиплатформенный P2P видеохостинг где пользователи могли обмениваться видеофайлами.
                            Вдохновленный торрентом, но с возможностью смотреть видео в реальном времени.
                            Проект был закрыт, но это был мой первый опыт
                            в разработке сложного программного обеспечения.
                        </p>
                    </div>
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
                            действительно работающее, что готовы покупать.
                        </p>
                    </div>
                    <div className="relative pl-8 border-l-2 border-primary">
                        <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full"></div>
                        <h3 className="text-xl font-bold">Социогенетика (2009)</h3>
                        <p className="mt-2">
                            Первый веб проект &quot;система которая делает сама себя по отзывам людей&quot;.
                            Было собрано очень теплое комьюнити из популярных в ту эпоху стартап тусовок.
                        </p>
                    </div>
                        <div className="space-y-10">
                            <div className="relative pl-8 border-l-2 border-primary">
                                <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full"></div>
                                <h3 className="text-xl font-bold">ATCS (2005)</h3>
                                <p className="mt-2">
                                    Система проверки задач для турниров по спортивному программированию. Первый опыт в разработке
                                    программного обеспечения.
                                </p>
                            </div>
                            <div className="relative pl-8 border-l-2 border-primary">
                                <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full"></div>
                                <h3 className="text-xl font-bold">Psy-Sound (2006)</h3>
                                <p className="mt-2">
                                    Попробовал себя в shareware разработке. Создал редактор бинауральной музыки для медитации и
                                    внедрения собственных установок.
                                </p>
                            </div>
                            <div className="relative pl-8 border-l-2 border-primary">
                                <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full"></div>
                                <h3 className="text-xl font-bold">U-Infinity (2007)</h3>
                                <p className="mt-2">
                                    Мультиплатформенный P2P видеохостинг где пользователи могли обмениваться видеофайлами.
                                    Вдохновленный торрентом, но с возможностью смотреть видео в реальном времени.
                                    Проект был закрыт, но это был мой первый опыт
                                    в разработке сложного программного обеспечения.
                                </p>
                            </div>
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
                                    действительно работающее, что готовы покупать.
                                </p>
                            </div>
                            <div className="relative pl-8 border-l-2 border-primary">
                                <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full"></div>
                                <h3 className="text-xl font-bold">Социогенетика (2009)</h3>
                                <p className="mt-2">
                                    Первый веб проект &quot;система которая делает сама себя по отзывам людей&quot;.
                                    Было собрано очень теплое комьюнити из популярных в ту эпоху стартап тусовок.
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
                    &quot;Прошел путь от чистого кода к пониманию: ценность создается на стыке технологий,
                    бизнес-модели и человеческих отношений&quot;
                </p>
            </section>
        </main>
    );
};
