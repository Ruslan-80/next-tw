"use client";
import Script from "next/script";
import { useConsentStore } from "@/lib/store/useConsentStore";
import { useState, useEffect } from "react";

export default function MetricsInitializer() {
  // const { isAccepted } = useConsentStore();
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted || !isAccepted) {
  //   return null;
  // }

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j=0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            
            ym(104651483, "init", {
                webvisor:true,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                ecommerce:"dataLayer"
            });
          `,
        }}
      />
      {/* noscript для пользователей без JS */}
      <noscript>
        <img
          src="https://mc.yandex.ru/watch/104651483"
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </noscript>
    </>
  );
}
