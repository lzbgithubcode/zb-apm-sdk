namespace sysInterfaces {
    // 隐藏事件回调函数
    export interface IOnHiddenCallback {
        (event: Event): void
    };

    // 显示事件回调函数
    export interface IOnShowCallback {
        (event: PageTransitionEvent): void
    };
}

export { sysInterfaces }
