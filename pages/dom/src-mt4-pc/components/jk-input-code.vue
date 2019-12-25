/**
*  Created by   阿紫
*  On  2019-03-18
*  Content
*/
<template>
  <el-form-item :label="$t('verificationCode.lable')" :prop="prop">
    <el-input v-model.trim="code" maxlength="6" :placeholder="placeholder" @change="inputChange">
      <div slot="suffix" class="sendMessage">
        <span v-if="accountInfo.user_cell" class="phone"
              @click="sendMessage('MOBILE')">{{this.times==60?$t('verificationCode.value[0]'):captchaTitle}}</span>
        <span v-if="accountInfo.user_cell&&accountInfo.user_email">/</span>
        <span v-if="accountInfo.user_email" class="email"
              @click="sendMessage('EMAIL')">{{this.times==60?$t('verificationCode.value[1]'):captchaTitle}}</span>
      </div>
    </el-input>
  </el-form-item>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'jk-input-code',
  model: {
    event: 'change',
  },
  props: {
    prop: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      code: '',
      times: 60,
      captchaTitle: '',
      placeholder: '',
      sendType: '',
      timer: null,
    };
  },
  computed: {
    accountInfo(state) {
      const accountInfo = JSON.parse(
        sessionStorage.getItem('cptInformation')
      );
      // console.log(accountInfo, 'accountInfo');
      if (accountInfo.user_cell && accountInfo.user_email) {
        this.placeholder = this.$t('verificationCode.placeholder[2]');
      } else if (accountInfo.user_cell) {
        this.placeholder = this.$t('verificationCode.placeholder[0]');
      } else if (accountInfo.user_email) {
        this.placeholder = this.$t('verificationCode.placeholder[1]');
      } else {
        this.placeholder = '';
      }
      return accountInfo;
    },
  },
  methods: {
    inputChange() {
      this.$emit('change', this.code, this.sendType);
    },
    resetTimes() {
      this.times = 60;
      clearInterval(this.timer);
    },
    sendMessage(name) {
      this.sendType = name;
      if (this.times !== 60) {
        return;
      }
      this.$http.post('Home/sendSMSCheckCode', {
        sendType: name,
      }).then((res) => {
        this.inputChange();
        this.timer = setInterval(() => {
          this.times--;
          this.captchaTitle = `${this.$t('verificationCode.value[2]')}(${this.times}s)`;
          if (!this.times) {
            this.resetTimes();
          }
        }, 1000);
      }).catch((res) => {
        this.resetTimes();
      });
    },
    reset() {
      this.code = '';
      this.inputChange();
    },
  },
  mounted() {
    this.code = this.value;
    // this.$store.dispatch('getAccountInfo');
  },
  // 这里必须清理定时器, 组件销毁后定时器还在执行会造成报错
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss">
  .sendMessage {
    color: #1743FF;
    font-size: 14px;
    padding: 0 10px;

    &:after {
      content: '';
      position: absolute;
      left: 0px;
      top: 10px;
      width: 1px;
      height: 20px;
      background: #C8CDE6;
    }

    span {
      cursor: pointer;
    }

    input {
      border: none;
    }
  }
</style>
