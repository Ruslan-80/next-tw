"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function YandexMetrika() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(104651483, "hit", pathname);
    }
  }, [pathname]);

  return null;
}
