<template>
    <div class="safe has-header">
        <h-navbar title="安全设置" @backPage="onClickLeft"/>
        <ul class="list">
            <!-- <li>
              <span class="label">
                修改绑定
              </span>
              <span class="text"></span>
              <span class="icon">
                去绑定
                <van-icon name="arrow" />
              </span>
            </li> -->
            <li @click="$router.push('/modifyPhone')">
        <span class="label">
          手机绑定
        </span>
                <span class="text">
          {{ userInfo && userInfo.user_cell }}
        </span>
                <span class="icon">
          去修改
          <van-icon name="arrow"/>
        </span>
            </li>
            <li @click="$router.push({
            name:'forgetPassword',
            query: {
            type: 'fix'
            }
            })">
        <span class="label">
          修改密码
        </span>
                <span class="text"></span>
                <span class="icon">
          <van-icon name="arrow"/>
        </span>
            </li>
            <li @click="$router.push('/languageSetting')">
        <span class="label">
          系统语言
        </span>
                <span class="text"></span>
                <span class="icon">
          {{ $i18n.locale === 'en' ? 'English' : '简体中文' }}
          <van-icon name="arrow"/>
        </span>
            </li>
            <li>
        <span class="label">
          版本号
        </span>
                <span class="text"></span>
                <span class="icon">
          V1.10
        </span>
            </li>
        </ul>
        <div class="exit" @click="logOut">
            退出登录
        </div>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class Safe extends Vue {
    protected get userInfo(): any {
      return this.$store.state.userInfo;
    }

    protected onClickLeft() {
      window.closeWebView();
    }

    protected logOut() {
      this.$dialog.confirm({
        title: '提示',
        message: '确认退出CPT吗？'
      }).then(() => {
        this.$toast.success('登出成功')
        this.$toast.clear();
        // localStorage.removeItem('mtData');
        this.$util.token(null);
        localStorage.clear();
        this.$store.commit('updateUserInfo', null);
        // localStorage.removeItem('mtRem');
        // localStorage.removeItem('mtLoginFir');
        window.refreshData({
          t: '', // token
          d: '', // 模拟账号
          l: '', // 真实账号
          m: '', // 0模拟账号，1真实账号
        });
        if (window.selectTabBar) {
          const obj = {
            tabBarIndex: '0',
          };
          window.selectTabBar(obj);
        } else {
          this.$router.push('/home');
        }
        window.noticeAllWebViewController('loginOut');
      }).catch(() => {
        // on cancel
      });
    }

    protected created() {
      this.$store.dispatch('getUserInfo');
    }
  }
</script>
<style lang="scss">
    @import '@/styles/mixin.scss';

    .safe {
        width: 100%;
        background: #F4F6FA;

        .list {
            width: 100%;
            margin-top: 10px;
            background: #FFFFFF;
            font-size: 14px;

            li {
                @include flex(row, center, flex-start);
                width: calc(100% - 30px);
                padding: 0 15px;
                height: 55px;
                border-bottom: 1px solid $border-color;

                .label {
                    width: 30%;
                    color: #5C5C5C;
                }

                .text {
                    width: calc(100% - 110px);
                    padding: 0 10px;
                    height: 100%;
                    color: #999999;
                    @include flex(row, center, flex-start);
                }

                .icon {
                    width: 90px;
                    font-size: 11px;
                    color: #999999;
                    white-space: nowrap;
                    @include flex(row, flex-end, flex-end);

                    i {
                        font-size: 15px;
                    }
                }
            }

            li:last-child {
                border-bottom: none;
            }
        }

        .exit {
            width: 210px;
            height: 42px;
            color: #979797;
            border: 1px solid rgba(151, 151, 151, 1);
            border-radius: 3px;
            margin: 0 auto;
            @include flex();
            margin-top: 15vh;
        }
    }
</style>
