"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";
import type { ThankYouLetterItem } from "@/content/thank-you-letters";
import { THANK_YOU_LETTERS } from "@/content/thank-you-letters";
import { cn } from "@/lib/utils";

type Props = {
  items?: ThankYouLetterItem[];
};

export function ThankYouLettersGallery({ items = THANK_YOU_LETTERS }: Props) {
  const t = useTranslations("homePage.sections");
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<ThankYouLetterItem | null>(null);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setActive(null);
  }, []);

  const open = useCallback((item: ThankYouLetterItem) => {
    setActive(item);
    queueMicrotask(() => {
      dialogRef.current?.showModal();
    });
  }, []);

  const list = items.length ? items : THANK_YOU_LETTERS;

  return (
    <>
      <section
        id="letters"
        className="relative overflow-hidden border-y border-[var(--neutral-200)] bg-gradient-to-b from-[var(--surface)] via-[var(--card)]/40 to-[var(--surface)] py-24 md:py-32 lg:py-40"
        aria-labelledby="letters-heading"
      >
        <div
          className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[color-mix(in_srgb,var(--primary)_8%,transparent)] blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{t("lettersKicker")}</p>
            <h2
              id="letters-heading"
              className="font-display mt-3 max-w-3xl text-3xl font-bold tracking-[-0.035em] text-[var(--primary)] md:text-[2.625rem] md:leading-[1.12]"
            >
              {t("lettersTitle")}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--neutral-700)] md:text-lg">{t("lettersLead")}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--neutral-500)]">{t("lettersZoomHint")}</p>
          </motion.div>

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-2xl border border-[var(--neutral-200)]/95 bg-[var(--card)] shadow-[var(--card-shadow)]",
                  "ring-1 ring-black/[0.03] transition-[box-shadow,transform,border-color] duration-300",
                  "hover:-translate-y-1 hover:border-[var(--accent)]/35 hover:shadow-[0_24px_48px_-16px_rgba(7,21,37,0.18),0_0_0_1px_rgba(0,0,0,0.04)] motion-reduce:transform-none dark:border-white/10 dark:ring-white/[0.05]",
                )}
              >
                <button
                  type="button"
                  onClick={() => open(item)}
                  className="relative block w-full cursor-zoom-in overflow-hidden bg-[var(--neutral-200)]/30 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)]"
                  aria-label={`${t("lettersOpenLabel")}: ${item.alt}`}
                >
                  <span className="pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-white/40 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" aria-hidden />
                    {t("lettersOpenShort")}
                  </span>
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={item.imageSrc}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
                      priority={idx === 0}
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent opacity-70"
                      aria-hidden
                    />
                  </div>
                </button>
                <div className="border-t border-[var(--neutral-200)]/80 px-5 py-4 dark:border-white/10">
                  <p className="text-sm leading-relaxed text-[var(--neutral-700)]">{item.caption}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-[var(--neutral-500)]">{t("lettersNote")}</p>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="max-h-[96vh] w-[min(96vw,1100px)] overflow-hidden rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-0 text-[var(--primary)] shadow-2xl dark:border-white/15 dark:bg-[color-mix(in_srgb,var(--primary-dark)_94%,black)] [&::backdrop]:bg-black/65 [&::backdrop]:backdrop-blur-[2px]"
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--neutral-200)] px-4 py-3 dark:border-white/10">
          <p className="min-w-0 truncate text-sm font-medium text-[var(--neutral-700)] dark:text-slate-200">{active?.caption}</p>
          <button
            type="button"
            onClick={close}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[var(--neutral-200)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--primary)] transition hover:border-[var(--accent)] dark:border-white/15 dark:bg-white/5 dark:text-white"
          >
            <X className="h-4 w-4" aria-hidden />
            {t("lettersCloseLabel")}
          </button>
        </div>
        {active ? (
          <div className="flex max-h-[min(84vh,920px)] w-full items-center justify-center overflow-auto bg-[#0b1220] p-3 sm:p-5">
            <div className="relative inline-block max-h-full max-w-full">
              <Image
                src={active.imageSrc}
                alt={active.alt}
                width={1200}
                height={1600}
                className="max-h-[min(78vh,880px)] w-auto max-w-full object-contain"
                sizes="(max-width: 1100px) 96vw, 1100px"
                priority
              />
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
