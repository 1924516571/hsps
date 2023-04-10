<template>
  <div>
    <!-- 一级弹框 -->
    <div>
      <el-dialog :fullscreen="dialogFull" :append-to-body="true" :title="title" :visible.sync="modal" :close-on-click-modal="true" :before-close="onCancel">
        <!-- 基本信息 -->
        <div class="mainTitle">基本信息</div>
        <el-form :model="formParams" ref="marketForm" label-width="auto" size="small" :rules="rules">
          <div class="form">
            <div class="aa">
              <el-form-item label="租户姓名:" prop="name">
                <el-input v-model="formParams.name" style="width: 100%" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="身份证号:" prop="idCard">
                <suc-input v-model="formParams.idCard" style="width: 100%" placeholder="请输入"></suc-input>
              </el-form-item>
              <el-form-item label="联系电话:">
                <suc-input v-model="formParams.telephone" style="width: 100%" placeholder="请输入"></suc-input>
              </el-form-item>
              <el-form-item label="出租类型:">
                <el-select v-model="formParams.leaseType" placeholder="请选择" style="width: 100%">
                  <el-option label="对外市场人员" value="对外市场人员"></el-option>
                  <el-option label="机关事业单位及下属企业人员" value="机关事业单位及下属企业人员"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="aa">
              <el-form-item label="租户性别:" prop="sex">
                <el-select v-model="formParams.sex" placeholder="请选择" style="width: 100%">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="户口所在地:">
                <suc-input v-model="formParams.areaName" style="width: 100%" placeholder="请输入"></suc-input>
              </el-form-item>
              <el-form-item label="工作单位:">
                <suc-input v-model="formParams.company" style="width: 100%" placeholder="请输入"></suc-input>
              </el-form-item>
            </div>
          </div>
          <!-- 家庭成员一级页面 -->
          <div style="margin-top:30px;">
            <div class="mainTitle">家庭成员</div>
            <div class="main_table">
              <div class="xz">
                <suc-button type="primary" @click="addRow" :debounce="800">新增</suc-button>
              </div>
              <el-table class="tableListValue" :data="formParams.familyMemberList" style="width: 100%" max-height="250">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="userName" label="姓名" width="100"> </el-table-column>
                <el-table-column prop="idCard" label="身份证号" width="200"> </el-table-column>
                <el-table-column prop="familyRelations" label="与租户关系" width="120"> </el-table-column>
                <el-table-column prop="marriage" label="婚否" width="100"> </el-table-column>
                <el-table-column prop="areaName" label="户籍" width="250"> </el-table-column>
                <el-table-column prop="company" label="工作单位(所在学校)" width="250"> </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button @click="deleteRow(scope.$index, scope.row)" type="danger" size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 现有住房情况 -->
          <div style="margin-top:40px;">
            <div class="mainTitle">现有住房情况</div>
            <div class="main_table">
              <div class="xz">
                <suc-button type="primary" @click="addHouseRow" :debounce="800">新增</suc-button>
              </div>
              <el-table class="tableListValue" :data="formParams.houseSituationList" style="width: 100%" max-height="250">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="houseNature" label="房屋性质"> </el-table-column>
                <el-table-column prop="houseLocation" label="房屋座落" width="250"> </el-table-column>
                <el-table-column prop="floorage" label="建筑面积（m2）"> </el-table-column>
                <el-table-column prop="ownerLessee" label="产权人或承租人"> </el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button class="" @click.native.prevent="houseDelete(scope.$index, formParams.houseSituationList)" type="danger" size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-form>
        <template slot="title">
          <div class="avue-crud__dialog__header">
            <span class="el-dialog__title">
              {{ title }}
            </span>
            <div class="avue-crud__dialog__menu" @click="dialogFull ? (dialogFull = false) : (dialogFull = true)">
              <i class="el-icon-full-screen"></i>
            </div>
          </div>
        </template>
        <div slot="footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onOk()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 家庭成员二级弹框 -->
    <div class="famBody">
      <el-dialog :append-to-body="true" title="新增家庭成员" :visible.sync="fammilyModal" :close-on-click-modal="false" :before-close="cancelFammilyModal">
        <el-form :model="fammilyFormParams" ref="fammilyForm" label-width="auto" size="small" :rules="fammilyRules">
          <div style="margin-bottom:45px;">
            <el-form-item label="姓名:" prop="userName">
              <el-input v-model="fammilyFormParams.userName" style="width: 100%" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div style="margin-bottom:45px;">
            <el-form-item label="身份证号:">
              <el-input v-model="fammilyFormParams.idCard" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')" style="width: 100%" placeholder="请正确输入"></el-input>
            </el-form-item>
          </div>
          <div style="margin-bottom:45px;">
            <el-form-item label="与租户关系:">
              <suc-input v-model="fammilyFormParams.familyRelations" style="width: 100%" placeholder="请输入"></suc-input>
            </el-form-item>
          </div>
          <div style="margin-bottom:45px;">
            <el-form-item label="婚否:">
              <suc-input v-model="fammilyFormParams.marriage" style="width: 100%" placeholder="请输入"></suc-input>
            </el-form-item>
          </div>
          <div style="margin-bottom:45px;">
            <el-form-item label="户籍:">
              <suc-input v-model="fammilyFormParams.areaName" style="width: 100%" placeholder="请输入"></suc-input>
            </el-form-item>
          </div>

          <div style="margin-bottom:45px;">
            <el-form-item label="工作单位(所在学校):">
              <suc-input v-model="fammilyFormParams.company" style="width: 100%" placeholder="请输入"></suc-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer">
          <el-button @click="cancelFammilyModal">取 消</el-button>
          <el-button type="primary" @click="fammilyOk">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 住房情况二级弹框 -->
    <div class="famBody">
      <el-dialog :append-to-body="true" title="新增住房情况" :visible.sync="houseModal" :close-on-click-modal="false" :before-close="cancelHouseModal">
        <el-form :model="houseFormParams" ref="houseForm" label-width="auto" size="small">
          <div style="margin-bottom:45px;">
            <el-form-item label="房屋性质:">
              <el-input v-model="houseFormParams.houseNature" style="width: 100%" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div style="margin-bottom:45px;">
            <el-form-item label="房屋坐落:">
              <el-input v-model="houseFormParams.houseLocation" style="width: 100%" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div style="margin-bottom:45px;">
            <el-form-item label="建筑面积(m2):">
              <el-input v-model="houseFormParams.floorage" oninput="value=value.replace(/[^0-9.]/g,'')" style="width: 100%" placeholder="请正确输入"></el-input>
            </el-form-item>
          </div>
          <div style="margin-bottom:45px;">
            <el-form-item label="产权人或者承租人:">
              <suc-input v-model="houseFormParams.ownerLessee" style="width: 100%" placeholder="请输入"></suc-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer">
          <el-button @click="cancelHouseModal">取 消</el-button>
          <el-button type="primary" @click="houseOk()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucForm, SucFormItem, SucInput, SucSelect, SucDatePicker, SucButton } from "@suc/ui";
