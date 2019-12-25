<template>
  <div class="holder">
    <div class="banner">
      <i></i>
      <span>转出到钱包</span>
    </div>
      <Transaction
      :num-all="12.29387"
      v-model="num"
      ref="transaction"
      :rules="rules.num">
    </Transaction>
    <Botton style="margin-top:25px;" name="确认转出" />
  </div>

</template>

<script>
import Transaction from './transaction-com'
import Botton from './button-com'
export default {
  components:{
    Transaction,Botton
  },
  name: 'outOrIn',
  data: function() {
    const validator = (rule, value, callback) => {
        if (!value) {
          callback(this.$t('transactionCom.placeholder'));
          return;
        }
        callback();
      }
    return {
      num: null,
      rules: {
          num: {
            validator,
            msg: this.$t('transactionCom.placeholder')
          },
        },
    }
  },
  methods: {

  },
  mounted(){
    console.log(this.$route.query.type)
  }
}
</script>

<style scoped lang="less">
.holder{
  height: 100%;
  background: #f4f6fa;
  padding-top: 10px;
  .banner{
    height: 45px;
    // margin-top: 10px;
    background: #fff;
    margin-bottom: 10px;
    line-height: 45px;
    padding-left: 20px;
    i{
      display: inline-block;
      width: 27px;
      height: 27px;
      vertical-align: middle;
      margin-right: 5px;
      background: url('../../assets/img/financing/out.png') no-repeat center / 100% 100%;
    }
    span{
      font-size: 15px;
      font-weight: bold;
      color: #545454;
    }
  }
}
</style>
