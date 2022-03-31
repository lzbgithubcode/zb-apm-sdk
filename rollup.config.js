
/**
 * 作者: lzb
 * 日期: 2022-03-11 11:03
 * 功能:
 */

import path from "path";
import typescript from "@rollup/plugin-typescript";
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sizes from 'rollup-plugin-sizes';
import cleanup from 'rollup-plugin-cleanup';


if (!process.env.TARGET) {
    throw new Error('TARGET package must be 输入')
}

const masterVersion = require("./package.json").version;
const packagesDir = path.resolve(__dirname, 'packages');
const pkgDir = path.resolve(packagesDir, process.env.TARGET);
const packageDirDist = `${pkgDir}/dist`;

const resolvePath = p => path.resolve(pkgDir,p);
const pkg = require(resolvePath('package.json'));
const packageOptions = pkg.buildOptions || {};
const name = packageOptions.filename || path.basename(pkgDir);

// ts插件
const tsPlugin = typescript({
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),

});
const commonjsPlugin  =  commonjs({
    exclude: 'node_modules'
});
const nodeResolvePlugin = nodeResolve();

// 打包大小插件
const sizePlugin = sizes();
// 清楚插件
const cleanupPlugin = cleanup({
    comments: 'none'
});

console.log('==========',pkgDir);
// 基础配置
const baseConfig = {
      // 输入
     input: `${pkgDir}/src/index.ts`,
     // 输出 require
     output:{
         name:"zb",
         sourcemap: false,
         minifyInternalExports: true,
     },
    plugins:[
        sizePlugin,
        cleanupPlugin,
        tsPlugin,
        commonjsPlugin,
        nodeResolvePlugin
    ],
};

// 结果是commonjs，适用于node与webpack
const cjsConfig = {
    ...baseConfig,
    output:{
        file: `${packageDirDist}/${name}.js`,
        format: 'cjs',
    },

};

// 结果是自动执行函数 -适用于 script标签引用, 只能在浏览器使用
const iifeConfig = {
    ...baseConfig,
    output:{
        file: `${packageDirDist}/${name}.min.js`,
        format: 'iife',
    },
};

// 结果是es模块
const esConfig = {
    ...baseConfig,
    output:{
        file: `${packageDirDist}/${name}.es.js`,
        format: 'es',
    },
};

const config = {
    cjsConfig,
    iifeConfig,
    esConfig
}


export default [...Object.values(config)];




