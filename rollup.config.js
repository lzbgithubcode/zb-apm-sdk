
/**
 * 作者: lzb
 * 日期: 2022-03-11 11:03
 * 功能:
 */

import path from "path";
import typescript from "@rollup/plugin-typescript";
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

if (!process.env.TARGET) {
    throw new Error('TARGET package must be 输入')
}

const masterVersion = require("./package.json").version;
const packagesDir = path.resolve(__dirname, 'packages');
const pkgDir = path.resolve(packagesDir, process.env.TARGET);

const resolvePath = p => path.resolve(pkgDir,p);
const pkg = require(resolvePath('package.json'));
const packageOptions = pkg.buildOptions || {};
const name = packageOptions.filename || path.basename(pkgDir);

// ts插件
const tsPlugin = typescript({
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
});
const commonjsPlugin  = commonjs();
const nodeResolvePlugin = nodeResolve();

console.log('==========',pkgDir);
// 基础配置
const baseConfig = {
     input: `${pkgDir}/src/index.ts`,
     output:{
         file: `dist/${process.env.TARGET}/${name}.min.js`,
         format: 'cjs'
     },
    plugins:[
        tsPlugin,
        commonjsPlugin,
        nodeResolvePlugin
    ],
};

export default baseConfig;




