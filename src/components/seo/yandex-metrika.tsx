"use client";

import { useLayoutEffect } from "react";
import { ensureAnalyticsConsentForMetrika } from "@/lib/cookie-consent";

const MID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
const ECOMMERCE_OFF =
  process.env.NEXT_PUBLIC_YANDEX_METRICA_ECOMMERCE === "0" ||
  process.env.NEXT_PUBLIC_YANDEX_METRICA_ECOMMERCE === "false";

/**
 * Загрузка как в кабинете Метрики: сразу после первого layout в браузере,
 * без `next/script` и без второго рендера по `useState` (там ловили гонки/«тихий» no-op).
 */
export function YandexMetrika() {
  useLayoutEffect(() => {
    if (!MID || typeof document === "undefined") return;
    ensureAnalyticsConsentForMetrika();
    if (document.querySelector('script[data-apv-metrika-loader="1"]')) return;

    const id = Number(MID);
    if (!Number.isFinite(id)) return;

    const scriptSrc = `https://mc.yandex.ru/metrika/tag.js?id=${encodeURIComponent(MID)}`;
    const initOpts: Record<string, unknown> = {
      ssr: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      referrer: document.referrer,
      url: window.location.href,
    };
    if (!ECOMMERCE_OFF) initOpts.ecommerce = "dataLayer";

    const pre = ECOMMERCE_OFF ? "" : "window.dataLayer = window.dataLayer || [];";

    const el = document.createElement("script");
    el.setAttribute("data-apv-metrika-loader", "1");
    el.textContent = [
      "(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};",
      "m[i].l=1*new Date();",
      "for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}",
      "k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})",
      `(window, document, "script", ${JSON.stringify(scriptSrc)}, "ym");`,
      pre,
      `ym(${id}, "init", ${JSON.stringify(initOpts)});`,
    ].join("\n");

    document.head.appendChild(el);
  }, []);

  if (!MID) return null;

  return (
    <noscript>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element -- Metrika noscript pixel */}
        <img
          src={`https://mc.yandex.ru/watch/${MID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
          width={1}
          height={1}
        />
      </div>
    </noscript>
  );
}
