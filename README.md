# Web-template

前端项目脚手架（目录结构）模版

## 使用命令行工具安装

```
npm i yx-web-cli -g

yx-web init project-name
```

## 技术架构

React + Redux + Nodejs + Webpack

## 开发

`npm start` 本地开发调试

修改后端代理地址：/server/router.js devUrl 变量

`npm run build` 本地 / 线上编译，生成静态的 html 页面

## 镜像

### build 镜像

```
docker build -t web-template:0.0.1 .
```

### run 镜像

```
docker run -p 3010:3010 -e BACKEND=http://192.168.1.1 -d web-template:0.0.1
```

### 修改后端 api 地址

docker run 的时候，设置 BACKEND 环境变量：`-e BACKEND=后端地址`

## 开发规范

- /app/pages 前端业务代码 [/app/pages/README.md](/app/pages/README.md)
- /server Nodejs 代码 [/server/README.md](/server/README.md)
- 单个页面/组件文件，代码量控制在 300 行以内，超过该数目，请适当对业务内容进行拆分。
- 除极个别情况（需要与前端项目负责人沟通确认），不可以在业务代码中使用 `eslint-disable` 的方式跳过 `eslint` 校验规则。

更多开发规范，移步 [/app/pages/DemoRedux/README.md](/app/pages/DemoRedux/README.md)
