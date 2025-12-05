"use client";
import { useState } from "react";
import Link from "next/link";
import ReactPlayer from "react-player";
import { Youtube } from "lucide-react";

export default function VideoGallery() {
  // --- Видео источники ---
  const video1 = {
    local: "/video/video1.mp4",
    youtube: "https://www.youtube.com/shorts/PMoDxIjrvf8",
    rutube: "https://rutube.ru/play/embed/0ffc70dce7c9a92a7c745faa476efe34/",
  };

  const video2 = {
    local: "/video/video2.mp4",
    youtube: "https://www.youtube.com/shorts/PMoDxIjrvf8",
    rutube: "https://rutube.ru/video/596b427852d713d52007f3f2d2a7dacc/",
  };

  // --- Выбор платформы по умолчанию: локальное видео ---
  const [platform1, setPlatform1] = useState("local");
  const [platform2, setPlatform2] = useState("local");

  // получение списка доступных источников
  const renderPlatformButtons = (video, setPlatform, current) => (
    <div className="flex gap-2">
      {video.local && (
        <button
          onClick={() => setPlatform("local")}
          className={`px-3 py-1 rounded-md border ${
            current === "local" ? "bg-accent text-white" : ""
          }`}
        >
          Сайт
        </button>
      )}
      {video.youtube && (
        <button
          onClick={() => setPlatform("youtube")}
          className={`px-3 py-1 rounded-md border ${
            current === "youtube" ? "bg-accent text-white" : ""
          }`}
        >
          YouTube
        </button>
      )}
      {video.rutube && (
        <button
          onClick={() => setPlatform("rutube")}
          className={`px-3 py-1 rounded-md border ${
            current === "rutube" ? "bg-accent text-white" : ""
          }`}
        >
          Rutube
        </button>
      )}
    </div>
  );

  const renderVideo = (source, platform) => (
    <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden max-w-[280px]">
      {platform === "local" ? (
        <video src={source.local} controls className="w-full h-full" />
      ) : (
        <ReactPlayer
          src={source[platform]}
          controls
          width="100%"
          height="100%"
          className="!w-full !h-full"
        />
      )}
    </div>
  );

  return (
    <section className="py-4 mt-12">
      <div className="text-center mb-12">
        <h3 className="text-xl lg:text-4xl font-bold mb-4 text-balance">
          Демонстрация демонтажа и установки накладок щитов этажных.
        </h3>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 justify-items-center">
        {/* --- Видео 1 --- */}
        <div className="md:col-span-2 flex flex-col space-y-3">
          <h3 className="text-sm lg:text-xl font-medium">
            <Link href="/product/sen24b" className="text-accent underline">
              Накладка щита этажного ЩЭ-4 на 4 квартиры 2-дверный
            </Link>
          </h3>

          {renderPlatformButtons(video1, setPlatform1, platform1)}
          {renderVideo(video1, platform1)}
        </div>

        {/* --- Видео 2 --- */}
        <div className="md:col-span-2 flex flex-col space-y-3">
          <h3 className="text-sm lg:text-xl font-medium">
            <Link href="/product/sen34r" className="text-accent underline">
              Накладка щита этажного ЩЭ-4 на 4 квартиры 3-дверный
            </Link>
          </h3>

          {renderPlatformButtons(video2, setPlatform2, platform2)}
          {renderVideo(video2, platform2)}
        </div>
      </div>
    </section>
  );
}
