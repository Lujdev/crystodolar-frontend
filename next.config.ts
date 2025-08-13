import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Opcional: si deseas usar un proxy en desarrollo, configura
   * NEXT_PUBLIC_API_BASE_URL vacío y agrega rewrites aquí.
   */
  async rewrites() {
    return process.env.NEXT_PUBLIC_API_BASE_URL
      ? []
      : [
          {
            source: "/api/:path*",
            destination: `${process.env.API_PROXY_TARGET || "http://localhost:8000"}/api/:path*`,
          },
        ]
  },
};

export default nextConfig;
