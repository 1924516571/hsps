<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" >
        <div>
          <el-form-item label="小区名称:" prop="communityName">
            <suc-input v-model="formParams.communityName" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="具体地址:" >
            <suc-input v-model="formParams.address" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="小区总面积（m³）:">
            <suc-input v-model="formParams.communityArea" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="户数:">
            <suc-input v-model="formParams.familyNumber" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="小高层物业费（元/㎡）:">
            <suc-input v-model="formParams.littleHighFee" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="别墅物业费（元/㎡）:">
            <suc-input v-model="formParams.villaFee" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="备注:">
            <suc-input type="textarea" v-model="formParams.remarks" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="所在区域:" >
           <el-cascader
              :options="areaOptions"
              v-model="formParams.areaCode"
              :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
              style="width:100%;"
              size="small"
              placeholder="所在区域"
              clearable
              @change="handleChange"
            >
            </el-cascader> 
           
          </el-form-item>
          <el-form-item label="楼栋数:">
            <suc-input v-model="formParams.buildingNumber" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="物业公司:" >
            <el-select  v-model="formParams.companyId"  style="width:100%;" placeholder="请选择" size="mini">
              <el-option v-for="item in Option"  :label="item.label" :value="item.value" :key="item.index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物业费（元/㎡）:">
            <suc-input v-model="formParams.propertyFee" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="高层物业费（元/㎡）:">
            <suc-input v-model="formParams.highFee" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="商铺物业费（元/㎡）:">
            <suc-input v-model="formParams.shopFee" style="width: 100%" placeholder="请输入"></suc-input>
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
    communityName: [{ required: true, message: "请输入", trigger: "blur" }],
    sex: [{ required: true, message: "请选择", trigger: "change" }],
  };
  areaOptions:any = [];
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  Option:any=''
  Options:any=''

  @Emit()
  toggle(val: boolean) {
    return val;
  }
  getdata(){
    this.onwylist()
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
  mounted() {
    // this.init();
     this.getAreaCode();
     this.onwylist()
  }
  async onwylist() {
    const url = "server/securityHousing/basicCompany/selectNameId";
    const data = await publicApi.getNoParam(url);
    this.Option=data.data.map((e: any) => {
      return{
        value:e.id,
        label:e.companyName,
      }
    })
  } 
  // init() {
  //   this.getAreaCode();
  // }

  //获取下拉行政区域下拉
  async getAreaCode() {
    let data = await publicApi.getAreaCode();
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
