<template>
  <!-- 窨井弹框新增组件-->
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="格栅编码" prop="grillecode">
        <el-input v-model="formParams.grillecode" :disabled="title == '新增' ? false : true"></el-input>
      </el-form-item>
      <el-form-item label="格栅名称" prop="name">
        <el-input v-model="formParams.name"></el-input>
      </el-form-item>
      <el-form-item label="行政区域" prop="areacode">
        <el-cascader
          v-model="formParams.areacode"
          :options="areaOptions"
          :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
          @change="handleChange"
          style="width:100%;"
          size="small"
          placeholder="所属区域"
          clearable
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="规格型号">
        <el-input v-model="formParams.specifications"></el-input>
      </el-form-item>
      <el-form-item label="功率(KW)">
        <el-input v-model="formParams.p"></el-input>
      </el-form-item>
        <el-form-item label="生产厂家">
        <el-input v-model="formParams.factory"></el-input>
      </el-form-item>
      <el-form-item label="采购时间">
        <el-date-picker v-model="formParams.buytime" type="date" placeholder="选择日期"  format="yyyy 年 MM 月 dd 日"   value-format="timestamp"> </el-date-picker>
      </el-form-item>
    
      <el-form-item label="维护方法">
        <el-input type="textarea" v-model="formParams.method" placeholder="请输入内容" style="width:250px;" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="格栅图片" prop="imgPath1">
        <el-upload
          class="upload-demo"
          :on-success="PicSuccess"
          action="api/wjBaseServer/minio/file/upload"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
           :on-preview="handlePreview"
          :on-exceed="handleExceed"
          :file-list="formParams.imgList"
          list-type="picture"
          accept=".jpg, .jpeg, .png, .JPG, .JPEG,"
          :limit="2"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect } from "@suc/ui";
import { infoApi } from "@/api";
const mapStore = namespace("mapStore");
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
  },
})
export default class CreatePolluters1 extends Vue {
  // 接收父组件传过来的值
  @Prop() chuan!: any;
  rules = {
    grillecode: [{ required: true, message: "请输入泵机编码", trigger: "blur" }],
    name: [{ required: true, message: "请输入泵机名称", trigger: "blur" }],
     areacode: [{ required: true, message: "请选择区域", trigger: "change" }],
  };
  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  areaOptions: any = []; //行政区域数据
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle(val: boolean) {
    return val;
  }

  onOk() {
    (this.$refs["yinjForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
      } else {
        return false;
      }
    });
  }
  onCancel() {
    this.toggle(false);
    (this.$refs["yinjForm"] as any).resetFields();
  }
  async handleChange(value: any) {
    this.formParams.areacode = value.toString();
  }

  // 行政区域
  mounted() {
    this.getAreaCode(); //获取行政区域
  }
  async getAreaCode() {
    let data = await infoApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]); //放入数组是为了保持定义的变量数据结构一直性不然会报警告
  }
  // 处理后台返回的childer:[]
  getTreeData(data: any) {
    // 循环遍历json数据
    for (var i = 0; i < data.length; i++) {
      if (data[i].children.length < 1) {
        // children若为空数组，则将children设为undefined
        data[i].children = undefined;
      } else {
        // children若不为空数组，则继续 递归调用 本方法
        this.getTreeData(data[i].children);
      }
    }
    return data;
  }

  //图片大小限制
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
  PicSuccess(file: any) {
    this.formParams.minIoFileList.push({ fileName: file.data.object, fileId: file.data.fileId, fileType: file.data.fileType,oldName: file.data.oldName });
  }
  async handleRemove(file: any, fileList: any) {
    var id = file.response.data.fileId;
    this.formParams.minIoFileList = this.formParams.minIoFileList.filter((item: any) => item.fileId != id);
  }
  handlePreview(file:any){
       const Imgurl = file.response.data.previewUrl;
       window.open(Imgurl);
  }
}
</script>
<style lang="scss" scoped>
// $deep:"::v-deep";
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
      height: 600px;
      overflow-y: auto;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
  }
}

::v-deep.el-input--small .el-input__inner {
  margin: 3px 0;
}
::v-deep .upload-demo {
  .el-upload-list .el-upload-list--picture {
    .el-upload-list__item {
      width: 300px;
    }
  }
}
</style>
