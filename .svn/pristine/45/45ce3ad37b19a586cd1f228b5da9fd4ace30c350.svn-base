<template>
  <!-- 导航栏多个tab切换 -->
  <div class="tab-switch">
    <div
      class="tab-item"
      :class="{ active: activeIndex == index }"
      v-for="(item, index) in tabs"
      :key="index"
      @click="getTab(index,item)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Model,
  Watch
} from 'vue-property-decorator'
@Component
export default class TabSwitch extends Vue {
  @Prop({
    type: Array,
    default: () => []
  })
  tabs: any
  activeIndex: number = 0
  @Emit()
  getTab (index: number) {
    this.activeIndex = index
  }

  @Watch("tabs", { deep: true, immediate: true })
  clearIndex(){
    this.activeIndex = 0
  }
}
</script>
<style lang="scss" scoped>
.tab-switch {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  .tab-item {
    // margin-right: 20px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    span {
      display: inline-block;
      padding-bottom: 10px;
    }
  }
  .active {
    position: relative;
    color: #3a7bef;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 96%;
      height: 3px;

      background-color: #3a7bef;
      border-radius: 4px;
    }
  }
}
</style>
