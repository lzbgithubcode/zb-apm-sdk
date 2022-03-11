const path = require("path");
const {allTargets, logError, logInfo, getArgv, getPkg, getTargetDirPath, runBin} = require("./utils");

// 获取参数
const args = getArgv();
const targets = args._; // 包文件 list
const isBuildTypes = (args.types || args.t) === "true"; // 是否构建类型type 对应 --types 或者 -t
const isBuildMatching = (args.all || args.a) === "true";  // 是否构建匹配到的包
const isRollupWatch = (args.watch || args.w) === "true";  // 是否观察rollup 的watch
const isSourcemap = (args.sourceMap || args.s) === "true";  // 是否开启rollup 的sourceMap




run();

/**
 * 运行
 * @returns {Promise<void>}
 */
async  function run() {

    if(targets && targets.length > 0){
       await  buildAll(targets);
    }else {
      await  buildAll(allTargets);
    }
}


/**
 * 编译所有
 * @returns {Promise<void>}
 */
async function buildAll(pTargets) {
    const count = require('os').cpus().length;
    await  runParallel(count, pTargets, build);
}


/**
 *  并发构建
 */
async function runParallel(maxConcurrency, sourceTargets, iteratorFn){

    const ret = [];
    const executing = [];
    const maxTargetLen = sourceTargets.length;
     for (const  item of sourceTargets){

         // 增加到微任务队列
         const p = Promise.resolve().then(()=>  iteratorFn(item));
         ret.push(p);

         // 超过CPU的核数量
         if(maxConcurrency <= maxTargetLen){
             const  e = p.then(()=> executing.splice(executing.indexOf(e), 1))
             executing.push(e);
             if(executing.length >= maxConcurrency){
                 await Promise.race(executing);
             }
         }
     }
     return  Promise.all(ret);

}


/**
 * 编译当个包
 * target 单个包名称
 * @returns {Promise<void>}
 */
async function build(target) {

    // 1. 获取package.json文件
    const pkg = getPkg(target);

    // 2. 如果是私有 获取没有获取到包
    if(!allTargets.length || pkg.private){
        return;
    }

    // 3. 运行命令的参数
    const args = [
        '-c',
        '--environment',
        `TARGET:${target}`,

    ];
    // isBuildTypes ? `TYPES:true`: `TYPES:false`,
    console.log('运行命令的参数------',args);
    await runBin('rollup', args);

    // 4.是否定义类型
    if(isBuildTypes && pkg.types){
        logInfo(`Roll up 正在 对 ${target} 进行类型定义`);
    }

}


