import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-[720px] px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--neutral-500)]">
        404
      </p>
      <h1 className="font-display mt-4 text-3xl font-bold text-[var(--primary)] md:text-4xl">
        Страница не найдена
      </h1>
      <p className="mt-4 text-[var(--neutral-700)]">
        Проверьте URL или вернитесь на главную.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
      >
        На главную
      </Link>
    </main>
  );
}
