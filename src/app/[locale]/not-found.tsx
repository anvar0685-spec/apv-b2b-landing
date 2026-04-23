import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="border-b border-[var(--neutral-200)] bg-[var(--surface)] pb-24 pt-16 md:pt-24">
      <div className="mx-auto max-w-[720px] px-4 text-center sm:px-6">
        <p className="type-kicker">Ошибка маршрута</p>
        <p className="font-mono-nums mt-4 text-6xl font-bold tabular-nums tracking-tighter text-[var(--accent)] md:text-7xl">
          404
        </p>
        <h1 className="font-display mt-6 text-3xl font-bold tracking-tight text-[var(--primary)] md:text-4xl">
          Страница не найдена
        </h1>
        <p className="type-body mx-auto mt-5 max-w-md">
          Адрес устарел, страница перенесена или набрана с опечаткой. Проверьте ссылку или воспользуйтесь разделами ниже.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">На главную</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/uslugi">Услуги</Link>
          </Button>
        </div>
        <p className="mt-12 text-xs text-[var(--neutral-500)]">
          <Link className="text-[var(--accent)] underline-offset-4 hover:underline" href="/sitemap">
            Карта сайта
          </Link>
        </p>
      </div>
    </main>
  );
}
