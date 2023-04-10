<template>
    <div class="main-panel">
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class DataCenterMain extends Vue {}
</script>
 <style lang="scss" scoped>
  .main-panel{
    width: calc(100% - 175px);
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
 </style>
