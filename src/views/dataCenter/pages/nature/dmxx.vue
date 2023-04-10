
<template>
  <!-- 断面信息 -->
 <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
          <div class="top-item">
            <div class="top-item-sub">
              <suc-input v-model="tableParams.code" placeholder="断面编码" style="width:200px"></suc-input>
            </div>
            <div class="top-item-sub">
              <suc-input v-model="tableParams.name" placeholder="断面名称" style="width:200px"></suc-input>
            </div>
            <div class="top-item-sub">
              <suc-button @click="onSearch" type="primary">搜索</suc-button>
            </div>
          </div>
          <div class="top-item">
            <suc-button class="btn" type="primary" :debounce="800" @on-click="exportExcel">导出</suc-button>
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
    <Dm-modal :title="modalTitle" :modal="modal" :formParams="formParams" @toggle="toggle" @on-submit="oncreate"> </Dm-modal>
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SearchComponent, TablePage } from "@/components";
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { publicApi } from "@/api";
import { DmModal } from "./model";
import { DeleteModal } from "../model";
import { url } from "../../../../../public/config";

@Component({
  components: {
    TablePage,
    SucButton,
    SucInput,
    SucDatePicker,
    SucSelect,
    SearchComponent,
    DeleteModal,
    DmModal
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
      width: "50",
    },
    {
      title: "断面名称",
      key: "name",
    },
    {
      title: "断面代码",
      key: "code",
    },
    {
      title: "断面所属位置",
      key: "address",
    },
    {
      title: "断面类型",
      key: "type",
    },
    {
      title: "断面所属河道id",
      key: "riverid",
    },
    {
      title: "断面所属河道名称",
      key: "rivername",
    },
    {
      title: "断面高程",
      key: "elevation",
    },
    {
      title: "断面总面积",
      key: "totalarea",
    },
    {
      title: "断面过水面积",
      key: "waterarea",
    },
    {
      title: "断面面积注解码",
      key: "commentcode",
    },
    {
      title: "断面平均流速",
      key: "avgv",
    },
    {
      title: "断面最大流速",
      key: "maxv",
    },
    {
      title: "水面宽",
      key: "waterwidth",
    },
    {
      title: "断面平均水深",
      key: "avgwaterheight",
    },
    {
      title: "断面最大水深",
      key: "maxwaterheight",
    },
    {
      title: "断面目标水质",
      key: "targetwq",
    },
    {
      title: "目标高猛酸钾",
      key: "targetcodmn",
    },
    {
      title: "目标总磷",
      key: "targettp",
    },
    {
      title: "目标氨氮",
      key: "targetnh3",
    },
    {
      title: "断面经度",
      key: "lon",
    },
    {
      title: "断面纬度",
      key: "lat",
    },
    {
      title: "断面排序序号",
      key: "sort",
    },
    {
      title: "测量日期",
      key: "measuredate",
    },
    {
      title: "滩地宽度",
      key: "beachwidth",
    },
    {
      title: "河槽宽度",
      key: "channelwidth",
    },
    {
      title: "河槽高程",
      key: "channelelevation",
    },
    {
      title: "河槽冲击厚度",
      key: "channelthickness",
    },
    {
      title: "主河槽（河床最深点）底部高程",
      key: "maxchannelelevation",
    },
    {
      title: "滩地平均高程",
      key: "beachelevation",
    },
    {
      title: "滩地冲击厚度",
      key: "beachthickness",
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
    let url = "server/datacenter/section/page";
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
    let url = "server/datacenter/section";
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
    let url = "server/datacenter/section";
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
    let uuid = row.uuid;  
    this.editInfo(uuid);
  }
  async editInfo(uuid: any) {
    let url = "server/datacenter/section";
    let params = {
      uuid: uuid,
    };
    let data = await publicApi.getWithParam(url, params);
    this.formParams = data.data;
  }
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      uuid: row.uuid,
    };
    console.log(row)
  }
  async cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "server/datacenter/section";
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
    let consturl = url + "/api/server/datacenter/section/export"
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