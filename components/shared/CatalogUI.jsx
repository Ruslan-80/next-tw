"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "./catalog.css";

export default function CatalogUI({ categories, text }) {
    const [visibleItems, setVisibleItems] = useState([]);

    useEffect(() => {
        const options = {
            threshold: 0.1, // Элемент считается видимым, когда 10% его высоты попадает в область видимости
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("data-id");
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
                    {text}
                </h2>
                <div className="catalog__inner">
                    {categories &&
                        categories.map((category, index) => (
                            <motion.div
                                key={index}
                                data-id={`${category.id}-${index}`}
                                className="catalog__wrapper"
                                initial={{ opacity: 0, y: 50 }} // Начальное состояние (скрыто)
                                animate={
                                    visibleItems.includes(
                                        `${category.id}-${index}`
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
                                        style={{ width: "auto" }}
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
