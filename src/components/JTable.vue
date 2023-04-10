<template>
  <!-- 表格和分页 -->
  <div class="table-view">
    <div>
      <suc-table
      class="fontsize"
        :data="tableData"
        :height="tableHeight"
        :border="border"
        stripe
        size="mini"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        :span-method="spanMethod"
        @row-click="rowClick"
        @sort-change="sortChange"
      >
        <slot name="column"></slot>
      </suc-table>
    </div>
    <div v-if="showPage">
      <suc-page
        size="small"
        :total="pageParams.total"
        :current="pageParams.current"
        :page-size="pageParams.pageSize"
        :show-total="showTotal"
        :show-sizer="showSizer"
        :show-elevator="showElevator"
        @on-change="getPage"
        @on-page-size-change="getSize"
      />
    </div>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Model,
  Watch,
} from "vue-property-decorator";
import { SucTable, SucTableColumn, SucPage } from "@suc/ui";
import {
  addResizeListener,
  removeResizeListener,
} from "element-ui/src/utils/resize-event";
@Component({
  components: {
    SucTable,
    SucTableColumn,
    SucPage,
  },
})
export default class ModuleView extends Vue {
  @Prop({
    type: Array,
    default: () => [],
  })
  tableData: any;
  @Prop({
    type: Object,
    default: () => {
      return {
        current: 1,
        total: 0,
        pageSize: 10,
      };
    },
  })
  pageParams: any;
  @Prop()
  showTotal!: boolean;
  @Prop({
    type: Boolean,
    default: true,
  })
  showPage!: boolean;
  @Prop({
    type: Boolean,
    default: true,
  })
  border!: boolean;
  @Prop({
    type: Boolean,
    default: true,
  })
  showSizer!: boolean;
  @Prop({
    type: Boolean,
    default: true,
  })
  showElevator!: boolean;
  @Prop({
    type: Function,
  })
  spanMethod: any;
  @Prop() tableRowClassName: any;
  @Prop() customHeight: any;
  @Watch("customHeight", { immediate: true })
  getHeight(height: any) {
    if (this.customHeight) {
      this.tableHeight = this.customHeight;
    }
  }

  tableHeight: number | string = "-";
  resizeChange() {
    this.tableHeight = this.$el.clientHeight - 35;
  }
  mounted() {
    if (!this.customHeight) {
      this.tableHeight = this.$el.clientHeight - 35;
      addResizeListener(this.$el, this.resizeChange);
    }
  }
  destroyed() {
    removeResizeListener(this.$el, this.resizeChange);
  }
  @Emit()
  rowClick() {}
  @Emit()
  getPage(page: number) {}
  @Emit()
  getSize(size: number) {}
  @Emit()
  sortChange(sortInfo: any) {}

  indexMethod(index: number) {
    return (this.pageParams.current - 1) * this.pageParams.pageSize + index + 1;
  }
}
</script>

<style lang="scss" scoped>
$deep: "::v-deep";
.fontsize{
  font-size: 14px;
}
.table-view {
  width: 100%;
  height: 100%;
  position: relative;
  > div {
    &:nth-of-type(2) {
      padding-top: 10px;
    }
  }
  #{$deep}.el-table__header{
      width: 100%!important;
  }
  #{$deep}.el-table__body{
      width: 100%!important;
  }
  
}
</style>
