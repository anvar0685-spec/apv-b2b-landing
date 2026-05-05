"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const list = items.length ? items : THANK_YOU_LETTERS;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const active = openIdx !== null ? list[openIdx] ?? null : null;

  const close = useCallback(() => {
    dialogRef.current?.close();
    setOpenIdx(null);
  }, []);

  const openAt = useCallback(
    (idx: number) => {
      setOpenIdx(idx);
      queueMicrotask(() => dialogRef.current?.showModal());
    },
    [],
  );

  const go = useCallback(
    (delta: number) => {
      setOpenIdx((i) => {
        if (i === null) return null;
        const n = list.length;
        return (i + delta + n) % n;
      });
    },
    [list.length],
  );

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, go]);

  return (
    <>
      <section
        id="letters"
        className="relative overflow-hidden"
        aria-labelledby="letters-heading"
      >
        {/* Мастхед в тон финальному CTA главной: тёмная плита + grain */}
        <div className="grain-dark relative border-t border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[var(--primary-dark)] px-4 pb-28 pt-16 text-white sm:px-6 md:pb-32 md:pt-20 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_-20%,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_65%)] opacity-90" aria-hidden />
          <div className="relative mx-auto max-w-[1280px]">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                {t("lettersKicker")}
              </p>
              <h2
                id="letters-heading"
                className="font-display mt-4 text-balance text-3xl font-bold tracking-[-0.035em] md:text-[2.625rem] md:leading-[1.12]"
              >
                {t("lettersTitle")}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/78 md:text-lg md:leading-relaxed">
                {t("lettersLead")}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/48">{t("lettersZoomHint")}</p>
            </motion.div>
          </div>
        </div>

        {/* Светлая «витрина архива» — перекрывает мастхед, как дорогой музейный модуль */}
        <div className="relative z-[1] -mt-16 px-4 sm:px-6 lg:px-8">
          <div className="letters-gallery-canopy relative mx-auto max-w-[1280px] overflow-hidden rounded-[1.75rem] border border-[var(--neutral-200)] bg-[var(--card)] shadow-[0_32px_80px_-24px_rgba(7,21,37,0.18),0_0_0_1px_rgba(7,21,37,0.04)] dark:border-white/10 dark:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
              aria-hidden
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    -12deg,
                    transparent,
                    transparent 72px,
                    color-mix(in srgb, var(--accent) 7%, transparent) 72px,
                    transparent 73px
                  )`,
              }}
            />
            <div className="relative px-5 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12 lg:px-12 lg:pb-16 lg:pt-14">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                {list.map((item, idx) => {
                  const isFeatured = idx === 0;
                  return (
                    <motion.article
                      key={item.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.45,
                        delay: reduceMotion ? 0 : idx * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn(
                        "letters-archive-frame group flex min-h-0 flex-col",
                        isFeatured ? "lg:col-span-7" : "lg:col-span-5",
                        idx === 1 ? "lg:col-start-8 lg:row-start-1" : "",
                        idx === 2 ? "lg:col-span-12 lg:mt-2" : "",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => openAt(idx)}
                        className={cn(
                          "letters-archive-trigger relative block w-full overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--neutral-200)_92%,var(--accent))] bg-[linear-gradient(165deg,var(--surface)_0%,var(--card)_48%,color-mix(in_srgb,var(--accent)_6%,var(--card))_100%)] text-left shadow-inner outline-none ring-black/[0.04] transition-[transform,box-shadow,border-color] duration-500 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)] dark:border-white/12 dark:ring-white/[0.06]",
                          "hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_42%,var(--neutral-200))] hover:shadow-[0_28px_56px_-18px_rgba(7,21,37,0.22)] motion-reduce:transform-none",
                          isFeatured ? "lg:flex lg:min-h-[320px] lg:flex-row" : "",
                        )}
                        aria-label={`${t("lettersOpenLabel")}: ${item.alt}`}
                      >
                        {isFeatured ? (
                          <span className="pointer-events-none absolute left-5 top-5 z-[2] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                            {t("lettersFeatured")}
                          </span>
                        ) : null}
                        <span className="pointer-events-none absolute right-4 top-4 z-[2] flex items-center gap-1.5 rounded-full border border-white/35 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                          <Maximize2 className="h-3.5 w-3.5" aria-hidden />
                          {t("lettersOpenShort")}
                        </span>
                        <div
                          className={cn(
                            "relative bg-[color-mix(in_srgb,var(--neutral-200)_35%,var(--surface))] dark:bg-white/[0.06]",
                            isFeatured ? "aspect-[4/5] w-full lg:aspect-auto lg:w-[58%] lg:min-h-[280px]" : "aspect-[3/4] w-full",
                          )}
                        >
                          <Image
                            src={item.imageSrc}
                            alt={item.alt}
                            fill
                            sizes={
                              isFeatured
                                ? "(max-width: 1024px) 100vw, 58vw"
                                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            }
                            className="object-cover object-top transition-transform duration-[520ms] ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                            priority={idx === 0}
                          />
                          <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent opacity-80"
                            aria-hidden
                          />
                          {/* Тиснение «бумаги» */}
                          <div
                            className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply dark:opacity-[0.22] dark:mix-blend-soft-light"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.55'/%3E%3C/svg%3E")`,
                            }}
                            aria-hidden
                          />
                        </div>
                        <div
                          className={cn(
                            "flex flex-1 flex-col justify-center border-[var(--neutral-200)] p-6 dark:border-white/10",
                            isFeatured ? "border-t lg:border-l lg:border-t-0 lg:py-8 lg:pl-10 lg:pr-8" : "border-t",
                          )}
                        >
                          <p className="font-display text-lg font-semibold leading-snug tracking-tight text-[var(--primary)] md:text-xl dark:text-white">
                            {item.caption}
                          </p>
                          <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
                            {String(idx + 1).padStart(2, "0")} · scan
                          </p>
                        </div>
                      </button>
                    </motion.article>
                  );
                })}
              </div>

              <p className="relative mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-[var(--neutral-500)] md:text-sm">
                {t("lettersNote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="letters-lightbox max-h-[96vh] w-[min(96vw,1180px)] overflow-hidden rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-0 text-[var(--primary)] shadow-[0_40px_100px_-24px_rgba(0,0,0,0.55)] dark:border-white/15 dark:bg-[color-mix(in_srgb,var(--primary-dark)_96%,black)] [&::backdrop]:bg-black/75 [&::backdrop]:backdrop-blur-sm"
        onClose={() => setOpenIdx(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--neutral-200)] px-4 py-3 dark:border-white/10 sm:px-5">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <p className="min-w-0 truncate text-sm font-medium text-[var(--neutral-700)] dark:text-slate-200">
              {active?.caption}
            </p>
            {openIdx !== null ? (
              <span className="hidden shrink-0 rounded-full border border-[var(--neutral-200)] bg-[var(--surface)] px-2.5 py-0.5 font-mono-nums text-[11px] font-semibold tabular-nums text-[var(--neutral-500)] dark:border-white/15 dark:bg-white/5 dark:text-white/55 sm:inline-block">
                {openIdx + 1}/{list.length}
              </span>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="inline-flex items-center gap-1 rounded-lg border border-[var(--neutral-200)] bg-[var(--surface)] px-2.5 py-2 text-xs font-semibold text-[var(--primary)] transition hover:border-[var(--accent)] dark:border-white/15 dark:bg-white/5 dark:text-white"
              aria-label={t("lettersPrev")}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">{t("lettersPrev")}</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex items-center gap-1 rounded-lg border border-[var(--neutral-200)] bg-[var(--surface)] px-2.5 py-2 text-xs font-semibold text-[var(--primary)] transition hover:border-[var(--accent)] dark:border-white/15 dark:bg-white/5 dark:text-white"
              aria-label={t("lettersNext")}
            >
              <span className="hidden sm:inline">{t("lettersNext")}</span>
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={close}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[var(--neutral-200)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--primary)] transition hover:border-[var(--accent)] dark:border-white/15 dark:bg-white/5 dark:text-white"
            >
              <X className="h-4 w-4" aria-hidden />
              {t("lettersCloseLabel")}
            </button>
          </div>
        </div>
        {active ? (
          <div className="flex max-h-[min(84vh,940px)] w-full items-center justify-center overflow-auto bg-[#060b14] p-3 sm:p-6">
            <div className="relative inline-block max-h-full max-w-full">
              <Image
                src={active.imageSrc}
                alt={active.alt}
                width={1400}
                height={1800}
                className="max-h-[min(78vh,900px)] w-auto max-w-full object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)]"
                sizes="(max-width: 1180px) 96vw, 1180px"
                priority
              />
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
