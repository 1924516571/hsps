import Vue from "vue";
import Router from "vue-router";
import homeRouters from "./router-config/home";
import dataCenterRouters from "./router-config/dataCenter";
import basicDataRouters from "./router-config/basicData";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "",
      redirect: "/main",
    },
    {
      path: "/login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/register",
      component: () => import("./views/Register.vue"),
    },
    {
      //懒加载
      path: "/main",
      component: () => import("./layout/Main.vue"),
      children: [
        {
          path: "",
          redirect: "dataCenter",
        },
        // {
        //   //首页
        //   path: "home",
        //   meta: {
        //     name: "home",
        //   },
        //   component: () => import("@/views/home/Main.vue"),
        //   children: [...homeRouters.routers],
        // },
        {
          //数据中心
          path: "dataCenter",
          meta: {
            name: "dataCenter",
          },
          component: () => import("@/views/dataCenter/Main.vue"),
          children: [...dataCenterRouters.routers],
        },
        {
          //后台管理
          path: "basicData",
          meta: {
            name: "basicData",
          },
          component: () => import("@/views/basicData/Main.vue"),
          children: [...basicDataRouters.routers],
        },
        
      ],
    },
  ],
});


