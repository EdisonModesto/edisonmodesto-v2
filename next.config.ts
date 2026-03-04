import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  env: {
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    GH_TOKEN: process.env.GH_TOKEN,
    GITHUB_OWNER: process.env.GITHUB_OWNER,
    GITHUB_REPO: process.env.GITHUB_REPO
  }
};

export default nextConfig;
