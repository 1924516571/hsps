<template>
  <div class="main-map">
    <suc-map ref="mapObject" :options="olMap.map" v-bind.sync="olMap.map.view" @singleclick="mapSingClick" @singleclick-blank="mapSingClick">
      <template v-if="flag == 'tdt'">
        <ol-layer v-for="(layer, index) in olMap.baseLayer" :options="layer" :key="'layer' + index"></ol-layer>
      </template>
      <slot name="yxt">
        <template v-if="flag == 'tdt2'">
          <ol-layer v-for="(layer, index) in olMap.tdt2" :options="layer" :key="'tdt2' + index"></ol-layer>
        </template>
      </slot>
      <slot name="heat"></slot>
      <slot name="heat2"></slot>
      <slot name="arealayer"></slot>
      <slot name="nearby"></slot>
      <slot name="track"></slot>
      <slot name="measure">
        <template v-if="measureshow || surfaceshow">
          <ol-measure :type="measureType" :trigger-new="again" @drawend="drawEnd" />
        </template>
      </slot>
      <!--防汛中雷达图，云图-->
      <slot name="fxYtLd"></slot>
      <!-- 海量点位 -->
      <ol-point-collection :points="markers" :z-index="5" name-over-label @singleclick="onmarkerClick">
        <slot name="markerlayer"></slot>
      </ol-point-collection>
    </suc-map>
    <slot name="tdt2">
      <div class="tdt-btn bg-shadow">
        <tab-active :btns="btns" @get-btn="getBtn" :activeIndex="activeIndex"></tab-active>
      </div>
    </slot>
    <slot name="tool-btn">
      <div class="measure-btn">
        <div class="measure-item" @click="onMeasure">
          <span>{{ measureshow ? "退出" : "测距" }}</span>
        </div>
        <div class="measure-item" @click="onSurface">
          <span>{{ surfaceshow ? "退出" : "测面" }}</span>
        </div>
        <button class="measure-item" id="export-pdf" @click="onexport">
          导出PDF
        </button>
      </div>
    </slot>
    <slot name="coordinate">
      <div class="point-info bg-shadow">
        <div>
          <span>坐标信息：</span>
        </div>
        <div>
          <span>{{ pointerInfos.coords }}</span>
        </div>
      </div>
    </slot>
  </div>
</template>
<script lang="ts">
import arrowPng from "@/assets/arrow.png";
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { olData } from "@suc/monch";
import { jsPDF } from "jspdf";
import TabActive from "./TabActive.vue";
// import { overview } from '@/api'
const mapStore = namespace("mapStore");
@Component({
  components: {
    TabActive,
  },
})
export default class MapManage extends Vue {
  @Prop() tabActiveIndex!: number;
  @mapStore.State markers: any;
  @mapStore.State markerFlag: any;
  @mapStore.Mutation setMarkers: any;

  @Prop() markerStyle!: any;

  @Watch("tabActiveIndex")
  onActive(val: number) {
    if (val == 1) {
      this.flag = "tdt2";
    } else if (val == 0) {
      this.flag = "tdt";
    } else {
      this.flag == "tdt";
    }
  }

  olMap = this.$getMapConfig();
  zoom: number = 13;
  @Watch("olMap.map.view.zoom", { immediate: true, deep: true })
  mapZoom(nva: number, ona: number) {
    this.zoom = nva;
    this.$emit("mapZoom", nva, ona);
    // let data:any = this.$refs.mapObject
    // let map = data.mapObject
    // let view = map.getView();
    // let extent = view.calculateExtent(map.getSize());
    // this.calcRadius(view.getProjection(),500);
  }

  onmarkerClick(info: any) {
    this.$emit("onmarkerClick", info.collectionInfo);
  }
  // 地图鼠标移动点击信息
  pointerInfos: any = {};
  mapSingClick(e: any) {
    this.pointerInfos = e;
    this.$emit("mapSingClick", e);
  }
  // 天地图和影像图切换
  btns: any[] = ["天地图", "影像图"];
  // tdt:any = this.olMap.baseLayer
  flag: string = "tdt";
  activeIndex: number = 0;
  getBtn(index: number) {
    this.activeIndex = index;
    if (index == 1) {
      // this.tdt = this.olMap.tdt2
      this.flag = "tdt2";
    } else if (index == 0) {
      this.flag = "tdt";
      // this.tdt = this.olMap.baseLayer
    } else {
      this.flag == "tdt";
    }
  }
  // 测距
  measureshow: boolean = false;
  onMeasure() {
    this.measureshow = !this.measureshow;
    if (this.measureshow) {
      this.surfaceshow = false;
    }
    this.measureType = "LineString";
  }
  // 测面
  surfaceshow: boolean = false;
  onSurface() {
    this.surfaceshow = !this.surfaceshow;
    if (this.surfaceshow) {
      this.measureshow = false;
    }
    this.measureType = "Polygon";
  }
  measureType: string = "LineString";
  again = 0;
  drawEnd() {
    this.again = new Date().getTime();
  }
  // 图层导出为PDF
  onexport() {
    let exportButton: any = document.getElementById("export-pdf");
    exportButton.disabled = true;
    document.body.style.cursor = "progress";
    let dim = [297, 210];
    let resolution = 72;
    let width = Math.round((dim[0] * resolution) / 25.4);
    let height = Math.round((dim[1] * resolution) / 25.4);
    olData.getMap("baseMap").then((map: any) => {
      let size = map.getSize();
      let viewResolution = map.getView().getResolution();
      map.once("rendercomplete", function() {
        let mapCanvas: any = document.createElement("canvas");
        mapCanvas.width = width;
        mapCanvas.height = height;
        let mapContext: any = mapCanvas.getContext("2d");
        Array.prototype.forEach.call(document.querySelectorAll(".ol-layer canvas"), function(canvas) {
          if (canvas.width > 0) {
            var opacity = canvas.parentNode.style.opacity;
            mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
            var transform = canvas.style.transform;
            // Get the transform parameters from the style's transform matrix
            var matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(",")
              .map(Number);
            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
            mapContext.drawImage(canvas, 0, 0);
          }
        });
        let pdf = new jsPDF("landscape", undefined, "a4");

        pdf.addImage(mapCanvas.toDataURL("image/jpeg"), "JPEG", 0, 0, dim[0], dim[1]);
        pdf.save("map.pdf");
        map.setSize(size);
        map.getView().setResolution(viewResolution);
        exportButton.disabled = false;
        document.body.style.cursor = "auto";
      });
      var printSize = [width, height];
      map.setSize(printSize);
      var scaling = Math.min(width / size[0], height / size[1]);
      map.getView().setResolution(viewResolution / scaling);
    });
  }
}
</script>
<style lang="scss" scoped>
.main-map {
  position: relative;
  .tdt-btn {
    position: absolute;
    right: 20px;
    bottom: 60px;
    border-radius: 4px;
  }
}
.measure-btn {
  position: absolute;
  right: 20px;
  top: 68px;
  // bottom: 98px;
  // padding: 5px 15px;
  // display: flex;
  // justify-content: space-around;
  // align-items: center;
  border: 0;
  .measure-item {
    padding: 5px 15px;
    margin-bottom: 8px;
    color: #fff;
    font-size: 14px;
    background-color: #3a7bef;
    border: 0;
    text-align: center;
    cursor: pointer;
  }
}
.point-info {
  position: absolute;
  right: 15px;
  top: 14px;
  padding: 14px;
  display: flex;
  font-size: 14px;
  color: #333;
}
</style>
