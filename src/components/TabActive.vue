<template>
  <!-- 状态的按钮切换 -->
  <div class="tab-active">
    <div
      class="btn-item"
      :class="{ 'btn-active': activeIndex == index }"
      v-for="(item, index) in btns"
      :key="'btn' + index"
      @click="getBtn(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { values } from "lodash";
import {
  Vue,
  Component,
  Prop,
  Emit,
  Model,
  Watch,
} from "vue-property-decorator";
@Component
export default class TabActive extends Vue {
  @Prop({
    type: Array,
    default: () => [],
  })
  btns: any;
  @Prop() activeIndex!: number;
  @Emit()
  getBtn(index: number) {
    return index;
  }
}
</script>
<style lang="scss" scoped>
.tab-active {
  display: flex;
  // width: 120px;
  font-size: 14px;
  border: solid 1px #3a7bef;
  border-radius: 4px;
  cursor: pointer;
  .btn-item {
    // width: 50%;
    padding: 5px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3a7bef;
  }
  .btn-active {
    background-color: #3a7bef;
    color: #ffffff;
  }
}
</style>
