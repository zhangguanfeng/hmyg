/**
*  Created by   阿紫
*  On  2019-03-04
*  Content
*/
<template>
  <div class="headerHome" :class="{ 'header-trade': $route.name === 'trade' }">
    <div class="main">
      <div class="logo" @click="goHome">
        <img class="logo-dark" src="@/assets/home/logo3.png" alt="logo"/>
        <img class="logo-light" src="@/assets/home/logo2.png" alt="logo"/>
      </div>
      <ul class="cpt-menu">
        <template
          v-for="(item, index) in menuList"
          >
          <li v-if="index<2"
            @click="handleSelect(index,item)"
            :class="{active:activeIndex==index}"
            :key="index + '1'">
          {{item.menu}}
          </li>
        </template>
        <li>
          <el-dropdown>
            <span>{{$t('menu[4]')}}</span>
            <el-dropdown-menu slot="dropdown">
              <img :src="qrcode" alt="">
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <template v-for="(item,index) in menuList">
          <li 
            v-if="!item.hidden&&index>2"
            @click="handleSelect(index,item)"
            :class="{active:activeIndex==index}"
            :key="index + '2'">
            {{item.menu}}
          </li>
        </template>
        <!-- <li v-for="(item,index) in menuList"
            v-if="!item.hidden&&index>2"
            @click="handleSelect(index,item)"
            :class="{active:activeIndex==index}"
            :key="index">
          {{item.menu}}
        </li> -->
      </ul>
      <!--      <img class="qrcode" :src="qrcode" alt="">-->

      <span class="login-wrap" v-if="!personalInformation.user_id">
        <el-button
          size="small"
          class="login"
          @click="routingHop('Login')">{{$t('login')}}</el-button>
        <el-button
          size="small"
          class="register"
          @click="routingHop('register')"
        >{{$t('register')}}</el-button>
      </span>
      <span class="userinfo info" v-show="personalInformation.user_id">
        <el-menu
          class="el-menu-vertical-demo"
          mode="horizontal"
          menu-trigger="hover"
          @open="handleOpen">
          <el-submenu index="2">
            <template slot="title">
                 <img class="logo-dark" src="@/assets/user1.png" style="width:20px;" alt="user"/>
                 <img class="logo-light" src="@/assets/user.png" style="width:20px;" alt="user"/>
              {{personalInformation.user_cell||personalInformation.user_email}}</template>
            <el-menu-item
              class="loginInfo"
              index="2-3"
              @click="logout"
            >{{$t('loginPersonalIfo[3]')}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </span>
      <span class="account info" v-show="personalInformation.user_id">
              <el-menu
                class="el-menu-vertical-demo"
                mode="horizontal"
                menu-trigger="hover"
                :default-active="accountIndex"
                @select="handleSelectAccount"
              >
              <el-submenu index="0">
                <template slot="title">{{account}}</template>
                <el-menu-item class="loginInfo" index="1">真实账户-{{personalInformation.live_account}}</el-menu-item>
                <el-menu-item class="loginInfo" index="2">模拟账户-{{personalInformation.demo_account}}</el-menu-item>
              </el-submenu>
            </el-menu>
            </span>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="more-btn">
          <img src="@/assets/more.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown" class="more-menu">
          <template v-for="(item,index) in menuList">
            <el-dropdown-item :class="{active:activeIndex== index}" :key="index" v-if="item.xsShow"
                              :command="item.menuUrl">{{item.menu}}
            </el-dropdown-item>
          </template>
          <el-dropdown-item command="register">{{$t('register')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <LoginDialog />
  </div>
</template>
<script>
  import md5 from 'md5'
  import Clipboard from 'clipboard'
  import { scrollTo, platform, token, information, cptAccountType } from '@/common/util.js'
  import QRCode from 'qrcode'
  import LoginDialog from './loginDialog.vue';

  const PATH = `${location.origin}/down`

  export default {
    name: 'headerHome',
    data() {
      return {
        activeIndex: '0',
        dialogFormVisible: false,
        accountIndex: '1',
        codeImg: '',
        platform,
        // account: '真实账户',
        qrcode: ''
      }
    },
    components: { LoginDialog },
    watch: {
      $route(to) {
        this.changeTheme()
        this.getActiveIndex()
      },
      personalInformation() {
        // const personalInformation = this.personalInformation;
        // sessionStorage.setItem('cptAccount', this.account);
        this.getActiveIndex()
        this.updateStoreAccount(+this.accountIndex - 1);
      },
    },
    computed: {
      menuList() {
        const list = [
          {
            menuUrl: '/',
            menu: this.$t('menu[0]'),
            xsShow: true
          },
          {
            menuUrl: '/trade',
            menu: this.$t('menu[1]')
          },
          {
            menuUrl: '/',
            menu: this.$t('menu[4]'),
            key: 'download'
          },
          {
            menuUrl: '/about',
            menu: this.$t('menu[6]')
          },
          {
            menuUrl: '/newsinfo',
            menu: this.$t('menu[3]'),
            xsShow: true
          },
          {
            menuUrl: '/user',
            menu: this.$t('menu[5]'),
            hidden: this.personalInformation.user_id ? false : true
          }
        ]
        if (this.$i18n.locale === 'en') {
          (list[list.findIndex(item => item.menuUrl === '/newsinfo')] || {}).hidden = true;
          (list[list.findIndex(item => item.menuUrl === '/help_center')] || {}).hidden = true
        }
        return list
      },
      personalInformation () {
        return this.$store.state.userInfo || {
          user_cell: '',
          user_id: '',
          user_email: ''
        };
      },
      account() {
        return [
          `真实账户-${this.personalInformation.live_account}`,
          `模拟账户-${this.personalInformation.demo_account}`
        ][this.cptAccountType == '100' ? 0 : 1];
      },
      cptAccountType() {
        return this.$store.state.cptAccountType;
      }
    },
    methods: {
      handleSelectAccount(index) {
        this.updateStoreAccount(index - 1);
      },
      handleSelectLanguage(key) {
        this.language = key === '1' ? '中文' : 'English'
        this.$i18n.locale = key === '1' ? 'zh' : 'en'
        localStorage.setItem('jkLanguage', this.$i18n.locale)

        if (this.$i18n.locale === 'en'
          && (
            this.$route.path.indexOf('/newsinfo') !== -1
            || this.$route.path.indexOf('/help_center') !== -1
          )
        ) {
          this.$router.replace('/')
        }
      },
      changeTheme() {
        if (this.$route.path === '/project/trade') {
          document.body.classList.add('header-trade')
        } else {
          document.body.classList.remove('header-trade')
        }

        if (this.$route.path === '/agent') {
          document.body.classList.add('header-dark')
        } else {
          document.body.classList.remove('header-dark')
        }
      },
      goHome() {
        this.$router.push({
          path: '/'
        })
      },
      handleOpen(key, keyPath) {
        new Clipboard('.copy')
      },
      // 导航切换
      handleSelect(key, item) {
        this.activeIndex = key
        this.$router.push(item.menuUrl)
      },
      scrollDownload() {
        if (this.$route.path !== '/') {
          setTimeout(() => {
            const downloadWrap = document.querySelector('#download')
            scrollTo(downloadWrap, 400, this.$parent.$el)
          }, 300)
        } else {
          this.$parent.$el.scrollTop = 0
        }
      },
      getImgCode() {
        this.$http.post('getImage').then((res) => {
          const { url, imageId } = res.resultMap
          this.codeImg = url
          this.ruleForm.code = ''
          this.ruleForm.imageId = imageId
          this.ruleFormReg.imageId = imageId
          this.ruleFormReg.imageCode = ''
        })
      },
      // 设置当前菜单索引
      getActiveIndex() {
        const curUrl = this.$route.path
        this.menuList.some((item, index) => {
          if ((this.activeIndex = '2-2')) {
            this.activeIndex = '0'
          }
          if ((this.activeIndex = '/')) {
            this.activeIndex = '0'
          }
          if (curUrl.indexOf('/newsdetail') > -1) {
            this.activeIndex = '3'
          }
          if (curUrl.indexOf('/announcement') > -1) {
            this.activeIndex = '3'
          }
          if (curUrl.indexOf(item.menuUrl) > -1 && item.menuUrl !== '/') {
            this.activeIndex = `${index}` || '0'
            return true
          }
        })
      },
      // 复制
      goCopy() {
        this.$message({
          message: this.$t('header.uidCopySuccess'),
          type: 'success'
        })
      },
      // 详情
      goPages(name) {
        this.$router.push({
          name
        })
      },
      handleCommand(command) {
        if (command === 'register') {
          this.routingHop('register')
        } else {
          this.$router.push(command)
        }
      },
      // 注销
      logout() {
        token(null)
        information(null)
        this.$store.commit('updateUserInfo', null);
        this.$store.commit('updateCptAccountType', '');
        this.$store.commit('updateAccount', '');
        // this.personalInformation = {
        //   user_cell: '',
        //   user_id: '',
        //   user_email: ''
        // }
        sessionStorage.removeItem('cptAccount')
        this.$root.$emit('cptOnRootEmit')
        this.goPages('home')
      },
      // 登录-注册
      routingHop(name) {
        if (name === 'Login') {
          if (this.$route.name === 'trade') {
            this.$store.commit('toogleLoginDialog', true);
          } else {
            this.$router.push('/login')
          }
        } else {
          this.$router.push('/register')
        }
      },
      generateQrcode() {
        QRCode.toDataURL(PATH)
          .then((url) => {
            this.qrcode = url
          })
      },
      updateStoreAccount(index = 0) {
        const obj = this.personalInformation;
        this.$store.commit('updateAccount', [obj.live_account, obj.demo_account][index]);
        if (index !== false) {
          this.$store.commit('updateCptAccountType', ['100', '111'][index]);
          cptAccountType([100, 111][index]);
        }
      }
    },
    mounted() {
      this.language = this.$i18n.locale === 'zh' ? '中文' : 'English'
      this.getActiveIndex()
      if (this.$route.query.isLogin) {
        this.routingHop('Login')
      }
      if (this.$route.query.isRegister) {
        this.routingHop('register')
      }
    },
    created() {
      const type = cptAccountType();
      this.$store.commit('updateCptAccountType', type);
      this.accountIndex = type == '100' ? '1' : '2'
      this.changeTheme()
      this.generateQrcode()
      this.$root.$on('login', () => {
        this.routingHop('Login')
      })
      this.$root.$on('register', () => {
        this.routingHop('Register')
      })
    },
    beforeDestroy() {
      this.$root.$off('login')
      this.$root.$off('register')
      clearInterval(this.timer)
    }
  }
</script>
<style lang="scss">
  .headerHome {
    background: #fff;
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    z-index: 20;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .qrcode {
      position: absolute;
      top: 56px;
      left: 570px;
      box-shadow: 0px 2px 9px 0px rgba(12, 9, 67, 0.5);
      border-radius: 7px;
    }

    :root .theme-dark &.header-trade, :root .header-dark & {
      background-color: $color-dark-bg;

      .el-button {
        background-color: #141725;
        border-color: #899AD1;
        color: #899AD1;
      }
    }

    .main {
      width: 1200px;
      height: 60px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      cursor: pointer;

      img {
        width: 140px;
        margin-right: 50px;
      }

      .logo-light {
        display: inline-block;

        @at-root .theme-dark .header-trade#{&}, :root .header-dark & {
          display: none;
        }
      }

      .logo-dark {
        display: none;

        @at-root .theme-dark .header-trade#{&}, :root .header-dark & {
          display: inline-block;
        }
      }
    }

    .cpt-menu {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 1;

      li {
        cursor: pointer;
        margin: 0 30px;
        color: #7a7a7a;
        font-size: 16px;
        height: 40px;
        line-height: 40px;

        &:hover {
          color: $color;
          .el-dropdown {
            color: $color;
          }
        }
        .el-dropdown {
          color: #7a7a7a;
          font-size: 16px;
        }
      }

      li.active {
        color: $color;
        position: relative;

        &:after {
          content: '';
          position: absolute;
          background: $color;
          height: 4px;
          width: 100%;
          bottom: 0;
          left: 0;
        }
      }
    }

    .el-submenu__title {
      .logo-light {
        display: inline-block;

        @at-root .theme-dark .header-trade#{&}, :root .header-dark & {
          display: none;
        }
      }

      .logo-dark {
        display: none;

        @at-root .theme-dark .header-trade#{&}, :root .header-dark & {
          display: inline-block;
        }
      }
    }

    .el-menu {
      flex: 1;
      background-color: #fff;
      @at-root .theme-dark .header-trade#{&}, :root .header-dark & {
        background-color: $color-dark-bg;
      }
    }

    .el-menu.el-menu--horizontal {
      border-bottom: none;
      display: inline-block;
    }

    .el-menu-item.is-active {
      font-size: 18px;
    }

    .el-menu--horizontal {
      > .el-menu-item {
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        padding: 0;
        margin: 0 30px;
        color: #7a7a7a;
        transition: none;
        @at-root .theme-dark .header-trade#{&}, :root .header-dark & {
          color: #576590;
          background-color: $color-dark-bg;
          &.is-active {
            color: #B4C5F7;
            border-bottom-color: #B4C5F7;
          }

          &:hover {
            color: #B4C5F7 !important;
          }
        }
      }
    }

    .el-menu--horizontal > .el-menu-item.is-active {
      border-bottom-width: 4px;
      color: $color;
      font-weight: bold;
    }


    .more-btn {
      width: 20px;
      display: none;

      img {
        height: 18px;
        transform: rotate(90deg);
        vertical-align: middle;
      }

      @include media(xs) {
        display: inline-block;
      }
    }

    @at-root .more-menu.el-dropdown-menu {
      padding: 0 10px;
      .el-dropdown-menu__item {
        padding: 0 30px;
        text-align: center;

        &:not(.is-disabled):hover, &:focus {
          background-color: transparent;
        }

        & + .el-dropdown-menu__item {
          border-top: 1px solid #E8E8E8;
        }
      }
    }

    .language {
      width: 60px;

      @include media(xs) {
        display: none;
      }
    }

    .account {
      width: 160px;
    }

    .info {
      .el-submenu.is-active {
        @at-root .theme-dark .header-trade#{&}, :root .header-dark & {
          color: #576590 !important;
        }
        .el-submenu__title {
          border-bottom: none;

          @at-root .theme-dark .header-trade#{&}, :root .header-dark & {
            color: #576590 !important;
          }
        }
      }

      .el-submenu {
        @at-root .theme-dark .header-trade#{&}, :root .header-dark & {
          color: #576590 !important;

          .el-submenu__title {
            color: #576590 !important;
          }
        }
      }

      .el-submenu__title {
        border-bottom: none;

        &:hover {
          @at-root .theme-dark .header-trade#{&}, :root .header-dark & {
            background-color: $color-dark-bg;
          }
        }
      }
    }

    .el-button {
      border-color: $color;
      color: $color;
      background-color: #fff;
    }
  }

  .el-menu.el-menu--popup {
    transition: none;
    @at-root .theme-dark.header-trade &, :root .header-dark & {
      background-color: #23263c;
    }


  }

  .el-menu.el-menu--popup .el-menu-item {
    transition: none;
    @at-root .theme-dark.header-trade &, :root .header-dark & {
      color: #576590 !important;
      background-color: #23263c !important;
    }
  }

  .jk-menu.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
  .jk-menu.el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
    @at-root .theme-dark.header-trade &, :root .header-dark & {
      color: $color;
    }
  }

  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
    color: $color !important;
  }

  .el-menu--horizontal .el-menu .el-menu-item.is-active,
  .el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
    color: $color !important;
  }
</style>
