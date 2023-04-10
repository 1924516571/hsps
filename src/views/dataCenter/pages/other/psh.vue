<template>
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <suc-input v-model="tableParams.name" placeholder="排水户名称" :config="{ clearable: true }" style="width:200px"></suc-input>
          </div>
          <div class="top-item-sub">
            <suc-button @click="onSearch" type="primary">搜索</suc-button>
          </div>
        </div>
        <div class="top-item">
          <suc-button type="primary" :debounce="800" @on-click="onadd">新增</suc-button>
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize">
          <template v-slot:operation="{ row }">
            <div class="btn1">
              <span @click="onedit(row)">编辑</span>
              <span @click="ondelete(row)">删除</span>
            </div>
          </template>
        </table-page>
      </div>
    </div>

    <psh-add-modal :parentMydatasource="parentMydatasource" :title="modalTitle" :modal="modal" :formParams="formParams" @toggle="toggle" @on-submit="oncreate"> </psh-add-modal>

    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SearchComponent, TablePage } from "@/components";
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { PshAddModal, DeleteModal } from "./modal";
import { publicApi } from "@/api";
import { url } from "../../../../../public/config";
import { forIn } from "lodash";
import { getTrim } from "@/utils/validator.js";

@Component({
  components: {
    TablePage,
    SucButton,
    SucInput,
    SucDatePicker,
    SucSelect,
    SearchComponent,
    PshAddModal,
    DeleteModal,
  },
})
export default class GivePlan extends Vue {
  loading: boolean = true;
  modalTitle: string = "";
  modal: boolean = false;
  delParams: object = {};
  btnFlag: any = "";
  delmodel: boolean = false;
  delLoading: boolean = false;
  formParams: any = {};
  tableData: any = [];
  parentMydatasource: any = "";
  tableParams: any = {
    name: "",
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
      title: "设施标识码",
      key: "dischargerid",
    },
    {
      title: "排水系统编码",
      key: "systemid",
    },
    {
      title: "排水户名称",
      key: "name",
    },
    {
      title: "设备位置",
      key: "position",
      formatter: (row: any, item: any) => {
        return `(${row.xCoor + "," + row.yCoor})`;
      },
    },
    {
      title: "地址",
      key: "addr",
    },
    {
      title: "接入检查井编码",
      key: "connManholeld",
    },
    {
      title: "组织机构代码",
      key: "codeid",
    },
    {
      title: "法人代表",
      key: "legalperson",
    },

    {
      title: "联系电话",
      key: "tel",
    },
    {
      title: "污水处理方式",
      key: "treatmentMethod",
    },
    {
      title: "数据获取日期",
      key: "recordDate",
    },
    {
      title: "数据填报日期",
      key: "reportDate",
    },
    {
      title: "备注",
      key: "remark",
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
    pageSize: 10,
  };
  mounted() {
    this.onpage();
  }
  getTrim(str: any) {
    return str.replace(/\s*/g, "");
  }
  async onpage() {
    this.loading = true;
    this.tableParams.pageNumber = this.pageParams.current;
    this.tableParams.pageSize = this.pageParams.pageSize;
    let url = "server/dataCenter/psh/infoList";
    this.tableParams.name = getTrim(this.tableParams.name); //去除空格
    let data = await publicApi.getWithParam(url, this.tableParams);
    if (data.result) {
      this.loading = false;
      this.tableData = data.data.rows;
      this.pageParams.total = parseInt(data.data.total);
    } else {
      this.$SucMessage.error("加载失败");
      this.tableData = [];
    }
  }
  onadd() {
    this.modal = true;
    this.btnFlag = "add";
    this.modalTitle = "新增";
    this.formParams = {};
  }
  toggle(val: any) {
    this.modal = val;
  }
  oncreate() {
    this.modal = false;
    switch (this.btnFlag) {
      case "add":
        this.setCreate();
        break;
      case "edit":
        this.setEdit();
        break;
      default:
        break;
    }
  }
  // 新增接口
  setCreate() {
    this.loading = true;
    let url = "server/dataCenter/psh/addInfo";
    publicApi.postWithParamJson(url, this.formParams).then((res: any) => {
      if (res.result) {
        this.$SucMessage.success("新增成功");
        this.loading = false;
        this.onpage();
      } else {
        this.$SucMessage.error(res.desc);
        this.loading = false;
      }
    });
  }
  // 编辑接口
  async setEdit() {
    this.loading = true;
    let url = "server/dataCenter/psh/editInfo";
    let arrqy = this.formParams.areaCode.toString(); //字符串转换
    this.formParams.areaCode = arrqy;
    publicApi.putWithParamJson(url, this.formParams).then((data: any) => {
      if (data.result == true) {
        this.$SucMessage.success("更新成功");
        this.modal = false;
        this.onpage();
        this.loading = false;
      } else {
        this.modal = false;
        this.$SucMessage.error("更新失败");
        this.loading = false;
      }
    });
  }
  onedit(row: any) {
    this.formParams = {};
    this.btnFlag = "edit";
    this.modalTitle = "编辑";
    this.modal = true;
    this.editInfo(row.dischargerid);
  }
  async editInfo(dischargerid: any) {
    let url = "server/dataCenter/psh/getDetail";
    let data = await publicApi.getWithParam(url, { dischargerid });
    this.formParams = data.data;
  }
  ondelete(row: any) {
    console.log(row, "row");

    this.delmodel = true;
    this.delParams = {
      dischargerid: row.dischargerid,
    };
  }
  async cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "server/dataCenter/psh/delInfo";
    publicApi.deleteWithParam(url, this.delParams).then((data: any) => {
      if (data.result == true) {
        this.delmodel = false;
        this.$SucMessage.success("删除成功");
        this.delLoading = false;
        this.onpage();
      } else {
        this.$SucMessage.error("删除失败");
        this.delLoading = false;
      }
    });
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
  onSearch() {
    this.onpage();
  }
  exportExcel() {
    let consturl = url + "/api/server/securityHousing/caseInfo/export";
    window.location.href = consturl;
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
      }
    }
    .content {
      height: calc(100% - 65px);
      border-top: 1px solid #dde4eb;
      .link-text {
        color: #5397ff;
        cursor: pointer;
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
</style>
