<template>
  <!-- 堆叠柱状图(纵向横向)和环形图（高亮中间显示占比，带tooltip） -->
  <div class="chart-view">
    <panel-view heading="管网预警分析">
      <div class="charts">
        <div class="charts-item">
          <v-chart
            :options="pieOptions"
            :autoresize="true"
            style="width:100%;height:100%;"
          ></v-chart>
        </div>
        <div class="charts-item">
          <v-chart
            :options="barOptions"
            :autoresize="true"
            style="width:100%;height:100%;"
          ></v-chart>
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
} from 'vue-property-decorator'
import { PanelView } from '@/components'
@Component({
  components: {
    PanelView
  }
})
export default class AnalysisAlarm extends Vue {
  color: any[] = ['#5397ff', '#ff5a47']
  pieOptions: any = {
    color: this.color,
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}个'
    },
    legend: {
      //   orient: "vertical",
      bottom: '10%',
      //   right: "5%",
      itemWidth: 10,
      itemHeight: 10,
      icon: 'circle'
      //   data: [this.data[0].name]
    },
    series: [
      {
        // name: "因子",
        type: 'pie',
        radius: ['55%', '70%'],
        center: ['50%', '40%'],
        // avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            formatter: (params: any) => {
              return (
                '{a|' +
                params.percent +
                '}' +
                '{b|%}' +
                '\n' +
                '{c|' +
                params.name +
                '}'
              )
            },
            rich: {
              a: {
                fontSize: 30,
                color: '#333'
              },
              b: {
                fontSize: 18,
                color: '#333'
              },
              c: {
                fontSize: 16,
                color: '#999'
              }
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 16,
            name: '预警'
          },
          {
            value: 40,
            name: '正常'
          }
        ]
      }
    ]
  }
  barOptions: any = {
    color: this.color,
    tooltip: {
      trigger: 'item'
    },
    grid: {
      top: '15%',
      left: '15%',
      right: '5%',
      bottom: '15%',
      containLable: true
    },
    legend: {
      x: 'right',
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        rotate: -30,
        color: '#666'
      },
      splitLine: {
        show: false
      },
      data: [
        'A片区',
        'B片区',
        'C片区',
        'D片区',
        'E片区',
        'F片区',
        'G片区',
        'H片区'
      ]
    },
    yAxis: {
      name: '单位：个',
      nameTextStyle: {
        color: '#999'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        color: '#999'
      }
    },
    series: [
      {
        name: '监测数量',
        type: 'bar',
        stack: '总量',
        barWidth: 14,
        data: [709, 917, 455, 610, 719, 433, 544, 285]
      },
      {
        name: '预警数量',
        type: 'bar',
        stack: '总量',
        data: [9, 7, 5, 61, 19, 33, 44, 85]
      }
    ]
  }
  //   横向堆叠柱状图
  options: any = {
    color: this.color,
    tooltip: {
      trigger: 'item'
    },
    grid: {
      top: '17%',
      right: '5%',
      left: '8%',
      bottom: '10%',
      containLable: true
    },
    legend: {
      x: 'left',
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      data: ['问题个数', '事件个数']
    },
    xAxis: {
      type: 'value',
      position: 'top',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        // rotate: -30,
        color: '#666'
      },
      splitLine: {
        show: false
      }
      //   data: [
      //     'A片区',
      //     'B片区',
      //     'C片区',
      //     'D片区',
      //     'E片区',
      //     'F片区',
      //     'G片区',
      //     'H片区'
      //   ]
    },
    yAxis: {
      type: 'category',
      name: '数量',
      nameTextStyle: {
        padding: [0, 37, -8, 0],
        color: '#999'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        color: '#999'
      },
      data: [
        'A片区',
        'B片区',
        'C片区',
        'D片区',
        'E片区',
        'F片区',
        'G片区',
        'H片区'
      ]
    },
    series: [
      {
        name: '事件个数',
        type: 'bar',
        stack: '总量',
        barWidth: 12,
        data: [709, 917, 455, 610, 719, 433, 544, 285]
      },
      {
        name: '问题个数',
        type: 'bar',
        stack: '总量',
        data: [9, 7, 5, 61, 19, 33, 44, 85]
      }
    ]
  }
}
</script>
<style lang="scss" scoped>
.chart-view {
  width: 100%;
  height: 100%;
  .charts {
    padding: 10px;
    display: flex;
    height: calc(100% - 52px);
    border-top: 1px solid #dde4ed;
    &-item {
      height: 100%;
      &:first-of-type {
        width: 33%;
      }
      &:nth-of-type(2) {
        width: 66%;
      }
    }
  }
}
</style>
