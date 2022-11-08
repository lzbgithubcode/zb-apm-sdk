/**
 * 作者: lzb
 * 日期: 2022-04-07 18:12
 * 功能:
 */
import { Config, IConfig } from "../config/config";
import { domDidLoaded } from "../utils/domLife";
import { getFP } from "../metrics/getFP";
import { getFCP } from "../metrics/getFCP";
import { getLCP } from "../metrics/getLCP";
import { getFID } from "../metrics/getFID";


/**
 *  监听性能指标
 * @param config
 */
export const startMonitorPerformance = (config: IConfig = new Config()): void => {

    // 最大内容绘制
    getLCP();

    addEventListener("pageShow", () => {
        // 获取首次渲染的FP
        getFP();

        // 获取首次内容绘制
        getFCP();

    });

    domDidLoaded(() => {
        // 获取FID
        getFID();
    })
};















