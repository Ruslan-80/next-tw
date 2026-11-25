const getOrganizationJsonLd = () => {
  const logoUrl = "https://electroshit-pro.ru/mainLogo.svg";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ЭЛЕКТРОЩИТ-ПРО",
    telephone: "+7 (499) 390-14-67",
    url: "https://electroshit-pro.ru",
    logo: logoUrl,
    image: logoUrl,
    description: "Производство электрощитового оборудования и щитов этажных.",

    address: {
      "@type": "PostalAddress",
      postalCode: "127081",
      addressCountry: "RU",
      addressRegion: "Москва",
      addressLocality: "Москва",
      streetAddress: "ул. Чермянская, д. 1, стр. 1",
    },

    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-499-390-14-67",
      email: "info@electroshit-pro.ru",
      contactType: "customer service",
    },
  };
};

export default getOrganizationJsonLd;
