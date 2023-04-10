<template>
  <div>
    <el-dialog :append-to-body="true" title="详情" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
      <el-form :model="formParams" ref="detailForm" label-width="auto" size="small">
        <el-descriptions style="margin-bottom:40px" class="margin-top" title="基础信息" :column="2" size="medium" border :labelStyle="labelStyle">
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              巡查人
            </template>
            {{ formParams.xcUser }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              巡查类型
            </template>
            {{ formParams.xcType }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              问题数量
            </template>
            {{ formParams.problemNum }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-school"></i>
              巡查小区
            </template>
            {{ formParams.xcxq }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-time"></i>
              巡查开始日期
            </template>
            {{ formParams.startTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-time"></i>
              巡查结束日期
            </template>
            {{ formParams.endTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-timer"></i>
              巡查时间(min)
            </template>
            {{ formParams.useTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-coin"></i>
              巡查距离
            </template>
            {{ formParams.distance }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-house"></i>
              巡查区域/对象
            </template>
            {{ formParams.xcqy }}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions
          v-for="(item, index) in formParams.problemList"
          :key="index"
          style="margin-bottom:40px"
          class="margin-top"
          :title="'问题记录' + `${index + 1}`"
          :column="2"
          border
          :labelStyle="labelStyle"
        >
          <el-descriptions-item>
            <template slot="label">
              问题描述
            </template>
            {{ item.problemDesc }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              处理方式
            </template>
            {{ item.handleType }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              问题照片
            </template>
            <el-image style="width: 60px; height: 50px" :src="item.minIoFileList != '' ? item.minIoFileList[0] : null" :preview-src-list="item.minIoFileList">
              <div slot="error" class="image-slot" style="position: absolute;top:17px;color:#ccc ;">
                暂无照片
              </div>
            </el-image>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              处理照片
            </template>
            <el-image
              style="width: 60px; height: 50px"
              :src="item.handleImgList != '' ? item.handleImgList[0] : null"
              :preview-src-list="item.handleImgList != '' ? item.handleImgList : null"
            >
            <div slot="error" style="position: absolute;top:17px;color:#ccc ;">
                暂无照片
              </div>
            </el-image>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              处理措施
            </template>
            {{ item.handleMeasure }}
          </el-descriptions-item>
        </el-descriptions>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
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
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Prop() modal!: boolean; //控制弹框显隐
  srcList: any = ["https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg", "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"];
  url: string = this.srcList[0];
  labelStyle: any = {
    width: "150px",
  };
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
      height: 550px;
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
