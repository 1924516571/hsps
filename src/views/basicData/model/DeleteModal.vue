<template>
<!-- 删除 -->
    <div class="confirm-view">
        <div class="confirm-item">
            <div class="icon">
                <span class="iconfont icon-zhushi"></span>
            </div>
            <div>
                <p>确定删除此信息？</p>
                <!-- <p>如果当前为雨天，可选择忽略预警</p> -->
            </div>
        </div>
        <div class="confirm-item">
            <div class="confirm-item-sub" @click="getignore"><span>忽略</span></div>
            <div class="confirm-item-sub" v-if="loadingShow" style="color: #ccc"><span>确定</span></div>
            <div class="confirm-item-sub" @click="getsave" v-else><span>确定</span></div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue,Component,Prop,Emit,Model,Watch } from "vue-property-decorator";
@Component
export default class ConfirmInfo extends Vue{
    @Emit()
    getignore(){
        return false;
    }
    @Emit()
    getsave(){
        return false;
    }
    @Prop() loadingShow!: boolean;
} 
</script>
<style lang="scss" scoped>
.confirm-view{
    width: 400px;
	height: 170px;
	background-color: #ffffff;
	border-radius: 4px;
    .confirm-item{
        &:first-of-type{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 116px;
            .icon{
                color:#ffcb3b;
                margin-right: 10px;
            }
            p{
                font-size: 16px;
                color: #333;
                line-height: 32px;
            }
        }
        &:nth-of-type(2){
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 53px;
            border-top: 1px solid #dde4eb;
        }
        &-sub{
            width: 50%;
            text-align: center;
            font-size: 16px;
            line-height: 32px;
            cursor:pointer;
            &:first-of-type{
                border-right: 1px solid #dde4eb;
                color:#3a7bef;
            }
            &:nth-of-type(2){
                color:#ff5a47;
            }
        }
    }
}
</style>