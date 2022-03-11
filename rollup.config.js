
/**
 * 作者: lzb
 * 日期: 2022-03-11 11:03
 * 功能:
 */

import path from "path";
import typescript from "@rollup/plugin-typescript";

if (!process.env.TARGET) {
    throw new Error('TARGET package must be 输入')
}

const masterVersion = require("./package.json").version;
const packagesDir = path.resolve(__dirname, 'packages');
const packageDir = path.resolve(packagesDir, process.env.TARGET);

const resolvePath = p => path.resolve(packageDir,p);
const pkg = require(resolvePath('package.json'));
const packageOptions = pkg.buildOptions || {};
const name = packageOptions.filename || path.basename(packageDir);

// ts插件
const tsPlugin = typescript({
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    tsconfigOverride:{
        compilerOptions:{

        }
    }
});


// 基础配置
const baseConfig = {
     input: `${packagesDir}/src/index.ts`,
     output:{

     },
    plugins:[
        tsPlugin
    ],
};




