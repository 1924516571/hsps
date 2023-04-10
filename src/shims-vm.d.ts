import Vue from 'vue';
import { AxiosStatic } from "axios"

declare module 'vue/types/vue' {
    interface utils {
        deepCopy<T>(obj: T): T;

        dateFormat(date: Date | string | number, fmt: string): string;

        validCoords(longitude:any, latitude:any):boolean;
    }

    // 来声明全局属性
    interface Vue {
        $http: AxiosStatic,
        $base:AxiosStatic,
        $rt:AxiosStatic,
        $getMapConfig: Function,
        $utils: utils,
        $globalData: any,
    }
}
