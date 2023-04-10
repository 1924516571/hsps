<template>
  <!-- 关联弹窗 -->
  <suc-modal :config="config" :value="model" @on-visible-change="toggle">
    <template v-slot:header>
      <span class="title">{{ title }}</span>
    </template>
    <div >
      <div class="btn">
        <div>
          <search-component :v-model="czParams" :placeholderTxt="placeholder" @input="onSearch"></search-component>
        </div>
      </div>
      <div class="content-item">
        <table-page
          :columns="columns"
          :tableData="tableData"
          :pageParams="pageParams"
          v-loading="loading"
          customHeight="380"
          @get-page="onPage"
          @get-size="onSize"
        >
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
import { infoApi } from "@/api";

@Component({
  components: {
    SucModal,
    SucTable,
    SucTableColumn,
    SucCheckbox,
    TablePage,
    SearchComponent,
    SucSelect
  }
})
export default class LinkYj extends Vue {
  @Prop() title!: string;
  @Prop() placeholder!: string;
  @Prop() model!: boolean;
  @Prop() loading!: boolean;
  @Prop() pageParams!: any;
  @Prop({
    type: Array,
    default: () => []
  })
  columns: any;
  @Prop({
    type: Array,
    default: () => []
  })
  tableData: any;
  @Prop() czParams!: object;
  @Emit()
  toggle() {}
  @Emit()
  onSearch(tab: any) {
    return tab
  }
  

  mounted(){
    // this.getStationType()
    console.log(this.model,"777");
    
  }

  // getStationType(){
  //   let url = 'wjServer/dataCenter/baseinfo/getStationType';
  //   infoApi.getupdate(url).then((data:any)=>{
  //     this.options = data.data
  //     this.activeName = data.data[0].code
  //   })
  // }
  @Emit()
  onCheck(row:any) {
  }

  @Emit()
  onPage(page: number) {
    console.log(page,"555");
    
  }

  @Emit()
  onSize(size: number) {}

  config: ModalConfig = {
    transfer: false,
    width: 960,
    "footer-hide": true
  };

  options: any = []

  handleClick(tab: any, event: any) {
    console.log(tab.name, event.target);
  }
  activeName :string  = ''
  
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
