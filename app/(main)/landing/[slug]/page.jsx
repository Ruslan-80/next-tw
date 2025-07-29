// app/landing/[slug]/page.jsx
// Это общий компонент для всех посадочных страниц (УЭРБ, УЭРМ и т.д.)

import Breadcrumbs from "@/components/Breadcrumbs";
import { parseSlug } from "@/utils/slugParser"; // Импортируем синхронную parseSlug
// import seoMetadata from "@/app/data/seoMetadata.json"; // seoMetadata.json теперь импортируется внутри parseSlug

export async function generateMetadata({ params, searchParams }) {
  const { slug } = params;
  const resolvedSearchParams = searchParams;

  // parseSlug теперь синхронная
  const parsedData = parseSlug(slug, resolvedSearchParams);

  const title = parsedData.title || `${parsedData.h1Text} | ЭЛЕКТРОЩИТ-ПРО`;
  const description =
    parsedData.description || "Информация о продукции ЭЛЕКТРОЩИТ-ПРО.";
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/landing/${slug}`; // Ваш URL-префикс для лендингов

  return {
    title: title,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function LandingPage({ params, searchParams }) {
  const { slug } = params;
  const resolvedSearchParams = searchParams;

  // parseSlug теперь синхронная
  const parsedData = parseSlug(slug, resolvedSearchParams);
  const {
    baseSlug, // Здесь это будет slug УЭРБ, УЭРМ и т.д.
    breadcrumbs,
    h1Text,
    fullDescription,
    advantageText,
    pageType,
  } = parsedData;

  // Проверка на случай, если страница не найдена или не соответствует типу 'landing'
  if (pageType === "notFound" || pageType !== "landing") {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Страница не найдена
        </h1>
        <p className="text-gray-700">
          Запрашиваемая индивидуальная страница не существует или не является
          посадочной.
        </p>
        <Breadcrumbs items={[{ name: "Главная", path: "/" }]} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Основной заголовок страницы */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{h1Text}</h1>

      {/* Полное описание/основной контент */}
      {fullDescription && (
        <div
          className="prose max-w-none mb-8 text-gray-700"
          dangerouslySetInnerHTML={{ __html: fullDescription }}
        ></div>
      )}

      {/* Раздел с преимуществами */}
      {advantageText && (
        <div
          className="prose max-w-none mb-8 text-gray-700"
          dangerouslySetInnerHTML={{ __html: advantageText }}
        ></div>
      )}

      {/* Секция для индивидуального контента/формы */}
      <section className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Индивидуальный заказ {h1Text}
        </h2>
        <p className="text-gray-700 mb-4">
          Мы изготавливаем {h1Text} по индивидуальным размерам и требованиям
          вашего проекта. Заполните форму ниже, и наши специалисты свяжутся с
          вами для уточнения деталей и расчета стоимости.
        </p>
        <div className="bg-white p-6 rounded-md shadow-inner">
          <p className="text-gray-600 text-center">
            [Здесь будет форма для индивидуального заказа]
          </p>
          <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
            Отправить запрос на расчет
          </button>
        </div>
      </section>

      {/* Дополнительные секции */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Часто задаваемые вопросы
        </h2>
        <p className="text-gray-700">
          [Здесь можно добавить секцию FAQ, специфичную для этого типа
          устройств.]
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Свяжитесь с нами
        </h2>
        <p className="text-gray-700">
          [Информация для связи или ссылка на страницу контактов.]
        </p>
      </section>
    </div>
  );
}
