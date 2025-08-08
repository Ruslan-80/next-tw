export default function ProcessPage() {
  return (
    <div className="mt-8 mb-8 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl lg:text-2xl font-bold mb-6 text-center">
        Как мы работаем
      </h2>
      <div className="flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 md:space-x-4">
        {/* Шаг 1: Замер */}
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm w-full md:w-1/4">
          <span className="text-4xl mb-2">📏</span> {/* Иконка замера */}
          <p className="font-semibold text-base lg:text-lg">Замер</p>
          <p className="text-sm text-gray-600">
            Бесплатный выезд специалиста на объект
          </p>
        </div>
        <span className="text-3xl text-gray-500 hidden md:block">→</span>{" "}
        {/* Стрелка для десктопа */}
        <span className="text-3xl text-gray-500 rotate-90 md:hidden">
          →
        </span>{" "}
        {/* Стрелка для мобильных */}
        {/* Шаг 2: Проектирование */}
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm w-full md:w-1/4">
          <span className="text-4xl mb-2">📐</span>{" "}
          {/* Иконка проектирования */}
          <p className="font-semibold text-base lg:text-lg">Проектирование</p>
          <p className="text-sm text-gray-600">
            Разработка проекта по вашим требованиям
          </p>
        </div>
        <span className="text-3xl text-gray-500 hidden md:block">→</span>
        <span className="text-3xl text-gray-500 rotate-90 md:hidden">→</span>
        {/* Шаг 3: Доставка */}
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm w-full md:w-1/4">
          <span className="text-4xl mb-2">🚚</span> {/* Иконка доставки */}
          <p className="font-semibold text-base lg:text-lg">Доставка</p>
          <p className="text-sm text-gray-600">
            Оперативная доставка до вашего объекта
          </p>
        </div>
        <span className="text-3xl text-gray-500 hidden md:block">→</span>
        <span className="text-3xl text-gray-500 rotate-90 md:hidden">→</span>
        {/* Шаг 4: Монтаж */}
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm w-full md:w-1/4">
          <span className="text-4xl mb-2">🔧</span> {/* Иконка монтажа */}
          <p className="font-semibold text-base lg:text-lg">Монтаж</p>
          <p className="text-sm text-gray-600">
            Профессиональная установка оборудования
          </p>
        </div>
      </div>
    </div>
  );
}
