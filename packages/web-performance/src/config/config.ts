/**
 * 作者: lzb
 * 日期: 2022-04-06 17:32
 * 功能:
 */

export interface IConfig {
    version?: string,
    allowLog?: boolean, // 是否日志答应
    enableCollectError?: boolean,  // 是否允许收集错误
    enableReportError?: boolean,  // 是否运行上传错误
    age?: number
}

export class Config implements IConfig{
        version?: string;
        allowLog?: boolean;
        enableCollectError?: boolean;
        enableReportError?: boolean;
        age?: number;
       constructor(options?: IConfig) {
          this.allowLog = (options && options.allowLog) || false;
          this.enableCollectError = (options &&options.enableCollectError) || true;
          this.enableReportError = (options && options.enableReportError) || true;
       }


}
