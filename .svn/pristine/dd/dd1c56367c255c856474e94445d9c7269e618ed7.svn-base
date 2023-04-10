<template>
  <!-- 调水模型新增弹框 -->
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel"  v-if="model">
    <el-form :model="formParams"  :rules="rules" ref="yinjForm" label-width="auto" size="small">
      <el-form-item label="调水模型名称:">
        <suc-input v-model="formParams.modelname" style="width:100%;" placeholder="请输入"></suc-input>
      </el-form-item>

      <el-form-item label="目标河道:"  prop="targetrivername">
        <el-select  v-model="formParams.targetrivername"  @change="mbName($event)" style="width:100%;" placeholder="请选择" size="mini">
        <el-option v-for="item in mbOption"  :label="item.label" :value="{rivername:item.label,riverid:item.value,sectionname:item.lab,id:item.val}" :key="item.index"> </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="监测断面:">
        <el-select  v-model="formParams.targetsectionname" @change="mbNames($event)"  style="width:100%;" placeholder="请选择" size="mini">
        <el-option v-for="item in mbOptions" :label="item.label" :value="{sectionname:item.label,id:item.value}" :key="item.index"> </el-option>
      </el-select>
      </el-form-item>
      
      <el-form-item label="源头河道:"  prop="sourcerivername">
        <el-select  v-model="formParams.sourcerivername"  @change="ytName($event)" style="width:100%;" placeholder="请选择" size="mini">
        <el-option v-for="item in ytOption" :label="item.label" :value="{rivername:item.label,riverid:item.value,sectionname:item.lab,id:item.val}" :key="item.index"> </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="监测断面:">
        <el-select  v-model="formParams.sourcesectionname" @change="ytNames($event)" style="width:100%;" placeholder="请选择" size="mini">
        <el-option v-for="item in ytOptions"  :label="item.label" :value="{sectionname:item.label,id:item.value}" :key="item.index"> </el-option>
      </el-select>
      </el-form-item>

      <el-form-item label="过水河道:">
        <el-select  v-model="formParams.crossrivername"  @change="gsName($event)" style="width:100%;" placeholder="请选择"  size="mini">
        <el-option v-for="item in gsOption" :label="item.label" :value="{rivername:item.label,riverid:item.value,sectionname:item.lab,id:item.val}" :key="item.index"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="监测断面:">
         <el-select  v-model="formParams.crosssectionname" @change="gsNames($event)" style="width:100%;" placeholder="请选择" size="mini">
        <el-option v-for="item in gsOptions" :label="item.label" :value="{sectionname:item.label,id:item.value}" :key="item.index"> </el-option>
      </el-select>
      </el-form-item>

      <el-form-item label="备注">
        <suc-input v-model="formParams.nt"   style="width:100%;" type="textarea"  placeholder="请输入" ></suc-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker } from "@suc/ui";
import { infoApi, publicApi } from "@/api";
import { mapGetters, mapState } from "vuex";
const mapStore = namespace("mapStore");
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    SucDatePicker,
  },
})

