<template>
  <!-- 排涝闸站弹框-->
  <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="闸站名称:" prop="name">
        <suc-input v-model="formParams.name" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <!-- <el-form-item label="行政区域:" prop="area">
        <el-cascader
          v-model="formParams.area"
          :options="areaOptions"
          :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
          style="width:100%;"
          size="small"
          placeholder="行政区域"
          clearable
          @change="handleChange"
        ></el-cascader>
      </el-form-item> -->
      <el-form-item label="产权归属:">
        <suc-input v-model="formParams.belong" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="工程管理主体:">
        <suc-input v-model="formParams.mngsub" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="工程管护主体:">
        <suc-input v-model="formParams.protectsub" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="属地管理主体:">
        <suc-input v-model="formParams.localmngsub" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="行业管理主体:">
        <suc-input v-model="formParams.busimngsub" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="管理等级:">
        <suc-input v-model="formParams.mnglevel" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="所在行政村:">
        <suc-input v-model="formParams.cun" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="所在圩区:">
        <suc-input v-model="formParams.polderareas" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="内河河道:">
        <suc-input v-model="formParams.insideriver" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="外河河道:">
        <suc-input v-model="formParams.outriver" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="工程样式:">
        <suc-input v-model="formParams.engtyype" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="堤防结合形式:">
        <suc-input v-model="formParams.combinetype" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="机泵数(台套):">
        <suc-input v-model="formParams.bengnum" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="水泵型号:">
        <suc-input v-model="formParams.bengversion" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="水泵供应商:">
        <suc-input v-model="formParams.bengsupplier" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="单泵流量(m³/s):">
        <suc-input v-model="formParams.bengq" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="总流量(m³/s)">
        <suc-input v-model="formParams.countq" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="电机类型">
        <suc-input v-model="formParams.motortype" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="电机供应商">
        <suc-input v-model="formParams.motorprovider" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>
      <el-form-item label="单机功率(kw)">
        <suc-input v-model="formParams.p" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="总功率(kw)">
        <suc-input v-model="formParams.countp" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="开机水位">
        <suc-input v-model="formParams.openz" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="关机水位">
        <suc-input v-model="formParams.colsez" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="闸孔数">
        <suc-input v-model="formParams.zhanum" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="单闸净宽">
        <suc-input v-model="formParams.width" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="闸总宽">
        <suc-input v-model="formParams.countwidth" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="闸门结构形式">
        <suc-input v-model="formParams.zhastru" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="启闭机形式">
        <suc-input v-model="formParams.hoisttype" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="闸顶高程(m)">
        <suc-input v-model="formParams.crestlevel" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="闸底高程(m)">
        <suc-input v-model="formParams.bedlevel" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="收益面积(亩)">
        <suc-input v-model="formParams.area" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="建设年份">
        <suc-input v-model="formParams.year" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="最近改造年份">
        <suc-input v-model="formParams.updateyear" style="width:100%;" placeholder="请输入" ></suc-input>
      </el-form-item>
      <el-form-item label="是否信息化（是/否）">
        <suc-input v-model="formParams.informatization" style="width:100%;" placeholder="请输入" ></suc-input>
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
import { ModalConfig } from "@suc/ui/interfaces";
import { SelectOptions } from "@suc/ui/interfaces";
import { infoApi, publicApi } from "@/api";
import { coordinateTransform } from "@suc/monch";
// import { LoadingCom } from "@/components";
// import { Form } from "element-ui";
import arrowPng from "@/assets/arrow.png";
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
    name: [{ required: true, message: "请输入闸站名称", trigger: "blur" }],
    // 穿梭框验证规则
  };

  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  // areaOptions: any = []; //行政区域数据

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
  // async handleChange(value: any) {
  //   this.formParams.czqy = value.toString();
  // }

  // 行政区域
  // mounted() {
  //   this.getAreaCode(); //获取行政区域
  //   this.olMap.map.view.center.coord = [119.9395121120892, 31.703167754790485];
  //   console.log("23232");
  //   this.getLocation([119.9395121120892, 31.703167754790485]);
  //   console.log("-----2>",this.olMap);
  // }

  // //获取行政区域下拉框值
  // async getAreaCode() {
  //   let data = await infoApi.getAreaCode();
  //   this.areaOptions = this.getTreeData([data.data]); //放入数组是为了保持定义的变量数据结构一直性不然会报警告
  // }
  // // 处理后台返回的childer:[]
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
