const BASE_PATH = "views/basicData/pages";
export default {
  routers: [
    {
      path: "",
      redirect: "user",
    },
    {
      path: "user", //用户
      meta: {
        name: "user",
      },
      component: () => import("@/views/basicData/pages/user/user.vue"),
    },
    {
      path: "jsgl", //角色
      meta: {
        name: "jsgl",
      },
      component: () => import("@/views/basicData/pages/jsgl/jsgl.vue"),
    },
    {
      path: "cdgl", //菜单
      meta: {
        name: "cdgl",
      },
      component: () => import("@/views/basicData/pages/cdgl/cdgl.vue"),
    },
    {
      path: "yygl", //应用
      meta: {
        name: "yygl",
      },
      component: () => import("@/views/basicData/pages/yygl/yygl.vue"),
    },
    {
      path: "bmgl", //部门
      meta: {
        name: "bmgl",
      },
      component: () => import("@/views/basicData/pages/bmgl/bmgl.vue"),
    },
    {
      path: "sjzdgl", //数据字典
      meta: {
        name: "sjzdgl",
      },
      component: () => import("@/views/basicData/pages/sjzdgl/sjzdgl.vue"),
    },
    {
      path: "xzqygl", //行政区域
      meta: {
        name: "xzqygl",
      },
      component: () => import("@/views/basicData/pages/xzqygl/xzqygl.vue"),
    },
  ],
};