import { TableNo } from "@/components";
import { validateIdNo } from "@/utils/validator.js";
@Component({
  components: {
    SucModal,
    SucForm,
    SucFormItem,
    SucInput,
    SucSelect,
    SucDatePicker,
    TableNo,
    SucButton,
  },
})
export default class MarketHouseModal extends Vue {
  @Prop() title!: string;
  @Prop() modal!: boolean;
    //监听弹框关闭
  @Watch("modal")
  getModalVal() {
    if (this.modal==false) {
      (this.$refs["marketForm"] as any).resetFields();
    }
  }
  fammilyModal: boolean = false;
  dialogFull: boolean = false;
  houseModal: boolean = false;
  fammilyFormParams: any = {};
  houseFormParams: any = {};

  scope: any = "";
  rules: any = {
    name: [{ required: true, message: "请输入租户姓名", trigger: "blur" }],
    sex: [{ required: true, message: "请选择性别", trigger: "change" }],
    idCard: [{ required: true, trigger: "blur", validator: validateIdNo }],
  };
  fammilyRules: any = {
    userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  };
  // 家庭成员数据
  // tableData: any = [
  //   {
  //     name: "单朋",
  //     idCard: "32083019940823241X",
  //     familyRelations: "姨夫",
  //     marriage: "否",
  //     areaName: "上海市普陀区金沙江路 1518 弄",
  //     company: "江苏省无锡市新吴区中科智远",
  //   },
  //   {
  //     name: "周恒",
  //     idCard: "32083019940823241X",
  //     familyRelations: "姨夫",
  //     marriage: "否",
  //     areaName: "上海市普陀区金沙江路 1518 弄",
  //     company: "江苏省无锡市新吴区中科智远",
  //   },
  //   {
  //     name: "树杰",
  //     idCard: "32083019940823241X",
  //     familyRelations: "姨夫",
  //     marriage: "否",
  //     areaName: "上海市普陀区金沙江路 1518 弄",
  //     company: "江苏省无锡市新吴区中科智远",
  //   },
  //   {
  //     name: "宇哥",
  //     idCard: "32083019940823241X",
  //     familyRelations: "姨夫",
  //     marriage: "否",
  //     areaName: "上海市普陀区金沙江路 1518 弄",
  //     company: "江苏省无锡市新吴区中科智远",
  //   },
  // ];
  // 住房
  // houseTableData: any = [
  //   {
  //     houseNature: "棚户",
  //     houseLocation: "无锡新安",
  //     floorage: "30",
  //     ownerLessee: "国家",
  //   },
  //   {
  //     houseNature: "拆迁",
  //     houseLocation: "无锡市新吴区东方天君dadsadsafdsafqweuhwqueqhe qeq heq jeq he    kqeq    ",
  //     floorage: "89",
  //     ownerLessee: "单朋",
  //   },
  //   {
  //     houseNature: "拆迁",
  //     houseLocation: "无锡市新吴区东方天君",
  //     floorage: "120",
  //     ownerLessee: "宇哥",
  //   },
  //   {
  //     houseNature: "拆迁",
  //     houseLocation: "无锡市新吴区东方天君",
  //     floorage: "120",
  //     ownerLessee: "宇哥",
  //   },
  //   {
  //     houseNature: "拆迁",
  //     houseLocation: "无锡市新吴区东方天君",
  //     floorage: "120",
  //     ownerLessee: "宇哥",
  //   },
  //   {
  //     houseNature: "拆迁",
  //     houseLocation: "无锡市新吴区东方天君",
  //     floorage: "120",
  //     ownerLessee: "宇哥",
  //   },
  //   {
  //     houseNature: "拆迁",
  //     houseLocation: "无锡市新吴区东方天君",
  //     floorage: "120",
  //     ownerLessee: "宇哥",
  //   },
  //   {
  //     houseNature: "拆迁",
  //     houseLocation: "无锡市新吴区东方天君",
  //     floorage: "120",
  //     ownerLessee: "宇哥",
  //   },
  //   {
  //     houseNature: "拆迁",
  //     houseLocation: "无锡市新吴区东方天君",
  //     floorage: "120",
  //     ownerLessee: "宇哥",
  //   },
  //   {
  //     houseNature: "拆迁",
  //     houseLocation: "无锡市新吴区东方天君",
  //     floorage: "120",
  //     ownerLessee: "宇哥",
  //   },
  // ];

