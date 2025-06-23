// next.config.ts
import type { NextConfig } from "next";

const auth0Url = process.env.AUTH0_ISSUER_BASE_URL?.trim() ?? '';
const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dev-xv4wsqgagzfop5bo.us.auth0.com"],
    formats: ["image/webp", "image/avif"],
  },

  async headers() {
  const scriptSrc = [
  "'self'",
  ...(auth0Url ? [auth0Url] : []),
  isDev ? "'unsafe-eval' 'unsafe-inline'" : "'unsafe-inline'",
].join(' ');

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              `default-src 'self'`,
              `script-src ${scriptSrc}`,
              `style-src 'self' 'unsafe-inline'`,
              `img-src 'self' data:`,
              `connect-src 'self' ${process.env.AUTH0_ISSUER_BASE_URL}`,
              `frame-src 'none'`,
              `object-src 'none'`,
              `base-uri 'self'`,
              `form-action 'self'`,
              `upgrade-insecure-requests`,
            ].join("; "),
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
