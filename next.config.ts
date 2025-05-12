/*
 * Copyright (c) 2025. Sayat Raykul
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // eslint: {
  //     // Warning: This allows production builds to successfully complete even if
  //     // your project has ESLint errors.
  //     ignoreDuringBuilds: true,
  // },

  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    });
    return config;
  },
};

export default nextConfig;
