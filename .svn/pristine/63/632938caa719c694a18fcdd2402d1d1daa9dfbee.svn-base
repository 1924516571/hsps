<template>
  <div class="side-menu-container">
    <suc-menu :config="option">
      <suc-menu-item
        name="overview"
        to="/main/home/overview"
        v-authox="'home_overview|access'"
      >
        <div class="txt iconfont icon-zonglan"></div>
        <div class="txt"><span>总览</span></div>
      </suc-menu-item>
    </suc-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { SucIcon, SucMenu, SucMenuItem, SucSubmenu } from "@suc/ui";
import { MenuConfig } from "@suc/ui/interfaces";

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
  };
  mounted() {
    this.option.activeName = this.$route.matched[2].meta.name;
  }
  @Watch("$route", { deep: true })
  changeRoute() {
    this.option.activeName = this.$route.matched[2].meta.name;
  }
  // logout() {
  //     this.$http
  //         .get("/logout")
  //         .then(res => {
  //             this.$router.push("/login");
  //         })
  //         .catch(err => {
  //             console.log(err);
  //         });
  // }
}
</script>
<style lang="scss" scoped>
.side-menu-container {
  float: left;
  width: 60px;
  height: 100%;
  // min-height: 225px;
  // margin: 18px auto 25px auto;
  background-color: #091c37;
  border: solid 1px transparent;

  .txt {
    display: flex;
    justify-content: center;
    width: 100%;
    color: rgba($color: #fff, $alpha: 0.9);
  }
}
</style>
