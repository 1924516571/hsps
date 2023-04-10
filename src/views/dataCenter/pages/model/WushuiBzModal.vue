<template>
  <!-- 污水泵站弹框-->
  <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="泵站编码" prop="bzbm">
        <el-input v-model="formParams.bzbm" :disabled="title == '新增' ? false : true"></el-input>
      </el-form-item>
      <el-form-item label="泵站名称" prop="bzmc">
        <el-input v-model="formParams.bzmc"></el-input>
      </el-form-item>
      <el-form-item label="警戒水位" prop="jjsw">
        <el-input v-model.number="formParams.jjsw" type="number"></el-input>
      </el-form-item>
      <el-form-item label="行政区域" prop="xzqy">
        <el-cascader
          v-model="formParams.xzqy"
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
      <el-form-item label="甲烷预定值" prop="jwydz">
        <el-input v-model.number="formParams.jwydz" type="number"></el-input>
      </el-form-item>
      <el-form-item label="硫化氢预定值" prop="lhqydz">
        <el-input v-model.number="formParams.lhqydz" type="number"></el-input>
      </el-form-item>

      <el-form-item label="地址">
        <el-input v-model="formParams.address"></el-input>
      </el-form-item>
      <el-form-item label="装机流量">
        <el-input v-model.number="formParams.zjll" type="number"></el-input>
      </el-form-item>

      <el-form-item label="设计扬程">
        <el-input v-model.number="formParams.sjyc" type="number"></el-input>
      </el-form-item>
      <el-form-item label="水泵数量">
        <el-input v-model.number="formParams.sbsl" type="number"></el-input>
      </el-form-item>
      <el-form-item label="水闸数量">
        <el-input v-model.number="formParams.szsl" type="number"></el-input>
      </el-form-item>
      <el-form-item label="栅格数量">
        <el-input v-model.number="formParams.sgsl" type="number"></el-input>
      </el-form-item>
      <el-form-item label="管理单位">
        <el-input v-model="formParams.gldw"></el-input>
      </el-form-item>
      <el-form-item label="泵站概况">
        <el-input type="textarea" v-model="formParams.bzgk" placeholder="请输入内容" style="width:300px;" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="泵站图片" prop="imgPath1">
        <el-upload
          class="upload-demo"
          :on-success="PicSuccess"
          action="api/wjBaseServer/minio/file/upload"
          :on-remove="handleRemove"
          :on-preview="handlePreview"
          :before-upload="beforeUpload"
          :on-exceed="handleExceed"
          :file-list="formParams.imgList"
          list-type="minIoFileList"
          accept=".jpg, .jpeg, .png, .JPG, .JPEG,"
          :limit="2"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="formParams.bz" placeholder="请输入内容" style="width:300px;" :rows="5"></el-input>
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
    bzbm: [
      { required: true, message: "请输入泵站编码", trigger: "blur" },
      { min: 0, max: 12, message: "长度在12个字符", trigger: "blur" },
    ],
    bzmc: [{ required: true, message: "请输入泵站名称", trigger: "blur" }],
    jjsw: [{ required: true, message: "请输入警戒水位", trigger: "blur" }],
    // 穿梭框验证规则
    xzqy: [{ required: true, message: "请选择区域", trigger: "change" }],
    // jwydz: [{ required: true, message: "请输入甲烷预定值", trigger: "blur" }],
    // lhqydz: [{ required: true, message: "请输入硫化氢预定值", trigger: "blur" }],
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
    this.formParams.xzqy = value.toString();
  }

  // 行政区域
  mounted() {
    this.getAreaCode(); //获取行政区域
    this.olMap.map.view.center.coord = [119.9395121120892, 31.703167754790485];
    console.log("23232");
    this.getLocation([119.9395121120892, 31.703167754790485]);
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

  //  图片大小限制
  async beforeUpload(file: any) {
    let types = ["image/jpeg", "image/jpg", "image/png"];
    const isImage = types.includes(file.type);
    if (!isImage) {
      this.$message.error("上传图片只能是 JPG、JPEG、PNG 格式!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5; //这里做文件大小限制
    if (!isLt2M) {
      this.$message.error("上传图片大小不能超过5MB!");
      return isLt2M;
    }
  }

  //限制上传图片的数量
  handleExceed(files: any) {
    this.$message.warning("最多选择两张图片");
  }
  handlePreview(file: any) {
    const Imgurl = file.response.data.previewUrl;
    window.open(Imgurl);
  }

  PicSuccess(file: any) {
    this.formParams.minIoFileList.push({ fileName: file.data.object, fileId: file.data.fileId, fileType: file.data.fileType, oldName: file.data.oldName });
  }

  async handleRemove(file: any, fileList: any) {
    var id = file.response.data.fileId;
    this.formParams.minIoFileList = this.formParams.minIoFileList.filter((item: any) => item.fileId != id);
  }

  markers: any[] = [];

  // 点击地图获取经纬度
  clickBlank(info: any) {
    this.markers = [];
    // this.formParams["deviceVo.jd"] = info.coords[0];
    // this.formParams["deviceVo.wd"] = info.coords[1];
    // this.formParams.jd = info.coords[0];
    // this.formParams.wd = info.coords[1];
    // this.formParams.coord = info.coord
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
    // this.formParams["deviceVo.jd"] = lon;
    // this.formParams["deviceVo.wd"] = lat;
    // this.formParams.jd = lon;
    // this.formParams.wd = lat;
    this.getLocation([lon, lat]);
  }
  @Watch("formParams.location", { immediate: true, deep: true })
  // getMap() {
  //   this.markers = [];
  //   let lon = this.formParams.lon;
  //   let lat = this.formParams.lat;
  //   if ((this.formParams.location = "")) {
  //     this.markers.push({
  //       lon,
  //       lat,
  //     });
  //   } else {
  //     this.olMap.map.view.center.coord = [119.9395121120892, 31.703167754790485];
  //     this.getLocation([119.9395121120892, 31.703167754790485]);
  //   }
  // }
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
      // this.olMap.baseLayer = [119.9395121120892, 31.703167754790485];
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
