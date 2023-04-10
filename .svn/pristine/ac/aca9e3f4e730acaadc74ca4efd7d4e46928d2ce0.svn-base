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
            <search-component placeholderTxt="计划名称" @input="onSearch"> </search-component>
          </div>
        </div>
        <div class="top-item">
          <suc-button class="btn" type="primary" :debounce="800" @on-click="onadd">新增</suc-button>
          <suc-button type="primary" :debounce="800" @on-click="exportExcel">导出</suc-button>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize">
          <template v-slot:operation="{ row }">
            <div class="btn">
              <span @click="onedit(row)">编辑</span>
              <span @click="ondelete(row)">删除</span>
            </div>
          </template>
        </table-page>
      </div>
    </div>
    <!-- 新增数据弹框 -->
    <plane-list-modal :title="modalTitle" :modal="model" :formParams="formParams" @toggle="toggle" @on-submit="oncreate"></plane-list-modal>
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
// import { SelectConfig, SelectOptions } from "@suc/ui/interfaces";
import { SearchComponent, TablePage } from "@/components";
import { planeListModal } from "./modal";
import { DeleteModal } from "../model";
import { publicApi } from "@/api";
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
  },
})
export default class Enterprise extends Vue {
  modalTitle: string = ""; //弹窗标题
  loading: boolean = true;
  delLoading: boolean = false;
  btnFlag: string = ""; //区分编辑和新增
  userInfo: any = JSON.parse(localStorage.getItem("userInfo") || "");
  tableData: any[] = [];
  formParams: any = {};
  model: boolean = false;
  xcdwName: any = "";
  // 存时间数据
  daterangeData: any = [];
  dateChange(val: any) {
    if (val) {
      this.tableParams = {
        start: val[0],
        end: val[1],
      };
    } else {
      this.tableParams = {
        start: "",
        end: "",
      };
    }
  }
  //   删
  delmodel: boolean = false;
  delParams: any = {}; //删除的参数
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      uuid: row.uuid,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  async save(val: any) {
    // val值是false
    this.delLoading = true;
    let url = "server/plan";
    publicApi.deleteWithParam(url, this.delParams).then((data: any) => {
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
  //  导出
  exportExcel() {
    let params:any = {
      name: this.tableParams.name,
      period: "",
      // start: this.tableParams.start ? this.tableParams.start : "",
      // end: this.tableParams.end ? this.tableParams.end : "",
      start: this.tableParams.start,
      end: this.tableParams.end,
    };
    let str = "";
    for (let key in params) {
      str += key + "=" + params[key] + "&"
    }
    const relStr = str.substr(0, str.length - 1)
    console.log(relStr,"666");
    publicApi.ondownload("server/plan/export?" + relStr)
    
  }
  mounted() {
    this.onpage(); //获取页面信息
    this.getXcdw(); //巡查单位
  }
  // 巡查单位
  async getXcdw() {
    let url = "server/securityHousing/basicCompany/selectById";
    let param = {
      id: this.userInfo.qyId,
    };
    let data = await publicApi.getWithParam(url, param);
    if (data.result) {
      this.xcdwName = data.data.companyName;
      this.formParams.companyName = data.data.companyName;
      this.formParams.companyUuid = data.data.id;
    } else {
      return;
    }
  }
  // 新增弹框
  onadd() {
    this.model = true;
    this.btnFlag = "add";
    this.modalTitle = "计划清单";
    this.formParams.reportUserName = localStorage.getItem("reporter");
    this.formParams.reportUserid = localStorage.getItem("userId");
  }

  // 判断是新增还是编辑
  async oncreate() {
    if (this.btnFlag == "add") {
      this.setCreate();
    } else if (this.btnFlag == "edit") {
      this.setEdit();
    }
    this.model = false;
  }
  //  新增
  async setCreate() {
    // this.formParams.executestartdate ? (this.formParams.executestartdate = dayjs(this.formParams.executestartdate).format("YYYY-MM-DD")) : null;
    // this.formParams.executeenddate ? (this.formParams.executeenddate = dayjs(this.formParams.executeenddate).format("YYYY-MM-DD")) : null;
    this.loading = true;
    const url = "server/plan";
    await publicApi.postWithParamJson(url, this.formParams).then((data: any) => {
      if (data.result == true) {
        this.$SucMessage.info("新增成功");
        // this.formParams.executestartdate = "";
        // this.formParams.executeenddate = "";
        this.model = false;
        this.onpage();
        this.loading = false;
      } else {
        this.$SucMessage.error("新增失败");
        this.model = false;
        this.loading = false;
      }
    });

    this.onpage();
  }
  // 更新
  async setEdit() {
    // this.formParams.starttime ? (this.formParams.starttime = dayjs(this.formParams.starttime).format("YYYY-MM-DD HH:mm:ss")) : null;
    // this.formParams.overtime ? (this.formParams.overtime = dayjs(this.formParams.overtime).format("YYYY-MM-DD HH:mm:ss")) : null;
    this.loading = true;
    let url = "server/plan";
    await publicApi.putWithParamJson(url, this.formParams).then((data: any) => {
      if (data.result == true) {
        this.$SucMessage.info("更新成功");
        this.model = false;
        this.onpage();
        this.loading = false;
      } else {
        this.model = false;
        this.$SucMessage.error(data.desc);
        this.loading = false;
      }
    });
    this.onpage();
  }

  //子组件的点击事件，触发toggle,并传值给父组件
  toggle(val: boolean) {
    this.model = val;
  }

  // 编辑
  onedit(row: any) {
    this.model = true;
    this.btnFlag = "edit";
    this.modalTitle = "编辑计划";
    let uuid = row.uuid;
    this.editInfo(uuid);
  }
  // 详情
  async editInfo(uuid: any) {
    let url = "server/plan";
    let params = {
      uuid: uuid,
    };
    let data = await publicApi.getWithParam(url, params);
    if (data.result) {
      this.formParams = {
        uuid: data.data.uuid,
        name: data.data.name,
        communityUuid: data.data.communityUuid,
        patrolUserid: data.data.patrolUserid, //巡查人
        reportUserid: data.data.reportUserid, //上报人
        reportUserName: localStorage.getItem("reporter"),
        period: data.data.period,
        trainTime: [data.data.executestartdate, data.data.executeenddate],
        executestartdate: data.data.executestartdate,
        executeenddate: data.data.executeenddate,
        target: data.data.target,
        companyName: this.xcdwName, //巡查单位
        companyUuid: data.data.companyUuid, //巡查单位id
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
      title: "计划名称",
      key: "name",
    },
    {
      title: "巡查小区",
      key: "communityName",
    },
    {
      title: "巡查人",
      key: "patrolUserName",
    },
    {
      title: "巡查区域/对象",
      key: "target",
    },
    {
      title: "计划周期",
      key: "period",
    },
    {
      title: "执行开始时间",
      key: "executestartdate",
    },
    {
      title: "执行结束时间",
      key: "executeenddate",
    },
    {
      title: "上报人",
      key: "reportUserName",
    },
    {
      title: "巡查单位",
      key: "companyName",
    },
    {
      title: "上报时间",
      key: "createtime",
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
    start: "",
    end: "",
    name: "",
    period: "",
  };

  // 列表
  async onpage() {
    this.loading = true;
    this.tableParams.pageNumber = this.pageParams.current;
    this.tableParams.pageSize = this.pageParams.pageSize;
    let url = "server/plan/page";
    let data = await publicApi.getWithParam(url, this.tableParams);
    if (data.result) {
      this.loading = false;
      var arr = data.data.rows;
      arr.forEach((item: any) => {
        item.createtime = dayjs(parseInt(item.createtime)).format("YYYY-MM-DD");
      });
      this.tableData = arr;
      this.pageParams.total = Number(data.data.total);
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
    this.tableParams.name = val;
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
