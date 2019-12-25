<template>
  <calendar
      :show.sync="show"
      v-model="date"
      @change="handelChange"
      :max-date="new Date()">
    </calendar>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class extends Vue {
  private select: string[] = [];
  protected get date() {
    return this.$store.state.date;
  }
  protected set date(val: any) {
    this.$store.commit('updateDate', val);
  }
  protected get show(): boolean {
    const flag: boolean = this.$store.state.showDateSelect;
    if (flag) {
      this.select = [];
    } else {
      this.$store.commit('multipleSelectDate', true);
    }
    return flag;
  }
  protected handelChange(date: any) {
    this.select.push(date.format('YYYY-MM-DD'));
    if (this.$store.state.multipleSelectDate) { // 多选
      if (this.select.length === 2) {
        this.select.sort();
        this.$root.$emit('dateDelectChange', this.select.slice());
        this.show = false;
      }
    } else {
      this.$root.$emit('dateDelectChange', this.select[0]);
      this.show = false;
    }
  }
  protected set show(val: boolean) {
    this.$store.commit('showDateSelect', val);
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';

</style>