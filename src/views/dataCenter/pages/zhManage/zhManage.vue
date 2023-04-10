<template>
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <tab-active :btns="btns" @get-btn="getBtn" :activeIndex="activeIndex"> </tab-active>
        </div>
      </div>
      <div class="content">
        <component v-bind:is="cut" keep-alive></component>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { SearchComponent, TablePage } from "@/components";
import { TabActive, LoadingCom, ProtectHouse, MarketHouse } from "./components";
import axios from "axios";
@Component({
  components: {
    TabActive,
    SearchComponent,
    SucInput,
    SucButton,
    TablePage,
    SucSelect,
    LoadingCom,
    ProtectHouse,
    MarketHouse,
  },
})
export default class zhManage extends Vue {
  btns: any[] = ["保障租户", "市场化租户"];
  cut: any = "ProtectHouse";
  activeIndex: any = 0;
  userTableData: any = []; // 定义需要的数据
  getBtn(index: number) {
    this.activeIndex = index;
    if (this.activeIndex == 0) {
      this.cut = "ProtectHouse";
    } else if (this.activeIndex == 1) {
      this.cut = "MarketHouse";
    }
  }

  async onpage() {}
  mounted() {
    this.onpage();
    // axios
    //   .get("/userInfo/list")
    //   .then((response) => {
    //     this.userTableData = response && response.data;
    //     console.log(this.userTableData, "///");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
}
</script>
<style lang="scss" scoped>
.info {
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  &-view {
    height: 100%;
    .top {
      padding: 15px;
      display: flex;
      justify-content: space-between;
    }
    .content {
      height: calc(100% - 130px);
      width: 100%;
      border-top: 1px solid #dde4eb;
    }
  }
}
</style>
