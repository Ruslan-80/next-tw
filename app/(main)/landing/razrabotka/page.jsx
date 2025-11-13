import React from "react";

const UnderConstruction = () => {
  return (
    // Главный контейнер: занимает всю высоту экрана, центрирует контент
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Карточка с сообщением */}
      <div className="text-center bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full transform transition duration-500 hover:scale-[1.01]">
        {/* Иконка (можно заменить на любое SVG или emoji) */}
        <div className="text-6xl mb-4 text-yellow-500">🛠️</div>

        {/* Заголовок */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          Страница находится в разработке
        </h1>

        {/* Описание */}
        <p className="text-base text-gray-600 mb-6">
          Мы активно работаем над этим разделом и скоро представим вам новый
          контент. Приносим извинения за временные неудобства!
        </p>

        {/* Дополнительная информация или призыв к действию */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Следите за обновлениями на нашей главной странице.
          </p>

          {/* Кнопка для возврата на главную */}
          <a
            href="/" // Укажите правильный путь к главной странице
            className="mt-4 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
