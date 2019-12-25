<template>
  <div class="">
    user-list
    <BFilter
      v-model="form"
      :labels="labels"
      />
    <BInput v-model="form.binput">
      <i slot="prepend" class="el-input__icon el-icon-date"></i>
    </BInput>
    <BUpload
      type="list"
      v-model="form.icon"/>
      <BPage />
      <BDialog
        :visible.sync="visible"
        title="Dialog测试组">
      </BDialog>
      <el-button type="warning" @click="visible=true" size="small">dialog</el-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Page from '@/mixin/page.js';

@Component({
  mixins: [ Page ],
})
export default class UserList extends Vue {
  protected form: any = {
    icon: [],
    binput: '',
    select: 2
  };
  protected visible: boolean = false;

  protected readonly labels: any = [
    {
      label: '名字',
      prop: 'prop_name',
      class: 'class-name',
      type: 'text', // 默认是text
    }, {
      label: '选择器',
      prop: 'select',
      type: 'select',
      on: {
        change() {
          console.log('change')
        }
      },
      options: [
        { label: '名字', value: 'value' },
        { label: 2, value: 2 },
      ]
    }, {
      label: '整形',
      prop: 'int',
      type: 'int',
      size: 'mini',
    }, {
      label: '浮点',
      prop: 'float',
      type: 'float'
    }, {
      label: '日期',
      prop: 'date', // year/month/date/week/ datetime/datetimerange/daterange 中的一种
      type: 'date',
      options: {}, // 参数
    }, {
      label: '时间',
      prop: 'timeSelect',
      type: 'timeSelect',
    }, {
      label: '时间',
      prop: 'timePicker',
      type: 'timePicker',
      isRange: true
    }, {
      label: 'textarea',
      prop: 'textarea',
      type: 'textarex',
    }
  ];
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .user-list {

  }
</style>