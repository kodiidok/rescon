const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Create a proxy instance with the target and other options
const apiProxy = createProxyMiddleware('/api', {
  target: 'http://139.59.24.47:3333',
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/api': '', // remove the /api prefix when forwarding the request
  },
});

app.prepare().then(() => {
  const server = express();

  // Use the created proxy for requests to /api/*
  server.use('/api', apiProxy);

  // Default route handling
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
