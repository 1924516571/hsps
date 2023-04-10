<template>
  <!--河湖信息 -->
  <div class="info">
    <div class="info-view bg-shadow">
      <div class="top">
        <div class="top-item">
          <div class="top-item-sub">
            <suc-input v-model="tableParams.lesseeName" placeholder="租户姓名" style="width:160px"></suc-input>
          </div>
          <div class="top-item-sub">
            <suc-input v-model="tableParams.lesseeNum" placeholder="身份证号" style="width:160px"></suc-input>
          </div>
          <div class="top-item-sub">
            <suc-select v-model="tableParams.lesseeSex" :options="sexData" :config="{ placeholder: '性别', clearable: true }" style="width:160px"></suc-select>
          </div>
          <div class="top-item-sub">
            <suc-select v-model="tableParams.lesseeType" :options="zhType" :config="{ placeholder: '租户性质', clearable: true }" style="width:160px"></suc-select>
          </div>
          <div class="top-item-sub">
            <suc-button @click="onSearch" type="primary">搜索</suc-button>
          </div>
        </div>
        <div class="top-item">
          <!-- <el-upload
            type="success"
            style="margin-right: 10px;"
            size="small"
            :headers="uploadHeaders"
            :on-success="PicSuccess"
            action="api/wjServer/dataCenter/baseinfo/riverinfo/import"
            accept=".xls"
            :show-file-list="false"
          >
            <el-button size="small" type="success">导入</el-button>
          </el-upload> -->
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams"  @get-page="getPage" @get-size="getSize">
          <template v-slot:houseStatus="{ row }">
           <el-tag size="mini" :type="row.allotStatus == true ? 'success' : ''">{{row.allotStatus == true ? '已分配' : '未分配'}}</el-tag>
          </template>
          <template v-slot:rhdj="{ row }">
           <el-tag size="mini" :type="row.registerStatus == true ? 'warning' : 'info'">{{row.registerStatus == true ? '已登记' : '未登记'}}</el-tag>
          </template>
          <template v-slot:operation="{ row }">
            <div class="btn">
              <span @click="ondetail(row)">详情</span>
              <span @click="onFp(row)">分配</span>
              <span @click="onRh(row)">入户登记</span>
              <span @click="onXz(row)">续租</span>
              <span @click="onTz(row)">退租</span>
            </div>
          </template>
          <template v-slot:cz>
            <div style="text-align:center;width:100%">操作</div>
          </template>
        </table-page>
      </div>
    </div>
    <!-- 详情弹框 -->
    <detail-modal :modal="detailModal"  :formParams="formParams" @toggle="toggle"></detail-modal>
    <!-- 分配弹框 -->
    <fp-modal :modal="fpModal"  :formParams="fpParams" @toggle="fpToggle" @on-submit="fpSubmit"></fp-modal>
    <!-- 入户弹框 -->
    <rh-modal :modal="rhModal" :showParams="showParams"  :formParams="rhParams" @toggle="rhToggle" @on-submit="rhSubmit"></rh-modal>
    <!-- 续租弹框 -->
    <xz-modal :modal="xzModal" :showParams="showParams"  :formParams="xzParams" @toggle="xzToggle" @on-submit="xzSubmit"></xz-modal>
    <!-- 退租弹框 -->
    <tz-modal :modal="tzModal" :showParams="showParams"  :formParams="tzParams" @toggle="tzToggle" @on-submit="tzSubmit"></tz-modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SucSelect, SucButton, SucInput, SucFormItem } from "@suc/ui";
import { SearchComponent, TablePage } from "@/components";
import { detailModal, fpModal, rhModal,  xzModal, tzModal,} from "./model";
import { publicApi } from "@/api";
@Component({
  components: {
    SucSelect,
    SucButton,
    SucInput,
    SucFormItem,
    SearchComponent,
    TablePage,
    detailModal,
    fpModal,
    rhModal,
    xzModal,
    tzModal
  },
})
export default class Enterprise extends Vue {
  detailModal: boolean = false;
  fpModal: boolean = false;
  rhModal: boolean = false;
  xzModal: boolean = false;
  tzModal: boolean = false;
  loading: boolean = true;
  tableData: any[] = [];
  model: boolean = false;
  uploadHeaders: any = { Authorization: "bearer" + localStorage.getItem("refresh-token") };
  PicSuccess(file: any) {
    if (file.result) {
      this.$SucMessage.success("导入成功");
    } else if (file.data.length < 0) {
      this.$SucMessage.info("导入数据为空");
    }
    this.onpage();
  }

  formParams: any = {
  };
  fpParams:any ={}
  xzParams:any ={}
  tzParams:any ={}
  showParams:any ={}
  rhParams:any ={
    minIoFileList:[]
  }

  //性别
  sexData: any = [
    {value:'男',label:'男'},
    {value:'女',label:'女'}
  ];

  zhType: any = [
    {value:'1',label:'保障租户'},
    {value:'2',label:'市场化租户'}
  ];

  toggle(val: boolean) {
    this.detailModal = val;
  }

  fpToggle(val: boolean) {
    this.fpModal = val;
  }

  rhToggle(val: boolean) {
    this.rhModal = val;
  }

  xzToggle(val: boolean) {
    this.xzModal = val;
  }

  tzToggle(val: boolean) {
    this.tzModal = val;
  }
 
  ondetail(row: any) {
    this.detailModal = true;
    this.detailInfo(row.uuid);
  }

