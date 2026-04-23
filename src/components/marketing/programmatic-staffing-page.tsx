import { CITIES, PROFESSIONS } from "@/content/professions-cities";

type ProfessionDef = (typeof PROFESSIONS)[number];
type CityDef = (typeof CITIES)[number];
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type Props = {
  profession: ProfessionDef;
  city: CityDef;
};

export function ProgrammaticStaffingPage({ profession, city }: Props) {
  return (
    <main id="main" className="pb-24">
      <section className="grain-dark relative overflow-hidden border-b border-[var(--neutral-200)] bg-[var(--primary-dark)] py-14 text-white lg:py-20">
        <div className="hero-ambient pointer-events-none absolute inset-0 opacity-75" />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">Программатика · МО</p>
          <h1 className="font-display mt-4 max-w-4xl text-balance text-3xl font-bold tracking-[-0.035em] md:text-5xl md:leading-[1.08]">
            Аутстаффинг {profession.titleRu} в {city.nameRu}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/78">
            Локальная посадочная под поиск и закупки: контекст региона, ссылка на расчёт и переход к соседним городам
            по той же профессии.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/kalkulyator?p=${profession.slug}&city=${city.slug}`}>Рассчитать вилку</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="border-white/25 bg-white/10 text-white hover:bg-white/15"
            >
              <Link href="/zayavka">Получить КП</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="type-headline">Что здесь будет развёрнуто редакцией</h2>
            <div className="type-editorial-dropcap type-body mt-6 space-y-4">
              <p>
                Таблица ориентиров по ставкам и сменности для {city.nameRu}, карта зоны выхода на объект, блок
                крупных работодателей региона и локальный FAQ с микроразметкой — стандартный набор для B2B-программатики
                «профессия × город».
              </p>
              <p>
                Сейчас страница отдаёт корректные мета-теги, ЧПУ и CTA в калькулятор с предзаполненными параметрами — чтобы
                не терять интент пользователя между поиском и заявкой.
              </p>
            </div>
          </div>
          <aside className="lg:col-span-5">
            <Card>
              <CardTitle className="text-lg">Быстрые действия</CardTitle>
              <CardDescription>Калькулятор и заявка уже ведут на нужный контекст.</CardDescription>
              <ul className="mt-6 space-y-3 text-sm text-[var(--neutral-700)]">
                <li className="flex gap-2">
                  <span className="font-mono-nums text-[var(--accent)]">01</span>
                  <Link className="font-medium text-[var(--accent)] hover:underline" href="/keysy">
                    Кейсы по отраслям
                  </Link>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono-nums text-[var(--accent)]">02</span>
                  <Link className="font-medium text-[var(--accent)] hover:underline" href="/uslugi/autstaffing">
                    Страница аутстаффинга
                  </Link>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono-nums text-[var(--accent)]">03</span>
                  <Link className="font-medium text-[var(--accent)] hover:underline" href={`/personal/${profession.slug}`}>
                    Другие города для профессии
                  </Link>
                </li>
              </ul>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
