
 <template>
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
          <div class="top-item">
            <div class="top-item-sub">
              <suc-input v-model="tableParams.name" placeholder="系统名称" style="width:200px"></suc-input>
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
    
    <Ps-modal :title="modalTitle" :modal="modal" :formParams="formParams" @toggle="toggle" @on-submit="oncreate"> </Ps-modal>
   
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SearchComponent, TablePage } from "@/components";
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { PsModal, DeleteModal } from "./model";
import { publicApi } from "@/api";
import { url } from "../../../../../public/config";

@Component({
  components: {
    TablePage,
    SucButton,
    SucInput,
    SucDatePicker,
    SucSelect,
    SearchComponent,
    PsModal,
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
  uploadHeaders: any = { Authorization: "bearer" + localStorage.getItem("refresh-token") };
  tableData: any = [];
  tableParams: any = {
    name:'',
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
      title: "系统名称",
      key: "name",
    },
    {
      title: "系统类型",
      key: "systemTypeStr",
    },
    {
      title: "汇水面积（公顷）",
      key: "servicearea",
    },
    {
      title: "服务人口数",
      key: "servicepopulation",
    },
    {
      title: "径流系数",
      key: "runoffCoeff",
    },
    {
      title: "设计重现期",
      key: "designRtp",
    },
    {
      title: "记录建立日期",
      key: "estDate",
    },
    {
      title: "最后修改日期",
      key: "updateDate",
    },
    {
      title: "记录建立单位",
      key: "estUnit",
    },
    {
      title: "数据维护单位",
      key: "orgUnit",
    },
    {
      title: "坐标系统",
      key: "coorsystem",
    },
    {
      title: "高程系统",
      key: "elevsystem",
    },
    {
      title: "排水体制补充说明",
      key: "drainsystem",
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
  async onpage() {
    this.loading = true;
    this.tableParams.pageNumber = this.pageParams.current;
    this.tableParams.pageSize = this.pageParams.pageSize;
    let url = "server/dataCenter/psSystem/infoList";
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
    let url = "server/dataCenter/psSystem/addInfo";
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
    let url = "server/dataCenter/psSystem/editInfo";
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
    let systemid = row.systemid;
    this.editInfo(systemid);
  }
  async editInfo(systemid: any) {
    let url = "server/dataCenter/psSystem/getDetail";
    let params = {
      systemId: systemid,
    };
    let data = await publicApi.getWithParam(url, params);
    this.formParams = data.data;
  }
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      systemId: row.systemid,
    };
  }
  async cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "server/dataCenter/psSystem/delInfo";
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
    let consturl = url + "/api/server/securityHousing/caseInfo/export"
    window.location.href = consturl
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
      .content {
      height: calc(100% - 65px);
      border-top: 1px solid #dde4eb;
      .link-text {
        color: #5397ff;
        cursor: pointer;
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