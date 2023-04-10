<template>
  <el-dialog :title="title" :visible.sync="model" :close-on-click-modal="true" :before-close="onCancel">
<el-form :model="formParams" :rules="rules" ref="userForm" label-width="auto" size="small">
    <panel-view heading="账户信息">
      <el-form-item label="账号:"  prop="username" class="tableStyle">
        <el-input v-model="formParams.username" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="密码:" prop="password" class="tableStyle">
        <el-input  v-model="formParams.password" placeholder="请输入"></el-input>
      </el-form-item>
    </panel-view>

    <panel-view heading="个人信息">
      <el-form-item label="姓名:" prop="realname" class="tableStyle">
        <el-input v-model="formParams.realname" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="身份证:" class="tableStyle">
        <el-input v-model="formParams.idNum" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="邮箱:" class="tableStyle">
        <el-input v-model.number="formParams.email" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="电话:" class="tableStyle">
        <el-input v-model="formParams.tel" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="性别:" class="tableStyle">
        <el-radio-group v-model="formParams.sex">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="0">女</el-radio>
      </el-radio-group>
      </el-form-item>

      <!-- <el-form-item label="职务:" class="tableStyle">
        <suc-date-picker v-model="formParams.createtime" :options="dateOptions"></suc-date-picker>
      </el-form-item> -->

      <el-form-item label="生日:" class="tableStyle">
        <el-input v-model="formParams.birthday" style="width:100%;" placeholder="请输入"></el-input>
      </el-form-item>
    </panel-view>
      
    <panel-view heading="个人信息">
      <el-form-item label="启用:" class="tableStyle">
        <el-radio-group v-model="formParams.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="行政区域:" class="tableStyle">
          <el-cascader
            v-model="formParams.areaCode"
            :options="areaOptions"
            :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
            style="width:100%;"
            size="small"
            placeholder="行政区域"
            clearable
            @change="handleChange"
          ></el-cascader>
      </el-form-item>
      <el-form-item label="角色:" class="tableStyle">
       <el-select  v-model="formParams.roleId"  style="width:100%;" placeholder="选择角色" >
          <el-option v-for="item in roleOption"  :label="item.label" :value="item.value" :key="item.index"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限关联:" class="tableStyle">
        <el-select  v-model="formParams.departmentId"  style="width:100%;" placeholder="选择部门" >
          <el-option v-for="item in organizeOption"  :label="item.label" :value="item.value" :key="item.index"> </el-option>
        </el-select>
      </el-form-item>
    </panel-view>
      
      
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
import { PanelView } from '@/components'
import { publicApi } from "@/api";
import dayjs from "dayjs";
const mapStore = namespace("mapStore");
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    SucDatePicker,
    PanelView
  },
})
export default class UserModal extends Vue {
  dateOptions: any = {
    type: "date",
  };
  user: any = JSON.parse(localStorage.getItem("userInfo") || "");
  areaOptions: any = [];
  organizeOption: any = []; //抢险机构性质
  roleOption: any = []; //抢险性质

  // 检验
  validatenumdw: any = (rule: any, value: any, callback: any) => {
    // if (value === "" || value === null) {
    //   callback();
    // } else {
    //   if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
    //     callback(new Error("请输入正确的手机号码"));
    //   } else {
    //     callback();
    //   }
    // }
    let reg = /^1[345789]\d{9}$/;
    if (!reg.test(value)) {
      callback(new Error("请输入11为手机号"));
    } else {
      callback();
    }
  };

  rules :any = {
    realname: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    username : [
      { required: true, message: "请输入账号", trigger: "blur" },
    ],
    password : [
      { required: true, message: "请输入密码", trigger: "blur" },
    ],
    tel: [{ required: true, trigger: "blur", message: "请填写正确的手机号", validator: this.validatenumdw }],
  };
  @Prop() title!: string;
  @Prop() loading!: boolean; //控制加载
  @Prop() model!: boolean; //控制弹框显隐
  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Emit()
  async onSubmit() {}
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  onOk() {
    (this.$refs["userForm"] as any).validate((valid: any) => {
      if (valid) {
        this.onSubmit();
        this.formParams.createtime = dayjs(this.formParams.createtime).format("YYYY-MM-DD"); //关键地方
        if (this.formParams.areaCode != undefined) {
          this.formParams.areaCode = this.formParams.areaCode.toString();
        }
      } else {
        return false;
      }
    });
  }
  // 取消的时候将表单值置位空
  onCancel() {
    this.toggle(false);
    (this.$refs["userForm"] as any).resetFields();
  }

  handleChange(val: any) {
    if (val != undefined) {
      this.formParams.areaCode = val.toString();
    } else {
      this.formParams.areaCode = "";
    }
  }
  mounted() {
    this.getAreaCode(); //获取所属区域
    this.getBmList(); //获取部门列表
    this.getRoleList(); 
  }

  async getBmList() {
    const url = "wjBaseServer/system/department/queryTree";
    const data = await publicApi.postNoParam(url);
    this.organizeOption = data.data.map((e: any) => {
      return {
        value: e.departmentId,
        label: e.fullName,
      };
    });
  }
  // 角色列表
  async getRoleList() {
    const url = "wjBaseServer/system/role/roleList";
    const data = await publicApi.postWithParam(url,{pageSize: 999});
    this.roleOption = data.data.rows.map((e: any) => {
      return {
        value: e.id,
        label: e.name,
      };
    });
    
  }

  async getAreaCode() {
    let data = await publicApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]);
  }
  getTreeData(data: any) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].children.length < 1) {
        data[i].children = undefined;
      } else {
        this.getTreeData(data[i].children);
      }
    }
    return data;
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

.tableStyle{
  width: 42%;
  display: inline-block;
  margin-right: 5%;
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
