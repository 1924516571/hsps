<template>
  <!-- 河道弹框新增组件-->
  <el-dialog :title="title" :visible.sync="model" close-on-click-modal:false :before-close="onCancel" v-if="model">
    <el-form :model="formParams" :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="河湖编码" prop="rvCd">
        <el-input v-model="formParams.rvCd" :disabled="title == '新增' ? false : true"></el-input>
      </el-form-item>
      <el-form-item label="河湖名称" prop="rvNm">
        <el-input v-model="formParams.rvNm"></el-input>
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
      <el-form-item label="河湖级别" prop="hhjb">
        <suc-select v-model="formParams.hhjb" :options="chuan" :config="{ placeholder: '河流等级', clearable: true }" style="width:100%"> </suc-select>
      </el-form-item>

      <!-- <el-form-item label="河流长度(km)" prop="rvLen">
          <el-input v-model.number="formParams.rvLen" type="number"></el-input>
        </el-form-item> -->
      <el-form-item label="所属流域">
        <el-input v-model="formParams.ssly"></el-input>
      </el-form-item>
      <el-form-item label="所在水系">
        <el-input v-model="formParams.szsx"></el-input>
      </el-form-item>

      <el-form-item label="报警水位">
        <el-input v-model="formParams.bjsw"></el-input>
      </el-form-item>
      <el-form-item label="警戒水位">
        <el-input v-model="formParams.jjsw"></el-input>
      </el-form-item>
      <el-form-item label="受淹值(m)">
        <el-input v-model="formParams.syz"></el-input>
      </el-form-item>
      <el-form-item label="水面面积">
        <el-input v-model="formParams.smmj"></el-input>
      </el-form-item>
      <el-form-item label="盐淡水属性" prop="ydssx">
        <!-- <el-input v-model="formParams.smmj"></el-input> -->
        <suc-select v-model="formParams.ydssx" :options="ydssxData" :config="{ placeholder: '淡水属性', clearable: true }" style="width:100%"> </suc-select>
      </el-form-item>
      <el-form-item label="平均水深" prop="pjss">
        <el-input v-model="formParams.pjss"></el-input>
      </el-form-item>
      <el-form-item label="最大水深" prop="zdss">
        <el-input v-model="formParams.zdss"></el-input>
      </el-form-item>
      <el-form-item label="湖泊容积">
        <el-input v-model="formParams.hprj"></el-input>
      </el-form-item>
      <el-form-item label="河道级别">
        <el-input v-model="formParams.hdjb"></el-input>
      </el-form-item>
      <el-form-item label="河道长度(km)" prop="hlcd">
        <el-input v-model="formParams.hlcd"></el-input>
      </el-form-item>
      <el-form-item label="工程产权归属">
        <el-input v-model="formParams.gccqgs"></el-input>
      </el-form-item>
      <el-form-item label="上级河道名称">
        <el-input v-model="formParams.sjhd"></el-input>
      </el-form-item>
      <el-form-item label="下级河道名称">
        <el-input v-model="formParams.xjhd"></el-input>
      </el-form-item>
      <el-form-item label="生态河道">
        <el-input v-model="formParams.sthd"></el-input>
      </el-form-item>
      <el-form-item label="跨界类型">
        <el-input v-model="formParams.kjlx"></el-input>
      </el-form-item>
      <el-form-item label="规划标准断面(m)" prop="ssly">
        <!-- <el-input v-model.number="formParams.dmdgc" placeholder="底程高" type="number"></el-input> -->
        <el-input v-model.number="formParams.hkkd" placeholder="河口宽度" type="number"></el-input>
        <el-input v-model.number="formParams.hdkd" placeholder="河底宽度" type="number"></el-input>
      </el-form-item>
      <el-form-item label="保护控制范围(m)" prop="bhkzfwz">
        <el-input v-model.number="formParams.bhkzfwzc" placeholder="左侧" type="number"></el-input>
        <el-input v-model.number="formParams.bhkzfwyc" placeholder="右侧" type="number"></el-input>
      </el-form-item>
      <el-form-item label="流域面积(km²)" prop="lymj">
        <el-input v-model.number="formParams.lymj" type="number"></el-input>
      </el-form-item>
      <el-form-item label="河源位置">
        <el-input v-model="formParams.hywz"></el-input>
      </el-form-item>
      <el-form-item label="河口位置">
        <el-input v-model="formParams.hkwz"></el-input>
      </el-form-item>
      <el-form-item label="河道图片">
        <el-upload
          class="upload-demo"
          :on-success="PicSuccess"
          action="api/wjBaseServer/minio/file/upload"
          :on-remove="handleRemove"
          :on-preview="handlePreview"
          :before-upload="beforeUpload"
          :on-exceed="handleExceed"
          :file-list="formParams.imgList"
          list-type="picture"
          accept=".jpg, .jpeg, .png, .JPG, .JPEG,"
          :size="small"
          :limit="2"
        >
          <el-button class="upload_btn" size="small" type="primary"><span class="iconfont icon-shangchuan"></span>点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过5MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" prop="bz">
        <el-input type="textarea" v-model="formParams.bz" placeholder="请输入内容" style="width:300px;" :rows="5"></el-input>
      </el-form-item>
      <!-- <el-form-item label="窨井视频" prop="videoPath">
        <el-upload
          class="upload-demo"
          auto-upload:false
          :on-success="VidSuccess"
          action="api/dataCenter/file/upload"
          :on-remove="handleRemove1"
          show-file-list:true
          accept=".flv, .swf, .ogg, .webm, .mpeg4,.mp4,.avi,.mov,.rmvb,.rm,.3gp"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>  -->
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
    rvCd: [
      { required: true, message: "请输入河道编码", trigger: "blur" },
      { min: 0, max: 12, message: "长度在12个字符", trigger: "blur" },
    ],
    rvNm: [{ required: true, message: "请输入河道名称", trigger: "blur" }],
    // 穿梭框验证规则
    // xzqy: [{ required: true, message: "请选择区域", trigger: "change" }],
    // manholeDepth: [{ type: "number", message: "窨井必须为数字值", tigger: "blur" }],
    // waterDepth: [{ type: "number", message: "水深必须为数值", tigger: "blur" }],
  };
  // @Prop() dialogVisible!: boolean;    //测试

  @Prop() title: string|undefined; //  父组件传子组件的值
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  // formParams!: any; //新增接口需要的参数
  @Prop()
  formParams!: any;
  areaOptions: any = []; //行政区域数据
  riverLevelData: any = []; //河道等级数据
  ydssxData:any = [
     {value:"淡水",label:"淡水"},
     {value:"咸水",label:"咸水"},

  ]; //盐淡水数据

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
    //  this.getYds();
    // this.getRiverGrade(); //河流等级
  }

  // 获取河流等级
  // async getRiverGrade() {
  //   let url = "wjServer/dataCenter/baseinfo/riverinfo/getRiverGrade";
  //   let { data } = await infoApi.getRiverGrade({}, url);
  //   this.riverLevelData = data
  //     ? data.map((e: any) => {
  //         return {
  //           value: e.code,
  //           label: e.level,
  //         };
  //       })
  //     : [];
  // }

  async getAreaCode() {
    let data = await infoApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]); //放入数组是为了保持定义的变量数据结构一直性不然会报警告
  }

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

  // async getYds(){
      
  // }

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

  PicSuccess(file: any) {
    this.formParams.minIoFileList.push({ fileName: file.data.object, fileId: file.data.fileId, fileType: file.data.fileType, oldName: file.data.oldName });
  }

  // VidSuccess(file: any) {
  //   this.formParams.videoPath = file.data.url;
  // }
  handlePreview(file: any) {
    const Imgurl = file.response.data.previewUrl;
    window.open(Imgurl);
  }

  handleRemove(file: any, fileList: any) {
    var id: any = "";
    if (file.response.data.fileId) {
      id = file.response.data.fileId;
    } else {
      id = file.uid;
    }
    this.formParams.minIoFileList = this.formParams.minIoFileList.filter((item: any) => item.fileId != id);
  }

  // async handleRemove1() {
  //   this.formParams.videoPath = "";
  // }

  // @Watch("formParams.id", { immediate: true })

  markers: any[] = [];

  // 点击地图获取经纬度
  clickBlank(info: any) {
    this.markers = [];
    // this.formParams["deviceVo.jd"] = info.coords[0];
    // this.formParams["deviceVo.wd"] = info.coords[1];
    // this.formParams.jd = info.coords[0];
    // this.formParams.wd = info.coords[1];
    // this.formParams.coord = info.coord
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
    // this.getLocation([lon, lat]);
  }
  //   @Watch("formParams", { immediate: true, deep: true })
  //   getMap() {
  //     this.markers = [];
  //     if (this.formParams.location != undefined) {
  //       let arr = this.formParams.location.split(",");
  //       let lon = arr[0];
  //       let lat = arr[1];
  //       this.markers.push({
  //         lon,
  //         lat,
  //       });
  //     //   this.getLocation([lon, lat]);
  //     }
  //   }
  //地图定位
  //   getLocation(coords: any) {
  //     // const maps: any = this.$refs.maps;
  //     const mapRoot: any = this.$refs.mapObject;
  //     const tranPosN = coordinateTransform(coords, "EPSG:4326", "EPSG:3857");
  //     mapRoot.$view.animate({
  //       center: tranPosN,
  //       zoom: 18,
  //     });
  //   }
}
</script>
<style lang="scss" scoped>
$deep:"::v-deep";
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
