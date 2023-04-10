<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" >
        <div>
          <el-form-item label="物业公司名称:">
            <el-input v-model="formParams.companyName" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="员工数量:">
            <suc-input v-model="formParams.staffNumber" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="负责人:">
            <suc-input v-model="formParams.principal" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="备注:">
            <suc-input type="textarea" v-model="formParams.remarks" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="所在区域:">
            <el-cascader
              v-model="formParams.areaCode"
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
          
          <el-form-item label="公司地址:">
            <suc-input v-model="formParams.companyAddress" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="联系电话:">
            <suc-input v-model="formParams.number" style="width: 100%" placeholder="请输入"></suc-input>
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
  @Prop() chuan!: any;
  @Prop() title!: string;
  @Prop() modal!: boolean;
  rules: any = {
    name: [{ required: true, message: "请输入", trigger: "blur" }],
    sex: [{ required: true, message: "请选择", trigger: "change" }],
  };
  @Prop({ type: Object, default: () => {} })
  @Prop()
  formParams!: any; //新增接口需要的参数
  areaOptions: any= [];
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
  mounted() {
    this.init();
  }

  init() {
    this.getAreaCode();
  }

  //获取下拉行政区域下拉
  async getAreaCode() {
    let data = await publicApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]);
  }
  getTreeData(data: any) {
    // 循环遍历json数据
    for (var i = 0; i < data.length; i++) {
      if (data[i].children.length < 1) {
        data[i].children = undefined;
      } else {
        this.getTreeData(data[i].children);
      }
    }
    return data;
  }

  async handleChange(value: any) {
    this.formParams.areaCode = value.toString();
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
