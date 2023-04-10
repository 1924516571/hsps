<template>
  <div class="contain">
    <div class="top">
      <div class="top-item">
        <div class="top-item-sub">
          <suc-input v-model="tableParams.name" placeholder="租户姓名" :config="{ clearable: true }" style="width: 200px"> </suc-input>
          <!-- <el-input v-model="tableParams.name" placeholder="租户姓名" style="width: 200px" autocomplete="on" @focus="handleFocus" @change="handleChange" @input="handleInput" name="test1"></el-input> -->
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
        <!-- <suc-button class="btn" type="success" @on-click="downLoad">模板下载</suc-button>
        <el-upload type="success" :headers="uploadHeaders" :on-success="PicSuccess" action="api/wjServer/dataCenter/baseinfo/WeiQu/import" accept=".xls" :show-file-list="false">
          <suc-button class="btn" type="primary" :debounce="800">导入</suc-button>
        </el-upload> -->

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
    <market-house-modal :modal="modal" @toggle="toggle" :title="modalTitle" :formParams="formParams" @on-submit="oncreate"></market-house-modal>
    <!-- 删除弹框 -->
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { SearchComponent, TablePage } from "@/components";
import { MarketHouseModal, DeleteModal } from "../model";
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
    MarketHouseModal,
    DeleteModal,
  },
})
export default class GivePlan extends Vue {
  loading: boolean = false;
  modal: boolean = false;
  delLoading: boolean = false;
  modalTitle: string = "";
  btnFlag: string = "";
  delParams: any = {};
  delmodel: boolean = false;
  uploadHeaders: any = { Authorization: "bearer" + localStorage.getItem("refresh-token") };
  sexOptions: any = [
    { value: "男", label: "男" },
    { value: "女", label: "女" },
  ];
  onChangeSex() {}
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
    },
    {
      title: "性别",
      key: "sex",
    },
    {
      title: "户口所在地",
      key: "areaName",
    },
    {
      title: "联系电话",
      key: "telephone",
    },
    {
      title: "工作单位",
      key: "company",
    },
    {
      title: "出租类型",
      key: "leaseType",
    },
    {
      title: "操作",
      slot: "operation",
      width: 110,
    },
  ];
  formParams: any = {
    familyMemberList: [
      // {
      //   name: "单朋",
      //   idCard: "32083019940823241X",
      //   familyRelations: "姨夫",
      //   marriage: "否",
      //   areaName: "上海市普陀区金沙江路 1518 弄",
      //   company: "江苏省无锡市新吴区中科智远",
      // },
      // {
      //   name: "周恒",
      //   idCard: "32083019940823241X",
      //   familyRelations: "姨夫",
      //   marriage: "否",
      //   areaName: "上海市普陀区金沙江路 1518 弄",
      //   company: "江苏省无锡市新吴区中科智远",
      // },
      // {
      //   name: "树杰",
      //   idCard: "32083019940823241X",
      //   familyRelations: "姨夫",
      //   marriage: "否",
      //   areaName: "上海市普陀区金沙江路 1518 弄",
      //   company: "江苏省无锡市新吴区中科智远",
      // },
      // {
      //   name: "宇哥",
      //   idCard: "32083019940823241X",
      //   familyRelations: "姨夫",
      //   marriage: "否",
      //   areaName: "上海市普陀区金沙江路 1518 弄",
      //   company: "江苏省无锡市新吴区中科智远",
      // },
    ],
    houseSituationList: [
      // {
      //   houseNature: "棚户",
      //   houseLocation: "无锡新安",
      //   floorage: "30",
      //   ownerLessee: "国家",
      // },
      // {
      //   houseNature: "拆迁",
      //   houseLocation: "无锡市新吴区东方天君dadsadsafdsafqweuhwqueqhe qeq heq jeq he    kqeq    ",
      //   floorage: "89",
      //   ownerLessee: "单朋",
      // },
      // {
      //   houseNature: "拆迁",
      //   houseLocation: "无锡市新吴区东方天君",
      //   floorage: "120",
      //   ownerLessee: "宇哥",
      // },
      // {
      //   houseNature: "拆迁",
      //   houseLocation: "无锡市新吴区东方天君",
      //   floorage: "120",
      //   ownerLessee: "宇哥",
      // },
      // {
      //   houseNature: "拆迁",
      //   houseLocation: "无锡市新吴区东方天君",
      //   floorage: "120",
      //   ownerLessee: "宇哥",
      // },
      // {
      //   houseNature: "拆迁",
      //   houseLocation: "无锡市新吴区东方天君",
      //   floorage: "120",
      //   ownerLessee: "宇哥",
      // },
      // {
      //   houseNature: "拆迁",
      //   houseLocation: "无锡市新吴区东方天君",
      //   floorage: "120",
      //   ownerLessee: "宇哥",
      // },
      // {
      //   houseNature: "拆迁",
      //   houseLocation: "无锡市新吴区东方天君",
      //   floorage: "120",
      //   ownerLessee: "宇哥",
      // },
      // {
      //   houseNature: "拆迁",
      //   houseLocation: "无锡市新吴区东方天君",
      //   floorage: "120",
      //   ownerLessee: "宇哥",
      // },
      // {
      //   houseNature: "拆迁",
      //   houseLocation: "无锡市新吴区东方天君",
      //   floorage: "120",
      //   ownerLessee: "宇哥",
      // },
    ],
  };

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 20,
  };
  tableParams: any = {
    name: "",
    idCard: "",
    sex: "",
    pageNumber: "",
    pageSize: "",
    tenantType: "2",
  };

  tableData: any = [];
  mounted() {
    this.onpage();
  }

  PicSuccess(file: any) {
    if (file.result) {
      this.$SucMessage.success("导入成功");
    } else if (file.data.length < 0) {
      this.$SucMessage.info("导入数据为空");
    }
    this.onpage();
  }

  // 新增
  onadd() {
    this.modal = true;
    this.btnFlag = "add";
    this.modalTitle = "新增";
    this.formParams = {
      familyMemberList: [],
      houseSituationList: [],
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
  // 新增
  setCreate() {
    this.loading = true;
    this.formParams.tenantType = "2";
    let url = "server/securityHousing/tenant/addInfo";
    publicApi.postWithParamJson(url, this.formParams).then((res: any) => {
      if (res.result) {
        this.$SucMessage.success("新增成功");
        this.onpage();
      } else {
        this.$SucMessage.success("新增失败");
        this.loading = false;
      }
    });
  }
  // 编辑接口
  setEdit() {
    this.loading = true;
    this.formParams.tenantType = "2";
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
    console.log(row, "9999");
    this.delmodel = true;
    this.delParams = {
      id: row.id,
    };
  }
  cancel(val: any) {
    this.delmodel = val;
  }
  save() {
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
  // 模板下载
  downLoad() {
    let consturl = "api/wjBaseServer/minio/file/downloadModel?fileName=保障租户信息导入模板.xls";
    var xhr = new XMLHttpRequest();
    xhr.open("get", consturl, true); // get、post都可
    xhr.responseType = "blob";
    xhr.setRequestHeader("Authorization", this.uploadHeaders); //加请求头
    xhr.onload = function() {
      if (xhr.status == 200) {
        let blob = new Blob([this.response], { type: "application/vnd.ms-excel" });
        var a = document.createElement("a");
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = "保障租户信息导入模板"; // 文件名
        a.click();
        window.URL.revokeObjectURL(url);
      }
    };
    xhr.send();
    // let url= process.env.VUE_APP_BASE + "api/wjBaseServer/minio/file/downloadModel?fileName=保障租户信息导入模板.xls";
    // window.location.href = url;
    // window.location.href = "api/wjBaseServer/minio/file/downloadModel?fileName=保障租户信息导入模板.xls";
  }
  // 导出
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
    window.location.href = consturl;
  }

  // created() {
  //   const inputCookie = this.getCookie("input");
  //   console.log(inputCookie, "？？？");
  //   this.tableParams.name = inputCookie;
  // }
  // handleChange(val: any) {
  //   this.setCookie("input", val);
  // }
  // handleInput(val: any) {
  //   console.log(val, "8888");
  // }
  // handleFocus() {}
  // // 设置cookie
  // setCookie: any = (name: any, value: any) => {
  //   var Days = 7; //cookie 将被保存两个月
  //   var exp = new Date(); //获得当前时间
  //   exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000); //换成毫秒
  //   // document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();
  //   document.cookie = name + "=" + value;
  // };
  // // 获取cookie
  // getCookie: any = (name: any) => {
  //   //取出cookie
  //   var strCookie = document.cookie;
  //   //cookie的保存格式是 分号加空格 "; "
  //   var arrCookie = strCookie.split("; ");
  //   for (var i = 0; i < arrCookie.length; i++) {
  //     var arr = arrCookie[i].split("=");
  //     if (arr[0] == "input") {
  //       return arr[1];
  //     }
  //   }
  //   return "";
  // };
  // // 删除cookie
  // delCookie: any = (name: any) => {
  //   var exp = new Date(); //当前时间
  //   exp.setTime(exp.getTime() - 1); //删除cookie 只需将cookie设置为过去的时间
  //   var cval = this.getCookie(name);
  //   if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
  // };
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
  .table_content {
    width: 100%;
    height: 100%;
    .btn1 {
      color: #5397ff;
      cursor: pointer;
      span {
        display: inline-block;
        margin-right: 10px;
        &:nth-of-type(2) {
          color: #ff5a47;
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
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
