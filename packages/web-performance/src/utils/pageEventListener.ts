/**
 *   页面事件监听
 */
import {sysInterfaces} from "../interfaces/sysInterfaces";

/**
 * 页面隐藏事件监听
 */
export const onHidden = (cb: sysInterfaces.IOnHiddenCallback, once: boolean = false) => {
    const onHiddenOrPageHide = (event: Event) => {
        if(event.type == "pagehide" || document.visibilityState === 'hidden'){
             cb(event);
             // 如果只是监听一次
             if(once){
                 removeEventListener('visibilitychange', onHiddenOrPageHide, true);
                 removeEventListener("pagehide", onHiddenOrPageHide, true);
             }
        }
    };
    // 当其选项卡的内容变得可见或被隐藏时，会在文档上触发
     addEventListener('visibilitychange', onHiddenOrPageHide, true);

     // 当浏览器在显示与会话历史记录不同的页面的过程中隐藏当前页面时, pagehide(页面隐藏)事件会被发送到一个
     addEventListener("pagehide", onHiddenOrPageHide, true);
}


/**
 * 页面缓存中加载显示
 * @param cb
 */
export const onCacheShow = (cb: sysInterfaces.IOnShowCallback) => {

    addEventListener('pageshow', (event:PageTransitionEvent) => {
        // 标记记页面是否从缓存（Backforward Cache）中加载
        if (event.persisted) {
            cb(event);
        }
    }, true);
}


let firstHiddenTime = document.visibilityState === 'hidden' ? 0 : Infinity;


/**
 * 获取第一次隐藏时间
 */
export const getFirstHiddenTime = () => {
    onHidden((event) => {
        firstHiddenTime = event.timeStamp;
    }, true);
    return {
        get timestamp(){
            return firstHiddenTime;
        }
    }
};

