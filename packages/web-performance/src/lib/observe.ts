/**
 * 作者: lzb
 * 日期: 2022-03-21 18:44
 * 功能:
 */
import {IPerformanceEntryHandler} from "../types/IPerformanceNavigationTiming";

export default function (type: string, callback: IPerformanceEntryHandler): PerformanceObserver | undefined {
    try {
          if(PerformanceObserver.supportedEntryTypes?.includes(type)){
              const entriesFunc = (list: PerformanceObserverEntryList)=>list.getEntries().map(callback);
              const po = new PerformanceObserver(entriesFunc);
              po.observe({ type, buffered: true });
              return  po;
          }
    }catch (e) {
        throw e;
    }

}
