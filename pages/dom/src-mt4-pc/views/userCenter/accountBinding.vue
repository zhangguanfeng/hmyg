/**
*  Created by   阿紫
*  On  2019-03-11
*  Content 账号绑定
*/
<template>
  <div class='accountBinding'>
    <div class="title">
      {{$t('accountBinding.title')}}
    </div>
<!--    <div class="content email">-->
<!--      <div class="icon">-->
<!--        <img v-if="accountInfo.user_email" src="@/assets/userCenter/complete.png" alt="">-->
<!--        <img v-else src="@/assets/userCenter/unbounded.png" alt="">-->
<!--      </div>-->
<!--      <div class="describe">-->
<!--        <h4>{{$t('accountBinding.content[0]')}}</h4>-->
<!--        <p>{{$t('accountBinding.content[1]')}}</p>-->
<!--      </div>-->
<!--      <el-button size="small" @click="goBindingDetails(false)">-->
<!--        {{accountInfo.user_email?$t('accountBinding.content[4]'):$t('accountBinding.content[3]')}}-->
<!--      </el-button>-->
<!--    </div>-->
    <div class="content phone">
      <div class="icon">
        <img v-if="accountInfo.user_cell" src="@/assets/userCenter/complete.png" alt="">
        <img v-else src="@/assets/userCenter/unbounded.png" alt="">
      </div>
      <div class="describe">
        <h4>{{$t('accountBinding.content[2]')}}</h4>
        <p>{{$t('accountBinding.content[1]')}}</p>
      </div>
      <el-button size="small" @click="goBindingDetails(true)">
        {{accountInfo.user_cell?$t('accountBinding.content[4]'):$t('accountBinding.content[3]')}}
      </el-button>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    name: 'accountBinding',
    data() {
      return {
        accountInfo: {}
      }
    },
    methods: {
      goBindingDetails(isPhone) {
        this.$router.push({
          name: 'binding_details',
          query: {
            isPhone
          }
        })
      }
    },
    activated() {
      this.accountInfo = JSON.parse(
        sessionStorage.getItem('cptInformation')
      )
    }
  }
</script>
<style lang="scss">
  .accountBinding {
    background: #fff;
    padding: 20px 20px 80px 20px;

    .title {
      color: #404040;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
      text-align: left;
    }

    .email {
      border-bottom: 1px solid #DCDCDC;

      .icon {
        background: url('../../assets/userCenter/email_binding.png') no-repeat center / 100% 100%;
      }
    }

    .phone {
      .icon {
        background: url('../../assets/userCenter/phone.png') no-repeat center / 100% 100%;
      }
    }

    .content {
      display: flex;
      padding: 30px 70px;
      margin: 0 40px;

      .icon {
        width: 42px;
        height: 42px;
        position: relative;
        margin-right: 20px;

        img {
          position: absolute;
          width: 16px;
          bottom: 0;
          right: -5px;
        }
      }

      .describe {
        text-align: left;

        h4 {
          color: #7A7A7A;
          margin: 0;
          font-size: 16px;
        }

        p {
          color: #A2A2A2;
          font-size: 14px;
          margin: 0;
        }
      }

      .el-button.el-button--small {
        margin-left: 80px;
        background: $color;
        border-color: $color;
        color: #fff;
        height: 36px;
        line-height: 36px;
        padding: 0 30px;
      }
    }
  }
</style>
