<template>
  <div class="main_view">
    <top-bar></top-bar>
    <app-main></app-main>
    <transition name="fade">
      <div class="warning" v-if="flag && routePath !== '/main/floodMessage/alarm'">
        <div class="header">
          <div class="header-title">
            <!-- <img :src="require('@/assets/感叹号.png')" alt="" /> -->
            <span class="iconfont icon-jinggao1"></span>
            <span class="title">报警消息</span>
          </div>
          <span @click="close">×</span>
        </div>
        <div class="content" @click="onclick">
          <span style="color: #3a7bef">{{ warnInfo.mc }}</span>
          于
          <span>{{ warnInfo.time }}</span>
          水位超标! <br />
          当前水位({{warnInfo.swType == 1 ? '内河' : '外河'}})：
          <span style="color: #ff0000; margin-right: 20px">{{ warnInfo.sw + "m" }}</span>
          超警戒水位：
          <span style="color: #ff0000">{{ warnInfo.jjsw + "m" }}</span>
        </div>
        <audio id="video" autoplay>
          <source :src="require('@/assets/8069.mp3')" />
        </audio>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { TopBar, AppMain } from "./components";
import { Route } from "vue-router";
import axios from "axios";
import store from "@/stores";
import { State } from "vuex-class";
import {websocketUrl} from '../../public/config.js'
@Component({
  components: { TopBar, AppMain },
})
export default class mainView extends Vue {
  
  // @Mutation getUserInfo:any;
  @State user: any;
  flag: boolean = false;
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    next(true);
    // next((vm:any)=>{
    //     console.log(vm,"pppp");
        
    // }) //可以拿到组件的实例属性和方法
  }
  close() {
    this.flag = false;
    this.wsTest.close();
  }
  routePath: string = "";
  @Watch("$route.path", { immediate: true, deep: true })
  routePathChange() {
    // console.log(this.$route.path,"MMM");
    this.routePath = this.$route.path;  //拿到路由
  }

  userId: any = "";
  wsTest: any = "";
  mounted() {
    this.userId = localStorage.getItem("userId");
    // this.getWarningList();
  }
  onclick() {
    this.$router.push("/main/floodMessage/alarm");
  }
  warnInfo: any = {};
  audioCmp: any = document.querySelector("#video");
  getWarningList() {
    const urlwebscket = "ws://localhost:8071/ws/iot/" + this.userId;
    // const urlwebscket = websocketUrl + this.userId;
        // const urlwebscket = process.env.VUE_APP_WEBSOCKET + this.user.id; //成功那边外部引入.env.production .env.development
    var ws = new WebSocket(urlwebscket);
    this.wsTest = ws;
    // 连接建立后的回调函数
    ws.onopen = function() {
      console.log("open ws");
      // Web Socket 已连接上，使用 send() 方法发送数据
    };
    // 连接关闭后的回调函数
    ws.onclose = function() {
      // 关闭 websocket  重连
      reconnect(urlwebscket);
    };
    ws.onerror = function() {
      console.log("08909");
      
      // setTimeout(()=>{
      // 	reconnect(urlwebscket);
      // },30000);
    };
    // 接收到服务器消息后的回调函数
    ws.onmessage = (evt: any) => {
      this.warnInfo = evt.data ? JSON.parse(evt.data) : "{}";
      if (evt.data) {
        this.flag = true;
        this.audioCmp.load();
      } else {
        this.flag = false;
      }
    };

    // 重连
    function reconnect(url: string) {
      setTimeout(function() {
        //没连接上会一直重连，设置延迟避免请求过多
        // createWebSocket(url);
        ws = new WebSocket(url);
        ws.onclose = function() {
          reconnect(url);
        };
        ws.onerror = function(err) {
          // reconnect(url);
        };
      }, 30000);
    }
  }
}
</script>
<style lang="scss" scoped>
.warning {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999 !important;
  width: 460px;
  height: 146px;
  background-color: rgba(255, 249, 249, 0.9);
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  border: solid 1px #ff9595;
  padding: 20px 20px 0;
  .header {
    // position: relative;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: space-between;
    &-title {
      display: flex;
      align-items: center;
      span:nth-child(1) {
        margin-right: 10px;
        color: #f00;
      }
      .title {
        font-family: Microsoft YaHei UI;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 14px;
        letter-spacing: 1px;
        color: #343434;
      }
    }
    span {
      color: #9ba3b3;
      // position: absolute;
      // top: 0;
      // right: 15px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .content {
    font-family: Microsoft YaHei UI;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 38px;
    letter-spacing: 0px;
    color: #333333;
    padding: 4px 28px 0;
    cursor: pointer;
  }
}
.fade-enter-active {
  transition: all 1s ease;
}
.fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(240px);
  opacity: 0;
}
</style>
