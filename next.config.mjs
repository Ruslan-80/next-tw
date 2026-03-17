/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: ["http://172.16.10.216:3000", "http://localhost:3000"],

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
        source: "/catalog/vru-3",
        destination: "/landing/razrabotka",
      },
      {
        source: "/catalog/vru-21",
        destination: "/landing/razrabotka",
      },
      {
        source: "/catalog/vru-8504",
        destination: "/landing/razrabotka",
      },
      {
        source: "/catalog/vru-8505",
        destination: "/landing/razrabotka",
      },
      {
        source: "/catalog/vru-4",
        destination: "/landing/razrabotka",
      }
    ];
  },
};

export default nextConfig;

      // {
      //   source: "/catalog/vru-1",
      //   destination: "/landing/razrabotka",
      // },
      // {
      //   source: "/catalog/vru-3",
      //   destination: "/landing/razrabotka",
      // },
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
      // {
      //   source: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru",
      //   destination: "/landing/razrabotka",
      // },
