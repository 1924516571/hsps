<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <div>
          <el-form-item label="水功能划区代码:">
            <el-input v-model="formParams.code" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="水功能区名称:">
            <el-input v-model="formParams.name" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="起始断面名称:">
            <el-input v-model="formParams.startsectionname" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="结束断面名称:">
            <el-input v-model="formParams.endsectionname" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="河流id:">
            <el-input v-model="formParams.riverid" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="河流名称:">
            <el-input v-model="formParams.rivername" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="流域名称:">
            <el-input v-model="formParams.basinname" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="水系名称:">
            <el-input v-model="formParams.systemname" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="水功能区类型:">
            <el-input v-model="formParams.type" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="该水功能区的目标水质:">
            <suc-select v-model="formParams.targetwq" :options="szlx" :config="{ placeholder: '请选择', clearable: true }" style="width:100%"></suc-select>
          </el-form-item>
          <el-form-item label="目标高锰酸钾:">
            <el-input v-model="formParams.targetcodmn" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="目标总磷:">
            <el-input v-model="formParams.targettp" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="目标氨氮:">
            <el-input v-model="formParams.targetnh3" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="水功能区长度:">
            <el-input v-model="formParams.length" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="水功能区面积:">
            <el-input v-model="formParams.area" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="水功能区排序:">
            <el-input v-model="formParams.sort" style="width: 100%" placeholder="请输入"></el-input>
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
    systemid: [{ required: true, message: "请输入系统编码", trigger: "blur" }],
    systemType: [{ required: true, message: "请选择系统类型", trigger: "change" }],
    idCard: [{ required: true, trigger: "blur", validator: validateIdNo }],
  };
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  //水质类型
  szlx: any = [
      {value:'Ⅰ类',label:'Ⅰ类'},
      {value:'Ⅱ类',label:'Ⅱ类'},
      {value:'Ⅲ类',label:'Ⅲ类'},
      {value:'Ⅳ类',label:'Ⅳ类'},
      {value:'劣Ⅴ类',label:'劣Ⅴ类'},
    ];
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
