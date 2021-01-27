const { createProxyMiddleware } = require('http-proxy-middleware');

const { NODE_ENV, BACKEND } = process.env;
console.log(`process.env.backend: ${BACKEND}`);

function router(app) {
  // 实际项目中，Demo 代码可以删除
  // [Demo] 用户列表
  app.get('/api/demo/user', (req, res) => {
    res.json({
      code: 0,
      list: [],
    });
  });

  // [Demo] 新增
  app.post('/api/demo/user', (req, res) => {
    res.json({ code: 0 });
  });

  /**
   * 实际项目中，以下代码不要删除！！
   */
  if (NODE_ENV !== 'production') {
    // 本地开发，定义各个模块的后端地址
    const devUrl = [
      ['/api/a', 'http://192.168.1.2:8081'], // a 模块的后端地址
      ['/api/b', 'http://192.168.1.3:8080'], // b 模块的后端地址
    ];
    devUrl.forEach((v) => {
      app.use(
        v[0],
        createProxyMiddleware({
          target: v[1],
          changeOrigin: true,
          // 路径重写
          pathRewrite: {
            '^/api': '',
          },
        })
      );
    });
  }

  // http 代理，转发前端的请求至后端，`/api` 为前缀的请求统一走代理
  app.use(
    '/api',
    createProxyMiddleware({
      // 集成开发 / 测试 / 生产环境通过环境变量的方式更改后端 api 地址
      target: BACKEND || '/',
      changeOrigin: true,
      // 路径重写
      // 如果后端提供的 api 地址不包含 `/api` 字样，删除 `/api`
      pathRewrite: {
        '^/api': '',
      },
    })
  );
}

module.exports = router;
