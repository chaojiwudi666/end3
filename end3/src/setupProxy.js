const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use( 
    proxy('/admininfo', {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }),
    proxy('/api', {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }),
    
  );
};
