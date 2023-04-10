declare module 'vue-echarts' {
    export interface echartsOptions {
        options: object;
        autoresize: boolean;
    }
}

declare module 'iview' {
    export { CollapsePanel as Panel } from "iview/types/iview.components";
    export * from "iview/types/iview.components";
    const Submenu: any;
    const Step: any;
    export { Submenu, Step };
}
declare module 'element-ui/src/utils/resize-event'
declare module '@riophae/vue-treeselect'
declare module 'vue-quill-editor'
declare module 'v-viewer'
declare module 'vue-seamless-scroll'