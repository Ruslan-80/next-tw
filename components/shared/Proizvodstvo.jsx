"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import data from "../../app/data/proizvodstvo.json";
import "./catalog.css";

export default function Proizvodstvo() {
    const [visibleItems, setVisibleItems] = useState([]);
    const { categories } = data;

    useEffect(() => {
        const options = {
            threshold: 0.1, // Элемент считается видимым, когда 10% его высоты попадает в область видимости
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute(
                        "data-id-proizvodstvo"
                    );
                    if (!visibleItems.includes(id)) {
                        setVisibleItems(prevItems => [...prevItems, id]);
                    }
                }
            });
        }, options);

        const elements = document.querySelectorAll(".catalog__wrapper");
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [visibleItems]);

    return (
        <section className="new__catalog">
            <div className="container">
                <h2 className="text-3xl font-bold text-gray-900 mb-10">
                    Производство металлокорпусов
                </h2>
                <div className="catalog__inner">
                    {categories &&
                        categories.map((category, index) => (
                            <motion.div
                                key={index}
                                data-id-proizvodstvo={`proizvodstvo-${index}`}
                                className="catalog__wrapper"
                                initial={{ opacity: 0, y: 50 }} // Начальное состояние (скрыто)
                                animate={
                                    visibleItems.includes(
                                        `proizvodstvo-${index}`
                                    )
                                        ? { opacity: 1, y: 0 }
                                        : {}
                                } // Плавное появление карточки
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }} // Задержка появления
                            >
                                <Link
                                    className="catalog__item"
                                    href={`catalog/${category.slug}`}
                                >
                                    <h3>{category.name}</h3>
                                    <Image
                                        src={category.image_url}
                                        width={158}
                                        height={158}
                                        alt={category.name}
                                        priority={true}
                                    />
                                    <div className="catalog__circle"></div>
                                </Link>
                            </motion.div>
                        ))}
                </div>
            </div>
        </section>
    );
}
