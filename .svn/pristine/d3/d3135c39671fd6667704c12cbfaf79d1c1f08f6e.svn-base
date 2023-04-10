# ts-demo

typescript版本项目初始化demo

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
* 含有authox模块，地图模块以及echarts的example。  
* v-echart组件封装了echarts的原生事件可以直接@click来获取图标点击时间 
同时鼠标事件参数有EchartMouseEvent这个类型描述
事件参数中有一个chart字段是当前图标的Echarts实例
* 添加了简易的依赖注入@Injectable @Service
* node-sass 可以使用/deep/ sass或dart-sass可以使用 ::v-deep

# 内存溢出处理
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
参考https://www.npmjs.com/package/increase-memory-limit
NODE_OPTIONS的方式，本人win10下无效
```
# 命令需要在管理员模式下安装
# 全局安装 cross-env 和 increase-memory-limit
npm install -g cross-env increase-memory-limit
# 进入工程目录(package.json所在目录)，执行
cross-env LIMIT=4096 increase-memory-limit
```
## 方法二
package.json文件中添加
```
// 修改div的分配的内存大小，即修改8192的值，增大
"scripts": {
    "dev": "node --max-old-space-size=8192 build/dev.js"
},
```

# 惠山水利系统

## Project setup
```
yarn install
```
### Compiles and hot-reloads for development
```
yarn serve
```
### Compiles and minifies for production
```
yarn build
```
### components in global
* MapManage地图组件
* PanelView地图上面板模块组件
* 项目中出现的echarts图参考components-chartdemo
* task/createTask创建任务事件

### about global ui styles
* ui组件样式重定义（styles-module）
* 项目公共样式（styles-common,commonVariables）
* 阿里图标（styles-suc-iconfont）

### api文件夹存放项目接口
* 接口url示例jnsw/base/xzqyH1；hjzl/site/allSitesData
* public.ts存放统一的/不变的接口
* 接口是按照页面模块划分

### javascript 内存溢出
命令行cmd ,dos窗口运行：npm install -g increase-memory-limit，
进入项目文件夹，运行：increase-memory-limit

* swagger
http://172.18.21.98:8088/api/jnsw/swagger-ui.html
http://172.18.21.98:8088/api/hjzl/swagger-ui.html