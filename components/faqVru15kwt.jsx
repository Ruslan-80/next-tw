"use client";

import { useEffect, useState } from "react";

const SkeletonItem = () => (
  <div className="border rounded-2xl shadow-sm animate-pulse">
    <div className="px-6 py-4 flex justify-between items-center">
      <div className="h-6 rounded w-3/4"></div>
      <div className="w-8 h-8 rounded-full"></div>
    </div>
  </div>
);

const faqs = [
  {
    question: "Что делать, если инспектор отказывается пломбировать щит?",
    answer: (
      <div className="space-y-2">
        <p>
          Наши ВРУ собраны в строгом соответствии с ГОСТ и ПУЭ 7. Если у
          инспектора возникнут замечания к самой сборке ВРУ, мы компенсируем
          выезд или бесплатно доработаем щит.
        </p>
      </div>
    ),
  },
  {
    question: "Какой корпус выбрать: металл или пластик?",
    answer: (
      <div className="space-y-2">
        <p>
          Металл IP54/IP65 идеально подходит для антивандальной установки на
          улице. Пластик IP65 необходим, если внутри установлены счётчики с
          GSM/Wi-Fi передачей данных, чтобы металл не экранировал радиосигнал.
        </p>
      </div>
    ),
  },
  {
    question: "Нужно ли мне УЗИП, если у меня уже стоит молниезащита дома?",
    answer: (
      <div className="space-y-2">
        <p>
          Да, обязательно. Молниезащита здания защищает от прямого попадания
          молнии, а УЗИП (ОПС) в щите — от наведённого импульса, который
          приходит по проводам ЛЭП во время дальней грозы. Это разные системы, и
          они дополняют друг друга.
        </p>
      </div>
    ),
  },
];

export default function FaqVru15kwt() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    // Имитация загрузки + рандомизация
    setTimeout(() => {
      const shuffled = [...faqs].sort(() => Math.random() - 0.5);
      setItems(shuffled.slice(0, 5));
      setIsLoading(false);
    }, 800);
  }, []);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="text-text">
      <div className="container mx-auto py-4 lg:py-8">
        <h2 className="text-xl lg:text-3xl font-bold my-8">Частые вопросы</h2>

        <div className="space-y-4 text-sm lg:text-2xl">
          {isLoading
            ? Array(4)
                .fill()
                .map((_, i) => <SkeletonItem key={i} />)
            : items.map((faq, i) => (
                <div key={i} className="border rounded-2xl shadow-sm">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full text-left px-4 lg:px-6 py-4 flex justify-between items-center font-semibold text-accent"
                  >
                    {faq.question}
                    <span>{openIndex === i ? "−" : "+"}</span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openIndex === i ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-4 lg:px-6 pb-6">{faq.answer}</div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
