const path = require("path");
const {allTargets, logError, logInfo, getArgv, getPkg, getTargetDirPath} = require("./utils");

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




    console.log('获取所有的参数------',args);
}


/**
 * 编译所有
 * @returns {Promise<void>}
 */
async function buildAll() {

}


/**
 *  并发构建
 */
async function runParallel(){


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
        isBuildTypes ? `TYPES: true`: `TYPES: false`,
        isSourcemap ? `SOURCE_MAP: true`: `SOURCE_MAP: false`,
    ];

    await runBin('rollup', args);

    // 4.

}


