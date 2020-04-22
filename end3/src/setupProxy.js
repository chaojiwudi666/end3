const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/rest', {
      target: 'https://tst.feigeyuxin.com',
      changeOrigin: true,
      // pathRewrite: {
      //   "^/server": '/'
      // }
    }),
    proxy('/Service', {
      target: 'http://testapiparty.xinhuaapp.com',
      changeOrigin: true,
    }),
    
  );
};
