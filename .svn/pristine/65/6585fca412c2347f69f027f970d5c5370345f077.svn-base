<template>
  <!-- 菜单管理 -->
  <div class="module-view">
    <div class="info-view bg-shadow ">
      <div class="top">
        <div class="top-item">
          <suc-button type="primary" :debounce="800" :config="xzConfig" @on-click="onadd">新增</suc-button>
        </div>
        <div class="top-item">
          <suc-button type="primary" :debounce="800" :config="bjConfig" @on-click="onedit">编辑</suc-button>
        </div>
        <div class="top-item">
          <suc-button class="btn_xz" type="error" :debounce="800" :config="scConfig" @on-click="handleDelete">删除</suc-button>
        </div>
      </div>
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%"
          @row-click="getNode"
          highlight-current-row
          row-key="id"
          border
          height="calc(100vh - 135px )"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          v-loading="loading"
        >
          <el-table-column prop="name" label="权限名称"> </el-table-column>
          <el-table-column prop="sort" label="排序"> </el-table-column>
          <el-table-column prop="url" label="路径"> </el-table-column>
          <el-table-column prop="permission" label="权限编码"> </el-table-column>
          <el-table-column prop="type" label="权限类型" :formatter="tagTypeFormatter"> </el-table-column>
          <el-table-column prop="status" label="是否启用">
            <template v-slot="{ row }">
              <el-tag type="success" v-if="row.status == 1">启用</el-tag>
              <el-tag type="warning" v-if="row.status == 0">禁用</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <cdgl-modal :title="fileTitle" :parentName="parentName" :model="model" :formParams="formParams" @toggle="toggle" @on-submit="oncreate"></cdgl-modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { SearchComponent, TablePage, TableNo } from "@/components";
