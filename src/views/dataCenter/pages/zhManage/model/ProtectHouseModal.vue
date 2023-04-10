<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <div>
          <el-form-item label="租户姓名:" prop="name">
            <el-input v-model="formParams.name" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="身份证号:" prop="idCard">
            <suc-input v-model="formParams.idCard" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="配偶:">
            <suc-input v-model="formParams.spouse" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="人均收入:">
            <suc-input v-model="formParams.income" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="家庭类型:">
            <suc-input v-model="formParams.familyType" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="申请日期:">
            <suc-date-picker
              v-model="formParams.applyTime"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '选择时间',
              }"
              style="width: 100%"
            ></suc-date-picker>
          </el-form-item>
          <el-form-item label="备注:">
            <suc-input type="textarea" v-model="formParams.remark" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="租户性别:" prop="sex">
            <!-- <suc-select v-model="formParams.sex" :options="sexOptions" style="width: 100%"></suc-select> -->
            <el-select v-model="formParams.sex" placeholder="请选择" style="width: 100%">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="户口所在地:">
            <suc-input v-model="formParams.areaName" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="申请住房情况:">
            <suc-input v-model="formParams.haveHouse" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="家庭人口:">
            <suc-input v-model="formParams.population" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="联系电话:">
            <suc-input v-model="formParams.telephone" style="width: 100%" placeholder="请输入"></suc-input>
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
  sexOptions: any = [
    { value: "男", label: "男" },
    { value: "女", label: "女" },
  ];
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  @Emit()
  onSubmit() {}
  //监听弹框关闭
  @Watch("modal")
  getModalVal() {
    if (this.modal==false) {
      (this.$refs["jqForm"] as any).resetFields();
    }
  }
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
