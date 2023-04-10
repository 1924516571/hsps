<template>
  <div class="dialogMain">
    <el-dialog title="详情" :visible.sync="modal" width="width" :before-close="dialogBeforeClose">
      <div class="dialog_item">基础信息</div>
      <div class="dialog_form scroll">
        <el-form label-position="left" label-width="80px" :inline="true" :model="formParams" class="demo-form-inline" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item label="河湖编码">
                <el-input v-model="formParams.rvCd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="河湖名称">
                <el-input v-model="formParams.rvNm"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行政区域" style="width:100%;">
                <el-cascader
                  v-model="formParams.xzqy"
                  :options="areaOptions"
                  :props="{ expandTrigger: 'hover', value: 'myId', label: 'name', children: 'children', checkStrictly: true }"
                  @change="handleChange"
                  style="width:95%;"
                  size="small"
                  placeholder="所属区域"
                  clearable
                >
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="河湖级别" style="width:100%">
                <el-select v-model="formParams.hhjb" placeholder="河流等级" style="width:95%">
                  <el-option v-for="item in chuan" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属流域">
                <el-input v-model="formParams.ssly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所在水系">
                <el-input v-model="formParams.szsx"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="报警水位">
                <el-input v-model="formParams.bjsw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="警戒水位">
                <el-input v-model="formParams.jjsw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="受淹值(m)">
                <el-input v-model="formParams.syz"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="水面面积">
                <el-input v-model="formParams.smmj"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="平均水深">
                <el-input v-model="formParams.pjss"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最大水深">
                <el-input v-model="formParams.zdss"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="淡水属性" style="width:100%">
                <el-select v-model="formParams.ydssx" placeholder="淡水属性" style="width:90%">
                  <el-option v-for="item in ydssxData" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="湖泊容积">
                <el-input v-model="formParams.hprj"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="河道级别">
                <el-input v-model="formParams.hdjb"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="河道长度(km)">
                <el-input v-model="formParams.hlcd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产权归属">
                <el-input v-model="formParams.gccqgs"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上级河道">
                <el-input v-model="formParams.sjhd"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="下级河道">
                <el-input v-model="formParams.xjhd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="生态河道">
                <el-input v-model="formParams.sthd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="跨界类型">
                <el-input v-model="formParams.kjlx"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="规划标准断面(m)" label-width="150px">
                <el-input v-model.number="formParams.hkkd" placeholder="河口宽度" type="number"></el-input>
                <el-input v-model.number="formParams.hdkd" placeholder="河底宽度" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保护控制范围(m)" label-width="150px">
                <el-input v-model.number="formParams.bhkzfwzc" placeholder="左侧" type="number" style="80%"></el-input>
                <el-input v-model.number="formParams.bhkzfwyc" placeholder="右侧" type="number" style="80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="流域面积(km²)" label-width="150px">
                <el-input v-model.number="formParams.lymj" type="number" style="150px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="河源位置">
                <el-input v-model="formParams.hywz"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="河口位置">
                <el-input v-model="formParams.hkwz"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="formParams.bz" style="width:500px;" :rows="5"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <!-- <el-col :span="24">
              <el-form-item label="图片">
                <el-image style="width: 100px; height: 100px" :src="formParams.imgList[0]" :preview-src-list="formParams.imgList"> </el-image>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
      </div>
      <div class="dialog_item">关联河道</div>
      <div class="dialog_table">
        <table-no :columns="riverColumns" :tableData="subTableObject.associatedRivers"> </table-no>
      </div>
      <div class="dialog_item">所在圩区</div>
      <div class="dialog_table">
        <table-no :columns="wqColumns" :tableData="subTableObject.basicWeiqus"></table-no>
      </div>
      <div class="dialog_item">关联闸站</div>
      <div class="dialog_table">
        <table-no :columns="zzColumns" :tableData="subTableObject.basicPailaozhas">
          <template #createtime="{ row }">
            <div>
              <span>{{ getLocalTime(row.createtime) }}</span>
            </div>
          </template>
          <template #updatetime="{ row }">
            <div>
              <span>{{ getLocalTime(row.updatetime) }}</span>
            </div>
          </template>
        </table-no>
      </div>
      <div class="dialog_item">关联堤防</div>
      <div class="dialog_table">
        <table-no :columns="dfColumns" :tableData="subTableObject.basicDifangs"></table-no>
      </div>
      <div class="dialog_item">涉河监管</div>
      <div class="dialog_table">
        <table-no :columns="shColumns" :tableData="subTableObject.basicEngopretionRiverregulatories"></table-no>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucSelect } from "@suc/ui";
