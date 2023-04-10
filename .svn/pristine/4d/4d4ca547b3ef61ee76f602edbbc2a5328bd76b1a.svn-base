<template>
	<!-- 详情页头部返回模块 -->
	<div class="detail-top">
		<div class="nav-item">
			<div class="nav-item-sub" @click="goback">
				<span class="iconfont icon-fanhui"></span>
				<span>返回</span>
			</div>
			<div class="nav-item-sub">
				<span>{{ name }}</span>
			</div>
		</div>
		<div class="nav-item">
			<suc-button @click="exportPdf" type="primary"
				>导出pdf文件</suc-button
			>
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
	Watch,
} from "vue-property-decorator";
import { SucButton } from "@suc/ui";
@Component({
	components: {
		SucButton,
	},
})
export default class DetailTop extends Vue {
	@Prop() name!: string;
	@Emit()
	goback() {
		return false;
	}
	@Emit()
	exportPdf() {}
}
</script>
<style lang="scss" scoped>
.detail-top {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-right: 15px;
	.nav-item {
		&:first-of-type {
			display: flex;
			align-items: center;
		}
		// &:last-of-type {
		//   .button-pannel {
		//     display: inline-block;
		//     margin-right: 16px;
		//   }
		// }
		&-sub {
			padding-left: 15px;
			font-size: 16px;
			color: #333;
			&:first-of-type {
				font-size: 14px;
				color: #3983f3;
				cursor: pointer;
			}
			&:last-of-type {
				position: relative;
				&::before {
					content: "";
					width: 1px;
					height: 100%;
					position: absolute;
					top: 0;
					left: 8px;
					background-color: #dde4eb;
				}
			}
		}
	}
}
</style>
