import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Cable, Server, Shield, Home, Zap } from "lucide-react";
import ComparisonTable from "@/app/(main)/landing/ustroystva-etazhnye/table";

export function UstroystvaEtazhnyeTop() {
  return (
    <>
      <section className="mb-4">
        <div className="flex bg-blue-300/20 shadow-xl items-center rounded-4xl px-8 py-12 mx-auto border border-blue-200">
          <div className="p-4">
            <Image
              src="/images/categories/SE24L.png"
              alt="Этажные электрические щиты (ЩЭ)"
              height={1000}
              width={1000}
              className="rounded object-cover"
            />
          </div>

          <div className="text-justify text-2xl pl-8   mb-8">
            <p className="text-gray-600">
              Устройства типа{" "}
              <Link
                href="uerm"
                className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
              >
                УЭРМ
              </Link>
              ,{" "}
              <Link
                href="uerb"
                className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
              >
                УЭРБ
              </Link>
              ,{" "}
              <Link
                href="uerk"
                className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
              >
                УЭРК
              </Link>
              ,{" "}
              <Link
                href="uerv"
                className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
              >
                УЭРВ
              </Link>
              ,{" "}
              <Link
                href="uern"
                className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
              >
                УЭРН
              </Link>{" "}
              — современные решения для приема, распределения и учета
              электроэнергии в многоквартирных домах. Защищают от перегрузок,
              короткого замыкания, токов утечки в сетях 380/220 В, 50 Гц (TN-S,
              TN-C, TN-C-S). Поддерживают слаботочные системы (телефон,
              интернет, сигнализация, АСКУЭ). Соответствуют ГОСТ Р 51321.1-2007,
              ГОСТ IEC 60439.3-2012, ТР ТС 004/2011.
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600">
              <li>Применение: этажи жилых зданий, коммунальные объекты.</li>
              <li>Обслуживание: 6–12 квартир.</li>
              <li>
                Универсальность: однофазные (до 11 кВт) и трехфазные (до 32 кВт)
                системы.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export function UstroystvaEtazhnyeBottom() {
  return (
    <>
      <div className="container mx-auto p-6 space-y-10 text-2xl mt-12">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
            <Shield className="mr-2" /> Конструкция
          </h2>
          <p className="text-gray-600">
            Металлические корпуса (цельносварные/сборные) с полиэфирным
            покрытием (RAL 9003/7035, шагрень). Модульная/блочная компоновка с
            отсеками для силовых и слаботочных линий.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
            <Home className="mr-2" /> Типы устройств
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/catalog/uerv"
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800">УЭРВ</h3>
              <p className="text-gray-600">
                Встроенное, в нишу, открыто кроме фасада, ГВЛ-отделка.
              </p>
            </Link>
            <Link
              href="/catalog/uerb"
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800">УЭРБ</h3>
              <p className="text-gray-600">
                Блочное, навесное/встроенное, выламываемые отверстия.
              </p>
            </Link>
            <Link
              href="/catalog/uern"
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800">УЭРН</h3>
              <p className="text-gray-600">
                Навесное, полная оболочка, до 12 квартир.
              </p>
            </Link>
            <Link
              href="/catalog/uerk"
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800">УЭРК</h3>
              <p className="text-gray-600">
                Навесное с кабельным отсеком, компенсатор высоты.
              </p>
            </Link>
            <Link
              href="/catalog/uerm"
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800">УЭРМ</h3>
              <p className="text-gray-600">
                Модульное, сборное, для домов без ниш.
              </p>
            </Link>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
            <Cable className="mr-2" /> Отсеки/блоки
          </h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              <strong>Слаботочный (КСС):</strong> Телефон, интернет,
              сигнализация, АСКУЭ.
            </li>
            <li>
              <strong>Вводно-учетный (ЯУР):</strong> Счетчики, выключатели,
              ревизионное окно.
            </li>
            <li>
              <strong>Распределительный:</strong> Автоматы, АВДТ, УЗО, УЗИП
              (12–24 модуля).
            </li>
            <li>
              <strong>Силовых магистралей (КЭТ):</strong> Стояки, шины N/PE,
              зажимы.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
            <Zap className="mr-2" /> Технические характеристики
          </h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Напряжение: 230/400 В, 50 Гц.</li>
            <li>Заземление: TN-S, TN-C, TN-C-S.</li>
            <li>Токи выключателей: 25–125 А.</li>
            <li>Диф. токи: 10–300 мА.</li>
            <li>Отключающая способность: ≥4,5 кА.</li>
            <li>Сечение проводников: до 95 мм².</li>
            <li>Степень защиты: IP31 (фасад), IP00 (несмонтированное).</li>
            <li>Климат: УХЛ3/УХЛ4, -25°C до +40°C, влажность до 60%.</li>
            <li>Материал: Листовой металл, порошковое покрытие.</li>
            <li>Срок службы: 25 лет, гарантия 3 года.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
            <Server className="mr-2" /> Преимущества
          </h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Современная альтернатива устаревшим щитам.</li>
            <li>Универсальность для одно- и трехфазных сетей.</li>
            <li>Экологичные материалы, прочное покрытие.</li>
            <li>Гибкая компоновка отсеков.</li>
            <li>Безопасность: защита от перегрузок, КЗ, утечек.</li>
          </ul>
        </section>
        <ComparisonTable />
      </div>
    </>
  );
}
