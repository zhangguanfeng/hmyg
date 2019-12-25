<template>
  <div class="b-input-wrap">
    <el-select clearable :id="$attrs.id || $util.ramdonString()" v-if="type === 'select'" v-model="target" v-on="$listeners" v-bind="$attrs">
      <slot name="prefix" slot="prefix"></slot>
      <slot name="empty" slot="empty"></slot>
      <slot v-if="$slots.default"></slot>
      <template v-else>
        <el-option
          v-if="$attrs.all !== false"
          :value="null"
          :label="$attrs.allText || '全部'">
        </el-option>
        <template v-if="$attrs.options && $attrs.options.length">
          <el-option
            v-for="(item, key) in $attrs.options || []"
            :key="key"
            :label="$attrs.labelKey && item[$attrs.labelKey] || item.label"
            :value="$attrs.valueKey && item[$attrs.valueKey] || item.value">
          </el-option>
        </template>
      </template>
    </el-select>
    <el-date-picker
     :id="$attrs.id || $util.ramdonString()"
      clearable
      v-else-if="!!~'year/month/date/week/ datetime/datetimerange/daterange'.split(/\//).indexOf(type)"
      v-model="target"
      :type="type"
      :format="$attrs.format || defaultConfig.dateFormat"
      :value-format="$attrs.valueFormat || defaultConfig.dateValueFormat"
      v-on="$listeners" v-bind="$attrs"
      >
    </el-date-picker>
    <el-time-select
      :id="$attrs.id || $util.ramdonString()"
      v-else-if="type === 'timeSelect'"
      clearable
      :value-format="$attrs.valueFormat || defaultConfig.timeSelectValueFormat"
      v-on="$listeners"
      v-bind="$attrs"
      v-model="target">
    </el-time-select>
    <el-time-picker
      :id="$attrs.id || $util.ramdonString()"
      clearable
      v-else-if="type === 'timePicker'"
      v-model="target"
      v-on="$listeners"
      v-bind="$attrs"
      :value-format="$attrs.valueFormat || defaultConfig.timePickerValueFormat"
      :picker-options="{
        selectableRange: '18:30:00 - 20:30:00'
      }"
      placeholder="任意时间点">
    </el-time-picker>
    <el-input :id="$attrs.id || $util.ramdonString()" v-else-if="type === 'textarea'" v-model="target" v-on="$listeners" v-bind="$attrs"></el-input>
    <el-input :id="$attrs.id || $util.ramdonString()" v-else :type="type" v-on="$listeners" v-bind="$attrs" v-model.trim="target">
      <slot name="prefix" slot="prefix"></slot>
      <slot name="prepend" slot="prepend"></slot>
      <slot name="suffix" slot="suffix"></slot>
      <slot name="append" slot="append"></slot>
    </el-input>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import BInputSlot from './b-input-slot.vue';

@Component({ components: { BInputSlot } })
export default class BInput extends Vue {
  @Prop({  }) protected value!: any;
  @Prop({ default: 'text' }) protected type!: string;
  protected readonly defaultConfig: {[key: string]: any} = {
    dateFormat: 'yyyy-mm-dd',
    dateValueFormat: 'yyyymmdd',
    timeSelectValueFormat: 'HH:mm:ss',
    timePickerValueFormat: 'HH:mm:ss'
  };
  get target(): any {
    return this.value;
  }
  set target(val: any) {
    this.$emit('input', val);
  }
  protected inputEvent(val: any) {
    if (this.type === 'int' || this.type === 'float') {
      this.target = this.filterNumber(val);
    }
  }
  protected filterNumber(val: any) {
    if (typeof this.target === 'undefined') {
      return val;
    }
    if (this.type === 'int') {
      val = val.toString().replace(/[^\d]/g, '');
    } else if (this.type === 'float') {
      val = this.$util.floatNumber(val);
    }
    return val;
  }
  created() {
    if (this.type === 'float' || this.type === 'int') {
      this.$listeners.input = this.inputEvent;
    }
    this.$attrs.prop = '';
    this.$attrs.label = '';
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .b-input-wrap {
    width: 100%;
  }
</style>