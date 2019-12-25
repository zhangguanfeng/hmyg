<template>
  <div class="partner">
    <div class="w">
      <div class="partner_index">
        <div ref="name" class="title">{{$t('home.partner_title')}}</div>
        <div class="icon_list">
          <img src="/img/home_partner.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AlFooter extends Vue {
  protected done: boolean = false;
  // protected animation() {
  //   if (this.done) {
  //     return;
  //   }
  //   this.done = true;
  //   const vm = this as any;
  //   vm.$refs.name.className = vm.$refs.name.className + " scale-in";
  //   setTimeout(() => {
  //     const lis = (this as any).$refs.list.querySelectorAll("li");
  //     Array.prototype.slice
  //       .call(lis)
  //       .forEach((el: HTMLElement, idx: number) => {
  //         setTimeout(() => {
  //           el.style.transform = "scale(1)";
  //           el.style.opacity = "1";
  //         }, idx * 100);
  //       });
  //   }, 500);
  // }
}
</script>

<style lang="scss" >
@import "@/style/mixin.scss";
.partner {
    background: #0e0e32;
  .w{
    width: 1200px;
    margin: 0 auto;
  }
  .partner_index {
    width: 939px;
    margin: 0 auto;
    padding-bottom: 90px;
    .title {
      @include font(32px, #4fc7eb, center);
      font-weight: 600;
      padding: 55px 0;
    }
    .icon_list {
      width: 100%;
      height: 270px;
      img {
        height: auto;
        width: 100%;
      }
    }
  }
}
</style>
