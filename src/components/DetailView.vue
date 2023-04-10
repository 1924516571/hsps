<template>
	<!-- 详情页面统一布局 -->
	<div class="detail-view">
		<div class="top bg-shadow">
			<slot name="top"></slot>
		</div>
		<div class="content">
			<div class="left">
				<div class="left-item bg-shadow">
					<slot name="map"></slot>
				</div>
				<div class="left-item bg-shadow">
					<slot name="tabPanel"></slot>
				</div>
			</div>
			<div class="right bg-shadow">
				<slot name="listPanel"></slot>
			</div>
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
	Watch,
} from "vue-property-decorator";
@Component
export default class DetailView extends Vue {}
</script>
<style lang="scss" scoped>
.detail-view {
	width: 100%;
	height: 100%;
	.top {
		padding: 15px 0;
	}
	.content {
		display: flex;
		padding-top: 10px;
		height: calc(100% - 60px);
		.left {
			padding-right: 10px;
			width: 75%;
			height: 100%;
			&-item {
				&:first-of-type {
					height: calc(60% - 10px);
					margin-bottom: 10px;
				}
				&:nth-of-type(2) {
					height: 40%;
				}
			}
		}
		.right {
			width: 25%;
			height: 100%;
		}
	}
}
</style>