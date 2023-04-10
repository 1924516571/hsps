<template>
  <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <el-form :model="formParams" ref="fileForm" label-width="auto" size="small" class="form scroll" :rules="rules">
      <el-form-item label="父节点">
        <el-input disabled v-model="parentName"></el-input>
      </el-form-item>
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formParams.name"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="formParams.sort"></el-input>
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="formParams.url"></el-input>
      </el-form-item>
      <el-form-item label="权限编码" prop="permission">
        <el-input v-model="formParams.permission"></el-input>
      </el-form-item>
      <el-form-item label="权限类型" prop="type">
        <suc-select v-model="formParams.type" :options="authorizedGrantOptions" :config="{ placeholder: '请选择权限类型', clearable: true}" style="width:100%"></suc-select>
      </el-form-item>
      <el-form-item label="是否启用" prop="status">
        <template>
          <el-radio v-model="formParams.status" label="1">启用</el-radio>
          <el-radio v-model="formParams.status" label="0">禁用</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="部门描述">
        <el-input type="textarea" v-model="formParams.desc"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker } from "@suc/ui";
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
  @Prop() parentName!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  rules: any = {
    name: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
    permission: [{ required: true, message: "请输入权限编码", trigger: "blur" }],
    type: [{ required: true, message: "请选择权限类型", trigger: "change" }],
  };
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  authorizedGrantOptions: any = [
    { label: "菜单", value: "0" },
    { label: "操作", value: "1" },
    { label: "前台展示菜单", value: "2" },
    { label: "前台展示操作", value: "3" },
    { label: "一级菜单", value: "4" },
    { label: "二级菜单", value: "5" },
    { label: "三级菜单", value: "6" },
  ];
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
      height: 520px;
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
