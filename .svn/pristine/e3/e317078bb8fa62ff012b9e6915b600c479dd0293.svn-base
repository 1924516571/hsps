<template>
  <!-- 切换组件 -->
  <div class="tab-active">
    <div class="btn-item" v-for="(item, index) in btns" :key="'btn' + index" :class="{ 'btn-active': activeIndex == index }" @click="getBtn(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
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
  font-size: 14px;
  border: 1px solid #3a7bef;
  border-radius: 4px;
  cursor: pointer;
  .btn-item {
    padding: 5px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3a7bef;
    width: 100px;
  }
  .btn-active {
    background-color: #3a7bef;
    color: #ffffff;
  }
}
</style>
