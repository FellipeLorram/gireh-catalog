const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
});

// const nextConfig = {
//   reactStrictMode: true,
// }

module.exports = nextConfig;