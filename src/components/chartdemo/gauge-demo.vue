<template>
<!-- 仪表盘 -->
  <div class="pie-view">
    <div class="pie-item">
      <span>水质达标率</span>
    </div>
    <div class="pie-item">
      <v-chart
        :options="options"
        :autoresize="true"
        style="width:100%;height:100%"
      ></v-chart>
    </div>
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
var echarts = require('echarts');
@Component
export default class PanelPie extends Vue {
  dataArr:any = [
    {
      value: 41,
      name: '水质达标率'
    }
  ]
  color:any = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
        offset: 0,
        color: '#11c997' // 0% 处的颜色
    },
    // {
    //     offset: 0.17,
    //     color: '#468EFD' // 100% 处的颜色
    // },
    {
        offset: 0.9,
        color: '#4de0e6' // 100% 处的颜色
    },
    {
        offset: 1,
        color: '#4de0e6' // 100% 处的颜色
    }
]);
  colorSet:any = [
    [0.41, this.color],
    [1, '#dde4eb']
  ]
  rich: any = {
    white: {
      fontSize: 16,
      color: '#333',
      // fontWeight: '500',
      padding: [-20, 0, 0, 0]
    },
    bule: {
      fontSize: 36,
      // fontFamily: 'DINBold',
      color: '#333',
      // fontWeight: '700',
      padding: [-20, 0, 0, 0]
    },
    radius: {
      // width: 350,
      // height: 80,
      // lineHeight:80,
      // borderWidth: 1,
      // borderColor: '#0092F2',
      fontSize: 14,
      color: '#999',
      // backgroundColor: '#1B215B',
      // borderRadius: 20,
      textAlign: 'center'
    },
    size: {
      // height: 400,
      padding: [100, 0, 0, 0]
    }
  }
  options: any = {
    // backgroundColor: '#0E1327',
    // tooltip: {
    //   formatter: '{a} <br/>{b} : {c}%'
    // },

    series: [
      {
        type: 'gauge',
        name: '外层辅助',
        radius: '90%',
        startAngle: '225',
        endAngle: '-45',
        splitNumber: '100',
        pointer: {
          show: false
        },
        detail: {
          show: false
        },
        data: [
          {
            value: 1
          }
        ],
        // data: [{value: 1, name: 90}],
        // title: {
        //   show: true,
        //   offsetCenter: [0, 30],
        //   textStyle: {
        //     color: '#fff',
        //     fontStyle: 'normal',
        //     fontWeight: 'normal',
        //     fontFamily: '微软雅黑',
        //     fontSize: 20
        //   }
        // },
        axisLine: {
          show: true,
          lineStyle: {
            color: [[1, '#dde4eb']],
            width: 2,
            opacity: 1
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          length: 20,
          lineStyle: {
            color: '#051932',
            width: 0,
            type: 'solid'
          }
        },
        axisLabel: {
          show: false
        }
      },
      {
        type: 'gauge',
        radius: '80%',
        startAngle: '225',
        endAngle: '-45',
        pointer: {
          show: false
        },
        detail: {
            formatter: function(value:any) {
                var num = Math.round(value);
                return '{bule|' + num + '}{white|%}' + '{size|' + '}\n{radius|水质达标率}';
            },
            rich: this.rich,
            "offsetCenter": ['0%', "0%"],
        },
        data: this.dataArr,
        title: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: this.colorSet,
            width: 20,
            // shadowBlur: 15,
            // shadowColor: '#B0C4DE',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          length: 25,
          lineStyle: {
            color: '#00377a',
            width: 2,
            type: 'solid'
          }
        },
        axisLabel: {
          show: false
        }
      },
      {
        name: '灰色内圈', //刻度背景
        type: 'gauge',
        z: 2,
        radius: '55%',
        startAngle: '225',
        endAngle: '-45',
        //center: ["50%", "75%"], //整体的位置设置
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [[1, '#dde4eb']],
            width: 2,
            opacity: 1 //刻度背景宽度
          }
        },
        splitLine: {
          show: false
        },
        // data: [{
        //     show: false,
        //     value: '80'
        // }], //作用不清楚
        axisLabel: {
          show: false
        },
        pointer: {
          show: false
        },
        axisTick: {
          show: false
        },
        detail: {
          show: 0
        }
      },
      {
        name: '白色圈刻度',
        type: 'gauge',
        radius: '54%',
        startAngle: 225, //刻度起始
        endAngle: -45, //刻度结束
        z: 4,
        axisTick: {
          show: false
        },
        splitLine: {
          length: 10, //刻度节点线长度
          lineStyle: {
            width: 2,
            color: '#dde4eb'
          } //刻度节点线
        },
        axisLabel: {
          color: 'rgba(255,255,255,0)',
          fontSize: 12
        }, //刻度节点文字颜色
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            opacity: 0
          }
        },
        detail: {
          show: false
        },
        data: [
          {
            value: 0,
            name: ''
          }
        ]
      }
    ]
  }
}
</script>
<style lang="scss" scoped>
.pie-view {
  padding: 10px;
  width: 100%;
  height: 100%;
  .pie-item {
    &:first-of-type {
      font-size: 16px;
      color: '#333';
    }
    &:nth-of-type(2) {
      height: calc(100% - 20px);
    }
  }
}
</style>
