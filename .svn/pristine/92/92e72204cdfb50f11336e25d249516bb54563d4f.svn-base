<template>
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="仓库名称:" prop="ckmc">
        <el-input v-model="formParams.ckmc" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="行政区域:" prop="xzqy">
        <el-cascader
          v-model="formParams.xzqy"
          :options="areaOptions"
          :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
          style="width:100%;"
          size="small"
          placeholder="行政区域"
          clearable
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="所在地:">
        <el-input v-model="formParams.szd" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="负责人:">
        <el-input v-model="formParams.fzr" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="电话:">
        <el-input v-model="formParams.tel" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="备注:">
        <suc-input v-model="formParams.nt" style="width:100%;" placeholder="请输入" type="textarea" :autosize="{ minRows: 5, maxRows: 5 }"></suc-input>
      </el-form-item>

      <slot name="map">
        <el-form-item label="经纬度">
          <suc-input
            style="width: 100%"
            v-model="formParams.location"
            placeholder="在地图中点击显示经纬度，或输入经度,纬度"
            @on-change="getcoord"
            :disabled="title == '新增' ? false : true"
          ></suc-input>
        </el-form-item>
        <el-form-item>
          <div style="width:100%;height:259px" v-if="model">
            <template>
              <suc-map ref="mapObject" :options="olMap.map" v-bind.sync="olMap.map.view" @singleclick-blank="clickBlank">
                <template>
                  <ol-layer v-for="(layer, index) in olMap.baseLayer" :options="layer" :key="'layer' + index"> </ol-layer>
                </template>
                <ol-markers>
                  <ol-marker v-for="(marker, index) in markers" :options="marker" :key="'marker' + index"></ol-marker>
                </ol-markers>
              </suc-map>
            </template>
          </div>
        </el-form-item>
      </slot>
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
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker } from "@suc/ui";
import { DatePickerOptions } from "@suc/ui/interfaces";
import { infoApi, publicApi } from "@/api";
import { coordinateTransform } from "@suc/monch";
import dayjs from "dayjs";
const mapStore = namespace("mapStore");
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
export default class CreatePolluters1 extends Vue {
  olMap = this.$getMapConfig();
  dateOptions: any = {
    type: "date",
  };
  areaOptions: any = [];

  rules = {
    ckmc: [
      { required: true, message: "请输入模板名称", trigger: "blur" },
      // { max: 20, message: "编码长度不能超过20位" },
    ],
    xzqy: [{required: true, message: "请选择行政区域名称", trigger: "change" }],
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
  // 取消的时候将表单值置位空
  onCancel() {
    this.toggle(false);
    (this.$refs["yinjForm"] as any).resetFields();
  }

  handleChange(val: any) {
    this.formParams.xzqy = val.toString();
  }
  mounted() {
    this.getAreaCode(); //获取所属区域
    // this.getMap();
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

  markers: any[] = [];

  // 点击地图获取经纬度
  clickBlank(info: any) {
    this.markers = [];
    this.formParams.location = info.coords[0] && info.coords[1] ? info.coords[0] + "," + info.coords[1] : "";
    this.formParams.lon = info.coords[0];
    this.formParams.lat = info.coords[1];

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

    this.formParams.jd = lon;
    this.formParams.wd = lat;
    this.getLocation([lon, lat]);
  }
  @Watch("formParams", { immediate: true, deep: true })
  getMap() {
    this.markers = [];
    if (this.formParams.location != undefined) {
      let arr = this.formParams.location.split(",");
      let lon = arr[0];
      let lat = arr[1];
      this.markers.push({
        lon,
        lat,
      });
      this.getLocation([lon, lat]);
    } 
  }
  //地图定位
  getLocation(coords: any) {
    const mapRoot: any = this.$refs.mapObject;
    const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
    mapRoot.$view.animate({
      center: tranPosN,
      zoom: 18,
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
