<template>
  <div class="contain">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            APPID:
            <suc-input v-model="tableParams.appid" placeholder="请输入APPID" style="width:200px"></suc-input>
          </div>
          <div class="top-item-sub">
            应用名称：
            <suc-input v-model="tableParams.appname" placeholder="请输入应用名称" style="width:200px"></suc-input>
          </div>
          <div class="top-item-sub">
            授权类型：
            <!-- <suc-input v-model="tableParams.leader" placeholder="请输入角色描述" style="width:200px"></suc-input> -->
            <suc-select v-model="tableParams.authorizedGrantTypes" :options="authorizedGrantOptions" :config="{ placeholder: '请选择授权类型', clearable: true }" style="width: 200px"></suc-select>
          </div>
          <div class="top-item-sub">
            <suc-button @click="onSearch" type="primary" :config="cxConfig">查询</suc-button>
            <suc-button class="btn_xz" type="primary" :debounce="800"   :config="xzConfig"  @on-click="onadd">新增</suc-button>
          </div>
        </div>
      </div>
      <div class="content">
        <table-page
          element-loading-spinner="el-icon-loading"
          :columns="columns"
          :tableData="tableData"
          :pageParams="pageParams"
          v-loading="loading"
          @get-page="getPage"
          @get-size="getSize"
          class="tableValue"
        >
          <template v-slot:clientSecret="{ row }">
            <div>
              {{ getVerification(row.clientSecret) }}
            </div>
          </template>
          <template v-slot:isenable="{ row }">
            <div style="position:relative;left:-55%;">
              <!-- <el-switch class="mySwitch" :value="row.isenable == 'true' ? true : false" active-text="是" inactive-text="否" @change="handleState(row)"> </el-switch> -->
              <el-switch
                class="mySwitch"
                :disabled="row.appname == 'main' ? true : false"
                v-model="row.isenable"
                :active-value="'true'"
                :inactive-value="'false'"
                active-text="正常"
                inactive-text="锁定"
                @change="handleState(row)"
              >
              </el-switch>
            </div>
          </template>
          <!-- <template v-slot:qx="{ row }">
          <div class="btn_fp">
            <span @click="onedit(row)">分配</span>
          </div>
        </template> -->
          <template v-slot:authorizedGrantTypes="{ row }">
            <div>
              <el-tag v-for="tag in row.authorizedGrantTypes" :key="tag.name" :type="tag.type" size="mini" style="margin-right:5px;" effect="plain">
                {{ tag.name }}
              </el-tag>

              <!-- <el-tag type="success" size="mini">授权码模式</el-tag> -->

              <!-- <el-tag v-if="row.authorizedGrantTypes.indexof('password') != -1" type="info">密码模式</el-tag>
            <el-tag v-if="row.authorizedGrantTypes.indexof('refresh_token') != -1" type="warning">刷新Token</el-tag>
            <el-tag v-if="row.authorizedGrantTypes.indexof('implicit') != -1" type="danger">简化模式</el-tag>
            <el-tag v-if="row.authorizedGrantTypes.indexof('client_credentials') != -1" type="danger">客户端模式</el-tag> -->
            </div>
          </template>
          <template v-slot:authorities="{ row }">
            <div>
              <span>{{ row.authorities ? row.authorities : "-" }}</span>
            </div>
          </template>
          <template v-slot:itsort="{ row }">
            <div>
              <span>{{ row.itsort ? row.itsort : "-" }}</span>
            </div>
          </template>
          <template v-slot:autoapprove="{ row }">
            <div>
              <el-tag :type="row.autoapprove == 'true' ? 'success' : 'danger'" size="mini" :disable-transitions="true">{{ row.autoapprove == "true" ? "自动授权" : "不自动授权" }}</el-tag>
            </div>
          </template>
          <template v-slot:zt="{ row }">
            <el-tag size="medium" effect="dark" :type="row.status == '1' ? 'success' : 'info'">{{ row.status == "1" ? "启用" : "禁用" }}</el-tag>
          </template>
          <template v-slot:operation="{ row }">
            <div v-if="row.appname == 'main'" style="color: rgb(188, 188, 188); font-size: 14px;">
              <span>
                <img src="@/assets/stop.png" alt="" width="20px" height="20px" style="vertical-align: middle;" />
                禁用编辑
              </span>
            </div>
            <div class="btn1" v-else>
              <span @click="getConfigResources(row)">配置资源</span>
              <span @click="resetPsd(row)">重置密钥</span>
              <span @click="onedit(row)">编辑</span>
              <!-- <suc-button class="btn_jy">禁用</suc-button> -->
              <span @click="ondelete(row)">删除</span>
            </div>
          </template>
        </table-page>
      </div>
    </div>
    <Yygl-modal :title="modalTitle" :modal="modal" :formParams="formParams" @toggle="toggle" @on-submit="oncreate"> </Yygl-modal>
    <!-- 删除弹框 -->
    <div class="delete-view" v-show="delmodel">
      <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal>
    </div>
    <!-- 配置资源弹框 -->
    <div>
      <suc-modal :config="config" :value="videoShow" @on-cancel="goBack(false)" @on-visible-change="goBack" @on-ok="confirm">
        <el-input v-model="zyValue" ref="input"></el-input>
      </suc-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SearchComponent, TablePage } from "@/components";
