export default function Projects() {
    return (
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
    );
}