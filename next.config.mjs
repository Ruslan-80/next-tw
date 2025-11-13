/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: ["http://172.16.10.216:3000"],

  async rewrites() {
    return [
      // Перехват URL-адреса для /catalog/ustroystva-etazhnye
      // {
      //   source: "/catalog/ustroystva-etazhnye",
      //   destination: "/landing/ustroystva-etazhnye",
      // },
      // Перехват URL-адреса для /catalog/ustroystva-etazhnye/[slug]
      {
        source: "/catalog/uerk",
        destination: "/landing/uerk",
      },
      // {
      //   source: "/catalog/uerv",
      //   destination: "/landing/uerv",
      // },
      {
        source: "/catalog/uerb",
        destination: "/landing/uerb",
      },
      {
        source: "/catalog/uern",
        destination: "/landing/uern",
      },
      // {
      //   source: "/catalog/uerm",
      //   destination: "/landing/uerm",
      // },
      {
        source: "/catalog/vru-1",
        destination: "/landing/razrabotka",
      },
      {
        source: "/catalog/vru-3",
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
      },
      {
        source: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru",
        destination: "/landing/razrabotka",
      },
    ];
  },
};

export default nextConfig;
