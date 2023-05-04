const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
});

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['firebasestorage.googleapis.com'],
//   },
// }

module.exports = nextConfig;