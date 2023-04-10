<template>
  <div>
    <!-- 一级弹框 -->
    <div>
      <el-dialog :fullscreen="dialogFull" :append-to-body="true" :title="title" :visible.sync="zlmodal" :close-on-click-modal="true" :before-close="onCancel">
        <!-- 基本信息 -->
        <el-form :model="zlformParams" ref="marketForm" label-width="auto" size="small" :rules="rules">
          <!-- 租赁情况 -->
          <div style="margin-top:40px;">
            <div class="main_table">
              <div class="xz">
                <suc-button type="primary" @click="addHouseRow" :debounce="800">新增</suc-button>
              </div>
              <table-page customHeight="435" :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize">
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
          </div>
        </el-form>
        <template slot="title">
          <div class="avue-crud__dialog__header">
            <span class="el-dialog__title">
              {{ title }}
            </span>
            <div class="avue-crud__dialog__menu" @click="dialogFull ? (dialogFull = false) : (dialogFull = true)">
              <i class="el-icon-full-screen"></i>
            </div>
          </div>
        </template>
        
        <div slot="footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onOk()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 住房情况二级弹框 -->
    <div class="famBody">

      <el-dialog :append-to-body="true" :title="modalTitle" :visible.sync="houseModal" :close-on-click-modal="false" :before-close="cancelHouseModal">
        <el-form class="form" :model="houseFormParams" ref="houseForm" label-width="auto" size="small">
          <div>
            <el-form-item label="开始日期:">
              <suc-date-picker
                v-model="formParams.startdate"
                :options="{
                  type: 'date',
                  clearable: true,
                  placeholder: '选择时间',
                }"
                style="width: 100%"
              ></suc-date-picker>
            </el-form-item>
            <el-form-item label="租金/月（元）:">
              <suc-input v-model="formParams.monthFee" style="width: 100%" placeholder="请输入"></suc-input>
            </el-form-item>
            <el-form-item label="备注:">
              <suc-input type="textarea" v-model="formParams.nt" style="width: 100%" placeholder="请输入"></suc-input>
            </el-form-item>
            <el-form-item label="厨房：">
              <el-upload
              class="upload-demo"
              :on-success="PicSuccesscf"
              multiple
              action="api/wjBaseServer/minio/file/upload"
              :on-remove="cfhandleRemove"
              :on-preview="handlePreview"
              :file-list="formParams.cfimgList"
              list-type="picture-card"
              size="small"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
            </el-form-item>
            <el-form-item label="附件：">
              <el-upload
              class="upload-demo"
              :on-success="PicSuccess"
              multiple
              action="api/wjBaseServer/minio/file/upload"
              :on-remove="handleRemove"
              :on-preview="handlePreview"
              :file-list="formParams.imgList"
              list-type="picture-card"
              size="small"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
            </el-form-item>
        </div>
        
        <div>
          <el-form-item label="结束日期:">
            <suc-date-picker
              v-model="formParams.enddate"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '选择时间',
              }"
              style="width: 100%"
            ></suc-date-picker>
          </el-form-item>
          <el-form-item label="租金总额（元）:">
            <suc-input v-model="formParams.totalFee" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <div style="padding-top:18%">
            <el-form-item label="家具：">
              <el-upload
              class="upload-demo"
              :on-success="PicSuccessjj"
              multiple
              action="api/wjBaseServer/minio/file/upload"
              :on-remove="jjhandleRemove"
              :on-preview="handlePreview"
              :file-list="formParams.jjimgList"
              list-type="picture-card"
              size="small"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
            </el-form-item>
          <el-form-item label="卫生间：" >
            <el-upload
              class="upload-demo"
              :on-success="PicSuccesswsj"
              multiple
              action="api/wjBaseServer/minio/file/upload"
              :on-remove="wsjhandleRemove"
              :on-preview="handlePreview"
              :file-list="formParams.wsjimgList"
              list-type="picture-card"
              size="small"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          </div>
          
        </div>

        </el-form>
       
        <div slot="footer" v-if="xzshowrow">
          <el-button @click="cancelHouseModal">取 消</el-button>
          <el-button  type="primary" @click="houseOk()">确 定</el-button>
        </div> 
        <div slot="footer" v-if="bjshowrow">
          <el-button @click="cancelHouseModal">取 消</el-button>
          <el-button  type="primary" @click="houseOks()">确 定</el-button>
        </div>
      </el-dialog>
      
    </div>
    <div class="delete-view" v-show="delmodel">
      <!-- <delete-modal @getignore="cancel" @getsave="save" v-loading="delLoading"></delete-modal> -->
      <div class="confirm-view">
        <div class="confirm-item">
            <div class="icon">
                <span class="iconfont icon-zhushi"></span>
            </div>
            <div>
                <p>确定删除此信息？</p>
                <!-- <p>如果当前为雨天，可选择忽略预警</p> -->
            </div>
        </div>
        <div class="confirm-item">
            <div class="confirm-item-sub" @click="getignore()"><span>忽略</span></div>
            <!-- <div class="confirm-item-sub" v-if="loadingShow" style="color: #ccc"><span>确定</span></div> -->
            <div class="confirm-item-sub" @click="save()"><span>确定</span></div>
        </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker, SucButton } from "@suc/ui";
