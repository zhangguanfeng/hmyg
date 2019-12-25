<template>
  <div class="deposit-wrap">
    <van-tabs v-model="current" @change="changeHandle">
      <van-tab title="OMNI" name="OMNI"></van-tab>
      <van-tab title="ERC20" name="ERC20"></van-tab>
    </van-tabs>
    <div class="qrcode-wrap">
      <img :src="qrcode" width="60%" alt="">
    </div>
    <div class="copy-wrap">
      <span class="text">
        {{copyText}}
      </span>
      <button class="btn copybtn" ref="copybtn" :data-clipboard-text="copyText">
        复制
      </button>
    </div>
    <div class="tips">
      <p>
        温馨提示
      </p>
      <p>
        • 请勿向上述地址充值任何非 {{current === 'OMNI' ? 'ONMI_USDT' : 'ERC20_USDT'}} 资产，否则资产将不可找回。
      </p>
     <p>
       • 请转入成功后，将在T+1日开始计息，T+2日12:00结算，产生的收益（SALPT）记录可在报表-收益记录查询。
     </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Clipboard from 'clipboard';
import QRCode from 'qrcode';

@Component
export default class Deposit extends Vue {
  protected current: string = 'OMNI';
  protected info: any = {};
  protected qrcode: string = '';
  protected copyText: any = null;
  protected clipboard: any = null;
  protected changeHandle() {
    this.setTitle();
    this.createQrCode();
  }
  // protected copy(): void {
  //   this.clipboard.on('success', () => {
  //     this.$notify({ type: 'success', message: '复制成功' });
  //   });
  // }
  protected createQrCode() {
    const secret = this.info[this.current].secret
    QRCode.toDataURL(secret)
    .then((url: string) => {
      this.qrcode = url
    });
    this.copyText = secret;
    // this.clipboard && this.clipboard.destroy();
    // this.clipboard = new Clipboard(this.$refs.copybtn, {
    //   text: () => this.copyText
    // });
    // this.clipboard.on('success', () => {
    //   this.$notify({ type: 'success', message: '复制成功' });
    // });
  }
  protected async getMoneyInfo() {
    const res: any = await this.$post('money/deposit');
    if (res.code === 200) {
      // this.info = res.result;
      for (let i in res.result) {
        this.info[res.result[i].coin_type] = res.result[i];
      }
      this.createQrCode();
    } else {
      this.$notify({ type: 'warning', message: '获取信息失败' });
    }
  }
  protected setTitle() {
    this.$store.commit('updateTitle', this.current === 'OMNI' ? '转入 OMNI' : '转入 ERC20')
  }
  protected activated() {
    this.clipboard = new Clipboard(this.$refs.copybtn, {
      text: () => this.copyText
    });
    this.clipboard.on('success', () => {
      this.$notify({ type: 'success', message: '复制成功' });
    });
    this.setTitle();
    this.getMoneyInfo();
  }
  protected deactivated() {
    this.clipboard && this.clipboard.destroy();
    this.$store.commit('updateTitle', null);
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .deposit-wrap {
    @include wh();
    .qrcode-wrap {
      width: 100%;
      @include flex();
      padding: 20px 0 10px 0;
    }
    .copy-wrap {
      width: calc(100% - 40px);
      padding: 10px 20px;
      @include flex();
      .text {
        color: #ffffff;
        font-size: 12px;
        margin-right: 15px;
      }
      .btn {
        background: #ffffff;
        padding: 3px 10px;
        font-size: 13px;
        border-radius: 3px;
      }
      .copybtn {
        border: none;
        outline: none;
      }
    }
    .tips {
      width: calc(100% - 50px);
      padding: 20px 20px 0 20px;
      color: #aaa;
      font-size: 14px;
      p {
        padding: 5px 0 5px 0;
      }
      p:first-child {
        padding: 10px 0;
      }
    }
  }
</style>
