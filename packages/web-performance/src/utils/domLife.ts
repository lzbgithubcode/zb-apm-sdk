/**
 * 作者: lzb
 * 日期: 2022-03-15 20:45
 * 功能:
 */
export const dowDidLoaded = (cb) : void=> {
     if(document.readyState === "complete"){
         setTimeout(cb);
     }else {
         window.addEventListener('pageshow', cb);
     }
};

export const  domBeforeUnload = (cb)=>{
    window.addEventListener('beforeunload', cb)
};

export const  domUnload= (cb)=>{
    window.addEventListener('unload', cb)
};
