<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <div>
          <el-form-item label="设施标识码:" prop="dischargerid">
            <el-input v-model="formParams.dischargerid" :disabled="isDisabled" style="width: 100%" placeholder="请输入设施标识码"></el-input>
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
          <el-form-item label="排水户名称:">
            <el-input v-model="formParams.name" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="地址:">
            <el-input v-model="formParams.addr" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="接入检查井编码:">
            <el-input v-model="formParams.connManholeld" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="组织机构代码:">
            <el-input v-model="formParams.codeid" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="法人代表:">
            <el-input v-model="formParams.legalperson" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:">
            <el-input v-model="formParams.tel" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="主管单位:">
            <el-input v-model="formParams.manager" style="width: 100%"></el-input>
          </el-form-item>

          <el-form-item label="是否为重点排水户:">
            <el-select v-model="formParams.keydischarger" style="width:100%;" placeholder="请选择设施类型" size="mini">
              <el-option v-for="(item, index) in keydischargereOptions" :label="item.label" :value="item.value" :key="item.index"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="主要生产工艺:">
            <el-input v-model="formParams.process" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="排水许可证编号:">
            <el-input v-model="formParams.licenceId" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="许可证颁发日期:">
            <el-date-picker v-model="formParams.licenceIssuedate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
          <el-form-item label="用户总量(单位:立方米/天):">
            <el-input v-model="formParams.totalquant" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="自备水量(单位:立方米/天):">
            <el-input v-model="formParams.selfsupplyQuant" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="总排水量(单位:立方米/天):">
            <el-input v-model="formParams.dischargeQuant" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="生产污水量(单位:立方米/天):">
            <el-input v-model="formParams.prodsewaQuant" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="生活污水量(单位:立方米/天):">
            <el-input v-model="formParams.domesewaQuant" style="width: 100%"></el-input>
          </el-form-item>

          <el-form-item label="第二类污染物名称">
            <el-input v-model="formParams.grade1pollutant" style="width: 100%"></el-input>
          </el-form-item>

          <el-form-item label="污水处理方式">
            <el-input v-model="formParams.treatmentMethod" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="污水处理规模（单位:立方米/天）">
            <el-input v-model="formParams.treatmentCapa" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="技术文件编码">
            <el-input v-model="formParams.datalistid" style="width: 100%"></el-input>
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
  @Prop() parentMydatasource!: boolean;
  keydischargereOptions: any = [
    { label: "否", value: 0 },
    { label: "是", value: 1 },
  ];
  areaOptions: any = []; //行政区域

  dataSourceOptions: any[] = []; //数据来源
  selectConfig: any = {
    isShow: false,
  };
  rules: any = {
    dischargerid: [{ required: true, message: "请输入设施标识码", trigger: "blur" }],
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
    this.getDataSourceOptions(); //数据来源
    this.getAreaCode(); //获取行政区域
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
