<template>
    <!-- 导航栏多个tab切换 -->
    <div>
        <div class="tab-switch">
            <div
                    class="tab-item"
                    :class="{ active: activeIndex == item.id }"
                    v-for="(item, index) in tabs"
                    :key="index"
                    @click="getTab(item.id)"
            >
                <span>{{ item.name }}</span>
            </div>
        </div>
        <div class="tab-switch" style="height:25px;padding-top: 14px;">
            <div
                    class="tab-item"
                    :class="{ active: activeIndex == it.id }"
                    v-for="(it, index) in tabs2"
                    :key="index"
                    @click="getTab(it.id)"
            >
                <span>{{ it.name }}</span>
            </div>
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
        tabs: any;
        @Prop({
            type: Array,
            default: () => []
        })
        tabs2: any;
        activeIndex: number = 1;

        @Emit()
        getTab (id: number) {
            this.activeIndex = id
        }
    }
</script>
<style lang="scss" scoped>
    .tab-switch {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 32px;
        border-bottom: 1px solid #dde4ed;
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
