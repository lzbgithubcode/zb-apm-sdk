/**
 * 作者: lzb
 * 日期: 2022-04-08 18:45
 * 功能:
 */

import { interfaces } from "../interfaces/interfaces";
/**
 *  页面隐藏监听函数
 * @param cb  隐藏回调
 * @param once 是否只是执行一次
 */
export const onHidden = (cb: interfaces.IEventCallBack, once?: boolean) => {

    // 监听隐藏函数
    const onHiddenOrPageHide = (event: Event) => {
        // 页面隐藏
        if (event.type == "pagehide" || document.visibilityState == "hidden") {
            cb && cb(event);
            if (once) {
                removeEventListener("visibilitychange", onHiddenOrPageHide, true);
                removeEventListener('pagehide', onHiddenOrPageHide, true)
            }
        }
    };
    addEventListener('visibilitychange', onHiddenOrPageHide, true);
    addEventListener('pagehide', onHiddenOrPageHide, true)
}
/**
 * 监听页面从缓存的读取显示
 * @param cb 回调
 */
export const onCachePageShow = (cb: interfaces.IPageCacheEventCallBack) => {
    addEventListener("pageshow", event => {
        // 从缓存中获取页面显示
        if (event.persisted) {
            cb && cb(event);
        }
    }, true);
}

let firstHiddenTime = document.visibilityState === 'hidden' ? 0 : Infinity
/**
 *  获取首次隐藏时间
 */
export const getFirstHiddenTime = () => {
    // 监听一次隐藏
    onHidden((e: Event) => {
        firstHiddenTime = Math.min(firstHiddenTime, e.timeStamp)
    }, true);

    return {
        get timeStamp() {
            return firstHiddenTime;
        }
    }
}



