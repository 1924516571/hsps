<template>
  <div class="contain">
    <div class="top">
      <div class="top-item">
          <div class="top-item-sub">
            <suc-input v-model="tableParams.leader" placeholder="负责人" style="width:200px"></suc-input>
          </div>
          <div class="top-item-sub">
            <suc-date-picker
              v-model="tableParams.startTime"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '开始时间',
              }"
              style="width: 100%"
            ></suc-date-picker>
          </div>
          <div class="top-item-sub">
            <suc-date-picker
              v-model="tableParams.endTime"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '结束时间',
              }"
              style="width: 100%"
            ></suc-date-picker>
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
    <Ajjl-modal :title="modalTitle" :modal="modal" :formParams="formParams" @toggle="toggle" @on-submit="oncreate"> </Ajjl-modal>
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
import { AjjlModal, DeleteModal } from "./model";
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
    AjjlModal,
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
 
  tableParams: any = {
    leader: "",
    startTime: "",
    endTime: "",
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
      title: "负责人",
      key: "leader",
    },
    {
      title: "电话",
      key: "telephone",
    },
    {
      title: "具体地址",
      key: "address",
    },
    {
      title: "案件描述",
      key: "description",
    },
    {
      title: "损失财产（万元）",
      key: "lossWealth",
    },
    {
      title: "案件发生日期",
      key: "happenTime",
    },
    {
      title: "登记日期",
      key: "createTime",
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

  tableData: any = [];
  mounted() {
    this.onpage();
  }
  async onpage() {
    this.loading = true;
    this.tableParams.leader = this.tableParams.leader;
    this.tableParams.startTime = this.tableParams.startTime;
    this.tableParams.endTime = this.tableParams.endTime;
    this.tableParams.pageNumber = this.pageParams.current;
    this.tableParams.pageSize = this.pageParams.pageSize;
    let url = "server/securityHousing/caseInfo/infoList";
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
    this.formParams = {
      imgList: [],
      minIoFileList: [],
    };
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
    let url = "server/securityHousing/caseInfo/addInfo";
    publicApi.postWithParamJson(url, this.formParams).then((res: any) => {
      if (res.result) {
        this.$SucMessage.success("新增成功");
        this.loading = false;
        this.onpage();
      } else {
        this.$SucMessage.success("新增失败");
        this.loading = false;
      }
    });
    // this.onpage();
  }
  // 编辑接口
  async setEdit() {
    this.loading = true;
    let url = "server/securityHousing/caseInfo/editInfo";
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
      let url = "server/securityHousing/caseInfo/getDetail";
      let params = {
        id: id,
      };
      let data = await publicApi.getWithParam(url, params);
      this.formParams = data.data;
      this.formParams.imgList = data.data.minIoFileList.map((item: any) => {
      return {
        name: item.oldName,
        percentage: 100,
        uid: item.fileId,
        url: item.previewUrl,
        response: {
          data: {
            result: true,
            code: "0",
            fileId: item.fileId,
            oldName: item.oldName,
            bucket: "file",
            previewUrl: item.previewUrl,
          },
        },
      };
    });
      // this.formParams = data.data;
      // const imgURL = [""];
      // this.formParams = {
      // imgList: [],
      // };
      // this.formParams={
      //   leader:data.data.leader,
      //   address:data.data.address,
      //   happenTime:data.data.happenTime,
      //   description:data.data.description,
      //   telephone:data.data.telephone,
      //   lossWealth:data.data.lossWealth,
      //   // imgList: imgURL,
      //   minIoFileList:data.data.minIoFileList,
      // }
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
    let url = "server/securityHousing/caseInfo/deleteInfo";
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
    // this.tableParams.leader = val;
    this.onpage();
  }
  // downloadHeaders: any = "bearer " + localStorage.getItem("refresh-token");
  // exportExcel() {
  //   let consturl = "/api/server/securityHousing/caseInfo/export"
  //   var xhr = new XMLHttpRequest();
  //   xhr.open("get", consturl, true); // get、post都可
  //   xhr.responseType = "blob";  
  //   xhr.setRequestHeader("Authorization",this.downloadHeaders); //加请求头
  //   xhr.onload = function() {
  //       if(xhr.status==200){
  //           let blob = new Blob([this.response],{ type: 'application/vnd.ms-excel' });
  //           var a = document.createElement("a")
  //           var url = window.URL.createObjectURL(blob)
  //           a.href = url
  //           a.download = '案件记录'  // 文件名
  //           a.click()
  //           window.URL.revokeObjectURL(url)
  //       }
  //   } 
  //   xhr.send();
  // }
  exportExcel() {
    let consturl = url + "/api/server/securityHousing/caseInfo/export"
    window.location.href = consturl
  }
}
</script>
<style lang="scss" scoped>
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
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
  }
}

</style>
