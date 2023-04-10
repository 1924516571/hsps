<template>
  <!--导入导出类型弹窗布局-->
  <suc-modal :config="config" :value="model" @on-visible-change="toggleModel" @on-ok="onOk" @on-cancel="toggleModel">
    <template v-slot:header>
      <span class="title">{{ title }}</span>
    </template>
    <div>
      <suc-form>
        <suc-form-item :config="{ label: formParam.title, 'label-width': 80 }">
          <suc-radio-group v-model="formParam.selectLx">
            <suc-radio v-for="(item, index) in formParam.lx" :key="index" :label="item.label">{{ item.name }}</suc-radio>
          </suc-radio-group>
        </suc-form-item>
        <suc-form-item>
          <div class="file-btn">
            <input type="file" @change="getFile" />
            <div class="file-btn-item">
              <span class="iconfont icon-shangchuan"></span>
              <span>点击上传</span>
            </div>
          </div>
        </suc-form-item>
      </suc-form>
      <!-- <span v-text="formParam.title"></span>
        <suc-radio-group v-model="formParam.selectLx">
          <suc-radio
            v-for="(item, index) in formParam.lx"
            :key="index"
            :label="item.label"
          >{{item.name}}</suc-radio>
        </suc-radio-group>-->
    </div>
  </suc-modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { SucModal, SucRadioGroup, SucRadio, SucForm, SucFormItem, SucInput } from "@suc/ui";
import { ModalConfig } from "@suc/ui/interfaces";
import { component, config } from "vue/types/umd";
@Component({
  components: {
    SucModal,
    SucRadioGroup,
    SucRadio,
    SucForm,
    SucFormItem,
    SucInput,
  },
})
export default class ImportType extends Vue {
  @Prop() model!: boolean;
  @Prop() title!: string;
  config: ModalConfig = {
    transfer: false,
    width: "500px",
  };
  @Prop() formParam!: any;

  @Emit()
  toggleModel() {}

  @Emit()
  onOk() {
    return this.formParam.selectLx;
  }

  getFile(file: any) {
    this.formParam.file = file.target.files;
  }
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  color: #fff;
}
</style>
