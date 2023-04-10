<template>
  <!-- 污水泵站弹框-->
  <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="水闸编码" prop="gateCd">
        <el-input v-model="formParams.gateCd" :disabled="title == '新增' ? false : true"></el-input>
      </el-form-item>
      <el-form-item label="水闸名称" prop="gateNm">
        <el-input v-model="formParams.gateNm"></el-input>
      </el-form-item>
      <el-form-item label="行政区域" prop="areaCode">
        <el-cascader
          v-model="formParams.xzqq"
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
      <el-form-item label="水闸类别">
        <el-input v-model="formParams.szlb"></el-input>
      </el-form-item>
      <el-form-item label="所在流域">
        <el-input v-model="formParams.szly"></el-input>
      </el-form-item>
      <el-form-item label="工程状态">
        <el-input v-model="formParams.gczt"></el-input>
      </el-form-item>
      <el-form-item label="河流名称">
        <suc-select v-model="formParams.szhl" :options="chuan" :config="{ placeholder: '河流名称', clearable: true }" style="width:100%"> </suc-select>
      </el-form-item>
      <el-form-item label="主要建筑类别">
        <el-input v-model="formParams.jzlb"></el-input>
      </el-form-item>
      <el-form-item label="最大过闸流量">
        <el-input v-model="formParams.zdgzll"></el-input>
      </el-form-item>
      <el-form-item label="管理单位">
        <el-input v-model="formParams.gldw"></el-input>
      </el-form-item>
      <el-form-item label="主管单位">
        <el-input v-model="formParams.zgdw"></el-input>
      </el-form-item>
      <el-form-item label="归属部门">
        <el-input v-model="formParams.gsbm"></el-input>
      </el-form-item>
      <el-form-item label="所在地">
        <el-input v-model="formParams.loc"></el-input>
      </el-form-item>
      <el-form-item label="工程规模">
        <el-input v-model="formParams.projScal"></el-input>
      </el-form-item>
      <el-form-item label="闸孔数量">
        <el-input v-model="formParams.gateHoleNum"></el-input>
      </el-form-item>
      <el-form-item label="闸孔总净宽">
        <el-input v-model="formParams.gateTw"></el-input>
      </el-form-item>
      <el-form-item label="设计过闸流量">
        <el-input v-model="formParams.desGateQ"></el-input>
      </el-form-item>

      <el-form-item label="水闸概况">
        <el-input type="textarea" v-model="formParams.gk" placeholder="请输入内容" style="width:300px;" :rows="5"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" v-model="formParams.nt" placeholder="请输入内容" style="width:300px;" :rows="5"></el-input>
      </el-form-item>

      <slot name="map">
        <el-form-item label="经纬度">
          <suc-input style="width: 100%" v-model="formParams.location"  placeholder="在地图中点击显示经纬度，或输入经度,纬度" @on-change="getcoord" :disabled="title == '新增' ? false : true"></suc-input>
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
import { LoadingCom } from "@/components";
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
    LoadingCom,
  },
})
export default class CreatePolluters1 extends Vue {
  // @mapStore.State olMap: any
  // 接收父组件传过来的值
  @Prop() chuan!: any;
  olMap = this.$getMapConfig();
  rules = {
    gateCd: [
      { required: true, message: "请输入泵站编码", trigger: "blur" },
      { min: 0, max: 12, message: "长度在12个字符", trigger: "blur" },
    ],
    gateNm: [{ required: true, message: "请输入泵站名称", trigger: "blur" }],
    // warningSw: [{ required: true, message: "请输入警戒水位", trigger: "blur" }],
    // 穿梭框验证规则
    // areaCode: [{ required: true, message: "请选择区域", trigger: "change" }],
    // manholeDepth: [{ type: "number", message: "窨井必须为数字值", tigger: "blur" }],
    // waterDepth: [{ type: "number", message: "水深必须为数值", tigger: "blur" }],
  };
  // @Prop() dialogVisible!: boolean;    //测试

  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  areaOptions: any = []; //行政区域数据
  riverLevelData: any = []; //河道等级数据

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
    this.formParams.xzqq = value.toString();
  }

  // 行政区域
  mounted() {
    this.getAreaCode(); //获取行政区域
    // this.getRiverGrade(); //河流等级
    this.olMap.map.view.center.coord = [120.27869688218249, 31.685617674794585];
  }

  // 获取河流等级
  async getRiverGrade() {
    let url = "wjServer/dataCenter/baseinfo/riverinfo/getRiverGrade";
    let { data } = await infoApi.getRiverGrade({}, url);
    this.riverLevelData = data
      ? data.map((e: any) => {
          return {
            value: e.code,
            label: e.level,
          };
        })
      : [];
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
    // const maps: any = this.$refs.maps;
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
