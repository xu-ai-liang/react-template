const isExcludeFile = (url) => {
  // 排除 store.js, api.js, Layout, Login, Components
  // Windows 下 \  mac 下是 /
  const reg = /(^\.(\/|\\)index\.js$)|((\/|\\)404(\/|\\))|((\/|\\)Layout(\/|\\))|((\/|\\)Login(\/|\\))|((\/|\\)Components(\/|\\))|(store\.js$)|(api\.js$)/;
  return reg.test(url);
};
const buildRouter = () => {
  const router = [];
  const requireResult = require.context('../pages', true, /\.js$/);
  requireResult.keys().forEach((item) => {
    if (!isExcludeFile(item)) {
      const defaultComponent = requireResult(item)?.default;
      let path = '';
      if (/index\.js$/.test(item)) {
        // windows 下可能有问题
        path = item.replace(/\.(.+)(\/|\\)index\.js/, (_, arg1) => {
          return arg1.replace(/\\/g, '/');
        });
      } else {
        path = item.replace(/\.(.+)\.js/, (_, arg1) => {
          return arg1.replace(/\\/g, '/');
        });
      }
      if (/\/[A-Z]/.test(path)) {
        path = path.replace(/\/[A-Z]/g, (arg) => {
          return `${arg}`.toLowerCase();
        });
      }
      if (defaultComponent) {
        router.push({
          path,
          component: item,
        });
      }
    }
  });
  return router;
};
export default buildRouter;
