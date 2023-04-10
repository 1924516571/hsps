<template>
  <!-- 塘坝弹框-->
  <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="塘坝编码" prop="dmcd">
        <el-input v-model="formParams.dmcd" :disabled="title == '新增' ? false : true"></el-input>
      </el-form-item>
      <el-form-item label="塘坝名称" prop="dmnm">
        <el-input v-model="formParams.dmnm"></el-input>
      </el-form-item>

      <el-form-item label="行政区域" prop="czqy">
        <el-cascader
          v-model="formParams.czqy"
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
      <slot name="map">
        <el-form-item label="经纬度">
          <suc-input style="width: 100%" v-model="formParams.location" @on-change="getcoord" placeholder="在地图上点击显示经纬度，或输入经度和纬度"></suc-input>
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
      <el-form-item label="塘坝概况">
        <el-input type="textarea" v-model="formParams.gk" placeholder="请输入内容" style="width:300px;" :rows="5"></el-input>
      </el-form-item>
      
      <el-form-item label="备注">
        <el-input type="textarea" v-model="formParams.bz" placeholder="请输入内容" style="width:300px;" :rows="5"></el-input>
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
import { infoApi, publicApi } from "@/api";
import { coordinateTransform } from "@suc/monch";
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
  // @mapStore.State olMap: any
  // 接收父组件传过来的值
  @Prop() chuan!: any;
  olMap = this.$getMapConfig();
  rules = {
    dmcd: [
      { required: true, message: "请输入塘坝编码", trigger: "blur" },
      { min: 0, max: 12, message: "长度在12个字符", trigger: "blur" },
    ],
    dmnm: [{ required: true, message: "请输入塘坝名称", trigger: "blur" }],
    // 穿梭框验证规则
    czqy: [{ required: true, message: "请选择区域", trigger: "change" }],
  };

  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  areaOptions: any = []; //行政区域数据

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
    this.formParams.czqy = value.toString();
  }

  // 行政区域
  mounted() {
    this.getAreaCode(); //获取行政区域
    this.olMap.map.view.center.coord = [119.9395121120892, 31.703167754790485];
    console.log("23232");
    this.getLocation([119.9395121120892, 31.703167754790485]);
    console.log("-----2>",this.olMap);
  }

  //获取行政区域下拉框值
  async getAreaCode() {
    let data = await infoApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]); //放入数组是为了保持定义的变量数据结构一直性不然会报警告
  }
  // 处理后台返回的childer:[]
  getTreeData(data: any) {
    // 循环遍历json数据
    for (var i = 0; i < data.length; i++) {
      if (data[i].children.length < 1) {
        // children若为空数组，则将children设为undefined
        data[i].children = undefined;
      } else {
        // children若不为空数组，则继续 递归调用 本方法
        this.getTreeData(data[i].children);
      }
    }
    return data;
  }
  markers: any[] = [];

  // 点击地图获取经纬度
  clickBlank(info: any) {
    this.markers = [];
    this.formParams.lon = info.coords[0]; //经度
    this.formParams.lat = info.coords[1]; //纬度
    this.formParams.location = info.coords[0] && info.coords[1] ? info.coords[0] + "," + info.coords[1] : "";
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
    this.getLocation([lon, lat]);
  }
  @Watch("formParams.location", { immediate: true, deep: true })
  getMap() {
    this.markers = [];
    if (this.formParams.lon != undefined && this.formParams.lat !=undefined ) {
      let lon = this.formParams.lon;
      let lat = this.formParams.lat;
      this.markers.push({
        lon,
        lat,
      });
      this.formParams.location = lon + "," + lat;
      this.getLocation([lon, lat]);
    } else {
      console.log("[[[[");
      this.olMap.map.view.center.coord = [119.9395121120892, 31.703167754790485];
      this.getLocation([119.9395121120892, 31.703167754790485]);
    }
  }
  //地图定位
  async getLocation(coords: any) {
    // const maps: any = this.$refs.maps;
    const mapRoot: any = this.$refs.mapObject;
    console.log(mapRoot, "pppp");

    const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
    mapRoot.$view.animate({
      center: tranPosN,
      zoom: 18,
    });
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
  .el-upload-list .el-upload-list--minIoFileList {
    .el-upload-list__item {
      width: 300px;
    }
  }
}
</style>
