/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //     allowedDevOrigins: "all",
  // },

  async rewrites() {
    return [
      // Перехват URL-адреса для /catalog/ustroystva-etazhnye
      {
        source: "/catalog/ustroystva-etazhnye",
        destination: "/landing/ustroystva-etazhnye",
      },
      // Перехват URL-адреса для /catalog/ustroystva-etazhnye/[slug]
      {
        source: "/catalog/uerk",
        destination: "/landing/uerk",
      },
      {
        source: "/catalog/uerv",
        destination: "/landing/uerv",
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
        source: "/catalog/uerm",
        destination: "/landing/uerm",
      },
    ];
  },
};

export default nextConfig;
