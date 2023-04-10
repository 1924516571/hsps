<template>
  <div class="homeg">
    <div class="hometop">
      <div class="dispalyspan">
        <div class="tab">
          新吴区保障房源统计
        </div>
        <div style="width: 100%; height: 50%">
            <v-chart
              :options="option"
              :autoresize="true"
              style="width: 100%; height: 100%; display: inline-block"
            ></v-chart>
          </div>
          <div  class="homeg">
            <div class="fhdiv">
              <div>
              <span class="tabspan bgc">自持</span>
              <span class="tabspan bgc">租赁</span>
              <span class="tabspan bgc">合计</span>
              </div>
              <div>
                <span class="tabspan">{{ bzfyData.self }}</span>
                <span class="tabspan">{{ bzfyData.lease}}</span>
                <span class="tabspan">{{ bzfyData.total }}</span>
              </div>
            </div>
          </div>
      </div>
      <div class="dispalyspan">
        <div class="tab">
          新吴区物业巡查问题统计
        </div>
        <div style="width: 100%; height: 75%">
          <v-chart
            :options="optionxc"
            :autoresize="true"
            style="width: 100%; height: 100%; display: inline-block"
          ></v-chart>
        </div>
      </div>
      <div class="dispalyspan">
        <div class="tab">
        待办任务
        </div>
      <div class="ycyc">
        <div  v-for=" item in dbrwData.rows" :key="item">
          <h3 class="rwmc">任务名称：{{ item.communityName}}</h3>
          <span class="rwmcspan" >发布人： </span>
          <span>{{item.userName }}</span>
          <span class="rwmcspan">发布时间： </span>
          <span>{{ item.xcDate }}</span> 
        </div>
      </div>
      </div>
    </div>
    <div  class="hometop">
      <div class="dispalyspan">
        <div class="tab">
          新吴区保障租户统计
        </div>
        <div style="width: 100%; height: 50%">
          <v-chart
            :options="options"
            :autoresize="true"
            style="width: 100%; height: 100%; display: inline-block"
            ></v-chart>
          </div>
          <div  class="homeg">
            <div class="fhdiv">
              <div>
              <span class="tabspan bgc">保障租户</span>
              <span class="tabspan bgc">市场化租户</span>
              <span class="tabspan bgc">合计</span>
              </div>
              <div>
                <span class="tabspan">{{ bzzhData.guarantee }}</span>
                <span class="tabspan">{{ bzzhData.market }}</span>
                <span class="tabspan">{{ bzzhData.total }}</span>
              </div>
            </div>
          </div>
      </div>
      <div class="dispalyspan">
        <div class="tab">
          新吴区保障住房物业排名
        </div>
        <div class="wy">
          <table-no :columns="columns" :tableData="tableData"> 
          </table-no>
        </div>
      </div>
      <div class="dispalyspan">
        <div class="tab">
          新吴区保障住房与租户统计
        </div>
        <div style="width: 100%; height: 70%">
          <v-chart
            :options="optionzz"
            :autoresize="true"
            style="width: 100%; height: 100%; display: inline-block"
          ></v-chart>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SearchComponent, TablePage } from "@/components";
import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
import { publicApi } from "@/api";
import { TableNo } from "@/components";

@Component({
  components: {
    TablePage,
    SucButton,
    SucInput,
    SucDatePicker,
    SucSelect,
    SearchComponent,
    TableNo,

  },
})
export default class GivePlan extends Vue {
  loading: boolean = true;
  modalTitle: string = "";
  modal: boolean = false;
  delParams: object = {};
  btnFlag: any = "";
  delmodel: boolean = false;
  delLoading: boolean = false;
  tableData: any = [];
  bzfyData: any ={};
  bzzhData: any ={};
  bzzfzhData: any ={};
  dbrwData: any ={};
  xcwtData: any ={};
  
