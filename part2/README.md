# Invites 项目文档

## 1. 项目简介
Invites 是作业第 2 部分的基础 Angular 多页面库存管理系统。该项目围绕库存维护、搜索筛选、隐私安全说明和帮助支持展开，使用路由分隔不同功能页面，适合作业中的扩展型前端应用展示。

## 2. 页面结构
系统包含 5 个页面：
- 主页：说明系统用途和功能入口。
- 库存管理页：新增、编辑、更新、删除库存项目。
- 搜索筛选页：按名称、类别、库存状态和热门状态筛选。
- 隐私与安全页：说明关键安全考量。
- 帮助页：常见问题和故障排除指南。

## 3. 核心功能
- 新增库存项目。
- 按物品名称执行更新。
- 按物品名称执行删除，并提供删除确认。
- 按名称搜索库存。
- 显示全部库存。
- 显示全部热门库存。
- 对编号、数量、价格、必填字段进行校验。
- 支持页面间导航和响应式布局。

## 4. 数据模型
库存模型由 TypeScript 接口定义，主要字段如下：
- 物品编号
- 物品名称
- 类别
- 数量
- 价格
- 供应商名称
- 库存状态
- 热门物品
- 评论

类别和库存状态采用固定枚举值，减少非法输入。评论字段为可选字段。

## 5. 技术说明
- 框架：Angular 21
- 语言：TypeScript
- 路由：Angular Router
- 表单：模板驱动表单
- 数据存储：服务内数组
- 组件结构：主页、库存页、搜索页、隐私页、帮助页

## 6. 项目结构
- [src/app/app.ts](src/app/app.ts)：应用壳、导航和路由出口。
- [src/app/app.html](src/app/app.html)：顶部导航与页面容器。
- [src/app/app.css](src/app/app.css)：全局布局与导航样式。
- [src/app/app.routes.ts](src/app/app.routes.ts)：页面路由配置。
- [src/app/services/inventory.service.ts](src/app/services/inventory.service.ts)：库存数据与业务逻辑。
- [src/app/models/inventory-item.model.ts](src/app/models/inventory-item.model.ts)：数据接口和类型定义。
- [src/app/pages/](src/app/pages/)：各页面组件目录。

## 7. 运行方式
在项目根目录执行：

```bash
npm install
npm run build
npm start
```

开发模式可使用：

```bash
ng serve
```

然后在浏览器打开 `http://localhost:4200/`。

## 8. 验证要点
- 编号必须唯一。
- 数量和价格必须为合法数字。
- 必填字段不能为空。
- 更新和删除均按物品名称执行。
- 搜索页支持组合筛选。

## 9. 提交说明
该项目应作为作业第 2 部分单独存放和提交，并与第 1 部分清楚区分。
