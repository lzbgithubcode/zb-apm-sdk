/**
 * 错误类型
 */
export enum ENUM_ERROR_TYPE{
  // 引用错误
  REFERENCE_ERROR = "ReferenceError",
  // 语法错误
  SYNTAX_ERROR = "SyntaxError",
  // 有效范围错误
  RANGE_ERROR = "RangeError",
  // 类型错误
  TYPE_ERROR = "TypeError",
  // 局URL处理函数错误
  URI_URL_ERROR = "URIErrorURL",
  // 普通错误
  NORMAL_ERROR = "Error",
  // 未知错误
  UN_KNOW = "UnKnow"
}

/**
 * 错误分类
 */
export enum ENUM_ERROR_CateGory{
  // 资源加载错误(js、图片、css等静态资源加载异常)  
  RESOURCE_LOAD_ERROR = "RESOURCE_LOAD_ERROR",
  // promise请求的监听
  PROMISE_ERROR = "PROMISE_ERROR",
  // 意料意外的错误
  UNEXPECTEDLY_ERROR = "UNEXPECTEDLY_ERROR"
}