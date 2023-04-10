<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form class="form" :model="formParams" ref="jqForm" label-width="auto" size="large" :rules="rules">
        <div>
          <el-form-item label="计划名称:" prop="name">
            <suc-input v-model="formParams.name" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="巡查单位:">
            <suc-input v-model="formParams.companyName" disabled style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="巡查区域/对象:" prop="target">
            <suc-input v-model="formParams.target" style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="执行时间:" prop="trainTime">
            <el-date-picker
              v-model="formParams.trainTime"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              size="small"
              @change="dateChange"
              value-format="yyyy-MM-dd"
              style="width:100%;"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="巡查小区:" prop="communityUuid">
            <suc-select v-model="formParams.communityUuid" :options="xcxqOptions" :config="{ placeholder: '巡查小区', clearable: true }" style="width:100%"></suc-select>
          </el-form-item>
          <el-form-item label="巡查人:" prop="patrolUserid">
            <suc-select v-model="formParams.patrolUserid" :options="xcrOptions" :config="{ placeholder: '巡查人', clearable: true }" style="width:100%"></suc-select>
          </el-form-item>
          <el-form-item label="上报人:">
            <suc-input v-model="formParams.reportUserName" disabled style="width: 100%" placeholder="请输入"></suc-input>
          </el-form-item>
          <el-form-item label="计划周期:" prop="period">
            <suc-select v-model="formParams.period" :options="jhzqOptions" :config="{ placeholder: '请选择', clearable: true }" style="width:100%"></suc-select>
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
import { SelectOptions } from "@suc/ui/interfaces";
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
  daterangeData: any = [];
  userInfo: any = JSON.parse(localStorage.getItem("userInfo") || "");
  xcxqOptions: SelectOptions = []; //巡查区域
  xcrOptions: SelectOptions = []; //巡查人区域
  jhzqOptions:any = [
     {
      label:"周",value:"周"
     },
     {
      label:"月度",value:"月度"
     },
     {
      label:"年度",value:"年度"
     }
  ]
  rules: any = {
    name: [{ required: true, message: "请输入计划名称", trigger: "blur" }],
    communityUuid: [{ required: true, message: "请输入巡查小区", trigger: "blur" }],
    patrolUserid: [{ required: true, message: "请输入巡查人", trigger: "blur" }],
    target: [{ required: false, message: "巡查对象", trigger: "blur" }],
    period: [{ required: true, message: "请输入计划周期", trigger: "blur" }],
    trainTime: [
      {
        type: "array",
        required: true,
        message: "请输入执行时间",
        fields: {
          //tpye类型试情况而定,所以如果返回的是date就改成date
          0: { type: "string", required: true, message: "请选择开始日期" },
          1: { type: "string", required: true, message: "请选择结束日期" },
        },
      },
    ],
  };
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  @Emit()
  onSubmit() {}
  //监听弹框关闭
  @Watch("modal", { immediate: true })
  handler(newVal: any, oldVal: any) {
    // console.log(newVal, "新的", oldVal, "旧的");
    // console.log(this.$refs["jqForm"],"监听");
    // (this.$refs["jqForm"] as any).resetFields();
  }
  /**
   * 取消
   */
  onCancel() {
    (this.$refs["jqForm"] as any).resetFields();
    this.toggle(false);
  }
  /**
   * 确定
   */
  onOk() {
    (this.$refs["jqForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
        (this.$refs["jqForm"] as any).resetFields();
      } else {
        return false;
      }
    });
  }
  dateChange(time: any) {
    // 后端传的参数
    this.formParams.executestartdate = time[0];
    this.formParams.executeenddate = time[1];
  }
  mounted() {
    this.getXqList(); //巡查小区
    this.getXcrList(); //巡查人
  }
  //巡查小区
  async getXqList() {
    let url = "server/plan/companies";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      this.xcxqOptions = data.data.map((item: any) => {
        return {
          value: item.id,
          label: item.communityName,
        };
      });
    } else {
      this.xcxqOptions = [];
    }
  }
  async getXcrList() {
    let url = "wjBaseServer/system/user/usesByCompanyId";
    let params = {
      companyId: this.userInfo.qyId,
    };
    let data = await publicApi.getWithParam(url, params);
    if (data.result) {
      this.xcrOptions = data.data.map((item: any) => {
        return {
          value: item.id,
          label: item.realname,
        };
      });
    } else {
      this.xcrOptions = [];
    }
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
.form {
  display: flex;
  div {
    flex: 1;
    margin-right: 10px;
  }
}
</style>
