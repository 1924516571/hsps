<template>
  <!-- 资料库 -->
  <div class="module-view">
    <div class="bg-shadow top">
      <div>
        <el-button icon="el-icon-refresh-right" size="small" @click="onsx()">
          刷新
        </el-button>
        <el-button
          icon="el-icon-plus"
          size="small"
          type="primary"
          @click="onadd()"
        >
          新增
        </el-button>
        <el-button icon="el-icon-plus" size="small" @click="onedit()">
          编辑
        </el-button>
        <el-button
          icon="el-icon-delete"
          size="small"
          type="danger"
          @click="handleDelete()"
        >
          删除
        </el-button>
      </div>
      <div></div>
    </div>
    <div class="plan">
      <div class="bg-shadow left">
        <el-table
          ref="checkTree"
          :data="treeData"
          style="width: 100%; margin-bottom: 20px"
          row-key="codeId"
          border
          @row-click="getNode"
          highlight-current-row
          :tree-props="{ children: 'children' }"
        >
          >
          <el-table-column prop="name" label="词典名称">
            <template slot-scope="scope">
              <i v-if="scope.row.iconcls=='file'" class="el-icon-files"></i>
              <i v-if="scope.row.iconcls=='folder'" class="el-icon-folder"></i>
              <i v-if="scope.row.iconcls=='menu'" class="el-icon-menu"></i>
              <i  v-if="scope.row.iconcls=='bug'" class="el-icon-cpu"></i>
              <i v-if="scope.row.iconcls=='alert'" class="el-icon-bell"></i> 
              <i v-if="scope.row.iconcls=='exclamation-circle'" class="el-icon-warning"></i>
              <i v-if="scope.row.iconcls=='question-circle'" class="el-icon-question"></i>
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
          <el-table-column prop="codeMyid" label="词典编码"> </el-table-column>
          <el-table-column prop="sort" label="排序编码"> </el-table-column>
          <el-table-column prop="description" label="词典描述">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <sj-modal
      :title="fileTitle"
      :model="model"
      :formParams="formParams"
      @toggle="toggle"
      @on-submit="oncreate"
    ></sj-modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import {
  SucButton,
  SucTree,
  SucModal,
  SucForm,
  SucFormItem,
  SucSelect,
  SucInput,
} from "@suc/ui";
import { sjModal, DeleteModal } from "./model";
import { SearchComponent, TablePage } from "@/components";
import { infoApi, publicApi } from "@/api";
@Component({
  components: {
    SucButton,
    SucTree,
    SucModal,
    SucForm,
    SucFormItem,
    SucSelect,
    SucInput,
    TablePage,
    SearchComponent,
    sjModal,
    DeleteModal,
  },
})

