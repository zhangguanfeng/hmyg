/**
*  Created by   阿紫
*  On  2019-03-15
*  Content
*/
<template>
  <div class='userIndex'>
    <div class="info">
      <div class="left">
        <img class="logo" src="@/assets/user.png" alt="">
        <div class="account">
          <div style="display:inline-flex;align-items:center;">
            <span class="uid" :data-clipboard-text="info.user_id" @click="goCopy">
              <span class="label">  账户：</span>
              {{info.user_cell}}
            </span>

            <!--是否实名-->
            <el-tooltip v-if="info.chk_status == 300" class="item" effect="dark" :content="$t('userIndex[2]')"
                        placement="top-start">
              <img class="realNameAuth" @click="goBinding('authentication')"
                   src="@/assets/userCenter/identity_active.png" alt="">
            </el-tooltip>
            <el-tooltip v-else class="item" effect="dark" :content="$t('userIndex[13]')" placement="top-start">
              <img class="realNameAuth" src="@/assets/userCenter/identity.png" @click="goBinding('authentication')"
                   alt="">
            </el-tooltip>
            <!--是否绑定手机号-->
            <el-tooltip v-if="info.user_cell" class="item" effect="dark" :content="$t('userIndex[3]')"
                        placement="top-start">
              <img class="mobileAuth" @click="goBinding('account_binding')"
                   src="@/assets/userCenter/iphone_active.png" alt="">
            </el-tooltip>
            <el-tooltip v-else class="item" effect="dark" :content="$t('userIndex[4]')" placement="top-start">
              <img class="mobileAuth" src="@/assets/userCenter/iphone.png" @click="goBinding('account_binding')" alt="">
            </el-tooltip>

            <!--是否绑定邮箱-->
<!--            <el-tooltip v-if="info.user_email" class="item" effect="dark" :content="$t('userIndex[5]')"-->
<!--                        placement="top-start">-->
<!--              <img class="mailAuth" @click="goBinding('account_binding')"-->
<!--                   src="@/assets/userCenter/email_active.png" alt="">-->
<!--            </el-tooltip>-->
<!--            <el-tooltip v-else class="item" effect="dark" :content="$t('userIndex[6]')" placement="top-start">-->
<!--              <img class="mailAuth" src="@/assets/userCenter/email.png" @click="goBinding('account_binding')" alt="">-->
<!--            </el-tooltip>-->
          </div>
          <p class="assets"><span class="label">资产：</span>
            {{account_equity | convertValue}}$</p>
          <div class="btn">
            <el-button :class="{activite:isGolden}" type="primary" plain size="small" @click="goBinding('golden')">
              {{$t('userCenter[3]')}}
            </el-button>
            <el-button :class="{activite:isWithdraw}" type="primary" plain size="small" @click="goBinding('withdraw')">
              {{$t('userCenter[4]')}}
            </el-button>
          </div>
        </div>

      </div>
      <div class="right">
        <p style="display: flex;align-items: flex-start;justify-content: flex-end;">
          <span class="describe" style="width:80px;">{{$t('userCenter[1]')}}</span>
          <span class="content inviteUrl" style="flex:1;word-break:break-all;"
          >{{inviteUrl}}</span>
          <el-button class="inviteUrl-btn" size="mini" type="primary" plain :data-clipboard-text="inviteUrl"
                     @click="goCopy">{{$t('userIndex[9]')}}
          </el-button>
        </p>
        <p style="display: flex;align-items: flex-start;justify-content: flex-end;">
          <span class="describe" style="width:80px;">{{$t('userCenter[2]')}}</span>
          <span class="content inviteCode" style="word-break:break-all;"
          >{{inviteCode}}</span>
          <el-button class="inviteCode-btn" size="mini" type="primary" plain :data-clipboard-text="info.inviteCode"
                     @click="goCopy">{{$t('userIndex[9]')}}
          </el-button>
        </p>
      </div>
    </div>
    <jk-aside-main :menuList="menuList"></jk-aside-main>
  </div>
