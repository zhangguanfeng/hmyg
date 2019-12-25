<template>
  <div class="invite-wrap">
    <p>
      将您的邀请二维码发送给好友，好友注册成功后投入USDT，您可以拿到一定比例的收益哦，邀请好友越多收益越多，现在赶紧去邀请吧！
    </p>
    <p>
      <center>
        邀请二维码
      </center>
    </p>
    <div class="qrcode-wrap">
      <img :src="qrcode" alt="">
    </div>
    <div class="qrcode-con">
    	<center>
        长按二维码保存图片
      </center>
    </div>
    <!--<div class="">长按二维码保存图片</div>-->
    <!-- <div class="save">
      <span @click="saveQrcode">
        保存二维码
      </span>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import QRCode from 'qrcode';

@Component
export default class Invate extends Vue {
  protected qrcode: string = '';
  protected clipboard: any = null;
  protected get invate() {
    return this.$store.state.invate;
  }
  protected saveQrcode() {
  
  }
  protected createdQrcode() {
    QRCode.toDataURL(this.invate.invite_url)
    .then((url: string) => {
      this.qrcode = url
    });
  }
  protected async getQrcode() {
    const result: any = await this.$post('userTree/inviteQr');
    if (result.code === 200) {
      this.$store.commit('updateInvate', result.result);
      this.$nextTick(() => {
        this.createdQrcode();
      });
    } else {
      this.$notify({ type: 'warning', message: '获取邀请信息失败' });
    }
  }
  protected activated() {
    if (!this.invate) {
      this.getQrcode();
    } else {
      this.createdQrcode();
    }
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .invite-wrap {
    >p {
      padding: 25px 20px 0 20px;
      color: #fff;
    }
    .qrcode-con {
    	padding-bottom: 10px;
	    font-size: 14px;
    	color: #fff;
    }
    .qrcode-wrap {
      width: 100%;
      padding: 10px 0;
      // height: 20px;
      @include flex(row, center, flex-start);
    }
    .save {
      width: 100%;
      @include flex();
      span {
        padding: 7px 18px;
      	background: rgb(34, 150, 228);
        border-radius: 4px;
        color: #fff;
      }
    }
  }
</style>