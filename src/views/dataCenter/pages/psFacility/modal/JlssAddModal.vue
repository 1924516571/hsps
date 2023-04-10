<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <div>
          <el-form-item label="设施标识码:" prop="dividerid">
            <el-input v-model="formParams.dividerid" :disabled="title == '新增' ? false : true" style="width: 100%" placeholder="请输入标识码"></el-input>
          </el-form-item>
          <el-form-item label="排水系统编码:">
            <el-input v-model="formParams.systemid" style="width: 100%" placeholder="请输入排水系统编码"></el-input>
          </el-form-item>
          <el-form-item label=" 坐标X:">
            <el-input type="number" v-model.number="formParams.xCoor" style="width: 100%" placeholder="请输入坐标X"></el-input>
          </el-form-item>
          <el-form-item label=" 坐标Y:">
            <el-input type="number" v-model.number="formParams.yCoor" style="width: 100%" placeholder="请输入坐标Y"></el-input>
          </el-form-item>
          <el-form-item label=" 截流设施类型:" prop="dividerType">
            <el-select v-model="formParams.dividerType" style="width:100%;" placeholder="请选择设施类型" size="mini">
              <el-option v-for="item in ssTypeOptions" :label="item.label" :value="item.value" :key="item.id"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管渠编码:">
            <el-input v-model="formParams.divertedid" style="width: 100%" placeholder="请输入管渠编码"></el-input>
          </el-form-item>
          <el-form-item label="技术文件编码:">
            <el-input v-model="formParams.datalistid" style="width: 100%" placeholder="请输入技术文件编码"></el-input>
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
          <el-form-item label="数据获取日期:">
            <el-date-picker v-model="formParams.recordDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
          <el-form-item label="数据填报单位:">
            <el-input v-model="formParams.reportUnit" style="width: 100%" placeholder="请输入数据填报单位"></el-input>
          </el-form-item>
          <el-form-item label="数据填报单位日期:">
            <el-date-picker v-model="formParams.reportDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
          <el-form-item label="截流内部设施编码:">
            <el-input v-model="formParams.connectid" style="width: 100%" placeholder="请输入截流内部设施编码"></el-input>
          </el-form-item>
          <el-form-item label="截流流量(单位:升/秒):">
            <el-input v-model="formParams.cutoffFlow" style="width: 100%" placeholder="请输入截流流量"></el-input>
          </el-form-item>
          <el-form-item label="截流曲线(单位:升/秒):">
            <el-input v-model="formParams.diversionCurve" style="width: 100%" placeholder="请输入截流曲线"></el-input>
          </el-form-item>

          <el-form-item label="设施状态:" prop="status">
            <el-select v-model="formParams.status" style="width:100%;" placeholder="请选择设施状态" size="mini">
              <el-option v-for="item in statusOptions" :label="item.label" :value="item.value" :key="item.id"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input type="textarea" :rows="2" v-model="formParams.remark" style="width: 100%" placeholder="请输入备注"></el-input>
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
  @Prop() parentMydatasource!: boolean;
  ssTypeOptions: any[] = []; //截流设施类型
  dataSourceOptions: any[] = []; //数据来源
  statusOptions: any[] = []; //设备状态数据
  selectConfig: any = {
    isShow: false,
  };
  rules: any = {
    dividerid: [{ required: true, message: "请输入系统编码", trigger: "blur" }],
    status: [{ required: true, message: "请输入状态", trigger: "change" }],
    datasource: [{ required: true, message: "请输入数据来源", trigger: "change" }],
    dividerType: [{ required: true, message: "请输入数据来源", trigger: "change" }],
    // systemType: [{ required: true, message: "请选择系统类型", trigger: "change" }],
    // idCard: [{ required: true, trigger: "blur", validator: validateIdNo }],
  };
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

  @Emit()
  onSubmit() {}
  onCancel() {
    this.toggle(false);
    (this.$refs["jqForm"] as any).resetFields();
  }
  mounted() {
    this.getDividerType(); //截流设施类型
    this.getDataSourceOptions(); //数据来源
    this.getstatusOptions(); //设施状态
  }
  async getDividerType() {
    const url = "server/dataCenter/divider/getDividerType";
    await publicApi
      .getNoParam(url)
      .then((data: any) => {
        if (data.result) {
          this.ssTypeOptions = data.data.map((item: any, index: any) => {
            return {
              value: item.code,
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
  async getstatusOptions() {
    let url = "server/dataCenter/manhole/getSsStatus";
    await publicApi
      .getNoParam(url)
      .then((data: any) => {
        if (data.result) {
          this.statusOptions = data.data.map((item: any, index: any) => {
            return {
              value: item.code,
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
.form {
  display: flex;
  div {
    flex: 1;
    margin-right: 10px;
  }
}
.fade-leave,   // 离开前,进入后透明度是1
.fade-enter-to {
  opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 1.5s; //过度是2秒
}
.fade-leave-to,
.fade-enter {
  opacity: 0;
}
</style>
