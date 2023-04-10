<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <div>
          <el-form-item label="角色名称:" prop="name">
            <el-input v-model="formParams.name" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="标识:" prop="identification">
            <suc-input v-model="formParams.identification" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="排序:" prop="sort">
            <suc-input v-model="formParams.sort" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="是否启用:">
            <el-radio v-model="formParams.status" label="1">启用</el-radio>
            <el-radio v-model="formParams.status" label="0">禁用</el-radio>
          </el-form-item>
          <el-form-item label="跳转页面：">
            <suc-select v-model="formParams.jumppagename" :options="ym" :config="{ placeholder: '页面', clearable: true }" style="width:100%"></suc-select>
          </el-form-item>
          <el-form-item label="描述:">
            <suc-input type="textarea" v-model="formParams.description" style="width: 100%" placeholder="请输入"></suc-input>
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
    name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
    identification: [{ required: true, message: "请输入标识", trigger: "blur" }],
    sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
    // sex: [{ required: true, message: "请选择性别", trigger: "change" }],
    // idCard: [{ required: true, trigger: "blur", validator: validateIdNo }],
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
  ym: any = [
    {value:'jumppagename',label:'页面'},
  ];
  
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
