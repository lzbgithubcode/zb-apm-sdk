###### 一、 主体方案

1. pnpm + monorepo(单一仓库多个项目/包)

```
// 全局安装包
pnpm install react -w

// 给某个package单独安装指定依赖
pnpm add axios --filter @zb/web-error

// 模块之间的相互引用
pnpm install @zb/core -r --filter @zb/web-error
```

2.构建工具满足(amd.js /cmd.js/ common.js /es module / node/ min.js)
我们使用 rollup

3.