</template>
<script>
  import Clipboard from 'clipboard'
  import { mapState, mapActions } from 'vuex'

  const clipboardUid = new Clipboard('.uid')
  const clipboardInviteUrl = new Clipboard('.inviteUrl-btn')
  const clipboardinviteCode = new Clipboard('.inviteCode-btn')
  export default {
    name: 'userIndex',
    data() {
      return {
        inviteCode: '',
        inviteUrl: 'https://111111',
        account_equity: '',
        isGolden: false,
        isWithdraw: false
      }
    },
    watch: {
      $route({ name }) {
        this.getActivite(name)
      }
    },
    computed: {
      ...mapState({
        // 传字符串参数 'count' 等同于 `state => state.count`
        totalAsset: 'totalAsset'
      }),
      menuList() {
        return [
          {
            menuUrl: '/user/golden',
            menu: '入金'
          },
          {
            menuUrl: '/user/withdraw',
            menu: '出金'
          },
          {
            menuUrl: '/user/collectionAddress',
            menu: this.$t('userCenterMenu[2]')
          },
          {
            menuUrl: '/user/assets_report',
            menu: this.$t('userCenterMenu[0]')
          },
          {
            menuUrl: '/user/authentication',
            menu: this.$t('userCenterMenu[1]')
          },
          {
            menuUrl: '/user/account_binding',
            menu: this.$t('userCenterMenu[3]')
          }
        ]
      }
    },
    methods: {
      getActivite(name) {
        if (name == 'golden') {
          this.isGolden = true
        } else {
          this.isGolden = false
        }
        if (name == 'withdraw') {
          this.isWithdraw = true
        } else {
          this.isWithdraw = false
        }
      },
      goBinding(name) {
        this.getActivite(name)
        this.$router.push({
          name
        })
      },
      // 复制
      goCopy() {
        clipboardUid.on('success', () => {
          this.$message({
            message: this.$t('userIndex[10]'),
            type: 'success'
          })
        })
        clipboardInviteUrl.on('success', () => {
          this.$message({
            message: this.$t('userIndex[11]'),
            type: 'success'
          })
        })
        clipboardinviteCode.on('success', () => {
          this.$message({
            message: this.$t('userIndex[12]'),
            type: 'success'
          })
        })
      },
      getInvideCode() { // 邀请码
        this.$http.get('Agent/getInvideCode').then(res => {
          this.inviteCode = res.invite_code
        })
      },
      getEquity() {
        this.$http.get('CommonFun/getEquity').then(res => {
          const { account_equity } = res
          this.account_equity = account_equity
        })
      }
    },
    created() {
      this.info = JSON.parse(
        sessionStorage.getItem('cptInformation')
      )
      this.getActivite(this.$route.name);
      this.getEquity()
      this.getInvideCode()
    }
  }
</script>
<style lang="scss" scoped>
  .userIndex {
    margin: 0 auto;

    .activite {
      background: $color;
    }

    .login-info {
      font-size: 14px;
      color: #8F8F8F;
      display: flex;
      justify-content: space-around;
      padding: 15px 0;
    }

    .info {
      text-align: left;
      background: #fff;
      padding: 20px;
      display: flex;
      justify-content: space-between;
    }

    .left {
      display: flex;
      justify-content: space-between;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        right: -30px;
        width: 2px;
        height: 100%;
        background: rgba(54, 123, 255, 1);
        opacity: 0.2;
      }

      .logo {
        width: 36px;
        height: 36px;
        margin: 15px 0 0 0;
      }

      .account {
        padding-top: 15px;
        padding-left: 15px;

        .label {
          font-size: 14px;
          color: #999999;
          font-weight: 500;
        }

        .uid {
          color: #333;
          font-size: 20px;
          font-weight: 500;
          margin-right: 130px;
          cursor: pointer;
        }

        img {
          margin: 0 8px;
          cursor: pointer;
        }

        .realNameAuth, .mobileAuth, .mailAuth {
          width: 32px;
        }

        .assets {
          font-size: 16px;
          color: #404040;
          font-weight: bold;
        }

        .btn {
          margin: 20px 0 15px 0;

          .el-button {
            padding-right: 40px;
            padding-left: 40px;
          }
        }
      }
    }

    .describe {
      color: #A8A8A8;
      font-size: 14px;
      font-weight: 500;
    }


    .right {
      width: 45%;
      text-align: right;

      p {
        .content {
          color: #7E7E7E;
          font-size: 14px;
          margin-right: 20px;
        }
      }
    }

  }
</style>
