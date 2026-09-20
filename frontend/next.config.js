/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  env: {
    VITE_SERVER:
      process.env.NEXT_PUBLIC_SERVER ||
      process.env.VITE_SERVER ||
      "https://suraj-jaiswar-ecommerce.onrender.com",
    VITE_STRIPE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_KEY ||
      process.env.VITE_STRIPE_KEY ||
      "",
    VITE_FIREBASE_KEY:
      process.env.NEXT_PUBLIC_FIREBASE_KEY ||
      process.env.VITE_FIREBASE_KEY ||
      "",
    VITE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_AUTH_DOMAIN ||
      process.env.VITE_AUTH_DOMAIN ||
      "",
    VITE_PROJECT_ID:
      process.env.NEXT_PUBLIC_PROJECT_ID ||
      process.env.VITE_PROJECT_ID ||
      "",
    VITE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_STORAGE_BUCKET ||
      process.env.VITE_STORAGE_BUCKET ||
      "",
    VITE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID ||
      process.env.VITE_MESSAGING_SENDER_ID ||
      "",
    VITE_APP_ID:
      process.env.NEXT_PUBLIC_APP_ID ||
      process.env.VITE_APP_ID ||
      "",
  },
};

module.exports = nextConfig;
