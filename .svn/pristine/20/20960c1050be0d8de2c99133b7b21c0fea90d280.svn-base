<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <div>
          <!-- <el-form-item label="系统编码:" prop="systemid">
            <el-input v-model="formParams.systemid" :disabled="title=='新增' ? false : true" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item> -->
          <el-form-item label="排放口编码:">
            <el-input v-model="formParams.outfallid" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="所属排水系统编码:">
            <el-input v-model="formParams.systemid" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="坐标X:">
            <el-input v-model="formParams.xCoor" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="坐标Y:">
            <el-input v-model="formParams.yCoor" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="受纳水体编码:">
            <el-input v-model="formParams.receivewaterid" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="类别:" >
            <el-select  v-model="formParams.outfallCategory"  style="width:100%;" placeholder="请选择" size="mini">
              <el-option v-for="item in Options"  :label="item.label" :value="item.value" :key="item.index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有排门:">
            <suc-select v-model="formParams.flap" :options="ywpm" :config="{ placeholder: '请选择', clearable: true }" style="width:100%"></suc-select>
          </el-form-item>
          <el-form-item label="出流形式:">
            <el-select  v-model="formParams.outfallType"  style="width:100%;" placeholder="请选择" size="mini">
              <el-option v-for="item in clOption"  :label="item.label" :value="item.value" :key="item.index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据来源:">
            <el-input v-model="formParams.datasource" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="数据获取日期:">
            <el-date-picker
              v-model="formParams.recordDate"
              style="width: 100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="数据填报单位:">
            <el-input v-model="formParams.reportUnit" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="填报日期:">
            <el-date-picker
              v-model="formParams.reportDate"
              style="width: 100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="排放口名称:">
            <el-input v-model="formParams.name" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="排放口具体地址:">
            <el-input v-model="formParams.addr" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="排放口地表高程（单位:米）:">
            <el-input v-model="formParams.surfaceElev" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="排放口顶部高程（单位:米）:">
            <el-input v-model="formParams.topElev" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="排放口底部高程（单位:米）:">
            <el-input v-model="formParams.bottomElev" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="排门材质:" >
            <el-select  v-model="formParams.flapMaterail"  style="width:100%;" placeholder="请选择" size="mini">
              <el-option v-for="item in czOption"  :label="item.label" :value="item.value" :key="item.index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排门直径（单位:米）:">
            <el-input v-model="formParams.flapDiamneter" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="排门顶部高程（单位:米）:">
            <el-input v-model="formParams.flapTopelev" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="排门底部高程（单位:米）:">
            <el-input v-model="formParams.flapBotelev" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="淹没常水位（单位:米）:">
            <el-input v-model="formParams.normalLevel" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="潮位曲线（单位:米）:">
            <el-input v-model="formParams.tidalCurve" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="设施状态:">
            <suc-select v-model="formParams.status" :options="sbzt" :config="{ placeholder: '请选择', clearable: true }" style="width:100%"></suc-select>
          </el-form-item>
          <!-- <el-form-item v-show="formParams.status==5 ? true:false" label="输入设施状态:">
            <el-input v-model="formParams.statu" style="width: 100%" placeholder="请输入"></el-input>
          </el-form-item> -->
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
  Options:any=''
  clOption:any=''
  czOption:any=''
  //有无排门
  ywpm: any = [
    {value:'1',label:'是'},
    {value:'0',label:'否'}
  ];
  //设备状态
  sbzt: any = [
      {value:'1',label:'已建'},
      {value:'2',label:'在建'},
      {value:'3',label:'待废'},
      {value:'4',label:'已废'},
      {value:'5',label:'其他'},
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
  mounted() {
    this.getData();
    this.clData();
    this.czData();
  }
  async getData() {
    const url = "server/dataCenter/psSystem/getSystemType";
    const data = await publicApi.getNoParam(url);
    this.Options =data.data.map((e: any) => {
      return{
        value:e.code,
        label:e.level,
      }
    })
  } 
  //出流
  async clData() {
    const url = "server/dataCenter/outfall/getOutfallType";
    const data = await publicApi.getNoParam(url);
    this.clOption =data.data.map((e: any) => {
      return{
        value:e.code,
        label:e.level,
      }
    })
  }
  //材质
  async czData() {
    const url = "server/dataCenter/outfall/getFlapMaterial";
    const data = await publicApi.getNoParam(url);
    this.czOption =data.data.map((e: any) => {
      return{
        value:e.code,
        label:e.level,
      }
    })
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
