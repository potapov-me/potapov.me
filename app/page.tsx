
export default function Home() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
        {/* Герой-секция */}
        <header className="py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Константин Потапов
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Разработчик · Предприниматель · Ищущий изменения
            </p>
            <div className="inline-flex items-center bg-gray-200 rounded-full px-4 py-2 text-sm">
              <span className="w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse"></span>
              В процессе профессиональной трансформации
            </div>
          </div>
        </header>

        {/* Основной контент */}
        <main className="max-w-5xl mx-auto px-6 pb-20">
          {/* Блок "Обо мне" */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Мой путь</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  <span className="font-bold">37 лет</span>, из которых более 20 посвящено программированию.
                  Моя профессиональная история — это постоянный поиск баланса между техническим мастерством
                  и предпринимательским видением.
                </p>

                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-lg p-4 flex-1">
                    <h3 className="font-bold text-indigo-800 mb-2">Образование</h3>
                    <p>Уральский государственный технический университет (УГТУ-УПИ)</p>
                    <p className="text-sm text-gray-600 mt-1">Выпуск 2010 года, физико-технический факультет</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Блок опыта */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Профессиональная эволюция</h2>

            <div className="space-y-10">
              {/* Этап 1 */}
              <div className="relative pl-8 border-l-2 border-indigo-200">
                <div className="absolute -left-2 top-0 w-6 h-6 bg-indigo-500 rounded-full"></div>
                <h3 className="text-xl font-bold">Раннее предпринимательство (2008)</h3>
                <p className="mt-2 text-gray-700">
                  Создал бизнес-структуру с друзьями фрилансерами.
                  Получил бесценный опыт разработки сложных проектов и коллаборации.
                </p>
              </div>

              {/* Этап 2 */}
              <div className="relative pl-8 border-l-2 border-indigo-200">
                <div className="absolute -left-2 top-0 w-6 h-6 bg-red-500 rounded-full"></div>
                <h3 className="text-xl font-bold">Самостоятельная попытка (2012)</h3>
                <p className="mt-2 text-gray-700">
                  После расхождения с партнерами пробовал построить бизнес самостоятельно. <br/>
                  <span className="font-semibold text-red-600"> Ключевые уроки:</span> отсутствие навыков продаж
                  и ошибки в финансовой модели привели к закрытию проекта.
                </p>
              </div>

              {/* Этап 3 */}
              <div className="relative pl-8 border-l-2 border-indigo-200">
                <div className="absolute -left-2 top-0 w-6 h-6 bg-blue-500 rounded-full"></div>
                <h3 className="text-xl font-bold">Карьера в найме (10 лет)</h3>
                <p className="mt-2 text-gray-700">
                  Сфокусировался на глубоком освоении инженерного мастерства. Прошел путь от разработчика
                  до ведущего технического специалиста. Наработал экспертизу в построении сложных систем.
                </p>
              </div>

              {/* Текущий этап */}
              <div className="relative pl-8 border-l-2 border-indigo-200">
                <div className="absolute -left-2 top-0 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold">Текущий этап: трансформация</h3>
                <p className="mt-2 text-gray-700">
                  Интегрирую техническую экспертизу с новоприобретенными бизнес-навыками.
                  Ищу модели, где могу создавать продукты, сочетающие технологическую инновационность
                  и устойчивую бизнес-составляющую.
                </p>
                <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="font-medium text-green-800">
                    &quot;Извлеченные уроки: Техническое совершенство ≠ бизнес-успех.
                    Сейчас фокусируюсь на целостном подходе к созданию ценности.&quot;
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Философия */}
          <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
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

        {/* Футер */}
        <footer className="bg-gray-800 text-gray-300 py-10 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-white">Константин Потапов</h3>
                <p>Инженерный подход к проектам</p>
              </div>
              <div className="flex space-x-4">
                <a href="https://t.me/potapov_me" target="_blank" className="hover:text-white transition-colors">Telegram</a>
                <a href="https://github.com/potapov-me" target="_blank" className="hover:text-white transition-colors">GitHub</a>
                <a href="mailto:constantin@potapov.me" target="_blank" className="hover:text-white transition-colors">Email</a>
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Все права защищены. История продолжается...
            </div>
          </div>
        </footer>
      </div>
  );
};