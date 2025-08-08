export default function Advantages() {
  const advantages = [
    {
      title: "Бесплатная доставка",
      description: "Доставим ваш заказ бесплатно в удобное для вас время.",
      icon: "🚚",
      path: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
    },
    {
      title: "Гарантия качества",
      description: "Мы гарантируем высокое качество всех наших товаров.",
      icon: "✅",
      path: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    },
    {
      title: "Выезд специалиста",
      description: "Наши специалисты готовы выехать на объект для консультации.",
      icon: "👷‍♂️",
      path: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z",
    },
    {
      title: "Лучшая цена",
      description: "Мы предлагаем лучшие цены на рынке без скрытых платежей.",
      icon: "💰",
      path: "M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z",
    },
    {
      title: "Кратчайшие сроки",
      description: "Мы ценим ваше время и выполняем заказы в кратчайшие сроки.",
      icon: "⏱️",
      path: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    },
    {
      title: "Любой цвет",
      description: "Вы можете выбрать любой цвет для вашего заказа.",
      icon: "🎨",
      path: "M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z",
    },
    {
      title: "Замена брака",
      description: "В случае брака мы бесплатно заменим товар.",
      icon: "🔄",
      path: "M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3",
    },
  ];
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Наши преимущества</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {advantages.map((advantage, index) => (
          <div
            key={index}
            className="relative h-48 perspective-1000 group"
          >
            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
              {/* Front side */}
              <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-md p-6 flex flex-col items-center justify-center border border-gray-200">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={advantage.path}
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-center text-gray-800">
                  {advantage.title}
                </h3>
              </div>
              
              {/* Back side */}
              <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl shadow-lg p-6 flex items-center justify-center rotate-y-180 border border-blue-200">
                <p className="text-gray-700 text-center font-medium">
                  {advantage.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
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
