export default function AdvantageCompany() {
  return (
    <div className="mt-8 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-xl lg:text-2xl font-bold mb-6 text-center">
        Наши преимущества
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Преимущество 1: Бесплатная доставка */}
        <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg">
          <span className="text-4xl flex-shrink-0">📦</span> {/* Иконка */}
          <div>
            <p className="font-semibold text-lg">Бесплатная доставка</p>
            <p className="text-sm opacity-90">Доставим ваш заказ бесплатно.</p>
          </div>
        </div>

        {/* Преимущество 2: Выезд специалиста */}
        <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg">
          <span className="text-4xl flex-shrink-0">👨‍🔬</span> {/* Иконка */}
          <div>
            <p className="font-semibold text-lg">Выезд специалиста</p>
            <p className="text-sm opacity-90">
              Наш эксперт приедет для замеров и консультаций.
            </p>
          </div>
        </div>

        {/* Преимущество 3: Обмен брака */}
        <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg">
          <span className="text-4xl flex-shrink-0">♻️</span> {/* Иконка */}
          <div>
            <p className="font-semibold text-lg">Обмен брака</p>
            <p className="text-sm opacity-90">
              Гарантированный обмен в случае производственного брака.
            </p>
          </div>
        </div>

        {/* Преимущество 4: Выбор цвета по RAL */}
        <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg">
          <span className="text-4xl flex-shrink-0">🎨</span> {/* Иконка */}
          <div>
            <p className="font-semibold text-lg">Выбор цвета по RAL</p>
            <p className="text-sm opacity-90">
              Возможность выбора любого цвета по каталогу RAL.
            </p>
          </div>
        </div>

        {/* Преимущество 5: Гарантия качества */}
        <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg">
          <span className="text-4xl flex-shrink-0">✅</span> {/* Иконка */}
          <div>
            <p className="font-semibold text-lg">Гарантия качества</p>
            <p className="text-sm opacity-90">
              Вся продукция сертифицирована и имеет гарантию.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
