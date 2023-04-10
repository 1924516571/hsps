<template>
  <!-- 窨井弹框新增组件-->
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="泵机编码" prop="bjbm">
        <el-input v-model="formParams.bjbm"  :disabled="title == '新增' ? false : true" ></el-input>
      </el-form-item>
      <el-form-item label="泵机名称" prop="bjmc">
        <el-input v-model="formParams.bjmc"  ></el-input>
      </el-form-item>
      <el-form-item label="水泵型号" prop="sbxh">
        <el-input v-model="formParams.sbxh"></el-input>
      </el-form-item>
      <el-form-item label="水泵尺寸" prop="sbcc">
        <el-input v-model.number="formParams.sbcc" type="number"></el-input>
      </el-form-item>
      <el-form-item label="电机型号" prop="djxh">
        <el-input v-model="formParams.djxh"></el-input>
      </el-form-item>
      <el-form-item label="电机功率(kw)" prop="dmgl">
        <el-input v-model="formParams.dmgl"></el-input>
      </el-form-item>
      <el-form-item label="单机流量(m^3/h)" prop="djll">
        <el-input v-model="formParams.djll"></el-input>
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
    bjbm:[{ required:true,message:"请输入泵机编码",trigger: "blur"}],
    bjmc: [{ required: true, message: "请输入泵机名称", trigger: "blur" }],
    sbxh: [{ required: true, message: "请输入水泵型号", trigger: "blur" }],
  };
  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
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

  mounted() {}
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
::v-deep .upload-demo {
  .el-upload-list .el-upload-list--picture {
    .el-upload-list__item {
      width: 300px;
    }
  }
}
</style>
