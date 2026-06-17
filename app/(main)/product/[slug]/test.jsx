import Image from "next/image";

export default function ProductCard() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 font-sans antialiased text-white 
      bg-[#0a0f1a] bg-radial-[at_50%_50%] from-[#1e2a44] via-[#0a0f1a] to-[#05080f]"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Левая колонка: Изображение */}
        <div className="relative flex justify-center">
          {/* Свечение за товаром */}
          <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="relative z-10">
            <Image
              src="/images/product/se/SE12-1.webp"
              alt="ВРУ-1-21-10"
              width={400}
              height={600}
              className="drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Правая колонка: Контент */}
        <div className="space-y-6">
          <header>
            <h2 className="text-[#c5a47e] text-2xl font-bold tracking-wider mb-2">
              ВРУ-1-21-10
            </h2>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
              Вводно-распределительное <br /> устройство 250 А, IP31, 1 ввод,{" "}
              <br /> со счетчиком, УХЛ4
            </h1>
          </header>

          {/* Кнопки действия */}
          <div className="flex flex-col gap-4">
            <button
              className="w-full py-4 bg-linear-to-r from-[#d4af37] via-[#f9e0a2] to-[#b8860b] 
              text-black font-black uppercase tracking-widest rounded-xl hover:brightness-110 transition-all cursor-pointer"
            >
              Запросить цену
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="py-3 px-4 border border-white/20 rounded-full text-xs uppercase font-bold 
                hover:bg-white/5 transition-colors cursor-pointer text-center"
              >
                Заказать консультацию
              </button>
              <button
                className="py-3 px-4 bg-linear-to-r from-[#c5a47e]/40 to-[#c5a47e]/20 
                border border-[#c5a47e]/30 rounded-full text-xs uppercase font-bold 
                hover:from-[#c5a47e]/50 transition-all cursor-pointer text-center"
              >
                Заказать бесплатный расчет
              </button>
            </div>
          </div>

          {/* Таблица характеристик (Glassmorphism) */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
            <table className="w-full text-sm border-separate border-spacing-y-3">
              <tbody>
                <CharacteristicRow
                  label="Номинальное напряжение"
                  value="380/220В"
                />
                <CharacteristicRow label="Ток" value="250А" />
                <CharacteristicRow label="Степень защиты" value="IP31" />
                <CharacteristicRow label="Тип исполнения" value="УХЛ4" />
                <CharacteristicRow label="Гарантия" value="5 лет" />
                <CharacteristicRow
                  label="Срок изготовления"
                  value="10-14 дней"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function CharacteristicRow({ label, value }) {
  return (
    <tr className="border-b border-white/5 last:border-0">
      <td className="text-white/60 py-1">{label}</td>
      <td className="text-right font-bold py-1">{value}</td>
    </tr>
  );
}
