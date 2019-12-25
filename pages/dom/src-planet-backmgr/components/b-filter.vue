<template>
  <div class="b-filter-wrap">
    <div class="label-items">
      <div
        :style="{width: width}"
        class="label-item"
        v-for="(item, key) in labels"
        :key="key"
        :class="item.class">
        <label :for="item.prop" :style="{width: labelWidth}">
          <span>
            {{item.label}}
          </span>
        </label>
        <BInput
          v-bind="item.bind || item"
          v-on="item.on || {}"
          v-model="form[item.prop]"
          />
      </div>
    </div>
    <div class="buttons">
      <slot v-if="$slots.button" name="botton"></slot>
      <template v-else>
        <el-button type="primary" @click="query" size="small">查询</el-button>
        <el-button type="primary" @click="reset" size="small">重置</el-button>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class BFilter extends Vue {
  @Prop({ default: () => {}, required: true, type: Object }) protected value!: {[key: string]: any};
  @Prop({ default: '80px', type: String }) protected labelWidth!: string;
  @Prop({ default: () => [], type: Array }) protected labels!: [];
  @Prop({ default: '300px', type: String }) protected width!: string;
  private formClone: any = {};
  protected get form() {
    return this.value;
  }
  protected set form(val: any) {
    this.$emit('input', val);
  }
  protected query() {
    const vm = this as any;
    if (this.$util.type(vm.$parent.queryData) === 'function') {
      vm.$parent.queryData(true, this.form, this);
    } else if (this.$util.type(vm.$attrs.queryData) === 'function') {
      this.$emit('queryData', true, this.form, this);
    }
  }
  protected mounted() {
    for (const i in this.form) {
      this.formClone[i] = this.form[i];
    }
  }
  protected reset() {
    if (this.$listeners.reset) {
      this.$emit('reset', this.form, this.formClone, this);
    } else {
      for (let i in this.formClone) {
        this.form[i] = this.formClone[i];
      }
    }
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .b-filter-wrap {
    @include wh(100%, auto);
    @include flex(column, center, flex-start);
    user-select: none;
    .label-items {
      @include flex(row, flex-start);
      flex-wrap: wrap;
      .label-item {
        @include flex(row, flex-start);
        padding: 3px 0px;
        label {
          padding: 0 8px;
          cursor: pointer;
          text-align: right;
        }
        >*:not(label) {
          width: calc(100% - 50px);
          flex: 1;
        }
      }
    }
    .buttons {
      height: unset;
      width: calc(100% - 80px);
      padding: 10px 40px 15px 40px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>