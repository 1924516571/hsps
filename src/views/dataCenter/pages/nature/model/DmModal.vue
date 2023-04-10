<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <div>
          <!-- <el-form-item label="系统编码:" prop="systemid">
            <el-input v-model="formParams.systemid" :disabled="title=='新增' ? false : true" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item> -->
          <el-form-item label="断面代码:">
            <el-input v-model="formParams.code" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面名称:">
            <el-input v-model="formParams.name" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面所属位置:">
            <el-input v-model="formParams.address" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面类型:">
            <suc-select v-model="formParams.type" :options="dmxx" :config="{ placeholder: '请选择', clearable: true }" style="width:100%"></suc-select>
          </el-form-item>
          <el-form-item label="断面所属河道id:">
            <el-input v-model="formParams.riverid" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面所属河道名称:">
            <el-input v-model="formParams.rivername" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面高程:">
            <el-input v-model="formParams.elevation" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面总面积:">
            <el-input v-model="formParams.totalarea" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面过水面积:">
            <el-input v-model="formParams.waterarea" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面面积注解码:">
            <el-input v-model="formParams.commentcode" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面平均流速:">
            <el-input v-model="formParams.avgv" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面最大流速:">
            <el-input v-model="formParams.maxv" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="水面宽:">
            <el-input v-model="formParams.waterwidth" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面平均水深:">
            <el-input v-model="formParams.avgwaterheight" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面最大水深:">
            <el-input v-model="formParams.maxwaterheight" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面目标水质:">
            <suc-select v-model="formParams.targetwq" :options="szlx" :config="{ placeholder: '请选择', clearable: true }" style="width:100%"></suc-select>
          </el-form-item>
          <el-form-item label="目标高猛酸钾:">
            <el-input v-model="formParams.targetcodmn" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="目标总磷:">
            <el-input v-model="formParams.targettp" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="目标氨氮:">
            <el-input v-model="formParams.targetnh3" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面经度:">
            <el-input v-model="formParams.lon" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面纬度:">
            <el-input v-model="formParams.lat" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="断面排序序号:">
            <el-input v-model="formParams.sort" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="测量日期:">
            <el-date-picker
              v-model="formParams.measuredate"
              style="width: 100%"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="滩地宽度:">
            <el-input v-model="formParams.beachwidth" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="河槽宽度:">
            <el-input v-model="formParams.channelwidth" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="河槽高程:">
            <el-input v-model="formParams.channelelevation" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="河槽冲击厚度:">
            <el-input v-model="formParams.channelthickness" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="主河槽底部高程:">
            <el-input v-model="formParams.maxchannelelevation" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="滩地平均高程:">
            <el-input v-model="formParams.beachelevation" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="滩地冲击厚度:">
            <el-input v-model="formParams.beachthickness" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" :rows="2" v-model="formParams.remark" style="width: 100%" placeholder="请输入"></el-input>
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
  @Prop() title!: string;
  @Prop() modal!: boolean;
  rules: any = {
    systemid: [{ required: true, message: "请输入系统编码", trigger: "blur" }],
    systemType: [{ required: true, message: "请选择系统类型", trigger: "change" }],
    idCard: [{ required: true, trigger: "blur", validator: validateIdNo }],
  };
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  //断面信息
  dmxx: any = [
    {value:'省考断面',label:'省考断面'},
    {value:'国考断面',label:'国考断面'}
  ];
  //水质类型
  szlx: any = [
      {value:'Ⅰ类',label:'Ⅰ类'},
      {value:'Ⅱ类',label:'Ⅱ类'},
      {value:'Ⅲ类',label:'Ⅲ类'},
      {value:'Ⅳ类',label:'Ⅳ类'},
      {value:'劣Ⅴ类',label:'劣Ⅴ类'},
    ];
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
