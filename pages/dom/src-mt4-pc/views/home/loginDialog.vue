<template>
  <el-dialog
    custom-class="login-dialog-wrap"
    :visible.sync="visible"
    title=""
    width="400px"
    :show-close="false"
    :append-to-body="true"
    @open="openHandle"
    >
    <div v-show="!showTnCode" v-loading='loading'>
      <span class="welcome">
        欢迎登录 CPT MARKETS
      </span>
      <el-form
        :model="form"
        label-width="0px"
        ref="form"
        class="login-form"
        >
        <el-form-item prop="account">
          <el-input
            v-model="form.user_name"
            clearable placeholder="请输入手机号码"
            class="account"
            @input="form.user_name=form.user_name.toString().replace(/[^\d]/g, '')">
            <el-select v-model="form.user_cell_zd" filterable slot="prepend" placeholder="请选择">
              <el-option
                v-for="(item, index) in areaCodeList"
                :label="item.area_name"
                :value="+item.area_code"
                :key="index">
              </el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            clearable
            @input="form.password=form.password.toString().replace(/\s/g, '')"
            v-model="form.password"
            :placeholder="$t('account[2]')"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="regist">
        <el-button type="primary" size="small" style="width: 80px" @click.stop="loginHandle">
          登录
        </el-button>
        <span>
          没有 CPT MARKET 账号？
          <a href="javascript: void 0" @click="toRegist">立即注册</a>
        </span>
      </span>
    </div>
    <TnCode v-loading='loading' v-model="isTnCode" class="tn-code" v-show="showTnCode" ref="tnCode"></TnCode>
     
  </el-dialog>
</template>
<script>
import TnCode from '@/components/tn-code';
import md5 from 'md5';
import { information, platform, token } from '@/common/util'
export default {
  data() {
    return {
      form: {
        user_name: '',
        user_cell_zd: 86,
        password: '',
      },
      loading: false,
      isTnCode: false,
      showTnCode: false,
    };
  },
  watch: {
    isTnCode() {
      if (this.isTnCode) {
        this.login();
      }
    }
  },
  components: { TnCode },
  methods: {
    openHandle() {
      this.$store.dispatch('getAreaCodeList');
      this.form = {
        user_name: '',
        user_cell_zd: 86,
        password: '',
      };
      this.isTnCode = false;
      this.showTnCode = false;
    },
    turnBack() {
       if (this.showTnCode) {
         this.showTnCode = false;
       } else {
         this.visible = false;
       }
    },
    toRegist() {
      this.visible = false;
      this.$nextTick(() => {
        this.$router.push('/register');
      })
    },
    setHaveLogin(data) {
      // 设置token
      information(JSON.stringify(data))
      token(data.token)
      this.$store.commit('updateUserInfo', data);
    },
    login() {
      this.loading = true;
      const { user_name, password } = this.form
      this.$http
        .post('/Home/login', {
          area: this.user_cell_zd,
          user_name,
          password: md5(password)
        })
        .then((res) => {
          this.setHaveLogin(res.data);
          this.visible = false;
        })
        .catch((e) => {
          this.showTnCode = false;
          this.$refs.tnCode.refresh()
        }).finally(() => {
          this.isTnCode = false;
          this.loading = false;
        })
    },
    loginHandle() {
      const { form } = this;
      if (!form.user_name || !form.password) {
        return;
      }
      this.$refs.tnCode.refresh();
      this.showTnCode = true;
    }
  },
  computed: {
    visible: {
      get () {
        return this.$store.state.showLoginDialog;
      },
      set(val) {
        this.$store.commit('toogleLoginDialog', val);
      }
    },
    areaCodeList() {
      return this.$store.state.areaCodeList;
    }
  },
  created() {
    window.l = this;
    this.openHandle();
  }
}
</script>
<style lang="scss">
  .login-dialog-wrap {
    .el-dialog__header {
      display: none;
    }
    .el-loading-mask {
      display: flex;
      align-items: center;
      justify-content: center;
      .el-loading-spinner {
        position: relative !important;
      }
    }
    .welcome {
      display: block;
      width: 100%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      padding-top: 30px;
      font-size: 24px;
    }
    .regist {
      display: block;
      width: 100%;
      width: 80%;
      margin-left: 10%;
      >span {
        font-size: 13px;
        width: calc(100% - 80px);
        text-align: right;
        display: inline-block;
      }
    }
    .login-form {
      height: 120px;
      padding: 0px 10%;
      width: 80%;
      padding-top: 30px;
    }
    .el-dialog__body {
      padding: 0;
      width: 400px;
      height: 300px;
    }
    .turn-back {
      position: absolute;
      right: 15px;
      top: 10px;
      font-size: 25px;
      cursor: pointer;
      transition: .3s all ease;
      &:hover {
        opacity: .7;
      }
    }
    .tn-code {
      padding: 25px 0 15px 0;
      >div {
        border: none;
        box-shadow: none;
      }
    }
    .account {
      .el-input-group__prepend {
        padding: 0;
        .el-select {
          width: 130px;
          margin: -10px 0;
        }
      }
    }
  }
</style>
