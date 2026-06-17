"use client";

import { motion } from "framer-motion";
import {
  TruckIcon,
  CheckCircleIcon,
  UserIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ArrowPathIcon,
  SwatchIcon, // Замена для PaletteIcon
} from "@heroicons/react/24/outline";

const iconsMap = {
  delivery: TruckIcon,
  quality: CheckCircleIcon,
  specialist: UserIcon,
  price: CurrencyDollarIcon,
  speed: ClockIcon,
  color: SwatchIcon, // Используем SwatchIcon вместо PaletteIcon
  replacement: ArrowPathIcon,
};

export default function Advantages() {
  const advantages = [
    {
      title: "Бесплатная доставка",
      description: "Доставим ваш заказ бесплатно в удобное для вас время.",
      iconKey: "delivery",
    },
    {
      title: "Гарантия качества",
      description: "Мы гарантируем высокое качество всех наших товаров.",
      iconKey: "quality",
    },
    {
      title: "Выезд специалиста",
      description:
        "Наши специалисты готовы выехать на объект для консультации.",
      iconKey: "specialist",
    },
    {
      title: "Лучшая цена",
      description: "Мы предлагаем лучшие цены на рынке без скрытых платежей.",
      iconKey: "price",
    },
    {
      title: "Кратчайшие сроки",
      description: "Мы ценим ваше время и выполняем заказы в кратчайшие сроки.",
      iconKey: "speed",
    },
    {
      title: "Любой цвет",
      description: "Вы можете выбрать любой цвет для вашего заказа.",
      iconKey: "color",
    },
    {
      title: "Замена брака",
      description: "В случае брака мы бесплатно заменим товар.",
      iconKey: "replacement",
    },
  ];

  return (
    <div className="hidden md:block px-4 bg-gradient-metal animate-metal">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 justify-center container mx-auto py-4 lg:py-8 px-4">
        {advantages.map(({ title, description, iconKey }, index) => {
          const IconComponent = iconsMap[iconKey];
          return (
            <motion.div
              key={index}
              className="relative perspective-1000 w-full min-h-40 max-w-xs mx-auto cursor-pointer text-text"
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.7 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front side */}
              <div className="absolute inset-0 rounded-xl shadow-md p-6 flex flex-col items-center justify-center border border-border backface-hidden ">
                <div className="absolute top-4 p-3 rounded-full mb-2 w-12 h-12 flex items-center justify-center text-blue-600">
                  {IconComponent && (
                    <IconComponent className="absolute top--2 w-8 h-8 text-blue-600 my-4" />
                  )}
                </div>
                <h3 className="font-bold text-lg text-center pt-12 text-accent">
                  {title}
                </h3>
              </div>

              {/* Back side */}
              <div className="absolute inset-0 rounded-xl shadow-lg p-6 flex items-center justify-center border border-border rotate-y-180 backface-hidden ">
                <p className="text-text text-center font-medium text-sm">
                  {description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