import { CdglModal } from "./model";
import { SucButton, SucInput, SucDatePicker, SucSelect, SucModal } from "@suc/ui";
import { SelectConfig, SelectOptions, ModalConfig, ButtonConfig } from "@suc/ui/interfaces";
import { publicApi } from "@/api";
@Component({
  components: {
    SucButton,
    TableNo,
    CdglModal,
  },
})
export default class cdgl extends Vue {
  fileTitle: any = "";
  model: boolean = false;
  loading: boolean = false;
  tableData: any = [
    // {
    //   id: 1,
    //   name: "王小虎",
    //   sort: "1",
    //   url: "rww",
    //   permission: "fasfafa",
    //   type: "11",
    //   status: "1",
    // },
    // {
    //   id: 2,
    //   name: "王小虎",
    //   sort: "1",
    //   url: "rww",
    //   permission: "fasfafa",
    //   type: "11",
    //   status: "1",
    // },
    // {
    //   id: 3,
    //   name: "王小虎",
    //   sort: "1",
    //   url: "rww",
    //   permission: "fasfafa",
    //   type: "11",
    //   status: "1",
    //   children: [
    //     {
    //       id: 31,
    //       name: "王小虎",
    //       sort: "1",
    //       url: "rww",
    //       permission: "fasfafa",
    //       type: "11",
    //       status: "1",
    //       children: [
    //         {
    //           id: 311,
    //           name: "王小虎",
    //           sort: "1",
    //           url: "rww",
    //           permission: "fasfafa",
    //           type: "11",
    //           status: "1",
    //         },
    //       ],
    //     },
    //     {
    //       id: 322,
    //       name: "王小虎",
    //       sort: "1",
    //       url: "rww",
    //       permission: "fasfafa",
    //       type: "11",
    //       status: "1",
    //     },
    //   ],
    // },
    // {
    //   id: 4,
    //   name: "王小虎",
    //   sort: "1",
    //   url: "rww",
    //   permission: "fasfafa",
    //   type: "11",
    //   status: "1",
    // },
  ];
  formParams: any = {
    parentId: "",
  };
  list: any = [];
  // 定义权限类型
  menuFormat: any = {
    "0": "菜单",
    "1": "操作",
    "2": "前台展示菜单",
    "3": "前台展示操作",
    "4": "一级菜单",
    "5": "二级菜单",
    "6": "三级菜单",
  };
  menuType: any = null;
  xzConfig: ButtonConfig = {
    icon: "md-add",
  };
  bjConfig: ButtonConfig = {
    icon: "md-create",
  };
  scConfig: ButtonConfig = {
    icon: "md-trash",
  };
  tagTypeFormatter(row: any) {
    this.menuType = this.menuFormat[row.type];
    return this.menuType;
  }
  btnFlag: any = "";
  menuTitle: string = "";
  // 新增
  onadd() {
    this.model = true;
    this.btnFlag = "add";
    this.fileTitle = "新增";
    this.formParams = {};
    this.formParams.status = "1";
  }
  form: any = {};
  // 删除
  handleDelete() {
    this.$confirm(`此操作将永久删除"${this.parentName}"及其子节点, 是否继续?`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      let url = "wjBaseServer/system/menu/del";
      publicApi
        .postWithParam(url, { id: this.formParams.parentId })
        .then((data: any) => {
          if (data.result == true) {
            this.$SucMessage.info(data.desc);
            this.getTree();
          } else {
            this.$SucMessage.error(data.desc);
          }
        })
        .finally(() => {
          // this.delLoading = false;
        });
    });
  }
  parentName: any = "";
  //点击树节点
  async getNode(row: any, data: any) {
    this.parentName = "";
    this.formParams.parentId = "";
    this.formParams.parentId = row.id;
    this.parentName = row.name;
    this.form = row; //拿到每一行的数据
  }

  mounted() {
    this.getTree();
  }

  // 获取树
  async getTree() {
    this.loading = true;
    let url = "/wjBaseServer/system/menu/getMenuAll";
    let data = await publicApi.postNoParam(url);
    this.tableData = [];
    this.list = data.data;
    if (data.result) {
      this.loading = false;
      this.list.forEach((item: any) => {
        if (!item.parentId) {
          this.$nextTick(() => {
            this.tableData.push(item);
          });
        }
        const children = this.list.filter((data: any) => data.parentId === item.id);
        if (!children.length) return;
        item.children = children;
      });
    } else {
      this.$SucMessage.error("获取失败");
    }
  }

  toggle(val: boolean) {
    this.model = val;
  }

  // 编辑
  onedit() {
    if (this.formParams.parentId == "") {
      this.$SucMessage.warning("请选择节点");
    } else {
      this.model = true;
      this.btnFlag = "edit";
      this.fileTitle = "编辑";
      this.formParams = {
        icon: "",
        oldPermission: "",
        id: this.form.id,
        parentId: this.form.parentId,
        name: this.form.name,
        status: this.form.status,
        sort: this.form.sort,
        type: this.form.type,
        url: this.form.url,
        permission: this.form.permission,
        description: this.form.description,
      };
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
  }

  //  新增
  async setCreate() {
    let url = "wjBaseServer/system/menu/add";
    publicApi.postWithParam(url, this.formParams).then((data: any) => {
      if (data.desc == "成功") {
        this.$SucMessage.info("新增成功");
        this.model = false;
        this.getTree();
        // location.reload()
        this.loading = false;
      } else {
        this.$SucMessage.error("新增失败");
        this.model = false;
        this.loading = false;
        this.getTree();
      }
    });
  }
  // 更新
  async setEdit() {
    let url = "wjBaseServer/system/menu/update";
    publicApi.postWithParam(url, this.formParams).then((data: any) => {
      console.log(data, "[[[[");
      if (data.result == true) {
        this.$SucMessage.info("更新成功");
        this.model = false;
        this.loading = false;
        this.getTree();
      } else {
        this.$SucMessage.error("更新失败");
        this.loading = false;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/commonVariables.scss";
.module-view {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 10px;
  background-color: $pages-bg;
  .info-view {
    height: 100%;
    .top {
      padding: 15px;
      display: flex;
      &-item {
        margin-right: 10px;
        .btn_xz {
          color: #fff;
          background-color: #ff7875;
          border-color: #ff7875;
          &:hover {
            background: #f78989;
            border-color: #f78989;
            color: #fff;
          }
        }
      }
    }
    .content {
      height: calc(100% - 65px);
      border-top: 1px solid #dde4eb;
      margin-top: 10px;
      .link-text {
        color: #5397ff;
        cursor: pointer;
      }
    }
  }
}
</style>
