"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { analyticsAllowed } from "@/lib/cookie-consent";

const MID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

export function YandexMetrika() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const sync = () => setOn(analyticsAllowed());
    sync();
    const handler = () => sync();
    window.addEventListener("apv-consent-changed", handler);
    return () => window.removeEventListener("apv-consent-changed", handler);
  }, []);

  if (!MID || !on) return null;

  return (
    <Script id="ym" strategy="afterInteractive">
      {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${MID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
      `}
    </Script>
  );
}
