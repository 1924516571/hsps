<template>
  <div>
    <div>
      <el-dialog :append-to-body="true" :title="title" :visible.sync="fpqxmodal" :close-on-click-modal="true" :before-close="onCancel">
        <el-form :model="fpParams" ref="marketForm" label-width="auto" size="small">
          <div>
            <el-tree
              ref="checkTree"
              show-checkbox
              :data="treeData"
              default-expand-all
              :expand-on-click-node="false"
              @check-change="getNode"
              check-strictly="true"
              :props="defaultProps"
              :highlight-current='true'
              node-key="id"
             :default-checked-keys="array"
            ></el-tree>
          </div>
        </el-form>
        <div slot="footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onOk()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker, SucButton } from "@suc/ui";
import { SearchComponent, TablePage } from "@/components";
import { publicApi } from "@/api";
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    SucDatePicker,
    TablePage,
    SucButton,
  },
})
export default class MarketHouseModal extends Vue {
  @Prop() title!: string;
  @Prop() fpqxmodal!: boolean;
  @Prop({ type: Object, default: () => {} })
  @Prop() fpParams!: any; //新增接口需要的参数
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  @Emit()
  onSubmit() {}
  onCancel() {
    this.toggle(false);
    (this.$refs["marketForm"] as any).resetFields();
  }
  @Watch("fpParams")
  getid(){
    if(this.fpParams!=''){
      // this.getTree()
      this.onfpparams()
    }
  }
  treeData: any = [];
  defaultProps: any = {
    children: "children",
    label: "name",
  };
  permission: any = []; //选中节点id
  arr:any=[];
  list:Array<any>=[];
  array:Array<any>=[];
  currentNodekey:any=''
  onfpparams(){
    this.treeData=[]
    this.list=this.fpParams
    this.arr=[]
    this.list.forEach(item => {
      if(item.checked==true){
        this.arr.push(item.id)
      }
      this.array=this.arr
      if(!item.pId){
        this.treeData.push(item)
      }
      const children=this.list.filter(data=>data.pId===item.id)
      if(!children.length)return
      item.children=children
    });
  }
  //点击树节点
  async getNode(data:any,val:any) {
    this.permission=this.array
    if(val==true){
      this.permission.push(data.id); 
    }else{
      this.permission = this.permission.filter((item: any) => item != data.id)
      for (let i = 0; i < this.permission.length; i++){
        if (this.permission[i].id == data.id){
          this.permission.splice(i,1)
        }
      }
    }
    this.fpParams.id=this.permission.join(",")
  }
  
  onOk() {
    (this.$refs["marketForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
      } else {
        return false;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
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
      height: 570px;
      overflow-y: auto;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
  }
}
.form {
  display: flex;
  div {
    flex: 1;
    margin-right: 10px;
  }
}
</style>