<template>
  <el-dialog
    :title="title"
    :visible.sync="model"
    close-on-click-modal:false
    :before-close="onCancel"
    v-if="model"
  >
    <el-form
      :model="formParams"
      ref="fileForm"
      label-width="auto"
      size="small"
      class="form scroll"
    >
      <el-form-item label="父节点" >
        <el-input disabled v-model="formParams.name"></el-input>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input  v-model="formParams.fullName"></el-input>
      </el-form-item> 
      <el-form-item label="部门编码">
        <el-input  v-model="formParams.myid"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="formParams.tel"></el-input>
      </el-form-item>
      <el-form-item label="传真">
        <el-input v-model="formParams.fax"></el-input>
      </el-form-item>
      <el-form-item label="部门描述">
        <el-input  type="textarea" v-model="formParams.description"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import {
  SucModal,
  SucForm,
  SucFormItem,
  SucInput,
  SucSelect,
  SucDatePicker,
} from "@suc/ui";
import { infoApi, publicApi } from "@/api";
import { LoadingCom } from "@/components";
// import { Form } from "element-ui";
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    LoadingCom,
    SucDatePicker,
  },
})
export default class FileModal extends Vue {
  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  // rules: any = {
  //   pid: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  //   identification: [{ required: true, message: "请输入标识", trigger: "blur" }],
  //   sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
   // sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  // idCard: [{ required: true, trigger: "blur", validator: validateIdNo }],
  // };
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle(val: boolean) {
    return val;
  }

  onOk() {
    (this.$refs["fileForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
      } else {
        return false;
      }
    });
  }

  onCancel() {
    this.toggle(false);
    (this.$refs["fileForm"] as any).resetFields();
  }
}
</script>
<style lang="scss" scoped>
// $deep:"::v-deep";
::v-deep.el-dialog__wrapper {
  .el-dialog {
    width: 700px;
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
  }
}

::v-deep.el-input--small .el-input__inner {
  margin: 3px 0;
}
</style>
