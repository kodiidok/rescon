/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require("http-proxy-middleware");

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3333/:path*", // Proxy to your backend server
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Add CORS headers if needed
        ],
      },
    ];
  },
};

module.exports = nextConfig;
