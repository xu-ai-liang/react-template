## app/pages

存放业务组件。一个业务一个文件夹，大驼峰命名。
整体布局相关的组件，取名：Layout/sidebar、Layout/header 等。
业务相关的组件，使用模块名称或 api 路径里的模块名称。
如用户管理，取名：User。

## 组件文件约定

具体参照 DemoRedux

# 约定式路由

pages 下的每一个文件都是一个路由 比如 /a 就是读取 /a/index.js , 模块下的业务组件拆分可以放在各自模块的 Components 文件夹下，
Components，Login，Layout，404 这些文件都不会创建路由。
