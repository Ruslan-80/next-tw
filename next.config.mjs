/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

// CSP для Next.js без nonce: 'unsafe-inline' нужен для inline-скриптов
// гидратации и встроенных стилей. 'unsafe-eval' — только для dev.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // HSTS только в проде: на localhost по http он бесполезен
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
      ]),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig = {
  compress: false,
  poweredByHeader: false,
  // output: "standalone",
  ...(process.env.NODE_ENV === "production" && { output: "standalone" }),
  images: {
    formats: ["image/avif", "image/webp"],
    maximumDiskCacheSize: 100 * 1024 * 1024, // 100 MB — оставляем
  },
  experimental: {
    imgOptTimeoutInSeconds: 30, // было 7 секунд по умолчанию
  },
  allowedDevOrigins: ["172.16.10.226", "localhost"],
  async headers() {
    return [
      // Security-заголовки на все маршруты. Должны идти первыми,
      // чтобы записи ниже могли переопределить отдельные ключи.
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      // Перехват URL-адреса для /catalog/ustroystva-etazhnye/[slug]
      {
        source: "/catalog/uerk",
        destination: "/landing/uerk",
      },
      {
        source: "/catalog/uerb",
        destination: "/landing/uerb",
      },
      {
        source: "/catalog/uern",
        destination: "/landing/uern",
      },
      {
        source: "/promotions",
        destination: "/landing/razrabotka",
      },
      {
        source: "/catalog/glavnye-raspredelitelnye-shity-grsh",
        destination: "/landing/razrabotka",
      },
      {
        source: "/catalog/shkafy-avtomatizacii",
        destination: "/landing/razrabotka",
      },
      {
        source:
          "/catalog/shkafy-upravleniya-s-chastotnym-preobrazovatelyami-shup",
        destination: "/landing/razrabotka",
      },

      {
        source: "/catalog/shity-silovye",
        destination: "/landing/razrabotka",
      },
      {
        source: "/catalog/paneli-upravleniya",
        destination: "/landing/razrabotka",
      },
      {
        source: "/catalog/ustrojstva-kompensacii-reaktivnoj-moshnosti-ukrm",
        destination: "/landing/razrabotka",
      },
      {
        source: "/catalog/punkty-raspredelitelnye-pr",
        destination: "/landing/razrabotka",
      },
      {
        source: "/catalog/shkafy-avtomaticheskogo-rezerva-avr",
        destination: "/landing/razrabotka",
      },
      // {
      //   source: "/catalog/vru-8504",
      //   destination: "/landing/razrabotka",
      // },
      // {
      //   source: "/catalog/vru-8505",
      //   destination: "/landing/razrabotka",
      // },
      // {
      //   source: "/catalog/vru-4",
      //   destination: "/landing/razrabotka",
      // },
    ];
  },
  async redirects() {
    return [
      {
        source: "/product/vru-1-21-10",
        destination: "/product/vru-1-21-10-250a",
        permanent: true, // 301 редирект для SEO
      },
      {
        source: "/product/vru-1-26-60a",
        destination: "/product/vru-1-26-60a-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-23-55",
        destination: "/product/vru-1-23-55-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-23-50",
        destination: "/product/vru-1-23-55-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-26-63",
        destination: "/product/vru-1-26-63-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-26-64",
        destination: "/product/vru-1-26-64-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-26-65",
        destination: "/product/vru-1-26-65-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-13-20",
        destination: "/product/vru-1-13-20-400a",
        permanent: true,
      },
      {
        source: "/product/vru-1-11-10",
        destination: "/product/vru-1-11-10-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-18-80",
        destination: "/product/vru-1-18-80-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-17-70",
        destination: "/product/vru-1-17-70-100a",
        permanent: true,
      },
      {
        source: "/product/vru-1-14-20",
        destination: "/product/vru-1-14-20-400a",
        permanent: true,
      },
      {
        source: "/product/vru-1-12-10",
        destination: "/product/vru-1-12-10k-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-18-89",
        destination: "/product/vru-1-18-89-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-13-10",
        destination: "/product/vru-1-13-10a-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-19-90",
        destination: "/product/vru-1-19-90-160a",
        permanent: true,
      },
      {
        source: "/product/vru-1-15-30",
        destination: "/product/vru-1-15-30-630a",
        permanent: true,
      },
      {
        source: "/product/vru-1-16-40",
        destination: "/product/vru-1-16-40a-800a",
        permanent: true,
      },
      {
        source: "/product/vru-1-19-99",
        destination: "/product/vru-1-19-99-160a",
        permanent: true,
      },
      {
        source: "/product/vru-1-48-03",
        destination: "/product/vru-1-48-03-100a",
        permanent: true,
      },
      {
        source: "/product/vru-1-41-00",
        destination: "/product/vru-1-41-00-100a",
        permanent: true,
      },
      {
        source: "/product/vru-1-50-00",
        destination: "/product/vru-1-50-00-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-49-00",
        destination: "/product/vru-1-49-00-s-buo-200a",
        permanent: true,
      },
      {
        source: "/product/vru-1-47-00",
        destination: "/product/vru-1-47-00-200a",
        permanent: true,
      },
      {
        source: "/product/vru-1-50-01",
        destination: "/product/vru-1-50-01-250a",
        permanent: true,
      },
      {
        source: "/product/vru-1-42-01",
        destination: "/product/vru-1-42-01-100a",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