  mounted() {
    this.onbzfy();
    this.onbzzh();
    this.onwypm();
    this.onbzzhtj();
    this.ondbrw();
    this.onxcwt()
  }
  //保障房源统计环形图
  get option() {
    return {
      color: ["#E16757", "#7ECF51", ],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        right: 'right'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: [
            { value: this.bzfyData.self, name: '自持' },
            { value: this.bzfyData.lease, name: '租赁' },
          ]
        }
      ]
    };
  }
  async onbzfy() {
    let url = "server/house/count";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      this.bzfyData=data.data
    } else {
      this.$SucMessage.error("加载失败");
      this.bzfyData = {};
    }
  }
  //巡查问题
  get optionxc() {
    return {
      color: ["#61A5E8", "#F59A23", ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
          top: '5%',
          right: 'right'
        },
      grid: {
        left: '1%',
        right: '10%',
        top:'20%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data:  this.xcwtData.communityNames 
      },
      series: [
        {
          name: '问题总数',
          type: 'bar',
          data: this.xcwtData.sums
        },
        {
          name: '已解决问题数',
          type: 'bar',
          data:this.xcwtData.doneSum
        }
      ]
    //   color: ["#61A5E8", "#F59A23", ],
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'shadow'
    //     }
    //   },
    //   dataZoom : [{
    //     type: 'slider', //滑动条
    //     show: true,      //开启
    //     yAxisIndex: [0],
    //     right: 'right',  //滑动条位置
    //     // start: 1,    //初始化时，滑动条宽度开始标度
    //     // end: 50      //初始化时，滑动条宽度结束标度
    //     startValue: 0,//滚动条的起始位置
    //     endValue: 3 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
    //   },
    // //     {
    // //       type: 'inside',//设置鼠标滚轮缩放
    // //       show: true,
    // //       xAxisIndex: [0],
    // //       startValue: 0,
    // //       endValue: 10000
    // // }
    // ],
    //   legend: {
    //     top: '5%',
    //     right: 'right'
    //   },
    //   grid: {
    //     left: '1%',
    //     right: '10%',
    //     top:'20%',
    //     bottom: '1%',
    //     containLabel: true
    //   },
    //   xAxis: {
    //     type: 'value',
    //     boundaryGap: [0, 0.01]
    //   },
    //   yAxis: {
    //     type: 'category',
    //     data: this.xcwtData.communityNames 
    //   },
    //   series: [
    //     {
    //       name: '问题总数',
    //       type: 'bar',
    //       data: this.xcwtData.sums
    //     },
    //     {
    //       name: '已解决问题数',
    //       type: 'bar',
    //       data:this.xcwtData.doneSum
    //     }
    //   ]
    };
  }
  async onxcwt() {
    let url = "server/securityHousing/maintain/count";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      this.xcwtData=data.data
    } else {
      this.$SucMessage.error("加载失败");
      this.xcwtData = {};
    }
  }
  //待办任务
  async ondbrw() {
    let url = "server/event/needDo";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      this.dbrwData=data.data
    } else {
      this.$SucMessage.error("加载失败");
      this.dbrwData = {};
    }
  }
  //保障租户统计饼图
  get options() {
    return {
      color: ["#E16757", "#02A7F0", ],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        right: 'right'
      },
      series: [
        {
          type: 'pie',
          radius: '70%',
          data: [
            { value: this.bzzhData.guarantee, name: '保障用户' },
            { value: this.bzzhData.market, name: '市场化租户' },
          ],
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 1,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
  async onbzzh() {
    let url = "server/securityHousing/tenant/count";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      this.bzzhData=data.data
    } else {
      this.$SucMessage.error("加载失败");
      this.bzzhData = {};
    }
  }
  //物业排名表单
  columns: any[] = [
    {
      type: "index",
      title: "排名",
      width: "100",
    },
    {
      title: "物业名称",
      key: "companyName",
      width:'center',
    },
   
  ];
  async onwypm() {
    let url = "server/securityHousing/basicCompany/rank";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      this.tableData=data.data
    } else {
      this.$SucMessage.error("加载失败");
      this.tableData = [];
    }
  }
  
  //租住统计
  get optionzz() {
    return {
      color: ["#61A5E8", "#F59A23", ],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: '5%',
        right: 'right'
      },
      xAxis: {
    type: 'category',
    data: this.bzzfzhData.communityNames,
    axisLabel:{
        // color:'#6c706f',
        interval: 0,
        rotate:30,
      } ,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '小区房源数',
        type: 'bar',
        data: this.bzzfzhData.sums,
        },
        {
          name: '租户数',
          type: 'bar',
          data:this.bzzfzhData.allotSums
        }
    ]
      // xAxis: {
      //   type: 'category',
      //   data: this.bzzfzhData.communityNames
      // },
      // yAxis: {
      //   type: 'value',
      // },
      // series: [
      //   {
      //   name: '小区房源数',
      //   type: 'bar',
      //   data: this.bzzfzhData.sums
      //   },
      //   {
      //     name: '租户数',
      //     type: 'bar',
      //     data:this.bzzfzhData.allotSums
      //   }
      // ]
    //   tooltip: {
    //     trigger: 'axis'
    //   },
    //   dataZoom : [{
    //   type: 'slider',//给x轴设置滚动条
    //   show: true, //flase直接隐藏图形
    //   xAxisIndex: [0],
    //   bottom:0,
    //   height:20,
    //   showDetail: false,
    //   startValue: 0,//滚动条的起始位置
    //   endValue: 3 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
    // },
    // ],
    // legend: {
    //     top: '5%',
    //     right: 'right'
    //   },
    //   xAxis: [
    //     {
    //       type: 'category',
    //       // prettier-ignore
    //       data: this.bzzfzhData.communityNames
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value'
    //     }
    //   ],
    //   series: [
    //     {
    //       name: '小区房源数',
    //       type: 'bar',
    //       data: this.bzzfzhData.sums
          
    //     },
    //     {
    //       name: '租户数',
    //       type: 'bar',
    //       data:this.bzzfzhData.allotSums
    //     }
    //   ]
    };
  }
  async onbzzhtj() {
    let url = "server/house/allot/count";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      // console.log('data',data.data)
      this.bzzfzhData=data.data
    } else {
      this.$SucMessage.error("加载失败");
      this.bzzfzhData = {};
    }
  }
}
</script>
<style scoped>
.homeg{
  width: 100%;
  height: 100%;
}
.hometop{
  width: 100%;
  height: 50%;
  display: flex;
}
  .dispalyspan{
    /* display: inline-block; */
    width: 30%;
    height: 100%;
    margin: 1% 1.6% 3%;
  }
  .tab{
    width: 100%;
    height: 70px;
    background-color: #81D3F8;
    border-radius: 50px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    padding-top: 20px;
  }
  .fhdiv{
    text-align: center;
  }
  .bgc{
    background-color: #F2F2F2;
  }
  .tabspan{
    display: inline-block;
    padding-top: 15px;
    width: 20%;
    height: 50px;
    border: 1px solid #D7D7D7;
    font-weight: bold;
  }
  .wy{
    width: 90%;
    height: 75%;
    margin: 25px 0 0 25px;
  }
  .ycyc{
    width: 100%;
    height: 80%;
    overflow: auto;
  }
  .rwmc{
    margin: 5px 0 5px  40px;
  }
  .rwmcspan{
    margin-left: 20px;
    font-size: 14px;

  }
</style>