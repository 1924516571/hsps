<template>
  <div class="contain">
    <div class="top">
      <div class="top-item">
          <div class="top-item-sub">
            <suc-input placeholder="小区名称" style="width:200px"></suc-input>
          </div>
          <div class="top-item-sub">
            <suc-button @click="onSearch" type="primary">搜索</suc-button>
          </div>
        </div>

      <div class="top-item">
        <el-upload
          type="success"
          style="margin-right: 10px;"
          size="small"
          :headers="uploadHeaders"
          :on-success="PicSuccess"
          action="api/server/securityHousing/basicCommunity/import"
          accept=".xls,.xlsx"
          :show-file-list="false"
          >
          <suc-button class="btn" type="primary" :debounce="800">导入</suc-button>
        </el-upload>
        <suc-button class="btn" type="primary" :debounce="800" @on-click="exportExcel">导出</suc-button>
        <suc-button type="primary" :debounce="800" @on-click="onadd">新增</suc-button>
      </div>
    </div>
    <div class="content">
      <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize">
        <template v-slot:houseStatus="{ row }">
           <el-tag size="mini" :type="row.allotStatus == true ? 'success' : ''">{{row.allotStatus == true ? '已分配' : '未分配'}}</el-tag>
        </template>
        <template v-slot:operation="{ row }">
          <div class="btn1">
            <span @click="onedit(row)">编辑</span>
            <span @click="ondelete(row)">删除</span>
          </div>
        </template>
        <template v-slot:cz>
            <div style="text-align:center;width:100%">操作</div>
          </template>
      </table-page>
    </div>
    <Xq-modal :title="modalTitle" :modal="modal" :formParams="formParams" @toggle="toggle" @on-submit="oncreate"> </Xq-modal>
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
import { XqModal, DeleteModal } from "./model";
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
    XqModal,
    DeleteModal,
  },
})
export default class GivePlan extends Vue {
  loading: boolean = true;
  modalTitle: string = "";
  modal: boolean = false;
  zlmodal: boolean = false;
  delParams: object = {};
  btnFlag: any = "";
  delmodel: boolean = false;
  delLoading: boolean = false;
  formParams: any = {
    minIoFileList: [],
    // videoPath: "",
    communityName:'',
    companyName:'',
    address:'',
    communityArea:'',
    areaCode:'',
    familyNumber:'',
    littleHighFee:'',
    villaFee:'',
    remarks:'',
    buildingNumber:'',
    propertyFee:'',
    companyId:'',
    highFee:'',
    shopFee:'',
  };
  zlformParams: any = {};
  uploadHeaders: any = { Authorization: "bearer" + localStorage.getItem("refresh-token") };
  sexData: any = [
    {value:'自持',label:'自持'},
    {value:'租赁',label:'租赁'}
  ];

  zhType: any = [
    {value:'已分配',label:'已分配'},
    {value:'未分配',label:'未分配'}
  ];
  tableParams: any = {
    communityName: "",
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
      title: "小区名称",
      key: "communityName",
    },
    {
      title: "小区面积㎡",
      key: "communityArea",
    },
    {
      title: "所在区域",
      key: "areaCode",
    },
    {
      title: "物业公司",
      key: "companyName",
    },
    {
      title: "楼栋数",
      key: "buildingNumber",
    },
    {
      title: "操作",
      heading:'cz',
      slot: "operation",
      width: 100,
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
    this.tableParams.pageNumber = this.pageParams.current;
    this.tableParams.pageSize = this.pageParams.pageSize;
    let url = "server/securityHousing/basicCommunity/infoList";
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
    let url = "server/securityHousing/basicCommunity/addNew";
    publicApi.postWithParamJson(url, this.formParams).then((res: any) => {
      if (res.result) {
        this.$SucMessage.success("新增成功");
        this.onpage();
        this.loading = false;
      } else {
        this.$SucMessage.success("新增失败");
        this.loading = false;
      }
    });
  }
  // 编辑接口
  async setEdit() {
    this.loading = true;
    // this.formParams.applyTime = this.$utils.dateFormat(new Date(this.formParams.applyTime), "yyyy-MM-dd");
    let arrqy = this.formParams.areaCode.toString(); //字符串转换
    this.formParams.areaCode=arrqy
    let url = "server/securityHousing/basicCommunity/updateById";
    publicApi.postWithParamJson(url, this.formParams).then((data: any) => {
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
    let url = "server/securityHousing/basicCommunity/selectById";
    let params = {
      id: id,
    };
    let data = await publicApi.getWithParam(url, params);
    let arrqy = data.data.areaCode.split(","); //字符串转换成数组
    // this.formParams={
    //   areaCode:''
    // }
      this.formParams = {
        companyName:data.data.companyName,
        id:data.data.id,
        communityName:data.data.communityName,
        address:data.data.address,
        communityArea:data.data.communityArea,
        areaCode:arrqy,
        familyNumber:data.data.familyNumber,
        littleHighFee:data.data.littleHighFee,
        villaFee:data.data.villaFee,
        remarks:data.data.remarks,
        buildingNumber:data.data.buildingNumber,
        propertyFee:data.data.propertyFee,
        companyId:data.data.companyId,
        highFee:data.data.highFee,
        shopFee:data.data.shopFee,
      }
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
    let url = "server/securityHousing/basicCommunity/delete";
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
  // downloadHeaders: any = "bearer " + localStorage.getItem("refresh-token");
  // exportExcel() {
  //   let consturl = "/api/server/securityHousing/basicCommunity/export"
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
  //           a.download = '小区列表'  // 文件名
  //           a.click()
  //           window.URL.revokeObjectURL(url)
  //       }
  //   } 
  //   xhr.send();
  // }
  exportExcel() {
    let consturl = url + "/api/server/securityHousing/basicCommunity/export"
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
          &:nth-of-type(2) {
            color: #5397ff;
          }
          &:nth-of-type(3) {
            color: #5397ff;
          }
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
