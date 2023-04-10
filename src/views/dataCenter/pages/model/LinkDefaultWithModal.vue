<template>
  <!-- 关联弹窗带模块 -->
  <suc-modal :config="config" :value="model" @on-visible-change="toggle">
    <template v-slot:header>
      <span class="title">{{ title }}</span>
    </template>
    <div>
      <div class="btn">
        <div class="search-view">
          <el-tabs v-model="activeName" @tab-click="onSearch">
            <el-tab-pane :key="item.code" v-for="item in options" :name="item.code">
              <span slot="label"><i class="el-icon-office-building"></i>{{ item.type }}</span>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div>
          <search-component :v-model="this.czParams.placeholder" :placeholderTxt="placeholder" @input="onSearch"></search-component>
        </div>
      </div>
      <div class="content-item">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" element-loading-text="拼命加载中" customHeight="380" @get-page="onPage" @get-size="onSize">
          <template v-slot:selection="{ row }">
            <suc-checkbox v-model="row.checked" :debounce="800" @on-change="onCheck(row)"></suc-checkbox>
          </template>
          <template v-slot:represent="{ row }">
            <el-radio-group v-model="row.represent" @change="onChange(row, tableData)">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
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
import { infoApi } from "@/api";

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
  @Prop() url!: string;
  @Prop() model!: boolean;
  @Prop() loading!: boolean;
  @Prop() placeholder!: string;
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

  @Prop() pageParams!: object;
  @Prop() czParams!: object;
  @Emit()
  toggle() {}
  @Emit()
  onSearch(tab: any) {
    return tab;
  }

  mounted() {
    this.getStationType();
  }



  getStationType() {
    this.options = [
      { code: "PP", type: "雨量站" },
      { code: "ZZ", type: "河道水位站" },
    ];
    this.activeName = this.options[0].code;
  }

  @Emit()
  onCheck(row: any) {
    // row.checked =  !row.checked
    return row;
  }
  @Emit()
  onChange(row:any,tab:any){
     
  }

  config: ModalConfig = {
    transfer: false,
    width: 960,
    "footer-hide": true,
  };

  @Emit()
  onPage(page: number) {}

  @Emit()
  onSize(size: number) {}

  options: any = [];

  activeName: string = "";
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
