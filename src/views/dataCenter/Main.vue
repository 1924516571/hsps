<template>
<!-- 首页 -->
    <div class="main_view">
        <nav-bar></nav-bar>
        <dataCenter-main></dataCenter-main>
    </div>
</template>
<script lang="ts">
import { Vue,Component,Prop,Emit,Model,Watch } from "vue-property-decorator";
import {DataCenterMain,NavBar} from './components'
@Component({
    components:{
        DataCenterMain,
        NavBar
    }
})
export default class ModuleView extends Vue{} 
</script>
<style lang="scss" scoped>

</style>