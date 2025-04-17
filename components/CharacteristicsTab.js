export default function CharacteristicsTab() {
    const characteristics = [
        { name: "Статус", value: "Регулярная" },
        { name: "Цвет", value: "Серый" },
        { name: "Ширина", value: "950 мм" },
        { name: "Высота", value: "1 000 мм" },
        { name: "Глубина", value: "150 мм" },
        { name: "С монтажной платой/панелью", value: "Нет" },
        { name: "Количество дверей", value: "3" },
        { name: "Номер цвета RAL", value: "7035" },
        { name: "Материал", value: "Сталь" },
        {
            name: "Вид щита этажного",
            value: "Встраиваемый со слаботочным отсеком справа",
        },
        { name: "Гарантийный срок эксплуатации", value: "3 года" },
        {
            name: "Соответствие ГОСТ/МЭК/ТУ",
            value: "ТУ 3434-002-52681400-2019",
        },
        { name: "Глубина встраиваемой части", value: "135 мм" },
        { name: "Степень защиты (IP)", value: "IP31" },
        { name: "Подходит для сборок (наборный)", value: "Нет" },
        { name: "Отделка поверхности", value: "С порошковым покрытием" },
        { name: "Встраивается в стену", value: "Да" },
        { name: "Гарантийный срок хранения", value: "3 года" },
        { name: "Срок службы", value: "25 лет" },
        { name: "Количество квартир (счетчиков)", value: "4" },
        { name: "Класс защиты, IP", value: "IP31" },
        { name: "Тип ЩЭ", value: "Встраиваемый со слаботочным отсеком" },
        { name: "Возможно настенное крепление", value: "Нет" },
        { name: "Есть штрихкод на каждой штуке товара", value: "Да" },
        { name: "Серия", value: "Basic" },
        { name: "Возможна напольная установка", value: "Нет" },
        { name: "Штрих-код", value: "4690216435923" },
    ];

    return (
        <div className="py-6">
            <h2 className="text-xl font-bold mb-4">Характеристики</h2>
            <div className="divide-y">
                {characteristics.map((item, index) => (
                    <div
                        key={index}
                        className="py-3 grid grid-cols-1 md:grid-cols-2"
                    >
                        <div className="text-gray-600">{item.name}</div>
                        <div>{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
