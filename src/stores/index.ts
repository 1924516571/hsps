import Vue from 'vue'
import Vuex from 'vuex'
import mapStore from './mapStore'
import shareStore from './shareStore'
import user from './user'
import leftMenu from './leftMenu'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    shareStore,
    mapStore,
    user,
    leftMenu,
  },
  ...shareStore,
//   state: {
//     userInfo: null
//   },
//   mutations: {
//     getUserInfo (state, userInfo) {
//       state.userInfo = userInfo
//     }
//   }
})
// export default new Vuex.Store({
//     state: {
//         userInfo: null
//     },
//     mutations: {
//         getUserInfo(state, userInfo) {
//             state.userInfo = userInfo;
//         }
//     },
//     actions: {

//     }
// })
