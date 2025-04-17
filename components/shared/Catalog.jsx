import Link from "next/link";
import data from "../../app/data/categories.json";
import Image from "next/image";
import "./catalog.css";

export default function Catalog() {
    const { categories } = data;
    return (
        <section className="new__catalog bg-white">
            <div className="container_my">
                <h2 className="text-3xl font-bold text-gray-900 mb-10">
                    Каталог
                </h2>
                <div className="catalog__inner">
                    {categories &&
                        categories.map((category, index) => (
                            <Link
                                className="catalog__wrapper"
                                href={`catalog/${category.slug}`}
                                key={category.id}
                            >
                                <div className="catalog__item">
                                    <h3>{category.name}</h3>
                                    <Image
                                        src={category.image_url}
                                        width={215}
                                        height={215}
                                        alt={category.name}
                                        priority={index < 3}
                                        style={{
                                            width: "auto",
                                            height: "65%", // Сохраняем пропорции
                                        }}
                                    />
                                    <div className="catalog__circle"></div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </section>
    );
}
