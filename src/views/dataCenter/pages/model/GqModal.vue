<template>
  <!-- 灌区新增弹框 -->
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="灌区名称:" prop="gqmc">
        <suc-input v-model="formParams.gqmc" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="行政区域:">
        <el-cascader
          v-model="formParams.area"
          :options="areaOptions"
          :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
          style="width:100%;"
          size="small"
          placeholder="行政区域"
          clearable
          @change="handleChange"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="灌区管理主体:">
        <suc-input v-model="formParams.gqglzt" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>

      <el-form-item label="灌区管护主体:">
        <suc-input v-model="formParams.gqyhzt" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="灌溉站名称:">
        <suc-input v-model="formParams.ggzmc" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="灌溉站产权归属:">
        <suc-input v-model="formParams.ggzcqgs" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="灌溉站管理主体:">
        <suc-input v-model="formParams.ggzglzt" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="属地管理主体:">
        <suc-input v-model="formParams.sdglzt" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="行业管理主体:">
        <suc-input v-model="formParams.hyglzt" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="灌溉站管理等级:">
        <suc-input v-model="formParams.ggzgldj" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="所在行政村:">
        <suc-input v-model="formParams.szxzc" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="取水河道:">
        <suc-input v-model="formParams.qshd" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="机泵总数（台）:">
        <suc-input v-model="formParams.jbzs" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="计量设施:">
        <suc-input v-model="formParams.jlss" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="水泵型号:">
        <suc-input v-model="formParams.sbxh" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="单机流量（m3/s):">
        <suc-input v-model="formParams.djll" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>

      <el-form-item label="总流量（m3/s):">
        <suc-input v-model="formParams.zll" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>

      <el-form-item label="单机功率（kw）:">
        <suc-input v-model="formParams.djgl" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="总功率（kw）:">
        <suc-input v-model="formParams.zgl" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>

      <el-form-item label="渠道长度（米）:">
        <suc-input v-model="formParams.qdcd" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>

      <el-form-item label="防渗渠道长度（米）:">
        <suc-input v-model="formParams.fsqdcd" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="种植结构:">
        <suc-input v-model="formParams.zzjg" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="灌溉面积（亩）:">
        <suc-input v-model="formParams.ggmj" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="粮食作物（亩）:">
        <suc-input v-model="formParams.lszw" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="经济作物（亩）:">
        <suc-input v-model="formParams.jjzw" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="建设年份:">
        <suc-input v-model="formParams.jsnf" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="最近改造年份:">
        <suc-input v-model="formParams.zjgznf" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker, SucCascader } from "@suc/ui";
import { DatePickerOptions } from "@suc/ui/interfaces";
import { infoApi, publicApi } from "@/api";
import { coordinateTransform } from "@suc/monch";
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
    SucCascader,
  },
})
export default class CreatePolluters1 extends Vue {
  olMap = this.$getMapConfig();
  dateOptions: any = {
    type: "date",
  };
  user: any = JSON.parse(localStorage.getItem("userInfo") || "");
  areaOptions: any = [];
  organizeData: any = []; //抢险机构性质
  qxxzData: any = []; //抢险性质

  // 检验手机号
  //   validatenumdw: any = (rule: any, value: any, callback: any) => {
  //     // if (value === "" || value === null) {
  //     //   callback();
  //     // } else {
  //     //   if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
  //     //     callback(new Error("请输入正确的手机号码"));
  //     //   } else {
  //     //     callback();
  //     //   }
  //     // }
  //     let reg = /^1[345789]\d{9}$/;
  //     if (!reg.test(value)) {
  //       callback(new Error("请输入11为手机号"));
  //     } else {
  //       callback();
  //     }
  //   };

  rules = {
    gqmc: [{ required: true, message: "请输入名称", trigger: "blur" }],

    area: [{ required: true, message: "请选择区域", trigger: "change" }],
    // name: [
    //   { required: true, message: "请输入名称", trigger: "blur" },
    //   { max: 20, message: "编码长度不能超过20位" },
    // ],
    // tel: [{ required: true, trigger: "blur", message: "请填写正确的手机号", validator: this.validatenumdw }],
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
        // this.formParams.createtime = dayjs(this.formParams.createtime).format("YYYY-MM-DD"); //关键地方
        if (this.formParams.area != undefined) {
          this.formParams.area = this.formParams.area.toString();
        }
      } else {
        return false;
      }
    });
  }
  // 取消的时候将表单值置位空
  onCancel() {
    this.toggle(false);
    (this.$refs['yinjForm'] as any).resetFields();
  }

  handleChange(val: any) {
    if (val != undefined) {
      this.formParams.area = val.toString();
    } else {
      this.formParams.area = "";
    }
  }
  mounted() {
    this.getAreaCode(); //获取所属区域
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

::v-deep.suc-select {
  .ivu-select-selection .ivu-select-selected-value {
    font-size: 13px;
    color: #606266;
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
