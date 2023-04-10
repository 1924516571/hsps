<template>
  <!-- 搜索输入框和按钮组件 -->
  <div class="search-view">
    <el-input size="small" :placeholder="placeholderTxt" v-model="value" :config="option" style="width:89%;margin-right:10px"> </el-input>
    <el-button size="small"  icon="el-icon-search" type="primary" @click="onclick">搜索 </el-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { SucInput, SucButton } from "@suc/ui";
import { InputConfig } from "@suc/ui/interfaces";
import { ButtonConfig } from "@suc/ui/interfaces";
@Component({
  components: {
    SucInput,
    SucButton,
  },
})
export default class SearchComponent extends Vue {
  @Prop({
    type: String,
    default: "搜索",
  })
  placeholderTxt!: string;
  value: string = "";
  option: InputConfig = {
    clearable: true,
    // search:true,
    // enterButton:'搜索'
  };
  @Emit("input")
  onclick() {
    return this.value;
  }
}
</script>
<style lang="scss" scoped>
.search-view {
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
