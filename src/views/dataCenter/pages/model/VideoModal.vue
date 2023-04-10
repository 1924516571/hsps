<template>
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="站点编号" prop="zdbh">
        <!-- :readonly="true" -->
        <el-input v-model="formParams.zdbh" :disabled="title == '新增' ? false : true"></el-input>
      </el-form-item>
      <el-form-item label="视频点名称">
        <el-input v-model="formParams.spdmc"></el-input>
      </el-form-item>
      <el-form-item label="视频来源">
        <el-input v-model="formParams.sply"></el-input>
      </el-form-item>
      <el-form-item label="视频类别">
        <el-input v-model="formParams.splb"></el-input>
      </el-form-item>
      <el-form-item label="app播放地址">
        <el-input v-model="formParams.appurl"></el-input>
      </el-form-item>
      <el-form-item label="视频点位置">
        <el-input v-model="formParams.spdwz"></el-input>
      </el-form-item>
      <el-form-item label="是否为公安视频">
        <el-radio-group v-model="formParams.gongan">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formParams.nt"  :rows="10" placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect } from "@suc/ui";
import { infoApi } from "@/api";
const mapStore = namespace("mapStore");
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
  },
})
export default class CreatePolluters1 extends Vue {
  @Prop() areaOptions!: any;
  olMap = this.$getMapConfig();
  rules = {
    zdbh: [{ required: true, message: "请输入站点编号", trigger: "blur" }],
  };
  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle(val: boolean) {
    return val;
  }

  onOk() {
    (this.$refs["yinjForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
      } else {
        return false;
      }
    });
  }
  onCancel() {
    this.toggle(false);
    (this.$refs["yinjForm"] as any).resetFields();
  }
  async handleChange(value: any) {
    this.formParams.azqy = value.toString();
  }

  markers: any[] = [];
  // 点击地图获取经纬度
  clickBlank(info: any) {
    this.markers = [];
    this.formParams.location = info.coords[0] && info.coords[1] ? info.coords[0] + "," + info.coords[1] : "";
    this.formParams.lgtd = info.coords[0];
    this.formParams.lttd = info.coords[1];

    if (info.coords[0] && info.coords[1]) {
      this.markers.push({ lon: info.coords[0], lat: info.coords[1] });
    }
  }
  getcoord(e: any) {
    this.markers = [];
    let value = e.target.value;
    let lon = value.split(",")[0];
    let lat = value.split(",")[1];
    if (lon && lat) {
      this.markers.push({ lon: lon, lat: lat });
    }
  }
}
</script>
<style lang="scss" scoped>
// $deep:"::v-deep";
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
      height: 600px;
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
