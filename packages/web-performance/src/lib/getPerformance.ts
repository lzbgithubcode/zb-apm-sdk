/**
 * 作者: lzb
 * 日期: 2022-04-07 18:12
 * 功能:
 */
import {Config, IConfig} from "../config/config";
import {interfaces} from "../interfaces/interfaces"
import {isSupportPerformance, isSupportPerformanceObserver} from "../utils/isSupport";
import {logWarning} from "../utils/loggerHelper";
import {PerformanceNameType} from "../constants";
import observe from "./observe";
import {getFirstHiddenTime} from "../utils/pageEventListener";
import {retainToFixed, toFixedFour} from "../utils/calculate";
import {initMetric} from "../utils/initMetric";


/**
 *  获取首次渲染的FP
 */
export const getFP = () : Promise<interfaces.IPerformanceMetric> | undefined => {
        if(!isSupportPerformance()){
            logWarning("浏览器不支持performance");
            return;
        }
       const fpMetric:interfaces.IPerformanceMetric =  initMetric(PerformanceNameType.FP) ;
      return new Promise<interfaces.IPerformanceMetric>((resolve, reject) => {

              // 如果支持观察者
              if(isSupportPerformanceObserver()){
                  const entryHandler = (entry: PerformanceEntry) => {
                      if(entry.entryType === fpMetric.name){
                          if (po) {
                              po.disconnect()
                          }

                          if(entry.startTime < getFirstHiddenTime().timestamp){
                              fpMetric.value = retainToFixed(entry.startTime, 2);
                              resolve(fpMetric);
                          }
                      }

                  };
                  const po = observe("paint", entryHandler);
              }else {
                  const entry = window.performance
                      && performance.getEntriesByName
                      && performance.getEntriesByName(fpMetric.name)[0];

                  fpMetric.value = retainToFixed(entry.startTime, 2);
                  resolve(fpMetric);
              }
      });
};


/**
 *  监听性能指标
 * @param config
 */
export const startMonitorPerformance = (config: IConfig = new Config()): void => {

}
