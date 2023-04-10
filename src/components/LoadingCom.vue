<template>
  <div class="loading" v-show="show">
    <i class="el-icon-loading"></i>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { Icon } from "element-ui";
@Component({
  components: {
    ElIcon: Icon,
  },
})
export default class Loading extends Vue {
  @Prop() show!: boolean;
}
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: -48px;
  left: 0;
  width: 100%;
  height: calc(100% + 113px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 44px;
  color: #ccc;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
