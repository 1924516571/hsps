<template>
  <suc-modal :config="config" :value="model" @on-visible-change="toggle">
    <template v-slot:header>
      <span class="title">{{ title }}</span>
    </template>
    <div>
      <div class="content-item">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" customHeight="380" @get-page="onPage" @get-size="onSize">
          <!-- <template v-slot:asea>
            <suc-checkbox   v-model="isChecked" disabled=true :debounce="1000" @on-change="allCheck">
              全选
            </suc-checkbox>
          </template> -->
          <template v-slot:selection="{ row }">
            <suc-checkbox v-model="row.checked" :debounce="800" @on-change="onCheck(row)"></suc-checkbox>
          </template>
        </table-page>
      </div>
    </div>
  </suc-modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucTable, SucTableColumn, SucCheckbox, SucSelect } from "@suc/ui";
import { ModalConfig } from "@suc/ui/interfaces";
import { TablePage, SearchComponent } from "@/components";

@Component({
  components: {
    SucModal,
    SucTable,
    SucTableColumn,
    SucCheckbox,
    TablePage,
    SearchComponent,
    SucSelect,
  },
})
export default class LinkYj extends Vue {
  @Prop() title!: string;
  @Prop() placeholder!: string;
  @Prop() model!: boolean;
  @Prop() loading!: boolean;
  @Prop() pageParams!: any;
  isChecked: boolean = false;
  @Prop({
    type: Array,
    default: () => [],
  })
  columns: any;
  @Prop({
    type: Array,
    default: () => [],
  })
  tableData: any;
  @Emit()
  toggle() {}
  @Emit()
  onSearch(tab: any) {
    return tab;
  }
  // @Watch("tableData", { immediate: true, deep: true })
  // getAllCheck() {
  //   // 不断更新变量
  //   this.$nextTick(function() {
  //     var everyResult = this.tableData.every((obj: any) => {
  //       return obj.checked == true;
  //     });
  //     if (everyResult) {
  //       this.isChecked = true;
  //     } else {
  //       this.isChecked = false;
  //     }
  //   });
  // }
  @Emit()
  onCheck(row: any) {}

  @Emit()
  onPage(page: number) {
    return page;
  }
  @Emit()
  onSize(size: number) {
    return size;
  }
  config: ModalConfig = {
    transfer: true,
    width: 960,
    "footer-hide": true,
  };
  // allCheck(){
  //      console.log("555");
  // }
}
</script>
<style lang="scss" scoped>
.content {
  height: 422px;
  width: 100%;
  background-color: #fff;
  &-item {
    height: calc(100% - 40px);
  }
}
.title {
  font-size: 16px;
  color: #fff;
}
.btn {
  margin-bottom: 20px;
}
</style>
