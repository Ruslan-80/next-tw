const getBlogJsonLd = (title, description, images, slug, datePublished) => {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blogs/${slug}`,
    },
    headline: title,
    description: description,
    image: [
      "https://electroshit-pro.ru/img/schit-etazhniy-glavnoe.jpg",
      "https://electroshit-pro.ru/img/schit-etazhniy-shema.png",
    ],

    datePublished: "2025-01-01",
    dateModified: "2025-11-07",
    author: {
      "@type": "Person",
      name: "Имя Эксперта (Автор)",
      url: "https://electroshit-pro.ru/ob-avtore",
    },
    publisher: {
      "@type": "Organization",
      name: "ElectroShit Pro",
      logo: {
        "@type": "ImageObject",
        url: "https://electroshit-pro.ru/img/logo-bloga.png",
      },
    },
    articleSection: [
      "Что такое щит этажный ЩЭ",
      "Конструкция и устройство ЩЭ",
      "Виды этажных щитов по способу установки",
      "Технические характеристики ЩЭ",
      "Расключение этажного щита: пошаговая инструкция",
      "Схемы подключения этажных щитов",
      "Типичные ошибки при монтаже ЩЭ",
      "Техническое обслуживание и эксплуатация",
    ],
    wordCount: 1133,
  };
};

export default getBlogJsonLd;
