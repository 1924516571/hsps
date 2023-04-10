<template>
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="易涝点名称:" prop="name">
        <el-input v-model="formParams.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="易捞点类型:">
        <el-input v-model="formParams.type" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="行政区域:" prop="areacode">
        <el-cascader
          v-model="formParams.areacode"
          :options="areaOptions"
          :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
          style="width:100%;"
          size="small"
          placeholder="行政区域"
          clearable
          @change="handleChange"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="所在地址:">
        <el-input v-model="formParams.address" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="创建人:">
        <el-input v-model="formParams.creater" placeholder="请输入"></el-input>
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
import { State, Mutation, namespace } from "vuex-class";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker } from "@suc/ui";
import { DatePickerOptions } from "@suc/ui/interfaces";
import { infoApi, publicApi } from "@/api";
import dayjs from "dayjs";
const mapStore = namespace("mapStore");
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
export default class CreatePolluters1 extends Vue {
  // 接收父组件传过来的值
  olMap = this.$getMapConfig();
  dateOptions: any = {
    type: "date",
  };

  areaOptions: any = [];
  // 检验
  validatenumdw: any = (rule: any, value: any, callback: any) => {
    if (value) {
      //关键地方
      if (!this.formParams.dw) {
        callback(new Error("请输入单位"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  rules = {
    name: [
      { required: true, message: "请输入易捞点名称", trigger: "blur" },
      // { max: 20, message: "编码长度不能超过20位" },
    ],
    num: [
      { required: true, message: "请输入数量", trigger: "blur" },
      { required: true, trigger: "blur", validator: this.validatenumdw },
    ],
    ckid: [{ required: true, message: "请输入选择仓库名称", trigger: "change" }],
    nt: [{ required: true, message: "请输入备注", trigger: "blur" }],

    // dw: [{ required: true, message: "请输入完整信息43432名称", trigger: "blur" }],
    // yhnr: [{ required: true, message: "请输入养护内容", trigger: "change" }],
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
        // this.formParams.rkdate = this.$utils.dateFormat(this.formParams.rkdate, "yyyy-MM-dd");
        // this.formParams.rkdate = dayjs(this.formParams.rkdate).format("YYYY-MM-DD"); //关键地方
      } else {
        return false;
      }
    });
  }

  handleChange(val: any) {
    if (val != undefined) {
      this.formParams.areacode = val.toString();
    } else {
      this.formParams.areacode = "";
    }
  }
  // 取消的时候将表单值置位空
  onCancel() {
    this.toggle(false);
    (this.$refs["yinjForm"] as any).resetFields();
  }
  mounted() {
    this.getAreaCode();
  }

  async getAreaCode() {
    let data = await publicApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]);
  }
  getTreeData(data: any) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].children.length < 1) {
        data[i].children = undefined;
      } else {
        this.getTreeData(data[i].children);
      }
    }
    return data;
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
