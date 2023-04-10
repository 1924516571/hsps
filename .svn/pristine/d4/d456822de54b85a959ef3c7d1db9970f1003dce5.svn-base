<template>
<!-- 柱状图横向有两层，一层总量，一层现有数据，在右边有数据说明 -->
  <div class="status-view">
    <panel-view heading="物资情况">
      <div class="charts">
        <v-chart
          :options="barOptions"
          :autoresize="true"
          style="width:100%;height:100%"
        ></v-chart>
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
export default class StatusGoods extends Vue {
  category: any[] = [
    {
      name: '草鞋',
      value: 2500
    },
    {
      name: '沙包',
      value: 1000
    },
    {
      name: '麻袋',
      value: 3000
    },
    {
      name: '铁锹',
      value: 3000
    },
    {
      name: '救生衣',
      value: 3000
    }
  ] // 类别
  total: number | string = 10000 // 数据总数
  datas: any[] = [2500,1000,3000,3000,3000]

  // category.forEach(value => {
  //     datas.push(value.value);
  // });
  barOptions: any = {
    xAxis: {
      max: this.total,
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    grid: {
      left: '15%',
      top: '10%', // 设置条形图的边距
      right: '20%',
      bottom: '10%'
    },
    yAxis: [
      {
        type: 'category',
        inverse: false,
        data: this.category,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        }
      }
    ],
    series: [
      {
        // 内
        type: 'bar',
        barWidth: 14,
        legendHoverLink: false,
        silent: true,
        itemStyle: {
          normal: {
            color: '#5bc172'
            // color: function (params) {
            //   var color
            //   if (params.dataIndex == 19) {
            //     color = {
            //       type: 'linear',
            //       x: 0,
            //       y: 0,
            //       x2: 1,
            //       y2: 0,
            //       colorStops: [
            //         {
            //           offset: 0,
            //           color: '#EB5118' // 0% 处的颜色
            //         },
            //         {
            //           offset: 1,
            //           color: '#F21F02' // 100% 处的颜色
            //         }
            //       ]
            //     }
            //   } else if (params.dataIndex == 18) {
            //     color = {
            //       type: 'linear',
            //       x: 0,
            //       y: 0,
            //       x2: 1,
            //       y2: 0,
            //       colorStops: [
            //         {
            //           offset: 0,
            //           color: '#FFA048' // 0% 处的颜色
            //         },
            //         {
            //           offset: 1,
            //           color: '#B25E14' // 100% 处的颜色
            //         }
            //       ]
            //     }
            //   } else if (params.dataIndex == 17) {
            //     color = {
            //       type: 'linear',
            //       x: 0,
            //       y: 0,
            //       x2: 1,
            //       y2: 0,
            //       colorStops: [
            //         {
            //           offset: 0,
            //           color: '#F8E972' // 0% 处的颜色
            //         },
            //         {
            //           offset: 1,
            //           color: '#E5C206' // 100% 处的颜色
            //         }
            //       ]
            //     }
            //   } else {
            //     color = {
            //       type: 'linear',
            //       x: 0,
            //       y: 0,
            //       x2: 1,
            //       y2: 0,
            //       colorStops: [
            //         {
            //           offset: 0,
            //           color: '#1588D1' // 0% 处的颜色
            //         },
            //         {
            //           offset: 1,
            //           color: '#0F4071' // 100% 处的颜色
            //         }
            //       ]
            //     }
            //   }
            //   return color
            // }
          }
        },
        label: {
          normal: {
            show: true,
            position: 'left',
            formatter: '{b}',
            textStyle: {
              color: '#666666',
              fontSize: 14
            }
          }
        },
        data: this.category,
        z: 1,
        animationEasing: 'elasticOut'
      },
      // {
      //   // 分隔
      //   type: 'pictorialBar',
      //   itemStyle: {
      //     normal: {
      //       color: '#061348'
      //     }
      //   },
      //   symbolRepeat: 'fixed',
      //   symbolMargin: 6,
      //   symbol: 'rect',
      //   symbolClip: true,
      //   symbolSize: [1, 21],
      //   symbolPosition: 'start',
      //   symbolOffset: [1, -1],
      //   symbolBoundingData: this.total,
      //   data: category,
      //   z: 2,
      //   animationEasing: 'elasticOut'
      // },
      {
        // 外边框
        type: 'pictorialBar',
        symbol: 'rect',
        symbolBoundingData: this.total,
        itemStyle: {
          normal: {
            color: 'none'
          }
        },
        label: {
          normal: {
            formatter: (params: any) => {
            
              // this.datas += params.data
              // var text
              let text:any = ''
              // if (params.dataIndex == 1) {
                text = '{f|  ' + params.data + '}'
              // } else if (params.dataIndex == 2) {
              //   text = '{b|  100%}{f|  ' + params.data + '}'
              // } else if (params.dataIndex == 3) {
              //   text = '{c|  100%}{f|  ' + params.data + '}'
              // } else {
              //   text = '{d|  100%}{f|  ' + params.data + '}'
              // }
              return text
            },
            rich: {
              a: {
                color: 'red'
              },
              b: {
                color: 'blue'
              },
              c: {
                color: 'yellow'
              },
              d: {
                color: 'green'
              },
              f: {
                color: '#666'
              }
            },
            position: 'right',
            distance: 0, // 向右偏移位置
            show: true
          }
        },
        data: this.datas,
        z: 0,
        animationEasing: 'elasticOut'
      },
      {
        name: '外框',
        type: 'bar',
        barGap: '-120%', // 设置外框粗细
        data: [10000, 10000, 10000, 10000, 10000],
        barWidth: 14,
        itemStyle: {
          normal: {
            color: '#ebf1f6', // 填充色
            // barBorderColor: '#ebf1f6', // 边框色
            // barBorderWidth: 1, // 边框宽度
            // barBorderRadius: 0, //圆角半径
            label: {
              // 标签显示位置
              show: false,
              position: 'top' // insideTop 或者横向的 insideLeft
            }
          }
        },
        z: 0
      }
    ]
  }
  // barOptions: any = {
  //   // color: this.color,
  //   tooltip: {
  //     trigger: "item"
  //   },
  //   grid: {
  //     top: "15%",
  //     right: "5%",
  //     left: "10%",
  //     bottom: "15%",
  //     containLable: true
  //   },
  //   xAxis: {
  //     type: "category",
  //     axisLine: {
  //       show: false
  //     },
  //     axisTick: {
  //       show: false
  //     },
  //     axisLabel: {
  //       // rotate: -30,
  //       color: "#666"
  //     },
  //     splitLine: {
  //       show: false
  //     },
  //     data: ["麻袋", "草包", "沙包", "麻袋", "草包", "沙包"]
  //   },
  //   yAxis: {
  //     name: "单位：个",
  //     nameTextStyle: {
  //       color: "#999"
  //     },
  //     axisLine: {
  //       show: false
  //     },
  //     axisTick: {
  //       show: false
  //     },
  //     splitLine: {
  //       color: "#999"
  //     }
  //   },
  //   series: [
  //     {
  //       name: "物资情况",
  //       type: "bar",
  //       itemStyle: {
  //         color: "#5bc172"
  //       },
  //       // stack: '总量',
  //       barWidth: 14,
  //       data: [9, 17, 5, 10, 19, 33]
  //     }
  //   ]
  // };
}
</script>
<style lang="scss" scoped>
.status-view {
  width: 100%;
  height: 100%;
  .charts {
    padding: 0 10px;
    height: calc(100% - 52px);
  }
}
</style>
