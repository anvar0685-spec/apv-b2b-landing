"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import {
  analyticsAllowed,
  ensureAnalyticsConsentForMetrika,
} from "@/lib/cookie-consent";

const MID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
const ECOMMERCE_OFF =
  process.env.NEXT_PUBLIC_YANDEX_METRICA_ECOMMERCE === "0" ||
  process.env.NEXT_PUBLIC_YANDEX_METRICA_ECOMMERCE === "false";

export function YandexMetrika() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    ensureAnalyticsConsentForMetrika();
    const sync = () => setOn(analyticsAllowed());
    sync();
    const handler = () => sync();
    window.addEventListener("apv-consent-changed", handler);
    return () => window.removeEventListener("apv-consent-changed", handler);
  }, []);

  const initOpts = useMemo(() => {
    const o: Record<string, unknown> = {
      ssr: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    };
    if (!ECOMMERCE_OFF) o.ecommerce = "dataLayer";
    return JSON.stringify(o);
  }, []);

  if (!MID || !on) return null;

  const pre = ECOMMERCE_OFF ? "" : "window.dataLayer = window.dataLayer || [];";

  return (
    <>
      <Script id="ym" strategy="afterInteractive">
        {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ${pre}
        ym(${MID}, "init", ${initOpts});
      `}
      </Script>
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
    </>
  );
}
