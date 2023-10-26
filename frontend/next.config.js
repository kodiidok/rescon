/** @type {import('next').NextConfig} */
const customServer = "http://localhost:3333";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/",
        destination: `${customServer}/`,
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/',
  //       headers: [
  //         {
  //           key: 'x-custom-header',
  //           value: 'my custom header value',
  //         },
  //       ],
  //     },
  //   ]
  // },
};

module.exports = nextConfig;
