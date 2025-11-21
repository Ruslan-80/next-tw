/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{html,jsx,js}", "./components/**/*.{html,jsx,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#132A87", // основной синий
        accent: "#f47b20", // акцентный оранжевый
        light: "#f4f6fb", // светло-серый фон
        dark: "#222222", // темный для текста
        blue: "#3656b0", // дополнительный синий
        orange: "#ffd6a0", // мягкий оранжевый
        link: "#6cb4f4", // голубой для ссылок
        white: "#ffffff",
        // Палитра для dark mode (используйте классы dark:bg- и пр.)
        "dm-bg": "#13151D", // глубокий тёмный фон
        "dm-card": "#1b2030", // фон карточек/блоков
        "dm-text": "#F4F6FB", // базовый цвет текста
        "dm-accent": "#ff9949", // тёплый акцент
        "dm-link": "#6cb4f4", // голубой для ссылок
      },
    },
    fontSize: {
      base: "18px", // Измените значение, например, на '18px' или ['18px', { lineHeight: '1.5' }]
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Roboto", "serif"],
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
