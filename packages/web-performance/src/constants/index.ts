/**
 * 作者: lzb
 * 日期: 2022-03-11 18:39
 * 功能:
 */
export enum PerformanceNameType {
    NT = "navigation-timing",   // 参数
    FP = "first-paint",  // 首次绘制
    FCP = 'first-contentful-paint',  // 首次内容绘制 页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间
    LCP = 'largest-contentful-paint',  // 最大内容绘制
    FID = "first-input",  //  次输入延迟 (FID)
}
