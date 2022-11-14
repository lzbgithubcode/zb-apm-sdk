/**
 * 配置
 */
export interface  IBaseConfig{
  /**
   * 版本
   */
  version?: string,
  /**
   *  是否允许日志
   */
  allowLog?: boolean, 
  /**
   * 是否允许收集错误
   */
  enableCollectError?: boolean, 
  /**
   * 是否运行上传错误
   */ 
  enableReportError?: boolean,  
}