<template>
  <!-- 入户登记弹框 -->
  <el-dialog title="分配房屋" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
   <el-descriptions style="margin-bottom:20px" class="margin-top" title="基础信息" :column="2" size="medium" border labelStyle="width:150px">
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            租户姓名
          </template>
            {{showParams.lesseeName}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            小区名称
          </template>
           {{showParams.communityName}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-house"></i>
            楼栋
          </template>
          {{showParams.house}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-school"></i>
            物业公司
          </template>
          {{showParams.companyName}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            开始日期
          </template>
            {{showParams.leaseStarttime}}
        </el-descriptions-item>
         <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            结束日期
          </template>
             {{showParams.leaseEndtime}}
        </el-descriptions-item>
         <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money"></i>
            租金/月（元）
          </template>
            {{showParams.rentMonth}}
        </el-descriptions-item>
         <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-coin"></i>
            租金总额（元）
          </template>
           {{showParams.rentTotal}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            备注
          </template>
            {{showParams.nt}}
        </el-descriptions-item>
      </el-descriptions>
    <el-form :model="formParams" ref="fpForm" label-width="auto" size="small">
      
      <div class="title">物业登记</div>
      <el-form-item label="入户登记时间:" style="display: inline-block;width:45%;margin-right:20px">
        <suc-date-picker
            v-model="formParams.registerDate"
            :options="{
              type: 'date',
              clearable: true,
              placeholder: '选择时间',
            }"
            style="width:100%"
          ></suc-date-picker>
      </el-form-item>

      <el-form-item label="入住人数:" style="display: inline-block;width:45%">
        <suc-input v-model="formParams.checkNum" style="width:100%" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="文件上传：" prop="imgPath1">
        <el-upload
          class="upload-demo"
          :on-success="PicSuccess"
          action="api/wjBaseServer/minio/file/upload"
          :on-remove="handleRemove"
          :on-preview="handlePreview"
          :before-upload="beforeUpload"
          :on-exceed="handleExceed"
          :file-list="formParams.imgList"
          list-type="picture"
          :size="small"
        >
          <el-button size="small" type="primary"
            >点击上传</el-button
          >
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="onCancel('fpForm')">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker } from "@suc/ui";
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
export default class RhModal extends Vue {
  @Prop() loading!: boolean; //控制加载
  @Prop() modal!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Prop({ type: Object, default: () => {} })
  showParams!: any; 
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle(val: boolean) {
    return val;
  }

  onOk() {
    (this.$refs["fpForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
      } else {
        return false;
      }
    });
  }
  // 取消的时候将表单值置位空
  onCancel(params: any) {
    this.toggle(false);
    (this.$refs[params] as any).resetFields();
  }

  PicSuccess(file: any) {
      this.formParams.minIoFileList.push({
        fileName: file.data.object,
        fileId: file.data.fileId,
        fileType: file.data.fileType,
        oldName: file.data.oldName,
        bucket: file.data.bucket,
      });
    }

  handleExceed(files: any) {
  }

  handlePreview(file: any) {
   
  }

  handleRemove(file: any, fileList: any) {
    var id: any = "";
    if (file.response.data.fileId) {
      id = file.response.data.fileId;
    } else {
      id = file.uid;
    }
    this.formParams.minIoFileList = this.formParams.minIoFileList.filter(
      (item: any) => item.fileId != id
    );
  }
  
  mounted() {
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
      height: 500px;
      overflow-y: auto;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
    .title{
      font-size: 16px;
      font-weight: 700;
      color: #303133;
      margin-bottom: 10px;
    }
    }
  }


::v-deep.suc-select {
  .ivu-select-selection .ivu-select-selected-value {
    font-size: 13px;
    color: #606266;
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
