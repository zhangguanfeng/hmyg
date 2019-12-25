<template>
  <div class="h-input" :class="{'h-input-active': active}">
    <label :for="id">
      <div class="prefix" v-if='$slots.prefix'>
        <slot name='prefix'></slot>
      </div>
      <van-field
        :id="id"
        ref='input'
        @focus="active=true"
        @blur="active=false"
        v-on='$listeners'
        v-bind='$attrs'
        />
    </label>
    <slot name="append"></slot>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'h-input' })
export default class HInput extends Vue {
  protected active: boolean = false;
  protected id: string = '';
  protected created() {
   this.id = Math.random().toString(32).replace(/.*\./, '').toUpperCase();
  }
}
</script>
<style lang="scss">
  @import '@/styles/mixin.scss';
  $border: 1px solid #E5E5E5;
  $border-active: 3px solid $color;
  .h-input {
    width: 100%;
    height: 69px;
    display: flex;
    .prefix {
      height: 44px;
      @include flex();
      padding-right: 5px;
      width: auto;
      flex: 1;
      @include transition();
      border-bottom: $border;
    }
    label {
      display: flex;
      flex: 1;
    }
    .van-field {
      width: 100%;
      padding: 0 0;
      .van-field__body {
        padding: 10px 0px;
        @include transition();
        border-bottom: $border;
      }
      .van-field__error-message {
        @include transition();
        margin-top: 2px;
      }
    }
    input {
      &::placeholder {
        color: #A6B1C1;
      }
    }
  }
  .h-input.h-input-active {
    .van-field__body, .prefix {
      border-bottom: $border-active; 
    }
    .van-field__error-message {
      margin-top: 0px;
    }
  }
</style>
