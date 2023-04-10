<template>
  <div class="contain">
    
    <div class="top">
      <div class="top-item">
        <div class="top-item-sub">
            <suc-select v-model="tableParams.xqmc" @on-change="onChangeHouse" :options="houseOptions" :config="{ placeholder: '小区名称', clearable: true }" style="width:160px"></suc-select>
        </div>
        <div class="top-item-sub">
          <suc-date-picker
              v-model="tableParams.yearMonth"
              :options="{
                type: 'month',
                placeholder: '选择时间',
              }"
              style="width: 100%"
              @on-change="onChangeHouse"
            ></suc-date-picker>
        </div>
      </div>
    </div>
    <h3>巡查月报</h3>
    <div class="des">{{extraData}}</div>
    <div class="table_content">
      <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize">
      </table-page>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SearchComponent, TablePage } from "@/components";
import { SucButton, SucInput, SucDatePicker, SucSelect, utils } from "@suc/ui";
import { publicApi } from "@/api";

@Component({
  components: {
    TablePage,
    SucButton,
    SucInput,
    SucDatePicker,
    SucSelect,
    SearchComponent,
  },
})
export default class GivePlan extends Vue {
  loading: boolean = true;
  houseOptions: any = [];
 extraData: any = '';
  tableParams: any = {
    xqmc: "",
    yearMonth: this.$utils.dateFormat(new Date(), "yyyy-MM"),
    pageNumber: "",
    pageSize: "",
  };
  columns: any[] = [
    {
      type: "index",
      title: "序号",
      width: "100",
    },
    {
      title: "巡查小区",
      key: "communityName",
    },
    {
      title: "巡查数",
      key: "maintainNum",
    },
    {
      title: "问题数",
      key: "problemNum",
    },
    {
      title: "已解决",
      key: "handledNum",
    },
    {
      title: "处理率",
      key: "handledRate",
    },
  ];
  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };

  tableData: any = [];
  mounted() {
    this.onpage();
    this.getHouse();
  }
  async onpage() {
    this.loading = true;
    this.tableParams.pageNumber = this.pageParams.current;
    this.tableParams.pageSize = this.pageParams.pageSize;
    this.tableParams.yearMonth = this.$utils.dateFormat(this.tableParams.yearMonth, "yyyy-MM");
    let url = "server/securityHousing/maintain/MonthReport";
    let data = await publicApi.getWithParam(url, this.tableParams);
    if (data.result) {
      this.loading = false;
      this.tableData = data.data.rows;
      this.pageParams.total = parseInt(data.data.total);
      this.extraData = data.data.extraData
      // this.$SucMessage.success("加载成功");
    } else {
      this.$SucMessage.error("加载失败");
      this.tableData = [];
    }
  }

  onChangeHouse(){
    this.onpage()
  }

  async getHouse(){
    let url = "server/securityHousing/basicCommunity/list"
    let data = await publicApi.getNoParam(url)
    this.houseOptions =data.data.map((e: any) => {
      return{
        value:e.id,
        label:e.communityName,
      }
    })
    
  }
 
  getPage(page: any) {
    this.loading = true;
    this.pageParams.current = page;
    this.onpage();
  }
  getSize(size: any) {
    this.loading = true;
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.onpage();
  }
  onSearch(val: any) {
    this.tableParams.companyName = val;
    this.onpage();
  }
}
</script>
<style lang="scss" scoped>
.contain {
  width: 100%;
  height: 100%;
  h3{
    text-align: center;
    font-size: 18px;
  }
  .des{
    padding: 10px;
    font-size: 15px;
  }
  .top {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    &-item {
      display: flex;
      &-sub {
        margin-right: 10px;
      }
      .btn {
        margin-right: 15px;
      }
    }
  }
  .btn1 {
        cursor: pointer;
        span {
          display: inline-block;
          margin-right: 10px;
          &:first-of-type {
            color: #5397ff;
          }
          // &:nth-of-type(2) {
          //   color: #5397ff;
          // }
          // &:nth-of-type(3) {
          //   color: #358e1f;
          // }
          // &:nth-of-type(4) {
          //   color: #5397ff;
          // }
          &:last-of-type {
            color: #ff5a47;
          }
        }
      }
  .table_content {
    width: 100%;
    height: 84%;
  }
  .delete-view {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
  }
}

</style>
