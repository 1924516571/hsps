<template>
	<!-- 表格 -->
	<div class="table-view">
		<div style="min-height: 220px">
			<suc-table
			class="fontsize"
				:data="tableData"
				:height="tableHeight"
				stripe
				size="mini"
				:row-class-name="tableRowClassName"
				:show-summary="showSummary"
				:summary-method="summaryMethod"
				@row-click="rowClick"
				@selection-change="selectionChange"
			>
				<template v-for="item in columns">
					<template v-if="item.slot">
						<suc-table-column
							:type="item.type"
							:prop="item.key"
							:label="item.title"
							:width="item.width"
							:key="item.id"
						>
							<template slot="header">
								<slot :name="item.heading"></slot>
							</template>
							<template slot-scope="scope">
								<slot
									:name="item.slot"
									:row="scope.row"
									:index="scope.$index"
									v-bind:data="{
										row: scope.row,
										index: scope.$index,
									}"
								></slot>
							</template>
						</suc-table-column>
					</template>

					<template v-else>
						<suc-table-column
							:type="item.type"
							:prop="item.key"
							:label="item.title"
							:width="item.width"
							:key="item.id"
						></suc-table-column>
					</template>
				</template>
			</suc-table>
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
import { SucTable, SucTableColumn } from "@suc/ui";
import {
	addResizeListener,
	removeResizeListener,
} from "element-ui/src/utils/resize-event";
@Component({
	components: {
		SucTable,
		SucTableColumn,
	},
})
export default class ModuleView extends Vue {
	@Prop({
		type: Array,
		default: () => [],
	})
	columns: any;
	@Prop({
		type: Array,
		default: () => [],
	})
	tableData: any;
	@Prop({
		type: Boolean,
		default: false,
	})
	showSummary: any;
	@Prop({
		type: Function,
		default: () => () => {},
	})
	summaryMethod: any;
	@Prop() tableRowClassName: any;
	@Prop() customHeight: any;
	@Watch("customHeight", { immediate: true })
	getHeight(height: any) {
		if (this.customHeight) {
			this.tableHeight = this.customHeight;
		}
	}

	tableHeight: number | string = "-";

	resizeChange() {
		this.tableHeight = this.$el.clientHeight;
	}
	mounted() {
		if (!this.customHeight) {
			this.tableHeight = this.$el.clientHeight;
			addResizeListener(this.$el, this.resizeChange);
		}
	}
	destroyed() {
		removeResizeListener(this.$el, this.resizeChange);
	}
	@Emit()
	rowClick() {}
	@Emit()
	selectionChange() {}
}
</script>

<style lang="scss" scoped>
.fontsize{
	font-size: 14px;
}
.table-view {
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
