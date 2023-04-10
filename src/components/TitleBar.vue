<template>
    <!-- 统一的模块面板 -->
    <div class="monitoring-view" :style="Style">
        <span class="l-ico"></span>
        <span class="l-text">{{list.heading}}</span>
        <img v-if="list.show" src="@/assets/menu.png" :style="{marginTop:MarTop}" @click="details()"/>
    </div>
</template>
<script lang="ts">
    import {
        Vue,
        Component,
        Prop,
    } from 'vue-property-decorator'
    @Component
    export default class PanelView extends Vue {
        @Prop({
            type: Object,
            default: () => {}
        })list!:any;
        get MarTop(){
            let t = ((parseFloat(this.list.linHe) - 18) / 2).toString() + 'px';
            return t;
        }
        get Style(){
            return {
                height:this.list.linHe,
                lineHeight:this.list.linHe
            }
        }
        details(){
            this.$emit('details')
        }
    }
</script>
<style lang="scss" scoped>
    .monitoring-view{
        width: 100%;
        padding: 0 15px;
        border-bottom: 1px solid #f2f2f2;
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
        .l-ico{
            display: inline-block;
            width: 4px;
            height: 14px;
            background-color: #3983f3;
            border-radius: 4px;
            margin-right: 8px;
            vertical-align: -2px;
        }
        .l-text{
            font-size: 16px;
            letter-spacing: 1px;
            color: #333333;
        }
        img{
            float: right;
            cursor: pointer;
        }
    }
</style>
