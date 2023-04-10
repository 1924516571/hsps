<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <div>
          <el-form-item label="设施标识码:" prop="storageid">
            <el-input v-model="formParams.storageid" :disabled="title == '新增' ? false : true" style="width: 100%" placeholder="请输入标识码"></el-input>
          </el-form-item>

          <el-form-item label="所属排水系统编码:" prop="systemid">
            <el-select v-model="formParams.systemid" style="width:100%;" placeholder="排水系统编码" size="mini">
              <el-option v-for="(item, index) in systemidOptions" :label="item.label" :value="item.value" :key="index"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="调蓄设施名称:" prop="name">
            <el-input v-model="formParams.name" style="width: 100%" placeholder="请输入调蓄设施名称"></el-input>
          </el-form-item>
          <el-form-item label=" 坐标X:">
            <el-input type="number" v-model.number="formParams.xCoor" style="width: 100%" placeholder="请输入坐标X"></el-input>
          </el-form-item>
          <el-form-item label=" 坐标Y:">
            <el-input type="number" v-model.number="formParams.yCoor" style="width: 100%" placeholder="请输入坐标Y"></el-input>
          </el-form-item>
          <el-form-item label="调蓄设施地址:">
            <el-input v-model="formParams.addr" style="width: 100%" placeholder="请输入调蓄设施地址"></el-input>
          </el-form-item>

          <el-form-item label="类别:">
            <el-select v-model="formParams.storageCategory" style="width:100%;" placeholder="请选择设施状态" size="mini">
              <el-option v-for="(item, index) in storageCategoryOptions" :label="item.label" :value="item.value" :key="index"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="与现有设施的关系:">
            <el-select v-model="formParams.relationFacilities" style="width:100%;" placeholder="请选择与现有设施的关系" size="mini">
              <el-option v-for="(item, index) in relationFacilitiesOptions" :label="item.label" :value="item.value" :key="index"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="调蓄设施主要功能:">
            <el-select v-model="formParams.function" style="width:100%;" placeholder="请选择调蓄设施主要功能" size="mini">
              <el-option v-for="(item, index) in functionOptions" :label="item.label" :value="item.value" :key="index"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="进水方式:">
            <el-select v-model="formParams.inletType" style="width:100%;" placeholder="请选择进水方式" size="mini">
              <el-option v-for="(item, index) in inletTypeOptions" :label="item.label" :value="item.value" :key="index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出水方式:">
            <el-select v-model="formParams.outletType" style="width:100%;" placeholder="请选择出水方式" size="mini">
              <el-option v-for="(item, index) in outletTypeOptions" :label="item.label" :value="item.value" :key="index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="布置形式:">
            <el-select v-model="formParams.layout" style="width:100%;" placeholder="请选择布置方式" size="mini">
              <el-option v-for="(item, index) in layoutOptions" :label="item.label" :value="item.value" :key="index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最高水位:">
            <el-input type="number" v-model.number="formParams.maxLevel" placeholder="请输入最高水位"></el-input>
          </el-form-item>

          <el-form-item label="最低水位:">
            <el-input type="number" v-model.number="formParams.minLevel" placeholder="请输入最低水位"></el-input>
          </el-form-item>

          <el-form-item label="常水位:">
            <el-input type="number" v-model.number="formParams.narmalLevel" placeholder="请输入常水位"></el-input>
          </el-form-item>
          <el-form-item label="截流初雨量（单位/mm）:">
            <el-input type="number" v-model.number="formParams.interCapa"></el-input>
          </el-form-item>

          <el-form-item label="调蓄设施的总容积（单位/立方米）:">
            <el-input type="number" v-model.number="formParams.totalVol"></el-input>
          </el-form-item>
          <el-form-item label="设施底部的深度（单位/平方米）:">
            <el-input v-model="formParams.heightArea"></el-input>
          </el-form-item>
          <el-form-item label=" 调蓄设施底部高程（单位/米）:">
            <el-input type="number" v-model.number="formParams.bottomElev"></el-input>
          </el-form-item>
          <el-form-item label=" 调蓄设施底部高程（单位/米）:">
            <el-input type="number" v-model.number="formParams.bottomElev"></el-input>
          </el-form-item>
          <el-form-item label=" 技术文件编码:">
            <el-input v-model="formParams.datalistid"></el-input>
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

          <el-form-item label=" 设施描述:">
            <el-input v-model="formParams.description"></el-input>
          </el-form-item>

          <el-form-item label="调蓄设施材质:">
            <el-select v-model="formParams.storageMaterial" style="width:100%;" size="mini">
              <el-option v-for="(item, index) in storageMaterialOptions" :label="item.label" :value="item.value" :key="index"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="调蓄设施类型:">
            <el-select v-model="formParams.storageType" style="width:100%;" size="mini">
              <el-option v-for="(item, index) in storageTypeOptions" :label="item.label" :value="item.value" :key="index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="蒸发系数:">
            <el-input-number v-model="formParams.evapCoeff"  label="sqasdeqwewqeqwe"></el-input-number>
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
        <el-button type="primary" @click="onOk()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker } from "@suc/ui";
