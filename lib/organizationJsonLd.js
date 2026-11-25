const getOrganizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ЭЛЕКТРОЩИТ-ПРО",
  telephone: "+7 (499) 390-14-67",
  url: "https://electroshit-pro.ru",
  logo: "https://electroshit-pro.ru/mainLogo.svg",
  description: "Интернет-магазин электрощитового оборудования и щитов этажных.",

  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressRegion: "Москва",
    streetAddress: "ул. Чермянская, 1с1",
  },

  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-499-390-14-67",
    email: "info@electroshit-pro.ru",
    contactType: "customer service",
  },
});

export default getOrganizationJsonLd;
