<template>
  <!--  拖动验证-->
  <div class="slider-check-box">
    <div class="slider-check"  :class="rangeStatus ? 'success' : ''">
      <div class="bg" ref="bgId"></div>
      <i @mousedown="mousedownFn" :class="rangeStatus ? successIcon : startIcon" id="jc-range"></i>
      {{ startText }}
    </div>
  </div>
</template>
<script>
export default {
  name: "slider-check",
  props: {
    // 成功之后的函数
    successFun: {
      type: Function,
    },
    //成功图标
    successIcon: {
      type: String,
      default: "el-icon-success",
    },
    //成功文字
    successText: {
      type: String,
      default: "验证成功",
    },
    //开始的图标
    startIcon: {
      type: String,
      default: "el-icon-d-arrow-right",
    },
    //开始的文字
    startText: {
      type: String,
      default: "请拖住滑块，拖动到最右边",
    },
    //失败之后的函数
    errorFun: {
      type: Function,
    },
    //或者用值来进行监听
    status: {
      type: String,
    },
  },
  data() {
    return {
      disX: 0,
      rangeStatus: false,
    };
  },
  methods: {
    //按下滑块
    mousedownFn(e) {
      let ele = e.target;
      let startX = e.clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth = ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth;
      if (this.rangeStatus) {
        //不运行
        return false;
      }
      // 鼠标移动事件
      document.onmousemove = (e) => {
        let endX = e.clientX;
        this.disX = endX - startX;
        if (this.disX <= 0) {
          this.disX = 0;
        }
        if (this.disX >= MaxX - eleWidth) {
          //减去滑块的宽度,体验效果更好
          this.disX = MaxX;
        }
        ele.style.left = this.disX + "px";
        this.$refs.bgId.style.width = this.disX + "px";
        // ele.style.transition = ".1s all";
        // ele.style.transform = "translateX(" + this.disX + "px)";
        e.preventDefault(); //阻止默认行为
      };
      // 鼠标松开事件
      document.onmouseup = () => {
        if (this.disX !== MaxX) {
          // ele.style.transition = ".5s all";
          // ele.style.transform = "translateX(0)";
          ele.style.left = 0 + "px";
          this.$refs.bgId.style.width = 0 + "px";
          this.errorFun && this.errorFun(this.rangeStatus);
        } else {
          this.rangeStatus = true;
          this.$refs.bgId.innerHTML = "验证成功";
          if (this.status) {
            this.$parent[this.status] = true;
          } //执行成功的函数
          this.successFun && this.successFun(this.rangeStatus);
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
</script>
<style lang="scss" scoped>
// #3bc923: #198eeb;
@mixin jc-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.slider-check-box {
  .slider-check {
    background-color: #e9e9e9;
    position: relative;
    // transition: 1s all;
    user-select: none;
    color: #585858;
    @include jc-flex;
    height: 45px;
    .bg {
      background: rgb(42, 235, 51);
      height: 45px;
      width: 0px;
      left: 0px;
      bottom: 0px;
      position: absolute;
      color: #fff;
      text-align: center;
      line-height: 45px;
      border: 1px solid #3bc923;
      border-right: none;
    }
    &.success {
      background-color: #3bc923;
      color: #fff;
      i {
        color: #3bc923;
      }
    }
    i {
      position: absolute;
      left: 0;
      width: 50px;
      height: 100%;
      color: #606266;
      background-color: #fff;
      border: 1px solid #d8d8d8;
      cursor: pointer;
      font-size: 24px;
      border-radius: 2px;
      box-shadow: 0 0 2px rgb(0 0 0 / 30%);
      @include jc-flex;
    }
    i:hover {
      color: #fff;
      background-color: #3bc923;
    }
  }
}
[v-cloak] {
  display: none !important;
}
</style>
