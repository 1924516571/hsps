<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <div>
          <el-form-item label="负责人:">
            <el-input v-model="formParams.leader" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="具体地址:">
            <suc-input v-model="formParams.address" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="案件发生日期:">
            <suc-date-picker
              v-model="formParams.happenTime"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '选择时间',
              }"
              style="width: 100%"
            ></suc-date-picker>
          </el-form-item>
          <el-form-item label="案件描述:">
            <suc-input type="textarea" v-model="formParams.description" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="案件图片">
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
          <el-form-item label="电话:">
            <suc-input v-model="formParams.telephone" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="损失财产（万元）:">
            <suc-input v-model="formParams.lossWealth" style="width: 100%" placeholder="请输入"></suc-input>
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
    name: [{ required: true, message: "请输入租户姓名", trigger: "blur" }],
    sex: [{ required: true, message: "请选择性别", trigger: "change" }],
    idCard: [{ required: true, trigger: "blur", validator: validateIdNo }],
  };
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  @Emit()
  onSubmit() {}
  onCancel() {
    this.toggle(false);
    (this.$refs["jqForm"] as any).resetFields();
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
  PicSuccess(file: any) {
    console.log('file',file)
    this.formParams.minIoFileList.push({ fileName: file.data.object, fileId: file.data.fileId, fileType: file.data.fileType, oldName: file.data.oldName });
  }
  // //限制上传图片的数量
  // handleExceed(files: any) {
  //   this.$message.warning("只能上传一个文件!");
  // }

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
  onOk() {
    (this.$refs["jqForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
      } else {
        return false;
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
