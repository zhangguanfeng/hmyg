<template>
  <div class="language has-header">
    <h-navbar title="语言设置" />
    <div class="item" style="margin-top: 20px" @click="locale='cn'">
      <span>
        简体中文
      </span>
      <transition name="fade">
        <van-icon v-if="locale === 'cn'" name="success" />
      </transition>
    </div>
    <div class="item" @click="locale='en'">
      <span>
        英语
      </span>
      <transition name="fade">
        <van-icon v-if="locale === 'en'" name="success" />
      </transition>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LanguageSetting extends Vue {
  protected locale: string = 'cn';

}
</script>
<style lang="scss">
  .language {
    background: #F4F6FA;
    width: 100%;
    margin: 0 auto;
    .item {
      width: 100%;
      background: #fff;
      height: 55px;
      border-bottom: 1px solid #F4F6FA;
      line-height: 55px;
      text-indent: 1em;
      color: #5C5C5C;
      font-size: 14px;
      display: flex;
      align-items: center;
      >span {
        width: calc(100% - 80px);
      }
      i {
        color: $color;
        font-size: 20px;
      }
    }
    .item:last-child {
      border-bottom: none;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>