export default class TransferPlan extends Vue {
  delmodel: boolean = false;
  delLoading: boolean = false;
  treeData: any = [];
  model: boolean = false;
  data: any = "";
  fileTitle: any = "";
  currentNodekey: any = "";
  from: any = "";
  btnFlag: string = "";
  Titles: any = "";
  loading: boolean = false;
  list: Array<any> = [];
  formParams: any = {
    name: "",
    parentId: "",
    permissionId:"3",
    codeMyid: "",
    iconCls:"",
    sort: "",
    description: "",
  };
  parentId:any = ''
  permissionid:any = ''
  mounted() {
    this.getTree();
  }
  // 新增弹框
  onadd() {
    if(this.flag) {
    this.model = true;
    this.btnFlag = "add";
    this.fileTitle = "新增字典";
    this.formParams.parentId =  this.fromData.name
    if(this.formParams.parentId=='参数管理'){
      this.formParams.parentId = '--'
    }
    this.formParams.permissionId = '参数管理'
    this.formParams.name = ''
    this.parentId = this.fromData.codeId
    this.formParams.sort = ' '
    this.formParams.description = ''
    this.formParams.codeMyid = ''
    this.formParams.iconCls = ''
    }else{
      this.$SucMessage.error("请选择节点");
    }
  }
  onsx(){
    this.getTree();
  }
  // 编辑
  onedit() {
    if(this.flag) { 
    this.model = true;
    this.btnFlag = "edit"; 
    this.fileTitle = "编辑部门信息";
    this.formParams.name = this.fromData.name;
    this.formParams.parentId = this.fromData.name;
    this.formParams.permissionId ==3? this.formParams.permissionId = '参数管理':'--'
    this.formParams.description = this.fromData.description;
    this.formParams.sort = this.fromData.sort;
    this.formParams.codeMyid = this.fromData.codeMyid;
    this.formParams.iconCls = this.fromData.iconcls
    }else{
      this.$SucMessage.error("请选择节点");
    }
   
  }
  // 判断是新增还是编辑
  async oncreate() {
    if (this.btnFlag == "add") {
      this.setCreate();
    } else if (this.btnFlag == "edit") {
      this.setEdit();
    }
    this.model = false;
    this.flag = false
  }
  //  新增
  async setCreate() {
    let url = "wjBaseServer/Code/SystemCode/Insert";
    this.formParams.parentId =  this.parentId
    this.formParams.permissionId = '3'
    this.formParams.iconCls = 'file'
    publicApi.postWithParam(url, this.formParams).then((res: any) => {
      if (res.result == true) {
        this.$SucMessage.info("新增成功");
        this.model = false;
        this.getTree()
        this.formParams.name =  '',
        this.formParams.sort =  '',
        this.formParams.description =  ''

      } else {
        this.model = false;
        this.$SucMessage.error("新增失败");
       
      }
    });
  }
  async cancel(val: any) {
    this.delmodel = val;
  }
  // 更新
  async setEdit() {
    this.loading = true;
    // this.formParams.parentId =  this.parentId
    this.formParams.iconCls = 'file'
    let url = "wjBaseServer/Code/SystemCode/Update";
    let params = {
      name: this.formParams.name,
      codeMyid:this.formParams.name,
      iconCls:this.formParams.iconCls,
      sort:this.formParams.sort,
      description:this.formParams.description,
      codeId:this.fromData.codeId
    }
    console.log(params.codeId)
    publicApi.postWithParam(url, params).then((data: any) => {
      if (data.result == true) {
        this.$SucMessage.info("更新成功");
        this.model = false;
        this.loading = false;
      } else {
        this.model = false;
        this.$SucMessage.error("更新失败");
        this.loading = false;
      }
    });
    this.getTree();
  }
  toggle(val: boolean) {
    this.model = val;
  }
  // 获取树
  async getTree() {
    let url = "wjBaseServer/Code/SystemCode/selectAllparams";
    let data = await publicApi.postNoParam(url);
    this.treeData = [];
    this.treeData = this.getTreeFromArray(data.data,)
    // console.log( this.treeData)
  }
//递归处理tree数据
  getTreeFromArray(array:any, id = 'codeId', pid = 'parentId', parentValue = '') {
   return  array
    .filter((item:any) => item[pid] === parentValue)
    .map((item:any)=>{
     let children = this.getTreeFromArray(array,id,pid,item[id])
    return  children.length > 0 ? {...item,children}:{...item}
    }).sort((a:any,b:any)=>{
      return a.sort-b.sort
    })
}
  // //点击树节点
  fromData: any ={}
  flag : boolean = false
  async getNode(data: any) {
    this.Titles = data.name
    this.flag = true
    this.fromData = data
   console.log(data)
  }
  handleDelete() {
    this.$confirm(
      `此操作将永久删除"${this.Titles}"及其子节点, 是否继续?`,
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    ).then(() => {
      this.delLoading = true;
    let url = "/wjBaseServer/Code/SystemCode/Del";
    let params = {
      codeMyid: this.fromData.codeMyid,
      codeId:this.fromData.codeId,
      parentId:this.fromData.parentId
    }
    publicApi.postWithParam(url, params).then((data: any) => {
      if (data.result == true) {
        this.delmodel = false;
        this.$SucMessage.info("删除成功");
        this.delLoading = false;
        this.getTree();
      } else {
        this.$SucMessage.error("删除失败");
        this.delLoading = false;
      }
    });
    });
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.module-view {
  position: relative;
  padding: 10px;
  background-color: $pages-bg;
  .bg-shadow {
    background-color: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  }
  .top {
    padding: 14px 15px;
    display: flex;
    justify-content: space-between;
    .button-pannel {
      display: inline-block;
      margin-right: 16px;
    }
  }
  .plan {
    display: flex;
    margin-top: 10px;
    overflow: auto;
    height: calc(100% - 70px);
    .left {
      padding-top: 10px;
      padding: 10px;
      width: 100%;
      height: 100%;
      .tree {
        margin-top: 20px;
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
