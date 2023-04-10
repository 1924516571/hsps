<template>
  <el-dialog
    title="详情"
    :visible.sync="modal"
    :close-on-click-modal="true"
    :before-close="onCancel"
  >
    <el-form
      :model="formParams"
      ref="detailForm"
      label-width="auto"
      size="small"
    >
      <el-descriptions style="margin-bottom:40px" class="margin-top" title="基础信息" :column="2" size="medium" border labelStyle="width:150px">
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            租户姓名
          </template>
            {{formParams.lesseeName}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            小区名称
          </template>
           {{formParams.communityName}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-house"></i>
            楼栋
          </template>
          {{formParams.house}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-school"></i>
            物业公司
          </template>
          {{formParams.companyName}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            开始日期
          </template>
            {{formParams.leaseStarttime}}
        </el-descriptions-item>
         <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            结束日期
          </template>
             {{formParams.leaseEndtime}}
        </el-descriptions-item>
         <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money"></i>
            租金/月（元）
          </template>
            {{formParams.rentMonth}}
        </el-descriptions-item>
         <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-coin"></i>
            租金总额（元）
          </template>
           {{formParams.rentTotal}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            备注
          </template>
            {{formParams.nt}}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions style="margin-bottom:40px"  class="margin-top" title="物业登记" :column="2" size="medium" border labelStyle="width:150px">
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            登记日期
          </template>
            {{formParams.registerDate}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            入住人数
          </template>
          {{formParams.checkNum}}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions style="margin-bottom:40px"  class="margin-top" title="续租登记" :column="2" size="medium" border labelStyle="width:150px">
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            开始日期
          </template>
            {{formParams.reletStartdate}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            结束时间
          </template>
            {{formParams.reletEnddate}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money"></i>
            租金/月（元）
          </template>
            {{formParams.reletFee}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-coin"></i>
            租金总额（元）
          </template>
            {{formParams.reletTotal}}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions style="margin-bottom:40px"  class="margin-top" title="退租登记" :column="2" size="medium" border labelStyle="width:150px">
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            退租日期
          </template>
            {{formParams.surrenderDate}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money"></i>
            退租金额
          </template>
            {{formParams.surrenderFee}}
        </el-descriptions-item>
      </el-descriptions>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucForm, SucFormItem, SucInput } from "@suc/ui";
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
  },
})
export default class DetailHouse extends Vue {
  @Prop() formParams!: string;
  @Prop() modal!: boolean; //控制弹框显隐
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  // 取消的时候将表单值置位空
  onCancel() {
    this.toggle(false);
    (this.$refs["detailForm"] as any).resetFields();
  }
  mounted() {}
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