import { SearchComponent, TablePage } from "@/components";
import { publicApi } from "@/api";
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    SucDatePicker,
    TablePage,
    SucButton,
  },
})
export default class MarketHouseModal extends Vue {
  @Prop() title!: string;
  @Prop() zlmodal!: boolean;
    //监听弹框关闭
  @Watch("zlmodal")
  getModalVal() {
    if (this.zlmodal==false) {
      (this.$refs["marketForm"] as any).resetFields();
    }
  }
  xzshowrow: boolean = false;
  bjshowrow: boolean = false;
  dialogFull: boolean = false;
  houseModal: boolean = false;
  fammilyFormParams: any = {};
  houseFormParams: any = {};
  delmodel: boolean = false;
  delParams: object = {};
  delLoading: boolean = false;
  tableData: any = [];
  loading: boolean = true;
  tableParams: any = {
    houseUuid:'',
    pageNumber: "",
    pageSize: "",
    // tenantType: "1",
  };
  scope: any = "";
  rules: any = {
    name: [{ required: true, message: "请输入", trigger: "blur" }],
    sex: [{ required: true, message: "请选择", trigger: "change" }],
  };
  modalTitle: string = "";
  formParams: any = {
    houseUuid:'',
    
  };
  @Prop({ type: Object, default: () => {} })
  @Prop() zlformParams!: any; 
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  @Watch("zlformParams.uuid")
  getdeta() {
    if (this.zlformParams.uuid!="") {
    this.onpage();
    }
  }
  @Watch("modalTitle")
  onzl() {
   if (this.modalTitle=='新增租赁信息') {
    this.xzshowrow=true
    this.bjshowrow=false
   }else{
    this.xzshowrow=false
    this.bjshowrow=true
   }
  }
  @Emit()
  onSubmit() {}
  onCancel() {
    this.toggle(false);
    (this.$refs["marketForm"] as any).resetFields();
    // (this.$refs["houseForm"] as any).resetFields();
  }
  columns: any[] = [
    {
      type: "index",
      title: "序号",
      width: "50",
    },
    {
      title: "开始日期",
      key: "startdate",
    },
    {
      title: "结束日期",
      key: "enddate",
    },
    {
      title: "租金/月(元)",
      key: "monthFee",
    },{
      title: "租金总额(元)",
      key: "totalFee",
    },{
      title: "备注",
      key: "nt",
    },
    {
      title: "操作",
      heading:'cz',
      slot: "operation",
      width: 100,
    },
  ];
  onOk() {
    (this.$refs["marketForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
      } else {
        return false;
      }
    });
  }
  //  图片大小限制
  async beforeUpload(file: any) {
    let types = ["image/jpeg", "image/jpg", "image/png"];
    const isImage = types.includes(file.type);
    if (!isImage) {
      this.$message.error("上传图片只能是 JPG、JPEG、PNG 格式!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5; //这里做文件大小限制
    if (!isLt2M) {
      this.$message.error("上传图片大小不能超过5MB!");
      return isLt2M;
    }
  }

  //限制上传图片的数量
  handleExceed(files: any) {
    this.$message.warning("最多选择两张图片");
  }
  handlePreview(file: any) {
    const Imgurl = file.response.data.previewUrl;
    window.open(Imgurl);
  }

  PicSuccess(file: any) {
    this.formParams.minIoFiles.push({
      fileName: file.data.object,
      fileId: file.data.fileId,
      fileType: file.data.fileType,
      oldName: file.data.oldName,
      bucket: file.data.bucket,
    });
    let fileName = file.data.oldName.split('.',1)
    this.formParams.title = fileName[0]
  }
  PicSuccesscf(file: any) {
    this.formParams.kitchenFiles.push({
      fileName: file.data.object,
      fileId: file.data.fileId,
      fileType: file.data.fileType,
      oldName: file.data.oldName,
      bucket: file.data.bucket,
    });
    let fileName = file.data.oldName.split('.',1)
    this.formParams.title = fileName[0]
  }
  PicSuccesswsj(file: any) {
    this.formParams.toiletFiles.push({
      fileName: file.data.object,
      fileId: file.data.fileId,
      fileType: file.data.fileType,
      oldName: file.data.oldName,
      bucket: file.data.bucket,
    });
    let fileName = file.data.oldName.split('.',1)
    this.formParams.title = fileName[0]
  }
  PicSuccessjj(file: any) {
    this.formParams.furnitureFiles.push({
      fileName: file.data.object,
      fileId: file.data.fileId,
      fileType: file.data.fileType,
      oldName: file.data.oldName,
      bucket: file.data.bucket,
    });
    let fileName = file.data.oldName.split('.',1)
    this.formParams.title = fileName[0]
  }

  handleRemove(file: any, fileList: any) {
    var id: any = "";
    if (file.response.data.fileId) {
      id = file.response.data.fileId;
    } else {
      id = file.uid;
    }
    this.formParams.minIoFiles = this.formParams.minIoFiles.filter(
      (item: any) => item.fileId != id
    );
  }
  cfhandleRemove(file: any, fileList: any) {
    var id: any = "";
    if (file.response.data.fileId) {
      id = file.response.data.fileId;
    } else {
      id = file.uid;
    }
    this.formParams.kitchenFiles = this.formParams.kitchenFiles.filter(
      (item: any) => item.fileId != id
    );
  }
  jjhandleRemove(file: any, fileList: any) {
    var id: any = "";
    if (file.response.data.fileId) {
      id = file.response.data.fileId;
    } else {
      id = file.uid;
    }
    this.formParams.furnitureFiles = this.formParams.furnitureFiles.filter(
      (item: any) => item.fileId != id
    );
  }
  wsjhandleRemove(file: any, fileList: any) {
    var id: any = "";
    if (file.response.data.fileId) {
      id = file.response.data.fileId;
    } else {
      id = file.uid;
    }
    this.formParams.toiletFiles = this.formParams.toiletFiles.filter(
      (item: any) => item.fileId != id
    );
  }
  ondelete(row: any) {
    this.delmodel = true;
    this.delParams = {
      uuid: row.uuid,
    };
  }
  async cancel(val: any) {
    this.delmodel = val;
  }
  async save() {
    this.delLoading = true;
    let url = "server/house/lease";
    publicApi.deleteWithParam(url, this.delParams).then((data: any) => {
      if (data.result == true) {
        this.delmodel = false;
        // this.$SucMessage.info("删除成功");
        this.delLoading = false;
        this.onpage();
      } else {
        this.$SucMessage.error("删除失败");
        this.delLoading = false;
      }
    });
  }
  getignore(){
    this.delmodel = false;
  }
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
    this.tableParams.houseUuid=this.zlformParams.uuid
    let url = "server/house/lease/page";
    let data = await publicApi.getWithParam(url, this.tableParams);
    if (data.result) {
      console.log(1)
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
  onedit(row: any) {
    this.houseModal = true;
    this.modalTitle = "编辑租赁信息";
    console.log('row',row)
    let id = row.uuid;
    this.editInfo(id);
  }
  async editInfo(id: any) {
    let url = "server/house/lease";
    let params = {
      uuid: id,
    };
    let data = await publicApi.getWithParam(url, params);
    this.formParams = data.data;
    this.formParams.imgList = data.data.minIoFiles.map((item: any) => {
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
    this.formParams.cfimgList = data.data.kitchenFiles.map((item: any) => {
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
    this.formParams.wsjimgList = data.data.toiletFiles.map((item: any) => {
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
    this.formParams.jjimgList = data.data.furnitureFiles.map((item: any) => {
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

  }
  
  //住房情况
  // houseDelete(index: any, rows: any) {
  //   rows.splice(index, 1); //从数组索引位置删除一个 index是点击数组的索引
  //   this.$message({
  //     message: "这条已删除",
  //     type: "success",
  //     customClass: "messageIndex",
  //   });
  // }
  
  // 租赁新增
  addHouseRow() {
    this.houseModal = true;
    this.modalTitle = "新增租赁信息";
    this.formParams={
      imgList:[],
      jjimgList:[],
      wsjimgList:[],
      cfimgList:[],
      minIoFiles:[],
      kitchenFiles:[],
      toiletFiles:[],
      furnitureFiles:[],
    }
  }
  
  // mounted() {}
  // cancelFammilyModal() {
  //   this.fammilyModal = false;
  // }
  cancelHouseModal() {
    this.houseModal = false;
  }
  //新增确定
  houseOk() {
    this.houseModal = false;
    this.formParams.houseUuid=this.zlformParams.uuid
    let url = "server/house/lease";
    publicApi.postWithParamJson(url, this.formParams).then((res: any) => {
      if (res.result) {
        this.$SucMessage.success("新增成功");
        this.onpage()
        this.loading = false;
      } else {
        this.$SucMessage.success("新增失败");
        this.loading = false;
      }
    });
  }
  //编辑确定
  houseOks() {
    this.houseModal = false;
    let url = "server/house/lease";
    publicApi.putWithParamJson(url, this.formParams).then((data: any) => {
      if (data.result == true) {
        this.$SucMessage.success("更新成功");
        this.onpage();
      } else {
        this.$SucMessage.error("更新失败");
        this.loading = false;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
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
      height: 570px;
      overflow-y: auto;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
    .mainTitle {
      font-weight: 600;
      font-size: 20px;
      top: -15px;
      position: relative;
    }
  }
}

.avue-crud__dialog__menu {
  float: right;
  margin-right: 26px;
  color: #fff;
  padding-top: 3px;

  .el-icon-full-screen {
    cursor: pointer;
    color: #fff !important;
  }
  .el-icon-full-screen:before {
    content: "\e719";
  }
}

//滚动条样式
#{$deep} {
  .tableListValue {
    width: 8px;
    margin-left: 0.8vh;
    //滚动条的宽高
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    //滚动条的滑块背景色
    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #e1e1e1;
    }
    //滚动条的背景色
    ::-webkit-scrollbar-track {
      background: rgba(#ccc, 0.3);
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
  
.form {
  width: 100%;
  height: auto;
  display: flex;
  .aa {
    flex: 1;
    margin-right: 10px;
  }
}

.main_table {
  position: relative;
  .xz {
    position: absolute;
    top: -48px;
    right: 20px;
  }
  
}
.confirm-view{
    width: 400px;
	height: 170px;
	background-color: #ffffff;
	border-radius: 4px;
    .confirm-item{
        &:first-of-type{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 116px;
            .icon{
                color:#ffcb3b;
                margin-right: 10px;
            }
            p{
                font-size: 16px;
                color: #333;
                line-height: 32px;
            }
        }
        &:nth-of-type(2){
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 53px;
            border-top: 1px solid #dde4eb;
        }
        &-sub{
            width: 50%;
            text-align: center;
            font-size: 16px;
            line-height: 32px;
            cursor:pointer;
            &:first-of-type{
                border-right: 1px solid #dde4eb;
                color:#3a7bef;
            }
            &:nth-of-type(2){
                color:#ff5a47;
            }
        }
    }
}
.delete-view {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3001;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .form {
  display: flex;
  div {
    flex: 1;
    margin-right: 10px;
  }
}
</style>

<style lang="scss">
// 设置的值一定要比2007大，因为dialog的层级是2007
.messageIndex {
  z-index: 9999 !important;
}
</style>
