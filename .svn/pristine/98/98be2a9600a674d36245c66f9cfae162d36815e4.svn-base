<template>
  <div>
    <div>
      <el-dialog
        width="40%"
        :append-to-body="true"
        :title="title"
        :visible.sync="model"
        :close-on-click-modal="true"
        :before-close="onCancel"
        @close="close"
      >
        <el-form
          :model="formParams"
          ref="marketForm"
          label-width="auto"
          size="small"
          :rules="rules"
        >
          <el-form-item label="词典名称：" prop="name">
            <el-input v-model="formParams.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="父项模块：" prop="permissionId">
            <el-input v-model="formParams.permissionId" disabled></el-input>
          </el-form-item>
          <el-form-item label="父词典名称：" prop="parentId">
            <el-input v-model="formParams.parentId" disabled></el-input>
          </el-form-item>
          <el-form-item label="词典编码：" prop="codeMyid">
            <el-input v-model="formParams.codeMyid"></el-input>
          </el-form-item>
          <el-form-item label="词典图标：" >
            <el-select v-model="formParams.iconCls" placeholder="请选择" style="width
            :100%">
              <el-option  value="file">
                <i class="el-icon-files"></i> file
              </el-option>
              <el-option  value="folder">
                <i class="el-icon-folder"></i> folder
              </el-option>
              <el-option value="menu">
                <i class="el-icon-menu"></i> menu
              </el-option>
              <el-option  value="bug">
              <i class="el-icon-cpu"></i> bug
              </el-option>
              <el-option  value="alert">
                <i class="el-icon-bell"></i> alert
              </el-option>
              <el-option  value="exclamation-circle">
                <i class="el-icon-warning"></i> exclamation-circle
              </el-option>
              <el-option  value="question-circle">
                <i class="el-icon-question"></i> question-circle
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序编码：">
            <el-input v-model="formParams.sort"></el-input>
          </el-form-item>
          <el-form-item label="参数描述：">
            <el-input
              type="textarea"
              v-model="formParams.description"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onOk()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
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
  SucButton,
} from "@suc/ui";
import { SearchComponent, TablePage } from "@/components";
import { publicApi } from "@/api";
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    SucDatePicker,
    TablePage,
    SucButton,
  },
})
export default class MarketHouseModal extends Vue {
  @Prop() title!: string;
  @Prop() model!: boolean;
  @Prop({ type: Object, default: () => {} })
  @Prop()
  formParams!: any; //新增接口需要的参数
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  @Emit()
  onSubmit() {}
  @Emit()
  close() {}
  onCancel() {
    this.toggle(false);
    (this.$refs["marketForm"] as any).resetFields();
  }
  rules: any = {
    name: [{ required: true, message: "请输入词典名称", trigger: "blur" }],
    permissionId: [{ required: true, message: "请输入", trigger: "blur" }],
    parentId: [{ required: true, message: "请输入", trigger: "blur" }],
    codeMyid: [{ required: true, message: "请输入", trigger: "blur" }],
  };
  //   mounted () {
  //     console.log(this.formParams)
  //   }

  onOk() {
    (this.$refs["marketForm"] as any).validate((valid: any) => {
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