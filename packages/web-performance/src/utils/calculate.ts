/**
 * 作者: lzb
 * 日期: 2022-03-21 20:42
 * 功能:
 */

/**
 * 保留几位小数
 */
export const retainToFixed = (num: number | string, digits: number): number =>{
    if(typeof num === "string"){
        num = parseFloat(num);
    }
    try {
        return  parseFloat(num.toFixed(digits));
    }catch (e) {
        return  num;
    }
};
/**
 *  保留4位小数
 * @param num
 */
export const toFixedFour = (num: number): number =>{
    return  retainToFixed(num, 4);
};

/**
 * 字节Byte -> MB
 * @param bytes
 */
export const toMB = (bytes: number): number | null => {
      if(typeof  bytes!== 'number'){
          return  null;
      }
      return toFixedFour((bytes / Math.pow(1024, 2)));
}
