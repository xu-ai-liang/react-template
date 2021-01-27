# server

存放 Nodejs 相关代码

## 说明

本地开发，线上运行，以 Nodejs 为 http 服务。

## 文件说明

### index.js

- Nodejs 入口文件。npm start 命令就是调用此文件。
- 在开发环境，该文件实现了 webpack 打包、热更新等功能。

### router.js

- Nodejs 的路由文件。
- 该文件实现了如下功能：http 代理转发（解决前后端跨域问题），配置开发联调地址
- 在开发环境，后端地址由 devUrl 配置
- 在线上环境，后端地址由环境变量 BACKEND 配置
