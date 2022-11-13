###### 一、 主体方案

pnpm + monorepo(单一仓库多个项目/包)

```
// 全局安装包
pnpm install react -w

// 给某个package单独安装指定依赖
pnpm add axios --filter @zb/web-error

// 模块之间的相互引用
pnpm install @zb/core -r --filter @zb/web-error

```
