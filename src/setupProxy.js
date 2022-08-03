const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/master-admin',
    createProxyMiddleware({
      target: process.env.PROXY_HOST || 'http://localhost:3333',
      changeOrigin: true,
    })
  );
};