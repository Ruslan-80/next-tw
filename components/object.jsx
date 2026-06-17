"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/app/data/dataObject.json";

export default function RandomObjects() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setItems(shuffled.slice(0, 4));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="bg-gradient-metal animate-metal">
      {items.map((item, index) => {
        const isEven = index % 2 === 0;

        return (
          <div key={index} className="py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4">
              <div
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 lg:gap-16 items-center`}
              >
                {/* Текст */}
                <div className="w-full md:w-1/2 space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-accent">
                    {item.address}
                  </h2>
                  <p className="text-text leading-relaxed text-base md:text-xl">
                    {item.text}
                  </p>
                </div>

                {/* Фото */}
                <div className="w-full md:w-1/2">
                  {item.imageUrl ? (
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                      <Image
                        src={item.imageUrl}
                        alt={item.address}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full aspect-[4/3] flex items-center justify-center">
                      <span className="text-gray-500">
                        Изображение отсутствует
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