import { SucButton, SucInput, SucDatePicker, SucSelect, SucModal } from "@suc/ui";
import { SelectConfig, SelectOptions, ModalConfig,ButtonConfig } from "@suc/ui/interfaces";
import { YyglModal, DeleteModal } from "./model";
import { publicApi } from "@/api";
import { sqType } from "@/utils/commonVariable";
import { url } from "../../../../../public/config";
import { includes } from "lodash";

@Component({
  components: {
    TablePage,
    SucButton,
    SucInput,
    SucDatePicker,
    SucSelect,
    SearchComponent,
    YyglModal,
    DeleteModal,
    SucModal,
  },
})
export default class Yygl extends Vue {
  authorizedGrantOptions: SelectOptions = sqType;
  zyValue: any = "你好啊，我的朋友";
  config: ModalConfig = {
    transfer: false,
    title: "资源配置",
    "footer-hide": false,
    width: 420,
    "mask-closable": true,
    // draggable: true,
    styles: {
      top: "30%",
    },
    "transition-names": ["ease", "fade"],
  };
  xzConfig:ButtonConfig = {
    icon:"md-add"
  };
  cxConfig:ButtonConfig = {
    icon:"md-search"
  };
  loading: boolean = true;
  modalTitle: string = "";
  modal: boolean = false;
  delParams: any = {
    appid: "",
  };
  videoShow: boolean = false;
  btnFlag: any = "";
  delmodel: boolean = false;
  delLoading: boolean = false;
  formParams: any = {};
  value: boolean = true;
  uploadHeaders: any = { Authorization: "bearer" + localStorage.getItem("refresh-token") };
  tableParams: any = {
    pageNumber: "",
    pageSize: "",
  };
  columns: any[] = [
    {
      type: "index",
      title: "序号",
      // width: "100",
    },
    {
      title: "应用名称",
      key: "appname",
      // width:150
    },
    {
      title: "APPID",
      key: "appid",
    },
    {
      title: "APP秘钥",
      slot: "clientSecret",
    },
    {
      title: "状态",
      width: 80,
      slot: "isenable",
    },
    {
      title: "作用域",
      key: "scope",
    },
    {
      title: "授权类型",
      slot: "authorizedGrantTypes",
      width: 400,
    },
    {
      title: "回调地址",
      key: "webServerRedirectUri",
      width: 100,
    },
    {
      title: "权限",
      slot: "authorities",
    },
    {
      title: "是否自动授权",
      slot: "autoapprove",
      width: 100,
    },
    {
      title: "排序",
      slot: "itsort",
    },
    {
      title: "创建时间",
      key: "createtime",
      width: 150,
    },
    {
      title: "描述",
      key: "appdesc",
    },
    {
      title: "操作",
      slot: "operation",
      fixed: "right",
      width: 350,
    },
  ];
  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };

  tableData: any = [];
  zyParams: any = {
    appid: "",
    resourceids: "system-admin-base",
  };
  // 前端页面脱敏表示
  getVerification: any = (params: any) => {
    if (params) {
      let value = params.slice(0, 5) + "*******";
      return value;
    } else {
      return " ";
    }
  };
  // 处理状态
  async handleState(row: any) {
    const url = "/wjBaseServer/admin/application/set/enable";
    let params = {
      appid: row.appid,
      isenable: row.isenable,
    };
    try {
      let { data } = await publicApi.putWithParamSerializer(url, params);
      if (data.result) {
        if (params.isenable == "true") {
          this.$SucMessage.success("启动成功");
        } else if (params.isenable == "false") {
          this.$SucMessage.success("锁定成功");
        }
        this.onpage();
      } else {
        this.$SucMessage.error("提交失败");
        return;
      }
    } catch (err) {
      console.log(err, "5555");
    }
  }
  mounted() {
    this.onpage();
  }
  async onpage() {
    this.loading = true;
    this.tableParams.pageNumber = this.pageParams.current;
    this.tableParams.pageSize = this.pageParams.pageSize;
    let url = "/wjBaseServer/admin/application/info";
    let data = await publicApi.getWithParam(url, this.tableParams);
    if (data.result) {
      let oldData = data.data.list;
      oldData.forEach((e: any, index: any) => {
        e.authorizedGrantTypes = e.authorizedGrantTypes.split(",");
        for (let i = 0; i < e.authorizedGrantTypes.length; i++) {
          switch (e.authorizedGrantTypes[i]) {
            case "authorization_code":
              e.authorizedGrantTypes[i] = { name: "授权模式", type: "success" };
              break;
            case "password":
              e.authorizedGrantTypes[i] = { name: "密码模式", type: "danger" };
              break;
            case "refresh_token":
              e.authorizedGrantTypes[i] = { name: "刷新Token", type: "warning" };
              break;
            case "implicit":
              e.authorizedGrantTypes[i] = { name: "简化模式", type: " " };
              break;
            case "client_credentials":
              e.authorizedGrantTypes[i] = { name: "客户端模式", type: "info" };
              break;
            default:
              break;
          }
        }
      });
      this.tableData = oldData;
      this.pageParams.total = parseInt(data.data.total);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    } else {
      this.$message.error("加载失败")
      setTimeout(() => {
        this.loading = false;
      }, 500);
      this.tableData = [];
    }
  }

  // 资源配置
  getConfigResources(row: any) {
    this.videoShow = true;
    this.$nextTick(() => {
      (this.$refs["input"] as any).focus();
    });
    this.zyParams.appid = row.appid;
    // this.getAuth();
  }
  // 重置密钥
  resetPsd({ appid }: any) {
    this.$confirm("确定重置应用秘钥吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "不了",
      type: "warning",
      customClass: "aa",
      // center: true,
    })
      .then(() => {
        this.getResetPsd(appid);
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消",
        });
      });
  }
  // getAuth() {
  //   let url = "/wjBaseServer/admin/resource/info";
  //   publicApi.getNoParam(url).then((data) => {
  //     console.log(data,"555");
  //   });
  // }
  //关闭
  goBack(val: boolean) {
    this.videoShow = val;
  }

  confirm() {
    this.videoShow = false;
    this.loading = true;
    let url = "/wjBaseServer/admin/application/set/resourceids/";
    publicApi.putWithParamSerializer1(url, this.zyParams).then((res) => {
      if (res.result) {
        this.$SucMessage.success("资源配置成功");
        setTimeout(() => {
          this.loading = false;
        }, 500);
      } else {
        this.$SucMessage.success("资源配置失败");
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    });
    this.onpage();
  }

  getResetPsd(appid: any) {
    let url = "/wjBaseServer/admin/application/reset/appSecret/" + appid;
    publicApi.putNoParam(url).then((res) => {
      if (res.result) {
        this.$message({
          type: "success",
          message: "重置密钥成功",
        });
        this.onpage();
      } else {
        this.$message({
          type: "error",
          message: "重置密钥失败",
        });
      }
    });
  }

  onadd() {
    this.modal = true;
    this.btnFlag = "add";
    this.modalTitle = "新增";
    this.formParams = {
      isenable: true,
    };
  }
  toggle(val: any) {
    this.modal = val;
  }
  oncreate() {
    this.modal = false;
    this.formParams.authorizedGrantTypes = this.formParams.authorizedGrantTypes.join(",");
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
    let url = "/wjBaseServer/admin/application/info";
    publicApi.postWithParam(url, this.formParams).then((res: any) => {
      if (res.result) {
        this.modal = false;
        this.$SucMessage.success("新增成功");
        this.onpage();
      } else {
        this.modal = false;
        this.$SucMessage.success("新增失败");
        this.onpage();
      }
    });
    // this.onpage();
  }
  // 编辑接口
  async setEdit() {
    this.loading = true;
    let url = "/wjBaseServer/admin/application/info";
    publicApi.putWithParamSerializer1(url, this.formParams).then((data: any) => {
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

  // 编辑先获取详情，然后确认提交 到服务器
  onedit(row: any) {
    this.formParams = {};
    this.btnFlag = "edit";
    this.modalTitle = "编辑";
    this.modal = true;
    let appid = row.appid;
    this.editInfo(appid);
  }
  async editInfo(appid: any) {
    let url = "/wjBaseServer/admin/application/detailByAppId/" + appid;
    publicApi.getNoParam(url).then((data: any) => {
      if (data.result) {
        let oldObj = data.data;
        Object.keys(oldObj).map((key: any) => {
          if (key && key == "isenable") {
            oldObj[key] = eval(oldObj[key].toLowerCase());
          } else if (key == "authorizedGrantTypes") {
            oldObj[key] = oldObj[key].split(",");
          } else {
            return oldObj;
          }
        });
        this.formParams = oldObj;
        this.openNotify();
      } else {
        this.$notify.error({
          title: "失败",
          message: "详情获取失败",
        });
        return;
      }
    });
    // this.formParams = data.data;
    // this.formParams.imgList = data.data.minIoFileList.map((item: any) => {
    //   return {
    //     name: item.oldName,
    //     percentage: 100,
    //     uid: item.fileId,
    //     url: item.previewUrl,
    //     response: {
    //       data: {
    //         result: true,
    //         code: "0",
    //         fileId: item.fileId,
    //         oldName: item.oldName,
    //         bucket: "file",
    //         previewUrl: item.previewUrl,
    //       },
    //     },
    //   };
    // });
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

  openNotify() {
    this.$notify({
      title: "成功",
      message: "详情获取成功",
      type: "success",
    });
  }
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      appid: row.appid,
    };
  }
  async cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "/wjBaseServer/admin/application/info/delByAppId/" + this.delParams.appid;
    publicApi.deleteNoParam(url).then((data: any) => {
      if (data.result) {
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
  // 查询获取列表
  onSearch() {
    this.onpage();
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.contain {
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  .info-view {
    height: 100%;
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
      margin-right: 5px;
      padding: 2px 15px;
      border-radius: 5px;
      color: #fff;
      &:first-of-type {
        background-color: #e3c956;
      }
      &:nth-of-type(2) {
        background-color: #2ed878;
      }
      &:nth-of-type(3) {
        background-color: #1890ff;
      }
      &:last-of-type {
        background-color: #ff5a47;
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
  .btn_fp {
    cursor: pointer;
    span {
      display: inline-block;
      margin-right: 10px;
      &:first-of-type {
        color: #fff;
        background-color: #4caf50;
        padding: 2px 15px;
        border-radius: 5px;
      }
    }
  }
  .btn_xz {
    background-color: #fff;
    color: #595959;
    margin-left: 20px;
    border: 1px solid #d9d9d9;
  }
  .btn_jy {
    background-color: #9e9e9e;
    color: #fff;
    margin-right: 7px;
    padding: 3px 14px 2px;
    border: none;
  }
  .delete-view {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
  }

  #{$deep}.mySwitch {
    position: relative;
    left: -12%;
    .el-switch__label--left {
      position: relative;
      left: 55px;
      color: #fff;
      z-index: -1111;
      span {
        width: 25px;
        font-size: 12px;
      }
    }
    .el-switch__label--right {
      position: relative;
      right: 55px;
      color: #fff;
      z-index: -1111;
      span {
        display: inline-block;
        width: 25px;
        font-size: 12px;
      }
    }
    .el-switch__core {
      width: 50px !important;
    }
    .el-switch__label--right.is-active {
      z-index: 10;
      color: #fff !important;
    }
    .el-switch__label--left.is-active {
      z-index: 10;
      color: #838282 !important;
    }
  }
  #{$deep}.suc-modal .ivu-modal-header {
    height: 40px;
  }
  #{$deep}.el-loading-spinner {
    font-size: 30px;
  }
}
.tableValue {
  //滚动条的宽高
  ::-webkit-scrollbar {
    height: 1vh;
  }
  //滚动条的滑块背景色
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 1vh;
  }
  //滚动条的背景色
  ::-webkit-scrollbar-track {
    background: rgba(#ccc, 0.3);
  }
}
</style>

<style lang="scss">
.aa {
  .el-message-box__btns {
    .el-button:nth-child(1):hover {
      color: #8bd727;
      border-color: #2ed878;
      background-color: #ecf5ff;
    }
    .el-button:nth-child(2) {
      margin-right: 10px;
      background-color: #2ed878;
      border-color: #2ed878;
    }
  }
}
</style>
