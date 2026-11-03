import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Rotas removidas: links antigos (LinkedIn, Google) seguem para a home.
  redirects: async () => [
    { source: '/projects', destination: '/#projetos', permanent: true },
    { source: '/projects/:path*', destination: '/#projetos', permanent: true },
    { source: '/blog', destination: '/', permanent: true },
  ],
  headers: async () => [
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, stale-while-revalidate=43200',
        },
      ],
    },
  ],
};

export default nextConfig;
