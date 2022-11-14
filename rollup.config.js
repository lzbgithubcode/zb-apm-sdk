import path from "path";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import sizes from "rollup-plugin-sizes";
import cleanup from "rollup-plugin-cleanup";
import clear from "rollup-plugin-clear";

if (!process.env.TARGET) {
  throw new Error("TARGET package must be 输入");
}

const masterVersion = require("./package.json").version;
const packagesDir = path.resolve(__dirname, "packages");
const packageSubDir = path.resolve(packagesDir, process.env.TARGET);
const packageDirDist = `${packageSubDir}/dist`;

const resolvePath = (p) => path.resolve(packageSubDir, p);
const pkg = require(resolvePath("package.json"));
const packageOptions = pkg.buildOptions || {};
const name = packageOptions.filename || path.basename(packageSubDir);

// ts插件
const tsPlugin = typescript({
  tsconfig: path.resolve(__dirname, "tsconfig.json"),
  compilerOptions: {
    lib: ["es5", "es6", "dom"],
    target: "es5",
    module: "ESNext",
    // declarationDir: packageDirDist, // 类型声明文件的输出目录
  },
});
const commonjsPlugin = commonjs({
  exclude: "node_modules",
});
const nodeResolvePlugin = nodeResolve();

// 打包大小插件
const sizePlugin = sizes();
// 清楚插件
const cleanupPlugin = cleanup({
  comments: "none",
});
const clearPlugin = clear({
  targets: [packageDirDist],
});

// 基础配置
const baseConfig = {
  // 输入
  input: `${packageSubDir}/src/index.ts`,
  // 输出 require
  output: {
    name: "ZBApm",
    sourcemap: false,
    minifyInternalExports: true,
  },
  plugins: [
    sizePlugin,
    cleanupPlugin,
    tsPlugin,
    commonjsPlugin,
    nodeResolvePlugin,
    clearPlugin,
  ],
};

// 结果是commonjs，适用于node与webpack
const cjsConfig = {
  ...baseConfig,
  output: {
    file: `${packageDirDist}/${name}.js`,
    format: "cjs",
    ...baseConfig.output,
  },
  plugins: [...baseConfig.plugins],
};

// 结果是自动执行函数 -适用于 script标签引用, 只能在浏览器使用
const iifeConfig = {
  ...baseConfig,
  output: {
    file: `${packageDirDist}/${name}.min.js`,
    format: "iife",
    name: "ZBApm",
    ...baseConfig.output,
  },
  plugins: [...baseConfig.plugins],
};

// 结果是es模块
const esConfig = {
  ...baseConfig,
  output: {
    file: `${packageDirDist}/${name}.es.js`,
    format: "es",
    ...baseConfig.output,
  },
  plugins: [...baseConfig.plugins],
};

const config = {
  cjsConfig,
  iifeConfig,
  esConfig,
};

export default [...Object.values(config)];