  onFp(row: any) {
    this.fpModal = true;
    this.fpParams = {
      lesseeName: row.lesseeName,
      lesseeNum: row.lesseeNum,
      lesseeUuid: row.lesseeUuid,
      companyName: '',
    }
  }

  async onRh(row: any) {
    this.rhModal = true;
    this.rhParams = {
      uuid: row.uuid,
      minIoFileList:[]
    }
    this.showParams = await this.detailInfo(row.uuid)
  }

  async onTz(row: any) {
    this.tzModal = true;
    this.showParams = await this.detailInfo(row.uuid)
    this.tzParams = {
      uuid: row.uuid,
      houseUuid:this.showParams.houseUuid
    }
  }

  async onXz(row: any) {
    this.xzModal = true;
    
    this.showParams = await this.detailInfo(row.uuid)
    this.xzParams = {
      uuid: row.uuid,
      houseUuid:this.showParams.houseUuid
    }
  }

  fpSubmit(){
    let url = "server/house/allot"
    publicApi.postWithParamJson(url,this.fpParams).then(result =>{
      console.log(result);
      if (result.result) {
        this.fpModal = false;
        this.onpage()
        this.$message.success("分配成功");
      }
      else{
        this.$message.error(result.desc);

      }
    })
  }

  rhSubmit(){
    let url = "server/house/allot/register"
    publicApi.postWithParamJson(url,this.rhParams).then(result =>{
      if (result.result) {
        this.rhModal = false;
        this.$message.success("登记成功");
      }
      else{
        this.$message.error(result.desc);

      }
    })
  }

  xzSubmit(){
    let url = "server/house/allot/relet"
    publicApi.postWithParamJson(url,this.xzParams).then(result =>{
      if (result.result) {
        this.xzModal = false;
        this.$message.success("续租成功");
      }
      else{
        this.$message.error(result.desc);

      }
    })
  }

  tzSubmit(){
    let url = "server/house/allot/surrender"
    publicApi.postWithParamJson(url,this.tzParams).then(result =>{
      if (result.result) {
        this.tzModal = false;
        this.$message.success("退租成功");
      }
      else{
        this.$message.error(result.desc);

      }
    })
  }
  
  //  纯详情
  async detailInfo(uuid: any) {
    let url = "server/house/allot/detail";
    let data = await publicApi.getWithParam(url, { uuid });
    this.formParams = data.data
    return data.data;
  }

  //   查
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "租户姓名",
      key: "lesseeName",
    },
    {
      title: "身份证号",
      key: "lesseeNum",
      width: 170,
    },
    {
      title: "性别",
      key: "lesseeSex",
      width: 70,
    },
    {
      title: "电话",
      key: "lesseeTel",
    },
    {
      title: "申请日期",
      key: "lesseeDate",
    },
    {
      title: "租户性质",
      key: "lesseeType",
    },
    {
      title: "租金/月",
      key: "reletFee",
    },
    {
      title: "开始日期",
      key: "leaseStarttime",
    },
    {
      title: "结束日期",
      key: "leaseEndtime",
    },
    {
      title: "房屋状态",
      slot:'houseStatus',
      width: 90,
    },
    {
      title: "入户登记",
      slot:'rhdj',
      width: 90,
    },
    {
      title: "操作",
      heading:'cz',
      slot: "operation",
      width: 240,
    },
  ];

  pageParams: any = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  tableParams: any = {
    pageNumber: "",
    pageSize: "",
    lesseeSex: "",
    lesseeName:'',
    lesseeType:'',
    lesseeNum:''
  };
  mounted() {
    this.onpage(); //获取页面信息
  }
 

  // 列表
  async onpage() {
    this.tableParams.pageNumber = this.pageParams.current;
    this.tableParams.pageSize = this.pageParams.pageSize;
    let url = "server/house/allot/page";
    let data = await publicApi.getWithParam(url, this.tableParams);
    if (data.result) {
      this.pageParams.total = parseInt(data.data.total);
      this.tableData = data.data.rows;
      this.loading = false;
    } 
  }
  getPage(page: any) {
    this.loading = true;
    this.pageParams.current = page;
    this.onpage();
  }
  getSize(size: any) {
    this.loading = true;
    this.pageParams.current = 1;
    this.pageParams.pageSize = size;
    this.onpage();
  }
  onSearch(val: string) {
    this.loading = true;
    this.pageParams.current = 1;
    // this.pageParams.pageSize = 10;
    this.tableParams.riverName = val;
    this.onpage();
  }
}
</script>
<style lang="scss" scoped>
.info {
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  &-view {
    height: 100%;
    .top {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      &-item {
        display: flex;
        // width: 50%;
        &-sub {
          margin-right: 10px;
        }
      }
    }
    .content {
      height: calc(100% - 65px);
      border-top: 1px solid #dde4eb;
      .link-text {
        color: #5397ff;
        cursor: pointer;
      }
      .btn {
        cursor: pointer;
        span {
          display: inline-block;
          margin-right: 10px;
          &:first-of-type {
            color: #358e1f;
          }
          &:nth-of-type(2) {
            color: #5397ff;
          }
          &:nth-of-type(3) {
            color: #358e1f;
          }
          &:nth-of-type(4) {
            color: #5397ff;
          }
          &:last-of-type {
            color: #ff5a47;
          }
        }
      }
    }
  }
  .delete-view {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
