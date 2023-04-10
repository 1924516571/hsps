<template>
  <div class="header_bar">
    <div class="bar-item">
      <span>惠山排水后台管理系统</span>
    </div>
    <Menu mode="horizontal" theme="primary" :active-name="activeNav">
       <MenuItem name="dataCenter" to="/main/dataCenter">
        <span>数据中心</span>
      </MenuItem>
      <MenuItem name="basicData" to="/main/basicData">
        <span>后台管理</span>
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="md-person" />
          <span>{{username }}</span>
        </template>
        <MenuItem name="3-1">
          <span @click="logout">注销登录</span>
        </MenuItem>
        <MenuItem name="3-4">
          <span @click="changePassword">密码修改</span>
        </MenuItem>
      </Submenu>
    </Menu>
    <Modal v-model="model" title="修改密码" @on-ok="saved('formCustom')" @on-cancel="model = false">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
        <FormItem prop="passwd" label="新密码：">
          <Input type="password" v-model="formCustom.passwd" placeholder="请输入新密码" />
        </FormItem>
        <FormItem prop="passwdCheck" label="密码确认：">
          <Input type="password" v-model="formCustom.passwdCheck" placeholder="请再次输入新密码" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { Menu, MenuItem, Icon, Modal, Form, FormItem, Input } from "iview";
import axios from "axios";
import { publicApi } from "@/api";
const mapStore = namespace("mapStore");

//@ts-ignore
const Submenu = Menu.Sub;

@Component({
  components: {
    Menu,
    MenuItem,
    Submenu,
    Icon,
    Modal,
    Form,
    FormItem,
    Input,
  },
})
export default class topBar extends Vue {
  @State user: any;
  @mapStore.Mutation setMarkers: any;
  @mapStore.Mutation setMarkerFlag: any;
  // @Watch("$route", { deep: true })
  // changeRoute(val: any) {
  //   let reg = /home|aPicture|accessment|pieNetwork|environment|flood|film|statistic|dataCenter|management|system/g;
  //   if (val.path.match(reg)) {
  //     this.setMarkers([]);
  //     this.setMarkerFlag("");
  //   }
  // }

  activeNav: string = "";
  model: boolean = false; //弹框默认的是关闭的
  formCustom: any = {
    password: null,
    passwd: null,
    passwdCheck: null,
  };

  validatePass: any = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请输入密码"));
    } else {
      if (this.formCustom.passwdCheck !== "") {
        // 对第二个密码框单独验证
        let form: any = this.$refs.formCustom;
        form.validateField("passwdCheck");
      }
      callback();
    }
  };
  validatePassCheck: any = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请再次输入新密码"));
    } else if (value !== this.formCustom.passwd) {
      callback(new Error("两次新密码输入不匹配!"));
    } else {
      callback();
    }
  };
  ruleCustom: any = {
    password: [{ required: true, message: "请输入密码" }],
    passwd: [{ required: true, validator: this.validatePass, trigger: "change" }],
    passwdCheck: [{ required: true, validator: this.validatePassCheck, trigger: "change" }],
  };

  username: any = "";
  token: any = "";
  mounted() {
    this.username = localStorage.getItem("reporter");
    this.activeNav = this.$route.matched[1].meta.name;
  }

  async chuan() {
    // let url='wjAuthServer/authentication/user/infoByToken'
    // let data = await publicApi.getNoParam(url);
    // console.log('tt',data.data.hzzToken)
    // console.log('jsontt',JSON.parse(window.localStorage.getItem("userInfo") || "0").hzzToken)
    this.token = JSON.parse(window.localStorage.getItem("userInfo") || "0").hzzToken;
    window.open(
      // "http://172.18.64.76:8089/hzz/zyportal5/html/login.html?token="+this.token,
      // "http://192.168.1.164:8014/hzz/zyportal5/html/login.html?token="+this.token,
      "http://172.18.64.76:8088/hzz/zyportal5/html/login.html?token=" + this.token,
      "_blank"
    );
  }

  // 退出登录
  logout() {
    let that = this;
    that.$http
      .get("wjAuthServer/authentication/logout")
      .then((res) => {
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("userId");
        localStorage.removeItem("roleName");
        localStorage.removeItem("departmentId");
        localStorage.removeItem("departmentName");
        localStorage.removeItem("reporter");
        localStorage.removeItem("areaCode");
        localStorage.removeItem("userInfo");
        that.$http.defaults.headers["refresh-token"] = undefined;
        axios.defaults.headers["Authorization"] = undefined;
        that.$router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 修改密码
  changePassword() {
    this.model = true;
  }
  saved(name: string) {
    let ref: any = this.$refs[name];
    ref.validate((valid: any) => {
      if (valid) {
        let url = "wjBaseServer/system/user/updateUserPassword";
        let params: any = {
          // old: this.formCustom.password,
          password: this.formCustom.passwd,
        };
        axios.put(url, null, { params }).then((res: any) => {
          if (res.data.result) {
            this.$Message.success("密码修改成功!");
            this.$router.push("/login");
          }
        });
      } else {
        this.$Message.error("修改失败!");
      }
    });
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.header_bar {
  min-width: 900px;
  font-size: 12px;
  width: 100%;
}
.bar-item {
  float: left;
  padding-left: 15px;
  line-height: 50px;
  width: 390px;
  // width: 20%;
  height: 100%;
  font-size: 22px;
  color: #ffffff;
}

// #{$deep}.header_bar > ul {
//   width: 71%;
// }
</style>
