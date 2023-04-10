<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="xzmodal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="xzzlformParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <!-- <div>
          <el-form-item label="小区名称:">
            <el-select v-model="formParams.sex" placeholder="请选择" style="width: 100%">
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
          <el-form-item label="上传文件">
          <el-upload
            class="upload-demo"
            :on-success="PicSuccess"
            action="api/wjBaseServer/minio/file/uploadxxxxx"
            :on-remove="handleRemove"
            :on-preview="handlePreview"
            :on-exceed="handleExceed"
            :file-list="formParams.minIoFileList"
            list-type="picture"
            :limit="1"
          >
            <el-button class="upload_btn" size="small" type="primary"><span class="iconfont icon-shangchuan"></span>点击上传</el-button>
          </el-upload>
        </el-form-item>
        <div style="font-weight: bold; padding-top: 5px;">业主信息</div>
          <el-form-item label="业主姓名:" >
            <suc-input v-model="formParams.ownerName" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="楼栋号:">
            <el-select v-model="formParams.sex" placeholder="请选择" style="width: 100%">
            </el-select>
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
          <el-form-item label="电话:">
            <suc-input v-model="formParams.ownerTel" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
        </div> -->
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
  @Prop() xzmodal!: boolean;
  rules: any = {
    name: [{ required: true, message: "请输入租户姓名", trigger: "blur" }],
    sex: [{ required: true, message: "请选择性别", trigger: "change" }],
    idCard: [{ required: true, trigger: "blur", validator: validateIdNo }],
  };
  @Prop({ type: Object, default: () => {} })
  xzzlformParams!: any; //新增接口需要的参数
  @Emit()
  toggle1(val: boolean) {
    return val;
  }
  @Emit()
  onSubmit() {}
  onCancel() {
    this.toggle1(false);
    (this.$refs["jqForm"] as any).resetFields();
  }
  PicSuccess(file: any) {
    this.xzzlformParams.minIoFileList.push({ fileName: file.data.object, fileId: file.data.fileId, fileType: file.data.fileType, oldName: file.data.oldName });
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
    this.xzzlformParams.minIoFileList = this.xzzlformParams.minIoFileList.filter((item: any) => item.fileId != id);
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
