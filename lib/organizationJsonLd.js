const getOrganizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ЭЛЕКТРОЩИТ-ПРО",
  url: "https://electroshit-pro.ru", // Замените на ваш домен
  logo: "https://electroshit-pro.ru/mainLogo.svg", // Замените на URL логотипа
  description: "Интернет-магазин электрощитового оборудования и щитов этажных.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressRegion: "Москва", // Укажите ваш регион
    postalCode: "123456", // Укажите почтовый индекс
    streetAddress: "ул. Чермянская, 1с1", // Укажите адрес
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-499-390-14-67", // Укажите телефон
    email: "info@electroshit-pro.ru", // Укажите email
    contactType: "customer service",
  },
  sameAs: [
    "https://vk.com/your-page", // Соцсети, если есть
    "https://t.me/your-page",
  ],
});

export default getOrganizationJsonLd;
