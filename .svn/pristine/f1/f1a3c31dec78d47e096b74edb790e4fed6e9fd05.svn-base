<template>
  <!--计划清单 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <!-- 时间组件 -->
            <el-date-picker
              v-model="daterangeData"
              type="daterange"
              start-placeholder="上报开始日期"
              end-placeholder="上报结束日期"
              :default-time="['00:00:00', '23:59:59']"
              size="small"
              @change="dateChange"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
          <div class="top-item-sub">
            <suc-select v-model="tableParams.xcType" :options="taskOptions" :config="config" style="width:150px;"> </suc-select>
          </div>
          <div class="top-item-sub">
            <search-component placeholderTxt="巡查人" @input="onSearch"> </search-component>
          </div>
        </div>
        <div class="top-item">
          <!-- <suc-button class="btn" type="primary" :debounce="800" @on-click="onadd">新增</suc-button> -->
          <!-- <suc-button type="primary" :debounce="800" @on-click="exportExcel">导出</suc-button> -->
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize">
          <template v-slot:operation="{ row }">
            <div class="btn">
              <span @click="ondetail(row)">详情</span>
              <!-- <span @click="ondelete(row)">删除</span> -->
            </div>
          </template>
        </table-page>
      </div>
    </div>
    <!-- 详情数据弹框 -->
    <detail-plan-modal :title="detailModalTitle" :formParams="formParams" :modal="model" @toggle="toggle"> </detail-plan-modal>
    <!-- 删除弹框 -->
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
  </div>
</template>
<!-- import { DeleteModal, OperateManageModal, DetailPlanModal } from "../model"; -->
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem } from "@suc/ui";
import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { SearchComponent, TablePage } from "@/components";
import { planeListModal, detailPlanModal } from "./modal";
import { DeleteModal } from "../model";
import { infoApi, publicApi } from "@/api";
import { values } from "lodash";
import dayjs from "dayjs";
@Component({
  components: {
    SucSelect,
    SucButton,
    SucInput,
    SucFormItem,
    SearchComponent,
    TablePage,
    planeListModal,
    DeleteModal,
    detailPlanModal,
  },
})
export default class Enterprise extends Vue {
  loading: boolean = true;
  delLoading: boolean = false;
  tableData: any[] = [];
  model: boolean = false;
  formParams: any = {};
  taskOptions: any[] = [
    {
      value: "1",
      label: "计划巡查",
    },
    {
      value: "2",
      label: "非计划巡查",
    },
  ];
  config: SelectConfig = {
    placeholder: "请选择",
    clearable: true,
  };
  detailModalTitle: any = "物业巡查详情"; //详情标题
  daterangeData: any = [];
  dateChange(val: any) {
    if (val) {
      this.tableParams = {
        beginDate: val[0],
        endDate: val[1],
      };
    } else {
      this.tableParams = {
        beginDate: "",
        endDate: "",
      };
    }
  }
  delmodel: boolean = false;
  delParams: any = {}; //删除的参数
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      planId: row.planId,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "hsServer/hs/plan/delPlan";
    infoApi.ondeleteWithParams(this.delParams, url).then((data: any) => {
      if (data.result == true) {
        this.delmodel = false;
        this.$SucMessage.info("删除成功");
        this.onpage();
        this.delLoading = false;
      } else {
        this.delLoading = false;
        this.$SucMessage.error("删除失败");
      }
    });
  }
  /***
   *  导出功能
   */
  exportExcel() {


  }
  toggle(val: boolean) {
    this.model = val;
  }
  ondetail(row: any) {
    this.model = true;
    this.formParams = {};
    let recordCode = row.maintainCode;
    this.editInfo(recordCode);
  }
  // 详情
  async editInfo(recordCode: any) {
    let url = "server/securityHousing/maintain/getDetail";
    let data = await publicApi.getWithParam(url, { recordCode: recordCode });
    if (data.result) {
      this.formParams = {
        xcUser: data.data.xcUser,
        xcType: data.data.xcType,
        problemNum: data.data.problemNum,
        xcxq: data.data.xcxq,
        startTime: data.data.startTime,
        endTime: data.data.endTime,
        useTime: data.data.useTime,
        distance: data.data.distance,
        xcqy: data.data.xcqy,
        problemList: data.data.problemList, //巡查问题列表
      };
    }
  }
  columns: any[] = [
    {
      type: "index",
      title: "序号",
      width: "100",
    },
    {
      title: "巡查类型",
      key: "xclx",
    },
    {
      title: "巡查人",
      key: "userName",
    },
    {
      title: "巡查小区",
      key: "xqmc",
    },
    {
      title: "巡查区域/对象",
      key: "xcqy",
    },
    {
      title: "巡查开始时间",
      key: "startTimeStr",
    },
    {
      title: "巡查结束时间",
      key: "endTimeStr",
    },
    {
      title: "巡查用时(min)",
      key: "useTime",
    },
    {
      title: "巡查距离(m)",
      key: "distance",
    },
    {
      title: "问题数量",
      key: "problemNum",
    },
    {
      title: "操作",
      slot: "operation",
      width: 110,
    },
  ];
  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 20,
  };
  tableParams: any = {
    pageNumber: "",
    pageSize: "",
    beginDate: "",
    endDate: "",
    userName: "", //巡查人
    xcType: "",
  };
  mounted() {
    this.onpage(); //获取页面信息
  }

  // 列表
  async onpage() {
    this.loading = true;
    this.tableParams.pageNumber = this.pageParams.current;
    this.tableParams.pageSize = this.pageParams.pageSize;
    let url = "server/securityHousing/maintain/infoListNew";
    let data = await publicApi.getWithParam(url, this.tableParams);
    if (data.result) {
      this.loading = false;
      this.tableData = data.data.rows;
      this.pageParams.total = parseInt(data.data.total);
      // this.$SucMessage.success("加载成功");
    } else {
      this.$SucMessage.error("加载失败");
      this.tableData = [];
    }
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
  onSearch(val: string) {
    this.loading = true;
    this.pageParams.current = 1;
    this.tableParams.userName = val;
    this.onpage();
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
    .content {
      height: calc(100% - 65px);
      border-top: 1px solid #dde4eb;
      .link-text {
        color: #5397ff;
        cursor: pointer;
      }
      .btn {
        color: #5397ff;
        cursor: pointer;
        // width: 200px;
        span {
          display: inline-block;
          margin-right: 10px;
          &:nth-of-type(2) {
            color: #ff5a47;
          }
        }
      }
    }
  }
  .delete-view {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
}

::v-deep.el-dialog__wrapper {
  .el-dialog {
    .el-dialog__header {
      background-color: #5993fa;
    }
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
    .el-dialog__body {
      // height: 200px;
      overflow-y: auto;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
  }
}
</style>
