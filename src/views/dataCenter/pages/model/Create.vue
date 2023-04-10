<template>
	<!-- 新增 -->
	<suc-modal
		:title="title"
		:config="config"
		:value="model"
		@on-cancel="toggle(false)"
		@on-ok="oncreate"
		@on-visible-change="toggle"
	>
		<div class="content">
			<suc-form>
				<suc-form-item
					v-for="(item, index) in formList"
					:key="index"
					:config="item.config"
					:validator="item.validator"
				>
					<suc-input
						style="width: 100%"
						v-model="formParams[item.name]"
						:type="item.type"
					></suc-input>
				</suc-form-item>
				<slot></slot>
			</suc-form>
		</div>
		<loading-com :loadingShow="loadingShow"></loading-com>
	</suc-modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucForm, SucFormItem, SucInput } from "@suc/ui";
import { ModalConfig } from "@suc/ui/interfaces";
import { infoApi } from "@/api";
import { LoadingCom } from "@/components";
@Component({
	components: {
		SucModal,
		SucForm,
		SucFormItem,
		SucInput,
		LoadingCom,
	},
})
export default class Create extends Vue {
	@Prop({ type: String, default: () => "新增" }) title!: string;
	@Watch("title")
	changeTitle() {
		this.config.title = this.title;
	}
	@Prop() model!: boolean; //控制弹框显隐
	@Prop({
		type: Array,
		default: () => [],
	})
	formList: any; //包含formItem config,name对应formParams字段eg: {name: 'areaId',config: {label: '片区ID','label-width': 100 } },
	@Prop({
		type: Object,
		default: () => {},
	})
	formParams: any; //新增接口需要的参数
	@Prop() url!: string; //新增接口url
	//   model:boolean = false
	config: ModalConfig = {
		transfer: false,
		title: "新增",
		width: 960,
	};
	// async oncreate () {
	//   let data = await infoApi.oncreate(this.formParams, this.url)
	//   this.model = false
	// }
	@Prop() loadingShow!: boolean;
	@Emit()
	oncreate() {
		return false;
	}
	@Emit()
	toggle() {}
}
</script>
<style lang="scss" scoped>
.content {
	width: 100%;
	height: 510px;
	overflow: auto;
}
</style>
