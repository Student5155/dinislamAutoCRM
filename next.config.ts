import type { NextConfig } from "next";

/**
 * Статическая сборка (out/) — совместима с GitHub Pages и любым статическим хостингом.
 * Для GitHub Pages в подпапке репозитория задайте NEXT_PUBLIC_BASE_PATH=/имя-репозитория
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
