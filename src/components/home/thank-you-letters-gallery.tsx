"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ThankYouLetterItem } from "@/content/thank-you-letters";
import { THANK_YOU_LETTERS } from "@/content/thank-you-letters";
import { cn } from "@/lib/utils";

function isRasterPublicImage(src: string) {
  return !/\.svg($|[?#])/i.test(src);
}

type Props = {
  items?: ThankYouLetterItem[];
};

export function ThankYouLettersGallery({ items = THANK_YOU_LETTERS }: Props) {
  const t = useTranslations("homePage.sections");
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const list = items.length ? items : THANK_YOU_LETTERS;
  const [idx, setIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const active = list[idx] ?? list[0];

  const close = useCallback(() => {
    dialogRef.current?.close();
    setLightboxOpen(false);
  }, []);

  const openLightbox = useCallback(() => {
    setLightboxOpen(true);
    queueMicrotask(() => dialogRef.current?.showModal());
  }, []);

  const step = useCallback(
    (delta: number) => {
      const n = list.length;
      setIdx((i) => (i + delta + n) % n);
    },
    [list.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") close();
        if (e.key === "ArrowRight") {
          e.preventDefault();
          step(1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          step(-1);
        }
        return;
      }
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("[data-letters-viewer]")) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          step(1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          step(-1);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, step, close]);

  return (
    <>
      <section id="letters" className="relative overflow-hidden" aria-labelledby="letters-heading">
        <div className="grain-dark relative border-t border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-gradient-to-b from-[var(--hero-operational-top)] to-[var(--hero-operational-bottom)] px-4 pb-24 pt-16 text-white sm:px-6 md:pb-28 md:pt-20 lg:px-8">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_-20%,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_65%)] opacity-90"
            aria-hidden
          />
          <div className="relative mx-auto max-w-[1280px]">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-soft)]">{t("lettersKicker")}</p>
              <h2
                id="letters-heading"
                className="font-display mt-4 text-balance text-3xl font-bold tracking-[-0.035em] md:text-[2.625rem] md:leading-[1.12]"
              >
                {t("lettersTitle")}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/78 md:text-lg md:leading-relaxed">{t("lettersLead")}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/48">{t("lettersZoomHint")}</p>
            </motion.div>
          </div>
        </div>

        <div className="relative z-[1] -mt-14 px-4 sm:-mt-16 sm:px-6 lg:px-8">
          <div
            data-letters-viewer
            tabIndex={0}
            className="letters-viewer-ring relative mx-auto max-w-[min(100%,720px)] rounded-[1.35rem] border border-[var(--neutral-200)] bg-[var(--card)] p-4 shadow-[0_28px_70px_-28px_rgba(7,21,37,0.28),0_0_0_1px_rgba(7,21,37,0.05)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] dark:border-white/12 dark:shadow-[0_36px_90px_-36px_rgba(0,0,0,0.75)] sm:p-5"
            aria-roledescription="carousel"
            aria-label={t("lettersTitle")}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.35rem] opacity-[0.28] dark:opacity-[0.18]"
              aria-hidden
              style={{
                backgroundImage: `repeating-linear-gradient(-14deg, transparent, transparent 56px, color-mix(in srgb, var(--accent) 8%, transparent) 56px, transparent 57px)`,
              }}
            />

            <div className="relative flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="interactive-hover-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--neutral-200)] bg-[var(--surface)] text-[var(--primary)] shadow-sm transition hover:border-[var(--accent)] dark:border-white/12 dark:bg-white/5 dark:text-white"
                aria-label={t("lettersPrev")}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>

              <div className="group relative min-h-[min(52vw,340px)] w-full overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--neutral-200)_90%,var(--accent))] bg-[color-mix(in_srgb,var(--neutral-200)_22%,var(--surface))] dark:border-white/12 dark:bg-white/[0.06] sm:min-h-[300px] md:min-h-[320px]">
                {isRasterPublicImage(active.imageSrc) ? (
                  <Image
                    src={active.imageSrc}
                    alt={active.alt}
                    fill
                    sizes="(max-width: 720px) 92vw, 640px"
                    className="object-cover object-top brightness-[0.88] transition-[filter] duration-300 group-hover:brightness-100"
                    priority={idx === 0}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element -- локальные SVG из public; next/image с fill для svg часто даёт пустой кадр
                  <img
                    src={active.imageSrc}
                    alt={active.alt}
                    className="absolute inset-0 h-full w-full object-cover object-top brightness-[0.88] transition-[filter] duration-300 group-hover:brightness-100"
                  />
                )}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-60",
                    isRasterPublicImage(active.imageSrc) ? "opacity-90" : "opacity-40 group-hover:opacity-25",
                  )}
                  aria-hidden
                />
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 mix-blend-multiply transition-opacity duration-300",
                    isRasterPublicImage(active.imageSrc)
                      ? "opacity-[0.12] dark:opacity-[0.2]"
                      : "opacity-0",
                  )}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.5'/%3E%3C/svg%3E")`,
                  }}
                  aria-hidden
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold leading-snug text-white drop-shadow md:text-base">{active.caption}</p>
                    <p className="mt-1 font-mono-nums text-[11px] font-semibold tabular-nums text-white/70">
                      {String(idx + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={openLightbox}
                    className="interactive-hover-ring hidden shrink-0 items-center gap-1.5 rounded-full border border-white/35 bg-black/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition hover:bg-black/60 sm:inline-flex"
                  >
                    <Maximize2 className="h-3.5 w-3.5" aria-hidden />
                    {t("lettersExpand")}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => step(1)}
                className="interactive-hover-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--neutral-200)] bg-[var(--surface)] text-[var(--primary)] shadow-sm transition hover:border-[var(--accent)] dark:border-white/12 dark:bg-white/5 dark:text-white"
                aria-label={t("lettersNext")}
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="relative mt-4 flex justify-center gap-2">
              {list.map((letter, i) => (
                <button
                  key={letter.id}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={cn(
                    "h-2 w-2 rounded-full transition",
                    i === idx ? "scale-125 bg-[var(--accent)]" : "bg-[var(--neutral-200)] hover:bg-[var(--neutral-500)] dark:bg-white/20",
                  )}
                  aria-label={`${i + 1}`}
                  aria-current={i === idx ? "true" : undefined}
                />
              ))}
            </div>

            <div className="relative mt-5 flex justify-center sm:hidden">
              <button
                type="button"
                onClick={openLightbox}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--neutral-200)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--primary)] dark:border-white/12 dark:bg-white/5 dark:text-white"
              >
                <Maximize2 className="h-3.5 w-3.5" aria-hidden />
                {t("lettersExpand")}
              </button>
            </div>

            <p className="relative mx-auto mt-6 max-w-xl text-center text-xs leading-relaxed text-[var(--neutral-500)] md:text-sm">{t("lettersNote")}</p>
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="letters-lightbox max-h-[96vh] w-[min(96vw,1180px)] overflow-hidden rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-0 text-[var(--primary)] shadow-[0_40px_100px_-24px_rgba(0,0,0,0.55)] dark:border-white/15 dark:bg-[color-mix(in_srgb,var(--primary-dark)_96%,black)] [&::backdrop]:bg-black/75 [&::backdrop]:backdrop-blur-sm"
        onClose={() => setLightboxOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--neutral-200)] px-4 py-3 dark:border-white/10 sm:px-5">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <p className="min-w-0 truncate text-sm font-medium text-[var(--neutral-700)] dark:text-slate-200">{active?.caption}</p>
            <span className="hidden shrink-0 rounded-full border border-[var(--neutral-200)] bg-[var(--surface)] px-2.5 py-0.5 font-mono-nums text-[11px] font-semibold tabular-nums text-[var(--neutral-500)] dark:border-white/15 dark:bg-white/5 dark:text-white/55 sm:inline-block">
              {idx + 1}/{list.length}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              className="inline-flex items-center gap-1 rounded-lg border border-[var(--neutral-200)] bg-[var(--surface)] px-2.5 py-2 text-xs font-semibold text-[var(--primary)] transition hover:border-[var(--accent)] dark:border-white/15 dark:bg-white/5 dark:text-white"
              aria-label={t("lettersPrev")}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">{t("lettersPrev")}</span>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
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
              {isRasterPublicImage(active.imageSrc) ? (
                <Image
                  src={active.imageSrc}
                  alt={active.alt}
                  width={1400}
                  height={1800}
                  className="max-h-[min(78vh,900px)] w-auto max-w-full object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)]"
                  sizes="(max-width: 1180px) 96vw, 1180px"
                  priority
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={active.imageSrc}
                  alt={active.alt}
                  className="max-h-[min(78vh,900px)] w-auto max-w-full object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)]"
                />
              )}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
