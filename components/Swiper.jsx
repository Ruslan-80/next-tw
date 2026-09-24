"use client";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./swiper.css";

const slides = [
  { src: "/images/slider/image1.webp", alt: "slider 1" },
  { src: "/images/slider/test.webp", alt: "slider 2" },
  {
    src: "/images/slider/abstract.webp",
    alt: "slider 3",
    href: "catalog/shity-etazhnye-she",
  },
  { src: "/images/slider/abstract1.webp", alt: "slider 4" },
  { src: "/images/slider/abstract2.webp", alt: "slider 5" },
  { src: "/images/slider/image-4.webp", alt: "slider 6" },
  { src: "/images/slider/image-5.webp", alt: "slider 7" },
];

function Slider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const isMobile = useIsMobile();
  if (isMobile === undefined || isMobile) return null;

  return (
    <Swiper
      className="mt-5 rounded-3xl w-full"
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop
      pagination={{ clickable: true }}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      effect="fade"
    >
      {slides.map((slide, i) => {
        const content = (
          <div className="relative w-full aspect-[3/1] overflow-hidden">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              preload={i === 0}
            />
          </div>
        );

        return (
          <SwiperSlide key={slide.src}>
            {slide.href ? (
              <Link href={slide.href} className="block w-full">
                {content}
              </Link>
            ) : (
              content
            )}
          </SwiperSlide>
        );
      })}

      <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20" />
        </svg>
        <span ref={progressContent} />
      </div>
    </Swiper>
  );
}

export default Slider;
