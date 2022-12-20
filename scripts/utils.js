const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const execa = require("execa");


// ==========================================打印日志=================================================
/**
 * 打印日志
 */
const logError = (msg)=>  {console.log(); console.log(`${chalk.bgRed.white(' ERROR ')} ${chalk.red(msg)}`);  console.log();};
const logInfo = (msg)=> console.log(chalk.cyan(msg));
const logUnderline = (msg)=> console.log(chalk.underline(msg));
const logWarn = (msg)=> console.log(`${chalk.bgYellow.white('warn')} ${chalk.yellow(msg)}`);



// ==========================================文件操作=================================================
/**
 * 获取目标文件夹
 */
const allTargets = fs.readdirSync('packages').filter(f => {
     if(!fs.statSync(`packages/${f}`).isDirectory()){
         return false;
     }
     const pkg = require(`../packages/${f}/package.json`);
     if(pkg.private && !pkg.buildOptions){
         return false;
     }
     return  true;
});


const fuzzyMatchTarget = (partialTargets, includeAllMatching)=>{
    const matched = [];
    partialTargets.forEach(partialTarget => {
        for (const target of allTargets) {
            if (target.match(partialTarget)) {
                matched.push(target);
                if (!includeAllMatching) {
                    break;
                }
            }
        }
    });
    if (matched.length) {
        return matched
    } else {
        logError(`Target ${logUnderline(partialTargets)} not found!`);
        process.exit(1)
    }
};

/**
 *  获取包的文件夹路径
 */
const getTargetDirPath = (target)=>{
    return path.resolve(`packages/${target}`);
};

/**
 *  获取包的文件的package.json文件
 */
const getPkg = (target)=>{
    return require(`${getTargetDirPath(target)}/package.json`);
};

// ==========================================命令操作=================================================
/**
 * 获取命令参数
 */
const getArgv = ()=>{
    const argv = require('minimist')(process.argv.slice(2));
    return argv;
};

/**
 * 执行命令
 */
const runBin =  (bin, args, options = {})=>{
     return  execa(bin, args, {stdio: 'inherit', ...options});
};




// ==========================================导出数据=================================================

module.exports.logError = logError;
module.exports.logInfo = logInfo;
module.exports.logUnderline = logUnderline;
module.exports.logWarn = logWarn;

module.exports.allTargets = allTargets;
module.exports.fuzzyMatchTarget = fuzzyMatchTarget;
module.exports.getTargetDirPath = getTargetDirPath;
module.exports.getPkg = getPkg;


module.exports.getArgv = getArgv;
module.exports.runBin = runBin;




