const Express = require('express');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const open = require('open');
const router = require('./router');
const historyRouter = require('./historyRouter');
const webpackConfig = require('../webpack/webpack.dev.js');

const app = new Express();
const { NODE_ENV } = process.env;
const defaultPort = 3010;
console.log(`NODE_ENV: ${NODE_ENV}`);

// nodejs 端支持 react-router 的 historyRouter
// 避免刷新浏览器出现 404 页面
app.use(historyRouter());

if (NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  const devMiddleware = webpackDevMiddleware(compiler, {
    // Webpack 输出资源绑定在 HTTP 服务器上的根目录，
    // 和 Webpack 配置中的 publicPath 含义一致
    publicPath: '/',
    // 不输出 info 类型的日志到控制台，只输出 warn 和 error 类型的日志
    noInfo: true,
    // 统计信息输出样式，不需要统计信息
    stats: 'none',
  });
  // webpack 编译
  app.use(devMiddleware);
  // webpack 编译结束后回调函数
  devMiddleware.waitUntilValid(() => {
    open(`http://localhost:3010`);
  });
  // 使用热跟新
  app.use(webpackHotMiddleware(compiler));
}

// 静态资源：webpack 编译之后的静态资源
app.use(Express.static(path.resolve('dist')));
router(app);

app.listen(defaultPort, () => {
  console.log(`web server start on ${defaultPort}`);
});

// 监听 ctrl + c 事件，正常退出程序。
process.on('SIGINT', () => {
  process.exit();
});
