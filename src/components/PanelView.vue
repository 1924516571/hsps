<template>
  <!-- 统一的模块面板 -->
  <div class="monitoring-view">
    <div class="headerTitle">
      <div class="left">
        <span>{{ heading }}</span>
        <slot name="left"></slot>
      </div>
      <slot name="right"></slot>
    </div>
    <slot></slot>
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
export default class PanelView extends Vue {
  @Prop() heading!: string
}
</script>
<style lang="scss" scoped>
@import '@/styles/commonVariables.scss';
.monitoring-view {
  width: 100%;
  height: 100%;
  // padding: 14px;
  pointer-events: auto;
  .headerTitle {
    padding: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      position: relative;
      padding-left: 5px;
      display: flex;
    //   align-items: center;
      font-size: $font-size-large;
      color: $heading-color;
      &::before {
        content: '';
        position: absolute;
        top: 5px;
        left: -5px;
        width: 4px;
        height: 14px;
        background-color: #3983f3;
        border-radius: 4px;
      }
    }
  }
}
</style>
