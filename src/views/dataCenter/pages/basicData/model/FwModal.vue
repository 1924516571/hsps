<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <div>
          <el-form-item label="小区名称:" prop="communityUuid">
            <el-select  v-model="formParams.communityUuid"  style="width:100%;" placeholder="请选择" size="mini">
              <el-option v-for="item in xqOptions"  :label="item.label" :value="item.value" :key="item.index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门牌号:" >
            <suc-input v-model="formParams.num" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="房屋性质:" >
            <el-select v-model="formParams.type" placeholder="请选择" style="width: 100%">
              <el-option label="自持" value="自持"></el-option>
              <el-option label="租赁" value="租赁"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房屋结构图：" >
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
          <!-- <el-button class="upload_btn" size="small" type="primary"></el-button> -->
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过5MB</div> -->
          </el-upload>
          </el-form-item>
        <div style="font-weight: bold; padding-top: 5px;">业主信息</div>
          <el-form-item label="业主姓名:" >
            <suc-input v-model="formParams.ownerName" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="电话:">
            <suc-input v-model="formParams.ownerTel" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <!-- <div  v-if="load">
           <div style="font-weight: bold; padding-top: 5px;">租赁信息</div>
            <el-form-item label="业主姓名:" >
              <suc-input v-model="formParams.ownerName" style="width: 100%" placeholder="请输入"></suc-input>
            </el-form-item> 
          </div>
           -->
        </div>
        
        <div>
          <el-form-item label="楼栋号:">
            <el-select  v-model="formParams.buildingUuid"  style="width:100%;" placeholder="请选择" size="mini">
              <el-option v-for="item in ldOptions"  :label="item.label" :value="item.value" :key="item.index"> </el-option>
            </el-select>
            <!-- <el-select v-model="formParams.buildingId" placeholder="请选择" style="width: 100%">
            </el-select> -->
          </el-form-item>
          <el-form-item label="建筑面积（m³）:">
            <suc-input v-model="formParams.buildArea" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="套内面积（m³）:">
            <suc-input v-model="formParams.realArea" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="备注:">
            <suc-input type="textarea" v-model="formParams.nt" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          
        </div>
        
      </el-form>
      <div slot="footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onOk()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker } from "@suc/ui";
import { validateIdNo } from "@/utils/validator.js";
import { publicApi } from "@/api";

@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    SucDatePicker,
  },
})
export default class ProtectHouseModal extends Vue {
  @Prop() title!: string;
  @Prop() modal!: boolean;
  rules: any = {
    communityUuid: [{ required: true, message: "请输入", trigger: "blur" }],
    sex: [{ required: true, message: "请选择", trigger: "change" }],
  };
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  xqOptions:any=''
  ldOptions:any=''
  xqformParams: any = [];
  ldformParams: any = [];
  ldform: any = {
    communityId:'',
  };
  load: boolean =false;
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  @Emit()
  onSubmit() {}
  
  @Watch("formParams.communityUuid")
  onld() {
    this.onldlist();
    // if(this.ldform.communityId!=''){

    //   this.onldlist();
    // }
  }
  onCancel() {
    this.load=false
    // this.formParams.communityUuid=''
    this.toggle(false);
    (this.$refs["jqForm"] as any).resetFields();
  }
  // @Watch("formParams.type")
  // onzl() {
  //   console.log(12321321)
  //  if (this.formParams.type=='租赁') {
  //   this.load=true
  //  }else{
  //   this.load=false
  //  }
  // }
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
  PicSuccess(file: any) {
    this.formParams.minIoFileList.push({ fileName: file.data.object, fileId: file.data.fileId, fileType: file.data.fileType, oldName: file.data.oldName });
  }
  //限制上传图片的数量
  handleExceed(files: any) {
    this.$message.warning("只能上传一个文件!");
  }

  handlePreview(file: any) {
    const Imgurl = file.response.data.previewUrl;
    window.open(Imgurl);
  }

  handleRemove(file: any, fileList: any) {
    var id: any = "";
    if (file.response.data.fileId) {
      id = file.response.data.fileId;
    } else {
      id = file.uid;
    }
    this.formParams.minIoFileList = this.formParams.minIoFileList.filter((item: any) => item.fileId != id);
  }
  mounted() {
    this.onxqlist();
    // this.onldlist();
  }
  //小区列表
  async onxqlist() {
    const url = "server/securityHousing/basicCommunity/list";
    const data = await publicApi.getNoParam(url);
    this.xqOptions =data.data.map((e: any) => {
      return{
        value:e.id,
        label:e.communityName,
      }
    })
  }

  //楼栋表
  async onldlist() {
    this.ldform.communityId= this.formParams.communityUuid
    const url = "server/securityHousing/basicBuilding/selectListByCondition";
    let data = await publicApi.getWithParam(url, this.ldform);
    this.ldOptions =data.data.map((e: any) => {
      return{
        value:e.id,
        label:e.buildingId,
      }
    })
  } 

  onOk() {
    (this.$refs["jqForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
    // this.formParams.communityUuid=''
      } else {
        return false;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
::v-deep .upload-demo {
  .el-upload-list .el-upload-list--picture {
    .el-upload-list__item {
      width: 300px;
    }
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
      height: 570px;
      overflow-y: auto;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
  }
}
.form {
  display: flex;
  div {
    flex: 1;
    margin-right: 10px;
  }
}
</style>
