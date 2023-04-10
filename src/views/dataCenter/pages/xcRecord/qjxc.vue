<template>
    <div class="contain">
      <div class="top">
        <div class="top-item">
            <div class="top-item-sub">
              <suc-input v-model="tableParams.userName" placeholder="巡查人" style="width:200px"></suc-input>
            </div>
            <div class="top-item-sub">
              <suc-date-picker
                v-model="tableParams.beginDate"
                :options="{
                  type: 'date',
                  clearable: true,
                  placeholder: '巡查开始时间',
                }"
                style="width: 100%"
              ></suc-date-picker>
            </div>
            <div class="top-item-sub">
              <suc-date-picker
                v-model="tableParams.endDate"
                :options="{
                  type: 'date',
                  clearable: true,
                  placeholder: '巡查结束时间',
                }"
                style="width: 100%"
              ></suc-date-picker>
            </div>
            <div class="top-item-sub">
              <suc-button @click="onSearch" type="primary">搜索</suc-button>
            </div>
          </div>
  
        <div class="top-item">
          <!-- <suc-button class="btn" type="primary" :debounce="800" @on-click="exportExcel">导出</suc-button> -->
          <!-- <suc-button type="primary" :debounce="800" @on-click="onadd">新增</suc-button> -->
        </div>
      </div>
      <div class="content">
        <table-page :columns="columns" :tableData="tableData" :pageParams="pageParams" v-loading="loading" @get-page="getPage" @get-size="getSize">
          <template v-slot:operation="{ row }">
            <div class="btn1">
              <span @click="onedit(row)">详情</span>
              <!-- <span @click="ondelete(row)">删除</span> -->
            </div>
          </template>
        </table-page>
      </div>
      <Xcjl-modal :title="modalTitle" :modal="modal" :formParams="formParams" @toggle="toggle" > </Xcjl-modal>
    </div>
  </template>
  
  <script lang="ts">
  import { Vue, Component, Watch } from "vue-property-decorator";
  import { SearchComponent, TablePage } from "@/components";
  import { SucButton, SucInput, SucDatePicker, SucSelect } from "@suc/ui";
  import { XcjlModal, DeleteModal } from "./model";
  import { publicApi } from "@/api";
  import { url } from "../../../../../public/config";
  
  @Component({
    components: {
      TablePage,
      SucButton,
      SucInput,
      SucDatePicker,
      SucSelect,
      SearchComponent,
      XcjlModal,
      DeleteModal,
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
    formParams: any = {};
    uploadHeaders: any = { Authorization: "bearer" + localStorage.getItem("refresh-token") };
   
    tableParams: any = {
      userName: "",
      beginDate: "",
      endDate: "",
      pageNumber: "",
      pageSize: "",
    };
    columns: any[] = [
      {
        type: "index",
        title: "序号",
        width: "100",
      },
      {
        title: "巡查人",
        key: "userName",
      },
      {
        title: "巡查小区",
        key: "xqmc",
      },
      {
        title: "巡查区域/对象",
        key: "xcqy",
      },
      {
        title: "巡查开始时间",
        key: "startTimeStr",
      },
      {
        title: "巡查结束时间",
        key: "endTimeStr",
      },
      {
        title: "巡查时间（min）",
        key: "useTime",
      },
      {
        title: "巡查距离（m）",
        key: "distance",
      },
      {
        title: "问题数量",
        key: "problemNum",
      },
      {
        title: "操作",
        slot: "operation",
        width: 110,
      },
    ];
    pageParams: any = {
      total: 0,
      current: 1,
      pageSize: 10,
    };
  
    tableData: any = [];
    mounted() {
      this.onpage();
    }
    async onpage() {
      this.loading = true;
      this.tableParams.pageNumber = this.pageParams.current;
      this.tableParams.pageSize = this.pageParams.pageSize;
      let url = "server/securityHousing/maintain/infoListNew";
      let data = await publicApi.getWithParam(url, this.tableParams);
      if (data.result) {
        this.loading = false;
        this.tableData = data.data.rows;
        this.pageParams.total = parseInt(data.data.total);
        // this.$SucMessage.success("加载成功");
      } else {
        this.$SucMessage.error("加载失败");
        this.tableData = [];
      }
    }
    toggle(val: any) {
      this.modal = val;
    }
   
    onedit(row: any) {
      this.modal = true;
      this.formParams = {};
      let recordCode = row.maintainCode;
      this.editInfo(recordCode);
    }
    async editInfo(recordCode: any) {
    let url = "server/securityHousing/maintain/getDetail";
    let data = await publicApi.getWithParam(url, { recordCode: recordCode });
    if (data.result) {
      this.formParams = {
        xcUser: data.data.xcUser,
        xcType: data.data.xcType,
        problemNum: data.data.problemNum,
        xcxq: data.data.xcxq,
        startTime: data.data.startTime,
        endTime: data.data.endTime,
        useTime: data.data.useTime,
        distance: data.data.distance,
        xcqy: data.data.xcqy,
        problemList: data.data.problemList, //巡查问题列表
      };
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
    onSearch(val: any) {
      // this.tableParams.leader = val;
      console.log(val)
      this.onpage();
    }
    exportExcel() {
      let consturl = url + "/api/server/securityHousing/caseInfo/export"
      window.location.href = consturl
    }
  }
  </script>
  <style lang="scss" scoped>
  .contain {
    width: 100%;
    height: 100%;
    .top {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      &-item {
        display: flex;
        &-sub {
          margin-right: 10px;
        }
        .btn {
          margin-right: 15px;
        }
      }
    }
    .btn1 {
          cursor: pointer;
          span {
            display: inline-block;
            margin-right: 10px;
            &:first-of-type {
              color: #5397ff;
            }
            // &:nth-of-type(2) {
            //   color: #5397ff;
            // }
            // &:nth-of-type(3) {
            //   color: #358e1f;
            // }
            // &:nth-of-type(4) {
            //   color: #5397ff;
            // }
            // &:last-of-type {
            //   color: #ff5a47;
            // }
          }
        }
        .content {
        height: calc(100% - 65px);
        border-top: 1px solid #dde4eb;
        .link-text {
          color: #5397ff;
          cursor: pointer;
        }
       
      }
    .delete-view {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  
  </style>
  