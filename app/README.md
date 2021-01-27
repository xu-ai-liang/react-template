# app

存放 React 的业务代码。

## 说明

当前文件夹存放所有 React、HTML 相关的文件。

## 文件/文件夹说明

### index.html

- 单页面的静态入口文件，webpack 会基于此文件构建 index.html，是 HtmlWebpackPlugin 插件的模板文件。

### index.js

- React 的入口文件。

### store.js

- Redux 的入口文件，各个业务的 store.js 创建完成之后，会自动引入 app/store.js,拿当前模块的文件夹名称作为 key（大写开头会转小写）。在全局注入当前业务的 store,
  > 注意业务模块的文件夹名称应该是全局唯一。

### components

- 存放业务相关或非业务相关的公共组件。

### css & images

- 存放全局的 css 和图片资源。

### pages

- 存放业务相关的 React 代码

### router

- 路由的入口文件

### utils

- 工具类文件
