"use client";

import Script from "next/script";

export default function GoogleTag() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-JW5KV89VFB"
      />
      <Script id="gtag-init">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JW5KV89VFB');
        `}
      </Script>
    </>
  );
}
