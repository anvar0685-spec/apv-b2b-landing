import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SERVICE_SCOPE_ITEMS } from "@/content/service-scope";
import { getTranslations } from "next-intl/server";
import { ClipboardList, FileCheck, RefreshCw, TableProperties, Headset } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [ClipboardList, FileCheck, RefreshCw, TableProperties, Headset];

export async function HomeServiceScope() {
  const t = await getTranslations("homePage.serviceScope");

  return (
    <section
      id="service-scope"
      className="border-y border-[var(--neutral-200)] bg-[var(--card)] py-20 lg:py-28"
      data-speakable
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">{t("kicker")}</p>
        <h2 className="font-display mt-3 max-w-3xl text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--neutral-700)]">{t("lead")}</p>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_SCOPE_ITEMS.map((item, i) => {
            const Icon = ICONS[i] ?? ClipboardList;
            return (
              <Card
                key={item.title}
                className="border-[var(--neutral-200)] bg-[var(--surface)] shadow-[var(--card-shadow)] lg:last:col-span-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--accent)]/25 bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] text-[var(--accent)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <CardTitle className="mt-4 text-lg">{item.title}</CardTitle>
                <CardDescription className="mt-2 text-base leading-relaxed">{item.body}</CardDescription>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
