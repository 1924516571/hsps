<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="small" :rules="rules">
        <div>
          <el-form-item label="小区名称:" prop="communityId">
            <el-select  v-model="formParams.communityId"  style="width:100%;" placeholder="请选择" size="mini">
              <el-option v-for="item in Options"  :label="item.label" :value="item.value" :key="item.index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="户数:">
            <suc-input v-model="formParams.householdNumber" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="建立日期:">
            <suc-date-picker
              v-model="formParams.buildingTime"
              :options="{
                type: 'date',
                clearable: true,
                placeholder: '选择时间',
              }"
              style="width: 100%"
            ></suc-date-picker>
          </el-form-item>
        </div>
        <div>
          
          <el-form-item label="楼栋号:">
            <suc-input v-model="formParams.buildingId" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="占地面积（m³）:">
            <suc-input v-model="formParams.buildingArea" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="备注:">
            <suc-input type="textarea" v-model="formParams.remarks" style="width: 100%" placeholder="请输入"></suc-input>
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
    communityId: [{ required: true, message: "请选择小区", trigger: "blur" }],
    sex: [{ required: true, message: "请选择", trigger: "change" }],
  };
  Options:any=''
  xqtableData: any = [];
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
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
    this.onxqlist()

  }
  async onxqlist() {
    const url = "server/securityHousing/basicCommunity/list";
    const data = await publicApi.getNoParam(url);
    this.Options =data.data.map((e: any) => {
      return{
        value:e.id,
        label:e.communityName,
      }
    })
  } 

  onOk() {
    (this.$refs["jqForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
        console.log('1')
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