export default class CreatePolluters1 extends Vue {
  olMap = this.$getMapConfig();
  dateOptions: any = {
    type: "date",
  };
  user: any = JSON.parse(localStorage.getItem("userInfo") || "");
  @Prop() chuan!: any;
  mbhd:any={
    mbhdname:'',
    mbdmname:'',
    mbhdid:'',
    mbdmid:''
  }
  mbOption: any = [];
  ytOption: any = [];
  gsOption: any = [];
  mbOptions: any = [];
  ytOptions: any = [];
  gsOptions: any = [];
  rules = {
    targetrivername: [{ required: true, message: "请选择目标河道", trigger: "blur" }],
    sourcerivername: [{ required: true, message: "请选择源头河道", trigger: "blur" }],
    targetsectionname: [{ required: true, message: "请选择断面", trigger: "blur" }],
    sourcesectionname: [{ required: true, message: "请选择断面", trigger: "blur" }],
   
  };
  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {
  }
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  onOk() {
    (this.$refs["yinjForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
        this.getmbData()
      } else {
        return false;
      }
    });
  }
  onCancel() {
    this.toggle(false);
    this.getmbData();
    (this.$refs["yinjForm"] as any).resetFields();
  }
  // async handleChange(value: any) {
  //   this.formParams.rivername = value.toString();
  // }
  
  mounted() {
    this.getmbData(); 
  }
  
  mbName(event:any) {
    this.formParams.targetrivername=event.rivername;
    this.formParams.targetriver=event.riverid;
    this.formParams.targetsectionname=event.sectionname;
    this.formParams.targetsection=event.id;
    var newarray= this.mbOptions.filter((item:any)=>item.rivername==this.formParams.targetrivername)
    this.mbOptions = newarray.map((e: any) => {
      return {
        value: e.id,
        label: e.sectionname, 
      };
    })
  }
  ytName(event:any) {
    this.formParams.sourcerivername=event.rivername;
    this.formParams.sourceriver=event.riverid;
    this.formParams.sourcesectionname=event.sectionname;
    this.formParams.sourcesection=event.id;
    var newarray= this.ytOptions.filter((item:any)=>item.rivername==this.formParams.sourcerivername)
      this.ytOptions = newarray.map((e: any) => {
      return {
        value: e.id,
        label: e.sectionname, 
      };
    })
  }
  gsName(event:any) {
    this.formParams.crossrivername=event.rivername;
    this.formParams.crossriver=event.riverid;
    this.formParams.crosssectionname=event.sectionname;
    this.formParams.crosssection=event.id;
    var newarray= this.gsOptions.filter((item:any)=>item.rivername==this.formParams.crossrivername)
      this.gsOptions = newarray.map((e: any) => {
      return {
        value: e.id,
        label: e.sectionname, 
      };
    })
  }

  mbNames(event:any) {
    this.formParams.targetsectionname=event.sectionname;
    this.formParams.targetsection=event.id;
    var newarray= this.mbOptions.filter((item:any)=>item.rivername==this.formParams.targetrivername)
    this.mbOptions = newarray.map((e: any) => {
      return {
        value: e.id,
        label: e.sectionname, 
      };
    })
  }
  
   ytNames(event:any) {
    this.formParams.sourcesectionname=event.sectionname;
    this.formParams.sourcesection=event.id;
    var newarray= this.mbOptions.filter((item:any)=>item.rivername==this.formParams.targetrivername)
    this.mbOptions = newarray.map((e: any) => {
      return {
        value: e.id,
        label: e.sectionname, 
      };
    })
  }

  gsNames(event:any) {
    this.formParams.crosssectionname=event.sectionname;
    this.formParams.crosssection=event.id;
    var newarray= this.mbOptions.filter((item:any)=>item.rivername==this.formParams.targetrivername)
    this.mbOptions = newarray.map((e: any) => {
      return {
        value: e.id,
        label: e.sectionname, 
      };
    })
  }
 
  async getmbData() {
    const url = "wjServer/waterENVIR/model/rivers";
    const data = await publicApi.getNoParam(url);
    this.mbOptions=data.data
    this.ytOptions=data.data
    this.gsOptions=data.data
    var result=[]
    for (let i = 0; i <data.data.length; i++) {
      var flag=true
      for (let j = 0; j < result.length; j++) {
        if(data.data[i].rivername===result[j].rivername){
          flag=false
        }
      }
      if(flag){
        result.push(data.data[i])
      }
    }

    this.mbOption =result.map((e: any) => {
      return{
        value: e.riverid,
        label: e.rivername,
        val:e.id,
        lab:e.sectionname
      }
    })
    this.ytOption = result.map((e: any) => {
      return {
        value: e.riverid,
        label: e.rivername,
        val:e.id,
        lab:e.sectionname
      };
    })
    this.gsOption = result.map((e: any) => {
      return {
        value: e.riverid,
        label: e.rivername,
        val:e.id,
        lab:e.sectionname
      };
    })
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
      height: 500px;
      overflow-y: auto;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
  }
}

::v-deep.suc-select {
  .ivu-select-selection .ivu-select-selected-value {
    font-size: 13px;
    color: #606266;
  }
}

::v-deep.el-input--small .el-input__inner {
  margin: 3px 0;
}
::v-deep .upload-demo {
  .el-upload-list .el-upload-list--picture {
    .el-upload-list__item {
      width: 300px;
    }
  }
}
</style>
