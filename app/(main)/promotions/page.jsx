import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Акции и спецпредложения | ЭЛЕКТРОЩИТ-ПРО",
  description:
    "Актуальные акции, скидки и специальные предложения на электрощитовое оборудование и металлокорпуса.",
};

const promotions = [
  {
    id: 1,
    title: "Скидка 10% на ВРУ при заказе монтажа",
    description:
      "Закажите изготовление Вводно-распределительного устройства (ВРУ) вместе с услугой монтажа и получите скидку 10% на оборудование.",
    date: "До 31 декабря 2025",
    tag: "Комплексное решение",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  {
    id: 2,
    title: "Бесплатная доставка по Москве",
    description:
      "При заказе партии металлокорпусов от 100 000 рублей — доставка в пределах МКАД осуществляется бесплатно.",
    date: "Бессрочно",
    tag: "Доставка",
    color: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  {
    id: 3,
    title: "Проектирование в подарок",
    description:
      "При заказе сборки ГРЩ (Главного распределительного щита) на токи от 1600А — разработка однолинейной схемы бесплатно.",
    date: "До 1 июня 2025",
    tag: "Проектирование",
    color: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  },
  {
    id: 4,
    title: "Сезонное обслуживание щитовых",
    description:
      "Специальные цены на техническое обслуживание и ревизию электрощитовых перед зимним сезоном. Проверка тепловизором в подарок.",
    date: "С 1 сентября по 30 ноября",
    tag: "Сервис",
    color: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  },
];

const Promotions = () => {
  return (
    <div className="min-h-screen bg-light dark:bg-dm-bg">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl">
            <h1 className="text-4xl text-center md:text-5xl font-bold mb-6">
              Акции и спецпредложения
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Мы ценим наших клиентов и регулярно готовим выгодные предложения.
              Следите за обновлениями, чтобы не упустить возможность сэкономить
              на качественном оборудовании.
            </p>
          </div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {promotions.map((promo) => (
            <Card
              key={promo.id}
              className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-none shadow-md dark:bg-dm-card"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    className={`${promo.color} border-none px-3 py-1 text-sm font-medium`}
                  >
                    {promo.tag}
                  </Badge>
                  <Tag className="w-5 h-5 text-gray-400" />
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold text-dark dark:text-dm-text">
                  {promo.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {promo.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>{promo.date}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-primary hover:bg-blue-700">
                  <Link href="/contacts">
                    Узнать подробности <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white dark:bg-dm-card py-16 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark dark:text-dm-text">
            Не нашли подходящего предложения?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами, и мы подготовим индивидуальное коммерческое
            предложение специально для вашего проекта.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-orange-600 text-white"
            >
              <Link href="/contacts">Связаться с менеджером</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              <Link href="/catalog">Перейти в каталог</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promotions;
