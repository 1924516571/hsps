const state: any = {
  currentTheme: "hello Vuex",
};
const mutations: any = {
  setCurrentTheme(state: any, v: any) {
    state.currentTheme = v;
  },
};

const actions: any = {
  updateName(context:any, payload:any) {
    setTimeout(() => {
      context.commit("setCurrentTheme", payload);
    }, 1000);
  },
  promiseUpdateName(context:any, payload:any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit("setCurrentTheme", payload);
        resolve("成功修改");
      }, 1000);
    });
  },
};
const namespaced: boolean = true; //必须有，允许namespaced方法使用该模块
export default {
  namespaced,
  state: state,
  mutations: mutations,
  actions: actions,
};
