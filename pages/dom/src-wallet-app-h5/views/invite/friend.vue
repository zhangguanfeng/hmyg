<template>
  <div class="invite-friend">
    <div class="invite-friend__header">
      <div class="header-person">
        <div class="header-person__user">
          <img src="@/assets/img/invite/avatar_default.png" alt class="user-avatar"/>
          <div class="user-info">
            <p class="user-name">合伙人</p>
          </div>
        </div>
        <div class="header-person__amount">
          <span class="amount-unit">¥</span>
          <span class="amount-number">{{currentMoney}}</span>
        </div>
      </div>
      <div class="header-button">
        <span class="header-button__withdraw" @click="withdraw">立即提现</span>
      </div>
      <div class="header-category">
        <div class="today-income" @click="$router.push({ path: 'today_income' })">
          <p class="today-income__label">今日收益</p>
          <p class="today-income__value">¥{{todayMoney}}</p>
        </div>
        <p class="column-split-line"></p>
        <div class="cumulative-income" @click="$router.push({ path: 'cumulative_income' })">
          <p class="cumulative-income__label">累计收益</p>
          <p class="cumulative-income__value">¥{{allMoney}}</p>
        </div>
        <p class="column-split-line"></p>
        <div class="invite-number" @click="$router.push({ path: 'invite_count' })">
          <p class="invite-number__label">今日邀请人数</p>
          <p class="invite-number__value">{{todayCount}}</p>
        </div>
      </div>
    </div>
    <div class="invite-relation">
      <p class="invite-relation__left">我的邀请关系</p>
      <p class="invite-relation__right">直推：{{directCount}}人</p>
    </div>
    <tab active-color='#6f8cfd' v-model="scrollWrap">
      <tab-item selected>一级</tab-item>
      <tab-item>二级</tab-item>
      <tab-item>三级</tab-item>
    </tab>
    <div class="first-level__header">
      <p>被推人账号</p>
      <p>状态</p>
    </div>
    <swiper
      class="scroll-wrap"
      :show-dots="false"
      active-color='#6f8cfd'
      @on-index-change="onChange"
      v-model="scrollWrap">
      <swiper-item key="0">
        <ul class="first-level__list" v-show="scrollWrap==0" ref="swiper0">
          <li class="first-level__item" v-for="(item,key) in oneInvites" :key="key">
            <p class="list-account">{{item.phone}}</p>
            <p class="list-status">{{item.auditName}}</p>
          </li>
        </ul>
      </swiper-item>
      <swiper-item key="1" ref="swiperItem">
        <ul class="first-level__list" v-show="scrollWrap==1" ref="swiper1">
          <li class="first-level__item" v-for="(item,key) in twoInvites" :key="key">
            <p class="list-account">{{item.phone}}</p>
            <p class="list-status">{{item.auditName}}</p>
          </li>
        </ul>
      </swiper-item>
      <swiper-item key="2">
        <ul class="first-level__list" v-show="scrollWrap==2" ref="swiper2">
          <li class="first-level__item" v-for="(item,key) in threeInvites" :key="key">
            <p class="list-account">{{item.phone}}</p>
            <p class="list-status">{{item.auditName}}</p>
          </li>
        </ul>
      </swiper-item>
    </swiper>

    <div class="invite-footer">
      <p class="invite-footer__link" @click="shareLink">分享链接</p>
      <!--      <p class="invite-footer__image" @click="shareCapture">屏幕快照</p>-->
    </div>
  </div>
