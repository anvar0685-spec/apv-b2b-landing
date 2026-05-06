"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useCallback, useRef } from "react";

export type IndustrialPhoto = { src: string; label: string };

export function IndustrialPhotoTiles({ photos }: { photos: readonly IndustrialPhoto[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {photos.map((ph) => (
        <IndustrialPhotoTile key={ph.src} photo={ph} />
      ))}
    </div>
  );
}

function isRemoteImageUrl(src: string) {
  return src.startsWith("http");
}

function IndustrialPhotoTile({ photo }: { photo: IndustrialPhoto }) {
  const { src, label } = photo;
  const unoptimized = isRemoteImageUrl(src);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    queueMicrotask(() => dialogRef.current?.showModal());
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  return (
    <>
      <figure className="group relative aspect-[4/3] min-h-0 w-full min-w-0 overflow-hidden rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] shadow-[var(--card-shadow)] dark:border-white/10">
        <button
          type="button"
          onClick={open}
          className="absolute inset-0 z-20 cursor-zoom-in rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          aria-label={`Открыть фото крупно: ${label}`}
        />
        <Image
          src={src}
          alt=""
          fill
          unoptimized={unoptimized}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-500 motion-reduce:transition-none motion-reduce:group-hover:scale-100 scale-100 group-hover:scale-[1.03] brightness-[0.72] group-hover:brightness-100"
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[var(--primary-dark)]/80 via-[var(--primary-dark)]/30 to-[var(--primary-dark)]/45 opacity-100 transition-opacity duration-300 group-hover:opacity-0 motion-reduce:transition-none motion-reduce:group-hover:opacity-100"
          aria-hidden
        />
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-[21] px-2 pb-3 pt-10 text-[10px] font-semibold uppercase leading-tight tracking-[0.1em] text-white/95 sm:px-4 sm:pb-4 sm:text-xs sm:tracking-[0.12em]">
          {label}
        </figcaption>
      </figure>

      <dialog
        ref={dialogRef}
        className="fixed left-1/2 top-1/2 z-[100] max-h-[92vh] w-[min(92vw,1200px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[var(--neutral-200)] bg-[var(--card)] p-0 text-[var(--primary)] shadow-[0_40px_100px_-24px_rgba(0,0,0,0.55)] dark:border-white/15 [&::backdrop]:bg-black/75 [&::backdrop]:backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--neutral-200)] px-4 py-3 dark:border-white/10">
          <p className="min-w-0 truncate text-sm font-medium text-[var(--neutral-700)] dark:text-slate-200">{label}</p>
          <button
            type="button"
            onClick={close}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[var(--neutral-200)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--primary)] transition hover:border-[var(--accent)] dark:border-white/15 dark:bg-white/5 dark:text-white"
          >
            <X className="h-4 w-4" aria-hidden />
            Закрыть
          </button>
        </div>
        <div className="relative flex max-h-[min(78vh,880px)] items-center justify-center bg-[#060b14] p-4 sm:p-6">
          <div className="relative h-[min(72vh,820px)] w-full max-w-[1100px]">
            <Image
              src={src}
              alt=""
              fill
              unoptimized={unoptimized}
              className="object-contain"
              sizes="(max-width: 1200px) 92vw, 1100px"
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
