<template>
  <!-- 表格 -->
  <div class="table-view">
    <div>
      <suc-table
      class="fontsize"
        :data="tableData"
        :height="tableHeight"
        size="mini"
        :row-class-name="tableRowClassName"
        @row-click="rowClick"
        @sort-change="sortChange"
      >
        <template v-for="item in columns">
          <template v-if="item.slot">
            <suc-table-column
              :type="item.type"
              :prop="item.key"
              :label="item.title"
              :width="item.width"
              :key="item.id"
              :sortable="item.sortable"
            >
              <template slot="header">
                <slot :name="item.heading"></slot>
              </template>
              <template slot-scope="scope">
                <slot
                  :name="item.slot"
                  :row="scope.row"
                  :index="scope.$index"
                  v-bind:data="{ row: scope.row, index: scope.$index }"
                ></slot>
              </template>
            </suc-table-column>
          </template>

          <template v-else>
            <suc-table-column
              :type="item.type"
              :index="indexMethod"
              :prop="item.key"
              :label="item.title"
              :width="item.width"
              :key="item.id"
              :sortable="item.sortable"
            ></suc-table-column>
          </template>
        </template>
      </suc-table>
    </div>
    <!-- <div>
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
    </div> -->
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Model,
  Watch
} from 'vue-property-decorator'
import { SucTable, SucTableColumn, SucPage } from '@suc/ui'
import {
  addResizeListener,
  removeResizeListener,
} from "element-ui/src/utils/resize-event";
@Component({
  components: {
    SucTable,
    SucTableColumn,
    SucPage
  }
})
export default class ModuleView extends Vue {
  @Prop({
    type: Array,
    default: () => []
  })
  columns: any
  @Prop({
    type: Array,
    default: () => []
  })
  tableData: any
  @Prop({
    type: Object,
    default: () => {
      return {
        current: 1,
        total: 0,
        pageSize: 10
      }
    }
  })
  pageParams: any
  @Prop()
  showTotal!: boolean
  @Prop({
    type: Boolean,
    default: true
  })
  showSizer!: boolean
  @Prop({
    type: Boolean,
    default: true
  })
  showElevator!: boolean
  @Prop() tableRowClassName: any
  @Prop() customHeight: any
  @Watch('customHeight', { immediate: true })
  getHeight (height: any) {
    if (this.customHeight) {
      this.tableHeight = this.customHeight
    }
  }

  tableHeight: number | string = '-'
  resizeChange() {
    this.tableHeight = this.$el.clientHeight - 35;
  }
  mounted () {
    if (!this.customHeight) {
      this.tableHeight = this.$el.clientHeight - 35
      addResizeListener(this.$el,this.resizeChange);
    }
  }
  destroyed(){
    removeResizeListener(this.$el,this.resizeChange)
  }
  @Emit()
  rowClick () {}
  @Emit()
  getPage (page: number) {}
  @Emit()
  getSize (size: number) {}
  @Emit()
  sortChange(sortInfo: any){}

  indexMethod (index: number) {
    return (this.pageParams.current - 1) * this.pageParams.pageSize + index + 1
  }
}
</script>

<style lang="scss" scoped>
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
  };

  ::v-deep.el-table__body-wrapper::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
  ::v-deep.el-table__body-wrapper::-webkit-scrollbar-thumb{
      background-color: rgb(202, 196, 196);
      border-radius: 3px;
  } 
}
 
</style>
