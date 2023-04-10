<template>
	<!-- 窨井关联弹窗 -->
	<suc-modal :config="config" :value="model" @on-visible-change="toggle">
		<template v-slot:header>
			<span class="title">{{ title }}</span>
		</template>
		<div class="content">
			<div class="btn">
				<search-component
					placeholderTxt="请输入名称"
					@input="onSearch"
				></search-component>
			</div>
			<div class="content-item">
				<table-page
					:columns="columns"
					:tableData="tableData"
					:pageParams="pageParams"
					customHeight="350"
					@get-page="onPage"
					@get-size="onSize"
				>
					<template v-slot:selection="{ row }">
						<suc-checkbox
							v-model="row.checked"
							:debounce="800"
							@on-change="onCheck(row)"
						></suc-checkbox>
					</template>
				</table-page>
			</div>
		</div>
	</suc-modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { SucModal, SucTable, SucTableColumn, SucCheckbox } from "@suc/ui";
import { ModalConfig } from "@suc/ui/interfaces";
import { TablePage, SearchComponent } from "@/components";
@Component({
	components: {
		SucModal,
		SucTable,
		SucTableColumn,
		SucCheckbox,
		TablePage,
		SearchComponent,
	},
})
export default class LinkYj extends Vue {
	@Prop() title!: string;
	@Prop() model!: boolean;
	@Prop({
		type: Array,
		default: () => [
			{
				title: "",
				slot: "selection",
				width: 55,
			},
			{
				title: "名称",
				key: "mc",
			},
		],
	})
	columns: any;
	@Prop({
		type: Array,
		default: () => [],
	})
	tableData: any;
	@Prop() pageParams!: object;
	@Emit()
	toggle() {}
	@Emit()
	onSearch() {}
	@Emit()
	onPage() {}
	@Emit()
	onSize() {}
	@Emit()
	onCheck() {}
	config: ModalConfig = {
		transfer: false,
		width: 960,
		"footer-hide": true,
	};
  created() {
    this.hideBtn();
  }
  // 根据权限判断按钮的显示和隐藏
  hideBtn() {
    this.$http.get("jnsw/rest/authox/check?resource=" + "dataCenter" + "&op=" + "manage").then((res: any) => {
      if (!res.data.allowed) {
        this.columns.shift()
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.content {
	height: 422px;
	width: 100%;
	background-color: #fff;
	&-item {
		height: calc(100% - 40px);
	}
	.btn {
		padding-bottom: 10px;
	}
}
.title {
	font-size: 16px;
	color: #fff;
}
</style>
