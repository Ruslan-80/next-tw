"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const textRef = useRef();

  useEffect(() => {
    const el = textRef.current;

    const handleScroll = () => {
      const y = window.scrollY;
      el.style.transform = `translateY(${y * 0.3}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-black/80 to-black" />

      {/* Big text */}
      <h1
        ref={textRef}
        className="text-[12vw] font-bold tracking-tight leading-none text-center"
      >
        Digital
        <br />
        Experience
      </h1>
    </section>
  );
}
