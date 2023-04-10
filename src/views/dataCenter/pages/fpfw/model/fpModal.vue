<template>
  <!-- 分配房屋弹框 -->
  <el-dialog title="分配房屋" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
    <el-form :model="formParams" ref="fpForm" label-width="auto" size="small">
      
      <el-form-item label="租户姓名:">
        <suc-input disabled v-model="formParams.lesseeName" style="width:100%;"></suc-input>
      </el-form-item>

      <el-form-item label="身份证号:">
        <suc-input disabled v-model="formParams.lesseeNum" style="width:100%;"></suc-input>
      </el-form-item>

      <el-form-item label="区域:" prop="area">
        <el-cascader
          v-model="formParams.area"
          :options="areaOptions"
          :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
          style="width:100%;"
          size="small"
          placeholder="请选择"
          clearable
          @change="handleChange"
        ></el-cascader>
      </el-form-item>

       <el-form-item label="房屋:">
        <el-cascader
          v-model="formParams.uuids"
          :options="houseOptions"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'children', checkStrictly: true }"
          style="width:100%;"
          size="small"
          placeholder="请选择"
          clearable
          @change="handleChange1"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="物业公司:">
        <suc-input v-model="formParams.companyName" disabled style="width:100%;"></suc-input>
      </el-form-item>

      <el-form-item label="租赁开始日期:">
        <suc-date-picker
            v-model="formParams.leaseStarttime"
            :options="{
              type: 'date',
              clearable: true,
              placeholder: '选择时间',
            }"
            style="width: 100%"
          ></suc-date-picker>
      </el-form-item>

      <el-form-item label="租赁结束日期:">
        <suc-date-picker
            v-model="formParams.leaseEndtime"
            :options="{
              type: 'date',
              clearable: true,
              placeholder: '选择时间',
            }"
            style="width: 100%"
          ></suc-date-picker>
      </el-form-item>

      <el-form-item label="租金/月（元）:">
        <suc-input v-model="formParams.rentMonth" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>

      <el-form-item label="租金总额（元）:">
        <suc-input v-model="formParams.rentTotal" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      
      <el-form-item label="备注">
        <suc-input v-model="formParams.nt" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="onCancel('fpForm')">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker } from "@suc/ui";
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
export default class FpModal extends Vue {
  areaOptions: any = [];
  houseOptions: any = [];
  @Prop() loading!: boolean; //控制加载
  @Prop() modal!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle(val: boolean) {
    return val;
  }

  onOk() {
    (this.$refs["fpForm"] as any).validate((valid: any) => {
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
  onCancel(params: any) {
    this.toggle(false);
    (this.$refs[params] as any).resetFields();
  }

  async handleChange(val: any) {
    if (val != undefined) {
      this.formParams.area = val.toString();
      let url = "server/house/allot/tree"
      let data = await publicApi.getWithParam(url, {areaCode:val.toString()});
      if(data.data.id!='-1'){
        this.houseOptions=data.data
      } else{
        this.houseOptions = this.getTreeData(data.data.children);
      }
      if (val == '') {
        this.houseOptions = [];
      }
    } else {
      this.formParams.area = "";
    }
  }

  async handleChange1(val: any) {
    if (val != undefined) {
      this.formParams.uuids = val.toString();
      let url = "server/house/allot/company"
      let data = await publicApi.getWithParam(url, {uuids:val.toString()});
      console.log("0-0-",data);
      this.formParams.companyName = data.data
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
