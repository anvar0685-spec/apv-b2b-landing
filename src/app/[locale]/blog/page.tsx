import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { StubPage } from "@/components/marketing/stub-page";

export const metadata: Metadata = {
  title: "Блог — compliance, HR, аутстаффинг",
  description: "Гайды по миграционному учёту, оптимизации смен и подготовке к высокому сезону.",
};

const CATEGORIES = ["compliance", "hr", "optimizaciya", "migracionnyy-uchet"] as const;

export default function Page() {
  return (
    <StubPage title="Блог" description="Категории и статьи появятся из CMS/Prisma после контент-волны.">
      <ul className="space-y-2">
        {CATEGORIES.map((c) => (
          <li key={c}>
            <Link className="text-[var(--accent)] hover:underline" href={`/blog/category/${c}`}>
              {c}
            </Link>
          </li>
        ))}
      </ul>
    </StubPage>
  );
}