import { infoApi, publicApi } from "@/api";
import { TableNo } from "@/components";

@Component({
  components: {
    SucSelect,
    TableNo,
  },
})
export default class DetailModalRiver extends Vue {
  @Prop() modal!: boolean;
  @Prop() formParams!: any;
  @Prop() subTableObject!: any;
  @Prop() chuan!: any;
  tableData: any = [];
  associatedRiverTableData: any = [];
  ydssxData: any = [
    { value: "淡水", label: "淡水" },
    { value: "咸水", label: "咸水" },
  ]; //盐淡水数据

  areaOptions: any = []; //行政区域数据
  columns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "河湖代码",
      key: "rvCd",
    },
    {
      title: "河湖名称",
      key: "rvNm",
    },
    {
      title: "行政区域",
      key: "xzqy",
    },
    {
      title: "河湖级别",
      key: "hhjb",
    },
    {
      title: "测站",
      key: "cezhan",
    },
  ];

  //  关联河道
  riverColumns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "河湖代码",
      key: "rvCd",
    },
    {
      title: "河湖级别",
      key: "hhjb",
    },
    {
      title: "所属流域",
      key: "ssly",
    },
    {
      title: "所在水系",
      key: "szsx",
    },
    {
      title: "行政区域",
      key: "xzqy",
    },
    {
      title: "报警水位",
      key: "bjsw",
    },
    {
      title: "警戒水位",
      key: "jjsw",
    },
    {
      title: "报警水位",
      key: "bjsw",
    },
    {
      title: "受淹值",
      key: "syz",
    },
    {
      title: "水面面积",
      key: "smmj",
    },
    {
      title: "盐淡水属性",
      key: "bjsw",
    },
  ];

  // 圩区
  wqColumns: any[] = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "圩区名称",
      key: "wqmc",
    },
    {
      title: "涉及村",
      key: "sjc",
    },
    {
      title: "圩内总面积（亩）",
      key: "wnzmj",
    },
    {
      title: "圩内耕地面积（亩）",
      key: "wngdmj",
    },
    {
      title: "圩内水面面积（亩）",
      key: "wnsmmj",
    },
    {
      title: "圩外河道",
      key: "wwhd",
    },
    {
      title: "圩内河道",
      key: "wnhd",
    },
    {
      title: "圩区堤防",
      key: "wqdf",
    },
    {
      title: "堤防总长度",
      key: "dfzcd",
    },
    {
      title: "混凝土防洪墙长度",
      key: "hntfhqcd",
    },
    {
      title: "土石混合堤长度",
      key: "tshhcd",
    },
    {
      title: "土堤长度",
      key: "tdcd",
    },
    {
      title: "圩内排涝站",
      key: "wnplz",
    },
    {
      title: "排涝站总数",
      key: "plzzs",
    },
    {
      title: "机泵总数",
      key: "zbzs",
    },
    {
      title: "圩内排涝总动力（m3/s）",
      key: "wnplzdl",
    },
    {
      title: "排涝模数（m3/s·km2）",
      key: "plms",
    },
    {
      title: "包圩负责人",
      key: "bwfzr",
    },
    {
      title: " 联系方式",
      key: "lxfs",
    },
    {
      title: "备注",
      key: "bz",
    },
    {
      title: "堤防起点",
      key: "dfqd",
    },
    {
      title: "堤防讫点",
      key: "dfzd",
    },
    {
      title: "堤防长度（公里）",
      key: "dfcd",
    },
    {
      title: "达标/未达标长度（公里）",
      key: "dbwdbcd",
    },
    {
      title: "达标/未达标顶高（米）",
      key: "dbwdbdg",
    },
    {
      title: "达标/未达标顶宽（米）",
      key: "dbwdbdk",
    },
    {
      title: "未达标长度（公里）",
      key: "wdbcd",
    },
    {
      title: "所属区域",
      key: "area",
    },
  ];

  //  闸站
  zzColumns: any = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "工程产权归属",
      key: "belong",
    },
    {
      title: "工程管理主体",
      key: "mngsub",
    },
    {
      title: "工程管护主体",
      key: "protectsub",
    },
    {
      title: "属地管理主体",
      key: "localmngsub",
    },
    {
      title: "行业管理主体",
      key: "busimngsub",
    },
    {
      title: "管理等级",
      key: "mnglevel",
    },
    {
      title: "所在行政村",
      key: "cun",
    },
    {
      title: "所在圩区",
      key: "polderareas",
    },
    {
      title: "内河河道",
      key: "insideriver",
    },
    {
      title: "外河河道",
      key: "outriver",
    },
    {
      title: "工程样式",
      key: "engtyype",
    },
    {
      title: "堤防结合形式",
      key: "combinetype",
    },
    {
      title: "机泵数(台套)",
      key: "bengnum",
    },
    {
      title: "水泵型号",
      key: "bengversion",
    },
    {
      title: "水泵供应商",
      key: "bengsupplier",
    },
    {
      title: "单泵流量(m³/s)",
      key: "bengq",
    },
    {
      title: "总流量(m³/s)",
      key: "countq",
    },
    {
      title: "电机供应商",
      key: "motorprovider",
    },
    {
      title: "单机功率(kw)",
      key: "p",
    },
    {
      title: "总功率(kw)",
      key: "countp",
    },
    {
      title: "开机水位",
      key: "openz",
    },
    {
      title: "关机水位",
      key: "colsez",
    },
    {
      title: "闸孔数",
      key: "zhanum",
    },
    {
      title: "单闸净宽",
      key: "width",
    },
    {
      title: "闸总宽",
      key: "countwidth",
    },
    {
      title: "闸门结构形式",
      key: "zhastru",
    },
    {
      title: "启闭机形式",
      key: "hoisttype",
    },
    {
      title: "闸顶高程(m)",
      key: "crestlevel",
    },
    {
      title: "闸底高程(m)",
      key: "bedlevel",
    },
    {
      title: "建设年份",
      key: "year",
    },
    {
      title: "最近改造年份",
      key: "updateyear",
    },
    {
      title: "是否信息化",
      key: "informatization",
    },
    {
      title: "纬度",
      key: "lat",
    },
    {
      title: "经度",
      key: "lon",
    },
    {
      title: "经纬度",
      key: "locationStr",
    },
    {
      title: "生成时间",
      slot: "createtime",
    },
    {
      title: "修改时间",
      slot: "updatetime",
    },
    {
      title: "创建人",
      key: "creator",
    },
    {
      title: "修改人",
      key: "updator",
    },
    {
      title: "电机类型",
      key: "motortype",
    },
  ];
  // 堤防
  dfColumns: any = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "堤防名称",
      key: "dfmc",
    },
    {
      title: "产权归属",
      key: "cqgs",
    },
    {
      title: "工程管护主体",
      key: "gcglzt",
    },
    {
      title: "属地管理主体",
      key: "sdglzt",
    },
    {
      title: "行业主管部门",
      key: "hyzgbm",
    },
    {
      title: "管护主体",
      key: "ghzt",
    },
    {
      title: "所在行政村",
      key: "szxzc",
    },
    {
      title: "所在圩区",
      key: "wq",
    },
    {
      title: "堤防级别",
      key: "dfjb",
    },
    {
      title: "水普级别",
      key: "spjb",
    },
    {
      title: "堤外河道",
      key: "dwhd",
    },
    {
      title: "堤防类型",
      key: "dflx",
    },
    {
      title: "堤防起点",
      key: "dfqd",
    },
    {
      title: "堤防终点",
      key: "dfzd",
    },
    {
      title: "堤防长度",
      key: "dfcd",
    },
    {
      title: "平均顶高",
      key: "pjdg",
    },
    {
      title: "平均顶宽",
      key: "pjdk",
    },
    {
      title: "护坡类型",
      key: "hplx",
    },
    {
      title: "建设时间",
      key: "jssj",
    },
    {
      title: "是否划界",
      key: "sfhj",
    },
    {
      title: "备注",
      key: "bz",
    },
    {
      title: "所属区域",
      key: "area",
    },
  ];

  //涉河监管
  shColumns: any = [
    {
      type: "index",
      title: "序号",
    },
    {
      title: "项目名称",
      key: "projectname",
    },
    {
      title: "工程规模",
      key: "projectscale",
    },
    {
      title: "涉及河道名称",
      key: "river",
    },
    {
      title: "所在乡镇(街道)",
      key: "street",
    },
    {
      title: "建设地点",
      key: "address",
    },
    {
      title: "建设单位",
      key: "buildcompany",
    },
    {
      title: "建设单位联系人",
      key: "buildlinkman",
    },
    {
      title: "建设单位联系电话",
      key: "buildtel",
    },
    {
      title: "施工单位",
      key: "implementcompany",
    },
    {
      title: "施工单位联系人",
      key: "implementlinkman",
    },
    {
      title: "施工单位联系电话",
      key: "implementtel",
    },
    {
      title: "上级主管",
      key: "manage",
    },
    {
      title: "上级主管联系人",
      key: "managelinkman",
    },
    {
      title: "上级主管联系电话",
      key: "managetel",
    },
    {
      title: "报批建设阶段",
      key: "buildstep",
    },
    {
      title: "洪评编制单位",
      key: "compilecompany",
    },
    {
      title: "洪评编制单位联系人",
      key: "compilelinkman",
    },
    {
      title: "洪评编制单位联系电话",
      key: "compiletel",
    },
    {
      title: "审批建设方案",
      key: "area",
    },
    {
      title: "占用面积",
      key: "sfhj",
    },
    {
      title: "占用长度",
      key: "length",
    },
    {
      title: "许可单位",
      key: "permissioncompany",
    },
    {
      title: "许可文号",
      key: "permissionnum",
    },
    {
      title: "许可时间",
      key: "permissiondate",
    },
    {
      title: "位置以及接线报验情况",
      key: "adrsandcheck",
    },
    {
      title: "报验时间",
      key: "checkdate",
    },
    {
      title: "施工方案",
      key: "checkplan",
    },
    {
      title: "备案时间",
      key: "recorddate",
    },
    {
      title: "补偿和加固工程方案",
      key: "compenseplan",
    },
    {
      title: "审计时间",
      key: "auditdate",
    },
    {
      title: "项目进展",
      key: "projectprogress",
    },
    {
      title: "巡查情况及存在问题",
      key: "problem",
    },
    {
      title: "总的施工进度",
      key: "totalprogress",
    },
    {
      title: "拟处理意见",
      key: "opinion",
    },
    {
      title: "经度",
      key: "lon",
    },
    {
      title: "纬度",
      key: "lat",
    },
    {
      title: "经纬度",
      key: "location",
    },
  ];

  //时间格式转换
  getLocalTime(time: any) {
    return new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/, "");
  }

  dialogBeforeClose() {
    this.$emit("riveToggle", false);
  }
  async getAreaCode() {
    let data = await infoApi.getAreaCode();
    this.areaOptions = this.getTreeData([data.data]); //放入数组是为了保持定义的变量数据结构一直性不然会报警告
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
  async handleChange(value: any) {
    this.formParams.xzqy = value.toString();
  }
  mounted() {
    this.tableData = [
      {
        rvCd: "rwrewrew",
        rvNm: "测试名称",
        xzqy: "江苏无锡",
        hhjb: "三级",
        cezhan: "小何站",
      },
      {
        rvCd: "rwrewrew",
        rvNm: "测试名称",
        xzqy: "江苏无锡",
        hhjb: "三级",
        cezhan: "小何站",
      },
      {
        rvCd: "rwrewrew",
        rvNm: "测试名称",
        xzqy: "江苏无锡",
        hhjb: "三级",
        cezhan: "小何站",
      },
      {
        rvCd: "rwrewrew",
        rvNm: "测试名称",
        xzqy: "江苏无锡",
        hhjb: "三级",
        cezhan: "小何站",
      },
      {
        rvCd: "rwrewrew",
        rvNm: "测试名称",
        xzqy: "江苏无锡",
        hhjb: "三级",
        cezhan: "小何站",
      },
      {
        rvCd: "rwrewrew",
        rvNm: "测试名称",
        xzqy: "江苏无锡",
        hhjb: "三级",
        cezhan: "小何站",
      },
    ];
    // this.subTableObject.associatedRivers = this.associatedRiverTableData;
    this.getAreaCode();
  }
  @Watch("subTableObject", { immediate: true, deep: true })
  handler(newValue: any, oldValue: any) {
    for (let index = 0; index < newValue.associatedRivers.length; index++) {
      if (oldValue.associatedRivers[index] != newValue.associatedRivers[index]) {
      }
    }
  }

  // created() {
  //   let baseData = sessionStorage.getItem("baseData");
  //   if (baseData != null) {
  //     this.formParams = JSON.parse(baseData);
  //     console.log(this.formParams,"???");
  //   }
  // }
}
</script>

<style lang="scss" scoped>
$deep: "::v-deep";

.dialogMain {
  .dialog_table {
    height: 200px;
  }
  .dialog_form {
    // height: 200px;
    height: 50%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px 20px;
  }
  .dialog_item {
    height: 50px;
    line-height: 50px;
    background: #cdd0da;
    font-weight: 600;
    padding-left: 20px;
    color: #494646;
  }
}
#{$deep}.el-dialog__wrapper {
  top: -10%;
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
      height: 800px;
      // height: 90%;
      padding: 0 0;
      overflow-y: auto;
    }
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
    }
  }
}
#{$deep}.el-input--small .el-input__inner {
  margin: 3px 0;
}
#{$deep}.upload-demo {
  .el-upload-list .el-upload-list--picture {
    .el-upload-list__item {
      width: 300px;
    }
  }
}
</style>
