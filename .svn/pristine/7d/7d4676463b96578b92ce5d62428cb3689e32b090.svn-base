// import ECharts from 'vue-echarts';
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/map'
// import 'echarts/lib/chart/radar'
// import 'echarts/lib/chart/scatter'
// import 'echarts/lib/chart/effectScatter'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/polar'
// import 'echarts/lib/component/geo'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/visualMap'
// import 'echarts/lib/component/dataset'
import ECharts from '@/components/ECharts.vue';
import {defineProj} from '@suc/monch'

defineProj("EPSG:4549","+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs");

//通用方法集合
const utils = {
    //时间戳转换成自定义字符串
    dateFormat: (date: any, fmt: string) => {
        let dateList: any = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds()
        };
        if (/(y+)/i.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in dateList) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? dateList[k] : ("00" + dateList[k]).substr(("" + dateList[k]).length));
            }
        }
        return fmt;
    },
    deepCopy: (obj: any) => {
        let result = Array.isArray(obj) ? [] : {};//关键地方
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(obj[key]) {
                    if (typeof obj[key] === 'object') {
                        // @ts-ignore
                        result[key] = utils.deepCopy(obj[key]); //递归复制
                    } else {
                        // @ts-ignore
                        result[key] = obj[key];
                    }
                }else{
                    // @ts-ignore
                    result[key] = obj[key];
                }
            }
        }
        return result;
    },
     //判断经纬度是否有效
    validCoords(longitude:any, latitude:any) {
    const lon = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/;
    const lat = /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/;
    const lonRe = new RegExp(lon);
    const latRe = new RegExp(lat);
    if (lonRe.test(longitude) && latRe.test(latitude)) {
        return true;
    }
    return false;
    },
    //列表转换成树
    listToTree(data:any) {
        // * 先生成parent建立父子关系
        const obj:any = {};
        data.forEach((item:any) => {
          obj[item.id] = item;
        });
        // * obj -> {1001: {id: 1001, parentId: 0, name: 'AA'}, 1002: {...}}
        // console.log(obj, "obj")
        const parentList:any = [];
        data.forEach((item:any) => {
          const parent = obj[item.parentId];
          if (parent) {
            // * 当前项有父节点
            parent.children = parent.children || [];
            parent.children.push(item);
          } else {
            // * 当前项没有父节点 -> 顶层
            parentList.push(item);
          }
        });
        return parentList;
    }
    
}

//地图类
export class Map {
    map: any;

    constructor(common?: any) { //constructor是一个构造方法，用来接收参数
        if (common) {
            Object.assign(this, common);
        } else {
            Object.assign(this, utils.deepCopy((<any>window).mapConfig));
        }
    }

    setCenter(coords: any, projection: any) {
        if (coords instanceof Array) {
            this.map.view.center.coord = [parseFloat(coords[0]), parseFloat(coords[1])];
        }
        if (projection) {
            this.map.view.center.projection = projection;
        }
    }

    setZoom(zoom: any) {
        if (zoom) {
            this.map.view.zoom = zoom;
        }
    }

    setCenterZoom(coords: any, zoom: any, projection: any) {
        this.setCenter(coords, projection);
        this.setZoom(zoom);
    }
}

export default {
    // vue提供install可供我们开发新的插件及全局注册组件等
    // install方法第一个参数是vue的构造器，第二个参数是可选的选项对象
    // export default {
    //     install(Vue,option){
    //     组件
    //     指令
    //     混入
    //     挂载vue原型
    //     }
    //     }
    install: (Vue: any, options: any) => {
        //时间转换过滤器
        Vue.filter('dateFormat', utils.dateFormat);

        //echarts的vue组件 因为注册到vue 上面了
        Vue.component('v-chart', ECharts);

        //将方法集添加到Vue实例上面去
        Vue.prototype.$utils = utils;

        //返回地图对象
        Vue.prototype.$getMapConfig = function (common?: any) {
            return new Map(common);
        }
    }
}