</template>
<script>
  import {Tab, TabItem} from "vux";

  export default {
    name: "invite",
    components: {
      Tab,
      TabItem
    },
    data() {
      return {
        activeIndex: 0,
        isAnd: false,
        link: '',
        inviteCode: '',
        name: '',
        allMoney: '',//累计收益
        currentMoney: '',//可提现的金额
        todayMoney: '',//今日收益
        directCount: '',//直推
        oneInvites: [],//一级
        todayCount: '',//今日
        twoInvites: [],//二级
        threeInvites: [],//三级
        scrollWrap: 0,
      };
    },
    methods: {
      //提现
      withdraw() {
        if (this.currentMoney == 0) {
          this.$vux.toast.show({
            type: 'warn',
            text: '金额为0无法提现哦',
            time: 3000,
          });
          return
        }
        this.$http2.post('/cloud/app/agency/withdrawal', {}, {needToken: true}).then(res => {
          this.$vux.toast.show({
            type: 'success',
            text: '提现成功',
            time: 3000,
          });
          this.getInviteInfo()
        })
      },
      text() {
        const a = "123";
        const b = "234";
      },
      getInviteInfo() {
        this.$http2.post('/cloud/app/agency/getAgencyInvite', {}, {needToken: true}).then(res => {
          this.allMoney = res.result.allMoney
          this.currentMoney = res.result.currentMoney
          this.todayMoney = res.result.todayMoney
          const {directCount, oneInvites, todayCount, twoInvites, threeInvites} = res.result.agencyInvite
          this.directCount = directCount
          this.oneInvites = oneInvites
          this.todayCount = todayCount
          this.twoInvites = twoInvites
          this.threeInvites = threeInvites
        })
      },
      getData() {
        this.$http2.post('/wallet/app/compstar/inviteShareInfo.do', {}, {needToken: true}).then(res => {
          const {inviteCode, name} = res.result.map;
          this.name = name
          this.inviteCode = inviteCode
        })
      },
      shareLink() {
        if (!this.inviteCode) {
          this.$http2.post('/wallet/app/compstar/inviteShareInfo.do', {}, {needToken: true}).then(res => {
            const {inviteCode, name} = res.result.map;
            const obj = {
              title: '邀请好友',
              iconUrl: '',
              jumpUrl: `${LocationURL}/#/inviteLand?inviteCode=${inviteCode}`,
              content: `Hi～${name ? '我是' + name : ''}，邀请你一起注册AlphaWallet钱包，存币享收益，理财赚大钱，直通区块链财富梦想大陆!`
            }
            if (window.app.shareLink) {
              window.app.shareLink(JSON.stringify(obj));
            }
          })
        } else {
          const obj = {
            title: '邀请好友',
            iconUrl: '',
            jumpUrl: `${LocationURL}/#/inviteLand?inviteCode=${this.inviteCode}`,
            content: `Hi～${this.name ? '我是' + this.name : ''}，邀请你一起注册AlphaWallet钱包，存币享收益，理财赚大钱，直通区块链财富梦想大陆!`
          }
          if (window.app.shareLink) {
            window.app.shareLink(JSON.stringify(obj));
          }
        }

      },
      shareCapture() {
        if (!this.inviteCode) {
          this.$http2.post('/wallet/app/compstar/inviteShareInfo.do', {}, {needToken: true}).then(res => {
            const {inviteCode} = res.result.map;
            var obj = {
              webUrl: `${LocationURL}/#/invitePic?inviteCode=${inviteCode}`,
              jumpUrl: `${LocationURL}/#/invitePic?inviteCode=${inviteCode}`,
              title: '',
              content: ''
            }
            window.app.shareCapture(JSON.stringify(obj));
          })
        } else {
          var obj = {
            webUrl: `${LocationURL}/#/invitePic?inviteCode=${this.inviteCode}`,
            jumpUrl: `${LocationURL}/#/invitePic?inviteCode=${this.inviteCode}`
          }
          window.app.shareCapture(JSON.stringify(obj));
        }
      },
      onChange(index) {
        switch (+index) {
          case 0:
            this.$refs.swiper0.scrollTo({
              top: 0,
            });
            break;
          case 1:
            this.$refs.swiper1.scrollTo({
              top: 0,
            });
            break;
          case 2:
            this.$refs.swiper2.scrollTo({
              top: 0,
            });
            break;
        }

      },
    },
    mounted() {
      this.getInviteInfo()
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        this.isAnd = true
      } else {
        this.isAnd = false
      }
      /*  QRCode.toCanvas(document.getElementById('canvas'), 'sample text', function (error) {
                   if (error) console.error(error)
                   console.log('success!');
       }) */
      this.getData()
      document.title = '邀请好友';
      if (window.app.showShareIcon) {
        window.app.showShareIcon(false);
      }
      // sessionStorage.setItem('walletH5token', 'dadca5c2a1fb68b3301c28e1c3819434')
    }
  };
