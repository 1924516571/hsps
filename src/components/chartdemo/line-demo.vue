<template>
<!-- 站点数量统计gradient和折线图 -->
  <div class="monitor-view">
    <panel-view heading="实时内涝预警监测">
      <div class="content">
        <div class="content-item">
          <div class="site">
            <div><span>监测点</span></div>
            <div class="site-item">
              <div
                :class="item.color"
                v-for="(item, index) in list"
                :key="index"
              >
                <div>
                  <div class="amount">
                    <span class="font-big">{{ item.amount }}</span>
                    <span>{{ item.dw }}</span>
                  </div>
                  <div>
                    <span>{{ item.name }}</span>
                  </div>
                </div>
                <div class="icon">
                  <span class="iconfont icon-zhandian"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="chart">
            <div><span>24h过程线</span></div>
            <div class="chart-item">
              <v-chart
                :options="lineOptions"
                :autoresize="true"
                style="width:100%;height:100%"
              ></v-chart>
            </div>
          </div>
        </div>
        <div class="content-item">
          <table-component :columns="columns" :tableData="tableData"></table-component>
          <!-- <suc-table :data="tableData" stripe size="mini">
            <suc-table-column prop="date" label="排名"> </suc-table-column>
            <suc-table-column prop="name" label="站点名称"> </suc-table-column>
            <suc-table-column prop="address" label="片区"></suc-table-column>
            <suc-table-column
              prop="address"
              label="水深占比"
            ></suc-table-column>
          </suc-table> -->
        </div>
      </div>
    </panel-view>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Model,
  Watch
} from "vue-property-decorator";
import { SucTable, SucTableColumn } from "@suc/ui";
import { PanelView,TableComponent } from "@/components";
@Component({
  components: {
    SucTable,
    SucTableColumn,
    PanelView,
    TableComponent
  }
})
export default class AlarmMonitor extends Vue {
  list: any = [
    {
      name: "内涝监测点数量",
      amount: "1000",
      dw: "处",
      color: "blue-gradient"
    },
    {
      name: "预警监测点数量",
      amount: "20",
      dw: "处",
      color: "red-gradient"
    }
  ];
  columns:any[] = [
    {
      title:'排名',
      key:''
    },
    {
      title:'站点名称',
      key:''
    },
    {
      title:'片区',
      key:''
    },
    {
      title:'水深占比',
      key:''
    },
  ]
  tableData:any[] = []
  lineOptions: any = {
    // color: this.color,
    tooltip: {
      trigger: "axis"
    },
    grid: {
      top: "16%",
      right: "2%",
      left: "8%",
      bottom: "18%",
      containLable: true
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        // rotate: -30,
        color: "#666"
      },
      splitLine: {
        show: false
      },
      data: [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ]
    },
    yAxis: {
      name: "单位：",
      nameTextStyle: {
        color: "#999"
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        color: "#999"
      }
    },
    series: [
      {
        name: "24小时过程线",
        type: "line",
        symbolSize:1,
        lineStyle: {
          color: "#5397ff"
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#5397ff" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(83,151,255,0.2)" // 100% 处的颜色
              }
            ]
          }
        },
        data: [709, 917, 455, 610, 719, 433, 544, 285]
      }
    ]
  };
  
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.monitor-view {
  width: 100%;
  height: 100%;
  .content {
    padding: 14px;
    height: calc(100% - 52px);
    border-top: 1px solid $border-color;
    &-item {
      height: 50%;
      font-size: $font-size-base;
      color: $heading-color;
      &:first-of-type {
        padding-bottom: 10px;
        display: flex;
      }
      .site {
        &-item {
          padding: 5px 10px 0 0;
          //   height: calc(100% - 20px);
          > div {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px 20px;
            position: relative;
            color: #fff;
          }
          .amount{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            .font-big{
              font-size: 28px;
            }
          }
          .icon {
            position: absolute;
            bottom: 5%;
            right: 10px;
            color: rgba($color: #ffffff, $alpha: 0.2);
            .icon-zhandian:before {
              font-size: 30px;
            }
          }
        }
        .blue-gradient {
          margin-bottom: 10px;
          background-image: $blue-gradient;
          border-radius: $border-radius;
        }
        .red-gradient {
          background-image: $red-gradient;
          border-radius: $border-radius;
        }
      }
      .chart {
        padding-left: 10px;
        width: calc(100% - 150px);
        height: 100%;
        &-item {
          padding-top: 10px;
          height: calc(100% - 20px);
        }
      }
    }
  }
}
</style>
