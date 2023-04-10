<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <div>
          <el-form-item label="处理厂标识码:" prop="wwtpid">
            <el-input v-model="formParams.wwtpid" :disabled="isDisabled" style="width: 100%" placeholder="请输入设施标识码"></el-input>
          </el-form-item>
          <el-form-item label="排水系统编码:">
            <el-input v-model="formParams.systemid" style="width: 100%"></el-input>
          </el-form-item>
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
          <el-form-item label="坐标X:">
            <el-input type="number" v-model.number="formParams.xCoor" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="坐标Y:">
            <el-input type="number" v-model.number="formParams.yCoor" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="处理厂名称:">
            <el-input v-model="formParams.name" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="地址:">
            <el-input v-model="formParams.addr" style="width: 100%"></el-input>
          </el-form-item>

          <el-form-item label="处理设施类型:">
            <el-select :popper-append-to-body="true" v-model="formParams.wwtpType" style="width:100%;" placeholder="请选择设施类型" size="mini">
              <el-option v-for="(item, index) in wwtpTypeOptions" :label="item.label" :value="item.value" :key="item.index"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="污水处理级别:">
            <el-select v-model="formParams.treatmentLevel" style="width:100%;" size="mini">
              <el-option v-for="(item, index) in treatmentLevelOptions" :label="item.label" :value="item.value" :key="item.index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建成日期:">
            <el-date-picker v-model="formParams.buildDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
          <el-form-item label="年耗电量(万千瓦时/单位):">
            <el-input v-model="formParams.powerconsup" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="处理方法">
            <el-select v-model="formParams.treatmentMethod" style="width:100%;" size="mini">
              <el-option v-for="(item, index) in treatmentMethodOptions" :label="item.label" :value="item.value" :key="item.index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="受纳水体编码">
            <el-input v-model="formParams.receivewaterid" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="设计处理规模">
            <el-input v-model="formParams.designWwcapa" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="污水处理工艺">
            <el-input v-model="formParams.wwProcess" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="污水运行负荷率">
            <el-input v-model="formParams.wwLoad" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="雨水设计处理规模">
            <el-input v-model="formParams.designRaincapa" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="雨水处理工艺">
            <el-input v-model="formParams.rainProcess" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="污泥设计处理规模">
            <el-input v-model="formParams.designSludgecapa" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="污泥运行负荷率">
            <el-input v-model="formParams.sludgeLoad" style="width: 100%"></el-input>
          </el-form-item>

          <el-form-item label="污泥处理工艺">
            <el-input v-model="formParams.sludgeProcess" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="污泥处置方式">
            <el-select v-model="formParams.sludegtreatmethod" style="width:100%;" size="mini">
              <el-option v-for="(item, index) in sludegtreatmethodOptions" :label="item.label" :value="item.value" :key="item.index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="水泵台数">
            <el-input v-model="formParams.pumpNum" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="数据来源:">
            <el-select v-model="formParams.datasource" style="width:100%;" placeholder="请选择输入来源" size="mini" @change="changeItemValue($event)" ref="fuzzySearch">
              <el-option v-for="item in dataSourceOptions" :label="item.label" :value="item.value" :key="item.id"> </el-option>
            </el-select>
            <transition name="fade">
              <span v-if="selectConfig.isShow">
                <el-input v-model="formParams.Mydatasource" v-focus style="width:50%" placeholder="请输入其他数据来源"></el-input>
              </span>
            </transition>
          </el-form-item>
          <el-form-item label="数据获取日期">
            <el-date-picker v-model="formParams.recordDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
          <el-form-item label="数据填报单位">
            <el-input v-model="formParams.reportUnit" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="数据填报日期">
            <el-date-picker v-model="formParams.reportDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formParams.remark" style="width: 100%"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onOk">确 定</el-button>
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
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数

  @Emit()
  toggle(val: boolean) {
    return val;
  }
  @Watch("modal", { immediate: true })
  getModal(newValue: any) {
    if (newValue == false) {
      this.selectConfig.isShow = false;
    }
  }
  wwtpTypeOptions: any = []; //处理厂类型
  treatmentLevelOptions: any = []; //污水处理级别
  treatmentMethodOptions: any = []; //污水处理方法
  areaOptions: any = []; //行政区域
  dataSourceOptions: any[] = []; //数据来源
  sludegtreatmethodOptions: any[] = []; //污泥处置方式

  selectConfig: any = {
    isShow: false,
  };
  rules: any = {
    wwtpid: [{ required: true, message: "请输入标识码", trigger: "blur" }],
  };

  @Emit()
  onSubmit() {}
  onCancel() {
    this.toggle(false);
    (this.$refs["jqForm"] as any).resetFields();
  }
  mounted() {
    this.getWwtpType(); //处理厂类型
    this.getTreatmentLevel(); //级别
    this.getTreatmentMethod();
    this.getDataSourceOptions(); //数据来源
    this.getAreaCode(); //获取行政区域
    this.getSludegtreatmethod(); //污泥处置方式
  }
  async getWwtpType() {
    const url = "server/dataCenter/wwtp/getWwtpType";
    const data = await publicApi.getNoParam(url);
    this.wwtpTypeOptions = data.data.map((item: any) => {
      return {
        value: item.code,
        label: item.level,
      };
    });
  }
  // 级别
  async getTreatmentLevel() {
    const url = "server/dataCenter/wwtp/getTreatmentLevel";
    const data = await publicApi.getNoParam(url);
    this.treatmentLevelOptions = data.data.map((item: any) => {
      return {
        value: item.code,
        label: item.level,
      };
    });
  }
  //污水处理方法
  async getTreatmentMethod() {
    const url = "server/dataCenter/wwtp/getTreatmentMethod";
    const data = await publicApi.getNoParam(url);
    this.treatmentMethodOptions = data.data.map((item: any) => {
      return {
        value: item.level,
        label: item.level,
      };
    });
  }

  // 污泥处理方式
  async getSludegtreatmethod() {
    const url = "server/dataCenter/wwtp/getSludegtreatmethod";
    const data = await publicApi.getNoParam(url);
    this.sludegtreatmethodOptions = data.data.map((item: any) => {
      return {
        value: item.level,
        label: item.level,
      };
    });
  }

  async getAreaCode() {
    let url = "wjBaseServer/system/organization/queryWxD3Tree";
    const data = await publicApi.getNoParam(url);
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

  // 计算属性
  get isDisabled() {
    return this.title === "新增" ? false : true;
  }

  async getDataSourceOptions() {
    let url = "server/dataCenter/comb/getDataSource";
    await publicApi
      .getNoParam(url)
      .then((data: any) => {
        if (data.result) {
          this.dataSourceOptions = data.data.map((item: any, index: any) => {
            return {
              value: item.level,
              label: item.level,
              id: index + 1,
            };
          });
        }
        return false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  a: boolean = false;
  changeItemValue(e: any) {
    if (e == "其他") {
      this.a = true;
      this.selectConfig.isShow = true;
    } else {
      this.selectConfig.isShow = false;
      this.a = false;
    }
  }

  onOk() {
    (this.$refs["jqForm"] as any).validate((valid: any) => {
      if (valid) {
        if (this.a) {
          this.formParams.datasource = this.formParams.Mydatasource;
        } else {
          this.formParams.datasource = this.formParams.datasource;
        }
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
// .content{
//     width: 100%;
//     height: 510px;
//     overflow: auto;
// }
// .form {
//   display: flex;
//   div {
//     // flex: 1;
//     // margin-right: 10px;
//   }
// }
</style>
