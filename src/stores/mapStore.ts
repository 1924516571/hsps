import { Map } from "@/utils/zkzy-plugin";

const state: any = {
  olMap: new Map(),
  markers: [],
  markerFlag: ""
};
const mutations: any = {
  setMarkers(state: any, markers: any) {
    state.markers = markers;
  },
  setMarkerFlag(state: any, flag: any) {
    state.markerFlag = flag;
  }
};
const actions: any = {};
const namespaced: boolean = true;
export default {
  namespaced,
  state,
  mutations,
  actions
};
