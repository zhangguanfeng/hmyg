/*
* @Author: dubbing
* @Content: 我的->邀请好友 _>屏幕快照
* @Date: 2019-07-09 15:10:23
* @Last Modified by: dubbing
* @Last Modified time: 2019-07-16 15:44:34
*/

<template>
  <div class="invitePic">
    <div class="imgbox">
      <img src="@/assets/img/newInvite/cn.png" alt="">
    </div>
    <div class="invite-content">
      <div class="cn-l">
        <span class="span-top">财富伙伴</span>
        <span>投资更好的未来</span>
      </div>
      <div class="cn-r">
        <img :src="qrcodeImgUrl" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import QRCode from 'qrcode'
  import {setTimeout} from 'timers';

  export default {
    data() {
      return {
        registerLink: '',
        qrcodeImgUrl: ''
      }
    },
    created() {

    },
    mounted() {
      this.registerLink = `${LocationPageURL}/registered.html?inviteCode=${this.$route.query.inviteCode}`
      QRCode.toDataURL(this.registerLink).then(url => {
        this.qrcodeImgUrl = url
      }).catch(err => {
        // console.error(err)
      })
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if (isAndroid) {
        window.app.getContentHeight && window.app.getContentHeight(256, 507)
      }
    }
  }
</script>

<style lang="less" scoped>
  .invitePic {
    height: 100vh;
    overflow: hidden;
    background: url('../../assets/img/newInvite/bg.jpg') no-repeat;
    background-size: 100% 100%;
    width: 100%;

    .imgbox {
      max-height: calc(100vh - 120px);
      padding: 30px 5%;
      text-align: center;

      img {
        width: 95%;
        max-height: calc(100vh - 180px);
      }
    }

    .invite-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10%;

      .cn-l {
        width: 50%;

        span {
          display: block;
          color: #fff;
          font-size: 16px;
          font-weight: 500;
        }

        .span-top {
          margin-bottom: 15px;
        }
      }

      .cn-r {
        width: 50%;
        display: flex;
        justify-content: flex-end;

        img {
          width: 100px;
          display: block;
          height: 100px;

        }
      }
    }
  }
</style>
