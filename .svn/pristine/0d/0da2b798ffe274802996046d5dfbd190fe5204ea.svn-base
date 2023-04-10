<template>
  <div class="contain">
    <div class="top">
      <div class="top-item">
        <div class="top-item-sub">
          <suc-input v-model="tableParams.name" placeholder="租户姓名" :config="{ clearable: true }" style="width: 200px"> </suc-input>
        </div>
        <div class="top-item-sub">
          <suc-select
            v-model="tableParams.sex"
            :options="sexOptions"
            @on-change="onChangeSex"
            :config="{
              clearable: true,
              placeholder: '性别',
            }"
            style="width: 200px"
          >
          </suc-select>
        </div>
        <div class="top-item-sub">
          <search-component placeholderTxt="身份证号" @input="onSearch"> </search-component>
        </div>
      </div>

      <div class="top-item">
        <suc-button class="btn" type="success" @on-click="downLoad">模板下载</suc-button>
        <el-upload class="btn" type="success" :headers="uploadHeaders" :on-success="PicSuccess" action="api/server/securityHousing/tenant/import" accept=".xls" :show-file-list="false">
          <suc-button type="primary" :debounce="800">导入</suc-button>
        </el-upload>
        <suc-button class="btn" type="primary" :debounce="800" @on-click="exportExcel">导出</suc-button>
        <suc-button type="primary" :debounce="800" @on-click="onadd">新增</suc-button>
      </div>
    </div>
    <div class="table_content">
      <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize">
        <template v-slot:operation="{ row }">
          <div class="btn1">
            <span @click="onedit(row)">编辑</span>
            <span @click="ondelete(row)">删除</span>
          </div>
        </template>
      </table-page>
    </div>
    <protect-house-modal :title="modalTitle" :modal="modal" :formParams="formParams" @toggle="toggle" @on-submit="oncreate"> </protect-house-modal>
    <!-- 删除弹框 -->
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SearchComponent, TablePage } from "@/components";
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { ProtectHouseModal, DeleteModal } from "../model";
import { publicApi } from "@/api";
import { url } from "../../../../../../public/config";
@Component({
  components: {
    TablePage,
    SucButton,
    SucInput,
    SucDatePicker,
    SucSelect,
    SearchComponent,
    ProtectHouseModal,
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
  // url:any =require('./public/config.js')
  uploadHeaders: any = { Authorization: "bearer" + localStorage.getItem("refresh-token") };
  sexOptions: any = [
    { value: "男", label: "男" },
    { value: "女", label: "女" },
  ];
  tableParams: any = {
    name: "",
    idCard: "",
    sex: "",
    pageNumber: "",
    pageSize: "",
    tenantType: "1",
  };
  columns: any[] = [
    {
      type: "index",
      title: "序号",
      width: "100",
    },
    {
      title: "租户姓名",
      key: "name",
    },
    {
      title: "身份证号",
      key: "idCard",
      width:'200'
    },
    {
      title: "性别",
      key: "sex",
    },
    {
      title: "配偶",
      key: "spouse",
    },
    {
      title: "住房情况",
      key: "haveHouse",
      //   width: 170,
    },
    {
      title: "人均收入",
      key: "income",
    },
    {
      title: "家庭人口",
      key: "population",
    },
    {
      title: "家庭类型",
      key: "familyType",
    },
    {
      title: "联系电话",
      key: "telephone",
    },
    {
      title: "申请日期",
      key: "applyTime",
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
    pageSize: 20,
  };

  tableData: any = [];
  mounted() {
    this.onpage();
  }
  async onpage() {
    this.loading = true;
    this.tableParams.pageNumber = this.pageParams.current;
    this.tableParams.pageSize = this.pageParams.pageSize;
    let url = "server/securityHousing/tenant/infoList";
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
  PicSuccess(file: any) {
    if (file.result) {
      this.$SucMessage.success("导入成功");
    } else if (file.data.length < 0) {
      this.$SucMessage.info("导入数据为空");
    }
    this.onpage();
  }
  onChangeSex() {}
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
    this.formParams.applyTime = this.$utils.dateFormat(new Date(this.formParams.applyTime), "yyyy-MM-dd");
    this.formParams.tenantType = "1";
    this.formParams.familyMemberList = [];
    this.formParams.houseSituationList = [];
    let url = "server/securityHousing/tenant/addInfo";
    publicApi.postWithParamJson(url, this.formParams).then((res: any) => {
      if (res.result) {
        this.$SucMessage.success("新增成功");
        this.onpage();
        this.loading = false;
      } else {
        this.$SucMessage.error("新增失败");
        this.loading = false;
      }
    });
  }
  // 编辑接口
  async setEdit() {
    this.loading = true;
    this.formParams.applyTime = this.$utils.dateFormat(new Date(this.formParams.applyTime), "yyyy-MM-dd");
    this.formParams.tenantType = "1";
    let url = "server/securityHousing/tenant/editInfo";
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
    // this.onpage();
  }

  onedit(row: any) {
    this.formParams = {};
    this.btnFlag = "edit";
    this.modalTitle = "编辑";
    this.modal = true;
    let id = row.id;
    this.editInfo(id);
  }
  async editInfo(id: any) {
    let url = "server/securityHousing/tenant/getDetail";
    let params = {
      id: id,
    };
    let data = await publicApi.getWithParam(url, params);
    this.formParams = data.data;
  }
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      id: row.id,
    };
  }
  async cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "server/securityHousing/tenant/delInfo";
    publicApi.deleteWithParam(url, this.delParams).then((data: any) => {
      if (data.result == true) {
        this.delmodel = false;
        this.$SucMessage.info("删除成功");
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
  onSearch(val: any) {
    this.tableParams.idCard = val;
    this.onpage();
  }

  /**
   * 模板下载
   */
  downLoad() {
    let a = document.createElement("a");
    a.href = "./static/保障租户信息导入模板.xls";
    a.download = "保障租户信息导入模板.xls";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  /**
   * 导出
   */

  exportExcel() {
    let consturl =
      url +
      "/api/server/securityHousing/tenant/export?name=" +
      this.tableParams.name +
      "&idCard=" +
      this.tableParams.idCard +
      "&sex=" +
      this.tableParams.sex +
      "&tenantType=" +
      this.tableParams.tenantType;
    window.location.href = consturl; //原窗口打开
  }
}
</script>
<style lang="scss" scoped>
@import "../css/index";
.contain {
  width: 100%;
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
  .table_content {
    width: 100%;
    height: 100%;
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