</script>
<style lang="less" scoped>
  @header-padding: 20px 18px 0;
  .vux-header {
    background-color: rgba(0, 0, 0, 0);
  }

  .invite-friend {
    display: flex;
    flex-direction: column;
    height: 100vh;

    &__header {
      width: 100%;
      background: url("~@/assets/img/invite/header_bg.png") no-repeat center/cover;
    }
  }

  .header-bar {
    position: relative;
    // padding: 0 20px;
    height: 48px;
    text-align: center;
    line-height: 48px;

    &__icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 48px;
      height: 48px;
      text-align: center;
      line-height: 16px;

      img {
        margin-top: 16px;
        width: 9px;
        height: 16px;
      }
    }

    &__title {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }

  .header-person {
    display: flex;
    justify-content: space-between;
    padding: @header-padding;

    &__user {
      display: flex;
      align-items: center;
    }

    &__amount {
      align-items: center;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);

      span {
        font-size: 25px;
        line-height: 35px;

        &:first-child {
          font-size: 20px;
        }
      }
    }
  }

  .user {
    &-avatar {
      width: 55px;
      height: 55px;
    }

    &-info {
      margin-left: 10px;
    }

    &-name {
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 21px;
    }

    &-title {
      margin-top: 5px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
      opacity: 0.6;
    }
  }

  .header-button {
    padding: @header-padding;
    text-align: right;

    &__withdraw {
      padding: 4px 18px;
      font-size: 11px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(103, 114, 209, 1);
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
      border-radius: 13px;
      line-height: 15px;
    }
  }

  .header-category {
    margin-top: 39px;
    padding-bottom: 4px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    align-items: center;
    // grid-template-rows: auto;
    text-align: center;

    [class$="__label"] {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 19px;
    }

    [class$="__value"] {
      margin-top: 6px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
    }
  }

  .column-split-line {
    height: 34px;
    width: 1px;
    background-color: #9cb8ff;
  }

  .invite-relation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7412);
    line-height: 15px;
    background-color: #6f8cfd;

    &__left,
    &__right {
      transform: scale(11 / 12);
    }
  }

  .first-level {
    &__header {
      display: flex;
      justify-content: space-between;
      padding: 0 52px 0 38px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(132, 132, 132, 1);
      line-height: 25px;
      height: 25px;
      background: #fff;
    }

    &__item {
      display: flex;
      justify-content: space-between;
      padding: 15px 28px 15px 22px;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
      border-bottom: 1px solid #e6e6e6;
    }

    &__list {
      height: 100%;
      padding-bottom: 50px;
      overflow-y: auto;
    }
  }

  .list-status {
    width: 75px;
    text-align: center;
  }

  .invite-footer {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 50px;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 21px;
    background: linear-gradient(130deg,
    rgba(138, 108, 254, 1) 0%,
    rgba(84, 126, 244, 1) 100%);

    & > p {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 100%;
    }

    &__image {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 5px;
        left: 0;
        width: 1px;
        height: 40px;
        background-color: #fff;
      }
    }
  }

  .scroll-wrap {
    flex: 1;
    padding-bottom: 50px;
    overflow-y: auto;

    /deep/ .vux-swiper {
      height: 100% !important;
      overflow-y: auto;
    }
  }
</style>