  @Prop({ type: Object, default: () => {} })
  formParams!: any; //新增接口需要的参数
  @Emit()
  toggle(val: boolean) {
    return val;
  }
  @Emit()
  onSubmit() {}
  onCancel() {
    this.toggle(false);
    (this.$refs["marketForm"] as any).resetFields();
    // (this.$refs["houseForm"] as any).resetFields();
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

  // 家庭
  deleteRow(index: any, row: any) {
    this.formParams.familyMemberList.splice(index, 1);
    this.$message({
      message: "这条已删除",
      type: "success",
      customClass: "messageIndex",
    });
  }
  //住房情况
  houseDelete(index: any, rows: any) {
    rows.splice(index, 1); //从数组索引位置删除一个 index是点击数组的索引
    this.$message({
      message: "这条已删除",
      type: "success",
      customClass: "messageIndex",
    });
  }
  // 新增成员
  addRow() {
    this.fammilyModal = true;
    // (this.$refs["fammilyForm"] as any).resetFields();
    this.fammilyFormParams = {};
  }
  // 房屋新增
  addHouseRow() {
    this.houseModal = true;
    // (this.$refs["houseForm"] as any).resetFields();
    this.houseFormParams = {};
  }
  mounted() {}
  cancelFammilyModal() {
    this.fammilyModal = false;
  }
  cancelHouseModal() {
    this.houseModal = false;
  }

  fammilyOk() {
    (this.$refs["fammilyForm"] as any).validate((valid: any) => {
      if (valid) {
        this.fammilyModal = false;
        this.formParams.familyMemberList.push(this.fammilyFormParams);
        console.log(this.formParams.familyMemberList, "88888");

        this.$message({
          type: "success",
          message: "新增家庭成员成功",
          customClass: "messageIndex",
        });
      } else {
        this.$message({
          type: "error",
          message: "新增家庭成员失败",
          customClass: "messageIndex",
        });
        return false;
      }
    });
  }
  houseOk() {
    this.houseModal = false;
    this.formParams.houseSituationList.push(this.houseFormParams);
    this.$message({
      type: "success",
      message: "新增住房情况成功",
      customClass: "messageIndex",
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
    .mainTitle {
      font-weight: 600;
      font-size: 20px;
      top: -15px;
      position: relative;
    }
  }
}

.avue-crud__dialog__menu {
  float: right;
  margin-right: 26px;
  color: #fff;
  padding-top: 3px;

  .el-icon-full-screen {
    cursor: pointer;
    color: #fff !important;
  }
  .el-icon-full-screen:before {
    content: "\e719";
  }
}

//滚动条样式
#{$deep} {
  .tableListValue {
    width: 8px;
    margin-left: 0.8vh;
    //滚动条的宽高
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    //滚动条的滑块背景色
    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #e1e1e1;
    }
    //滚动条的背景色
    ::-webkit-scrollbar-track {
      background: rgba(#ccc, 0.3);
    }
  }
}
.form {
  width: 100%;
  height: auto;
  display: flex;
  .aa {
    flex: 1;
    margin-right: 10px;
  }
}
.main_table {
  position: relative;
  .xz {
    position: absolute;
    top: -48px;
    right: 20px;
  }
}
</style>

<style lang="scss">
// 设置的值一定要比2007大，因为dialog的层级是2007
.messageIndex {
  z-index: 9999 !important;
}
</style>
