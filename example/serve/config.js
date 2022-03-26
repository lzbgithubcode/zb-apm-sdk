const resolve =  require('path').resolve;

const resolveDirname = (target) => resolve(__dirname, target);

const webPerDistFilePath = resolve('./packages/web-performance/dist');
const WebPerformancePath = resolveDirname('../web-performace');
const port = 8006;

const FilePaths = {
    "web-html-path":WebPerformancePath,
    "/web-p-dist": webPerDistFilePath
};
const config = {
    port,
    FilePaths
}
module.exports = config;