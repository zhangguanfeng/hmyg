<template>
  
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Circel extends Vue {
  @Prop({ default: '' }) protected title!: string;
  @Prop({ default: '' }) protected content!: string;

}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .single-circel {
    width: 328px;
    height: 339px;
    background: url('/img/global.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    .title {
      font-size: 33px;
      color: #56DAFF;
      width: 100%;
      text-align: center;
      padding: 70px 0 10px 0;
    }
    .content {
      font-size: 22px;
      color: #56DAFF;
      width: 200px;
    }
  }
</style>