import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configuración para Docker
  output: 'standalone',

  // Configuración de imágenes optimizada
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.crystodolarvzla.site',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Configuración de headers optimizada para rendimiento
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value:
              'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value:
              'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          },
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          },
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
      {
        source:
          '/:path*\\.(js|css|woff|woff2|ttf|eot|svg|ico|png|jpg|jpeg|gif|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
        ],
      },
    ];
  },

  // Configuración de rewrites para API
  async rewrites() {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      'https://crystodolar-api-production.up.railway.app';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },

  // Configuración de webpack optimizada
  webpack: (config, { isServer, dev }) => {
    // Configuración específica para el cliente
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Optimizaciones de producción
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },

  // Configuración de compilación optimizada
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },

  // Configuración experimental para optimizaciones
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot'],
    gzipSize: true,
    serverComponentsExternalPackages: ['sharp'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Configuración de TypeScript
  typescript: {
    // Ignorar errores de TypeScript durante el build
    ignoreBuildErrors: false,
  },

  // Configuración de ESLint
  eslint: {
    // Ignorar errores de ESLint durante el build
    ignoreDuringBuilds: false,
  },

  // Configuración de trailing slash
  trailingSlash: false,

  // Configuración de powered by header
  poweredByHeader: false,

  // Configuración de compress mejorada
  compress: true,

  // Configuración de generateEtags
  generateEtags: true,

  // Configuración de distDir
  distDir: '.next',

  // Configuración de cleanDistDir
  cleanDistDir: true,

  // Configuración de i18n (internacionalización)
  i18n: null,

  // Configuración de reactStrictMode
  reactStrictMode: true,
};

export default nextConfig;
