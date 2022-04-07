/**
 * 作者: lzb
 * 日期: 2022-04-07 18:48
 * 功能:
 */

/**
 * 生成unique id
 */
export const generalUniqueId = ():string => {
    return `apm-v1-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1))+1e12}`;
};

