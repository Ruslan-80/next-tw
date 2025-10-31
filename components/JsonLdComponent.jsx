"use client";
import { useEffect } from "react";

export default function JsonLd({ data, script_name }) {
  useEffect(() => {
    if (!data) return;

    const scriptId = script_name || "jsonld-script";
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data, null, 2);
  }, [data, script_name]);

  return null; // не выводим ничего в DOM
}
