<template>
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="抢险队伍名称:" prop="name">
        <el-input v-model="formParams.name" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="抢险机构性质:" prop="comtype">
        <suc-select v-model="formParams.comtype" :options="organizeData" :config="{ placeholder: '机构性质', clearable: true }" style="width:100%"></suc-select>
        <!-- <el-select v-model="formParams.comtype" placeholder="机构性质" clearable style="width:100%">
           <el-option
             v-for="item in organizeData"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select> -->
      </el-form-item>

      <el-form-item label="抢险性质:" prop="type">
        <suc-select v-model="formParams.type" :options="qxxzData" :config="{ placeholder: '抢险性质', clearable: true }" style="width:100%"></suc-select>
      </el-form-item>

      <el-form-item label="机构编制人数:">
        <el-input v-model.number="formParams.limitnum" type="number" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="现有人数:" prop="nownum">
        <el-input v-model.number="formParams.nownum" type="number" placeholder="请输入"></el-input>
      </el-form-item>
      <!-- prop="areacode" -->
      <el-form-item label="行政区域:">
        <el-cascader
          v-model="formParams.areacode"
          :options="areaOptions"
          :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
          style="width:100%;"
          size="small"
          placeholder="行政区域"
          clearable
          @change="handleChange"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="详细地址:">
        <el-input v-model="formParams.address" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="负责人电话:" prop="tel">
        <el-input v-model="formParams.tel" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="上报人:">
        <el-input v-model="user.realname" disabled placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="填报时间:">
        <suc-date-picker v-model="formParams.reporttime" :options="dateOptions"></suc-date-picker>
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
  user: any = JSON.parse(localStorage.getItem("userInfo") || "");
  areaOptions: any = [];
  organizeData: any = []; //抢险机构性质
  qxxzData: any = []; //抢险性质

  // 检验
  validatenumdw: any = (rule: any, value: any, callback: any) => {
    // if (value === "" || value === null) {
    //   callback();
    // } else {
    //   if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
    //     callback(new Error("请输入正确的手机号码"));
    //   } else {
    //     callback();
    //   }
    // }
    let reg = /^1[345789]\d{9}$/;
    if (!reg.test(value)) {
      callback(new Error("请输入11为手机号"));
    } else {
      callback();
    }
  };

  rules = {
    name: [
      { required: true, message: "请输入名称", trigger: "blur" },
      { max: 20, message: "编码长度不能超过20位" },
    ],
    comtype: [{ required: true, message: "请选择机构性质", trigger: "change" }],
    type: [{ required: true, message: "请选择机构性质", trigger: "change" }],
    nownum: [{ required: true, message: "请输入人数", trigger: "blur" }],
    // areacode: [{ required: true, message: "请选择行政区域名称", trigger: "change" }],
    tel: [{ required: true, trigger: "blur", message: "请填写正确的手机号", validator: this.validatenumdw }],
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
        this.formParams.reporter = localStorage.getItem("userId");
        this.formParams.reporttime = dayjs(this.formParams.reporttime).format("YYYY-MM-DD"); //关键地方
        // this.formParams.areacode = this.formParams.areacode.toString(); //更新讲
        if (this.formParams.areacode != undefined) {
          console.log(this.formParams.areacode, "[[[");

          this.formParams.areacode = this.formParams.areacode.toString();
        }
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
    if (val != undefined) {
      this.formParams.areacode = val.toString();
    } else {
      this.formParams.areacode = "";
    }
  }
  mounted() {
    this.getAreaCode(); //获取所属区域
    this.getOrganizeData(); //获取机构性质
    this.getqxxzData(); //获取抢险性质
  }

  async getOrganizeData() {
    const url = "wjServer/dataCenter/fxdw/jgType";
    const data = await publicApi.getNoParam(url);
    this.organizeData = data.data.map((e: any) => {
      return {
        value: e.codeMyid,
        label: e.name,
      };
    });
  }
  // 抢险性质
  async getqxxzData() {
    const url = "wjServer/dataCenter/fxdw/type";
    const data = await publicApi.getNoParam(url);
    this.qxxzData = data.data.map((e: any) => {
      return {
        value: e.codeMyid,
        label: e.name,
      };
    });
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
