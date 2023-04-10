<template>
  <div class="side-menu-container">
    <suc-menu :config="option">
      <!-- v-authox="'dataCenter_info|access'" -->
      <suc-menu-item name="user" to="/main/basicData/user">
        <span class="txt1 iconfont icon-xitongguanli-yonghu"></span>
        <span class="txt1"><span>用户管理</span></span>
      </suc-menu-item>
      <suc-menu-item name="jsgl" to="/main/basicData/jsgl">
        <span class="txt1 iconfont icon-xitongguanli-quanxian"></span>
        <span class="txt1"><span>角色管理</span></span>
      </suc-menu-item>
      <suc-menu-item name="cdgl" to="/main/basicData/cdgl">
        <span class="txt1 iconfont icon-kaohe"></span>
        <span class="txt1"><span>菜单管理</span></span>
      </suc-menu-item>
      <suc-menu-item name="yygl" to="/main/basicData/yygl">
        <span class="txt1 iconfont icon-xitongguanli-caozuofenxi"></span>
        <span class="txt1"><span>应用管理</span></span>
      </suc-menu-item>
      <suc-menu-item name="bmgl" to="/main/basicData/bmgl">
        <span class="txt1 iconfont icon-xitongguanli-zaixianqingkuang"></span>
        <span class="txt1"><span>部门管理</span></span>
      </suc-menu-item>
      <suc-menu-item name="sjzdgl" to="/main/basicData/sjzdgl">
        <span class="txt1 iconfont icon-xitongguanli-denglutongji"></span>
        <span class="txt1"><span>数据字典管理</span></span>
      </suc-menu-item>
      <suc-menu-item name="xzqygl" to="/main/basicData/xzqygl">
        <span class="txt1 iconfont icon-shouye-xunchawentishu"></span>
        <span class="txt1"><span>行政区域管理</span></span>
      </suc-menu-item>
      
    </suc-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SucIcon, SucMenu, SucMenuItem, SucSubmenu } from "@suc/ui";
import { MenuConfig } from "@suc/ui/interfaces";
import { backUrl } from "../../../../public/config.js";

// import {backUrl} from ""

//@ts-ignore
// const Submenu = Menu.Sub;

@Component({
  components: {
    SucMenu,
    SucMenuItem,
    SucSubmenu,
    SucIcon,
  },
})
export default class topBar extends Vue {
  // activeNav: string = "";
  option: MenuConfig = {
    activeName: "",
    // theme: "light",
    openNames: [""], //@description 展开的 Submenu 的 name 集合
  };
  backUrl: any = backUrl;
  mounted() {
    this.option.activeName = this.$route.matched[2].meta.name;
  }
  @Watch("$route", { deep: true })
  changeRoute() {
    this.option.activeName = this.$route.matched[2].meta.name;
  }
}
</script>
<style lang="scss" scoped>
.side-menu-container {
  float: left;
  width: 175px;
  height: 100%;
  // min-height: 225px;
  // margin: 18px auto 25px auto;
  background-color: #091c37;
  border: solid 1px transparent;
  overflow: auto;
  .txt {
    color: rgba($color: #fff, $alpha: 0.9);
    &:nth-of-type(2) {
      display: inline-block;
      padding-left: 6px;
    }
  }
  .txt1 {
    color: rgba($color: #fff, $alpha: 0.9);
    padding-left: 9px;
    &:nth-of-type(2) {
      display: inline-block;
      padding-left: 5px;
    }
  }
  .txt2 {
    padding-left: 10px;
  }
}
</style>
