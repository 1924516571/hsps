<template>
  <!-- 我的模板弹框-->
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <!-- <el-form-item label="模板名称" prop="name" >
        <el-input v-model="formParams.name" ></el-input>
      </el-form-item>
      <el-form-item label="养护内容" prop="yhnr">
        <suc-select v-model="formParams.yhnr" :options="yhnrData" :config="{ placeholder: '养护内容', clearable: true, multiple: true }" style="width:100%"></suc-select>
      </el-form-item> -->
      <el-form-item label="养护内容">
          <el-input v-model="formParams.yhmbId"  style="width: 98%" > </el-input>
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
  @Prop() areaOptions!: any;
  olMap = this.$getMapConfig();
  rules = {
    name: [
      { required: true, message: "请输入模板名称", trigger: "blur" },
      { max: 20, message: "编码长度不能超过20位" },
    ],
    yhnr: [{ required: true, message: "请输入养护内容", trigger: "change" }],
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
  //  养护内容数据
  yhnrData: any = [];
  // 获取养护内容数据
  async getYhnr() {
    let { data } = await infoApi.getYhnr();
    this.yhnrData = data.map((item: any) => {
      return {
        value: item.id,
        label: item.mc,
      };
    });
  }

  mounted() {
    this.getYhnr();
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
      height:300px;
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
