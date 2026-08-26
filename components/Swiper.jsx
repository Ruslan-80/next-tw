"use client";
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

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./swiper.css";
import { useRef } from "react";
import Link from "next/link";

function Slider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const isMobile = useIsMobile();

  if (isMobile === undefined) return null;

  if (isMobile) {
    return (
      <>
        {/* <h3 className="mt-6 mb-2 text-center font-semibold text-2xl">
          Добро пожаловать в ЭЛЕКТРОЩИТ-ПРО
        </h3> */}
      </>
    );
  }

  return (
    <Swiper
      className="mt-5 rounded-3xl"
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{ clickable: true }}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      effect="fade"
    >
      <SwiperSlide>
        <img
          src="/images/slider/image1.webp"
          alt="slider 1"
          style={{ width: "100%" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slider/test.webp"
          alt="slider 3"
          style={{ width: "100%" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Link href="catalog/shity-etazhnye-she">
          <img
            src="/images/slider/abstract.webp"
            alt="slider 3"
            style={{ width: "100%" }}
          />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slider/abstract1.webp"
          alt="slider 3"
          style={{ width: "100%" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slider/abstract2.webp"
          alt="slider 3"
          style={{ width: "100%" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slider/image-4.webp"
          alt="slider 4"
          style={{ width: "100%" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slider/image-5.webp"
          alt="slider 5"
          style={{ width: "100%" }}
        />
      </SwiperSlide>
      <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  );
}

export default Slider;