import { validateIdInput } from "@/utils/validator.js";
import { publicApi } from "@/api";
import { getSystemid } from "../api/dxss";
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
  systemidOptions: any = []; // 排水系统编码
  dataSourceOptions: any[] = []; //数据来源
  /* 与现有设施的关系（下拉框） */
  relationFacilitiesOptions: any = [
    { value: "1", label: "合建" },
    { value: "2", label: "分建" },
    { value: "3", label: "用现有设施容" },
    { value: "4", label: "其他" },
  ];
  /* 类别 */
  storageCategoryOptions: any[] = [
    { value: 1, label: "雨水" },
    { value: 2, label: "污水" },
    { value: 3, label: "合流" },
    { value: 4, label: "功能调蓄设施" },
    { value: 5, label: "其他" },
  ];
  /* 调蓄设施 */
  functionOptions: any = [
    { value: "1", label: "调蓄" },
    { value: "2", label: "削峰" },
    { value: "3", label: "污染控制" },
    { value: "4", label: "综合效果" },
  ];

  /* 进水水方式 */
  inletTypeOptions: any = [
    { value: "1", label: "截流设施" },
    { value: "2", label: "管道" },
    { value: "3", label: "溢流堰" },
    { value: "4", label: "其他" },
  ];
  /* 出水方式 */
  outletTypeOptions: any = [
    { value: "1", label: "闸" },
    { value: "2", label: "泵" },
    { value: "3", label: "堰" },
    { value: "4", label: "阀" },
    { value: "5", label: "孔" },
    { value: "6", label: "管道" },
    { value: "7", label: "其他" },
  ];
  /* 布置形式 */
  layoutOptions: any = [
    { value: "1", label: "溢流堰式" },
    { value: "2", label: "流槽式" },
    { value: "3", label: "泵汲式" },
    { value: "4", label: "其他" },
  ];
  /* 调蓄设施材质 */
  storageMaterialOptions: any = [
    { value: "1", label: "硬化" },
    { value: "2", label: "自然" },
    { value: "3", label: "模块化产品" },
    { value: "4", label: "其他" },
  ];
  storageTypeOptions: any = [
    { value: "1", label: "密式" },
    { value: "2", label: "开放式" },
  ];

  /* 设施状态 */
  statusOptions: any[] = [];

  selectConfig: any = {
    isShow: false,
  };
  rules: any = {
    storageid: [{ required: true, trigger: "blur",validator:validateIdInput }],
    systemid: [{ required: true, message: "所属排水系统编码", trigger: "change" }],
    name: [{ required: true, message: "请输入调蓄设施名称", trigger: "blur" }],
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
    this.getBm(); //所属排水系统编码
    this.getstatusOptions(); //设施状态
  }

  async getBm() {
    await getSystemid().then((data: any) => {
      if (data.result) {
        this.systemidOptions = data.data.map((item: any, index: any) => {
          return {
            value: item.systemid,
            label: item.name,
          };
        });
      }
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
