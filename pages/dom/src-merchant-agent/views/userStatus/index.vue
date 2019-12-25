<template>
  <div class='userStatus'>
    <div class="main">
      <h1>账户状态</h1>
      <ul v-if="userInfo">
        <li>
          <label>兑入手续费：</label>
          <p>{{userInfo.MERCHANT_IN_COMMISSION_BZ}}</p>
        </li>
        <li>
          <label>兑出手续费：</label>
          <p>{{userInfo.MERCHANT_OUT_COMMISSION_BZ}}</p>
        </li>
        <li>
          <label>最小兑入额度：</label>
          <p>{{userInfo.ACCEPTANT_IN_MIN_AMOUNT}}</p>
        </li>
        <li>
          <label>最大兑入额度：</label>
          <p>{{userInfo.ACCEPTANT_IN_MAX_AMOUNT}}</p>
        </li>
        <li>
          <label>最小兑出额度：</label>
          <p>{{userInfo.ACCEPTANT_OUT_MIN_AMOUNT}}</p>
        </li>
        <li>
          <label>最大兑出额度：</label>
          <p>{{userInfo.ACCEPTANT_OUT_MAX_AMOUNT}}</p>
        </li>
        <li>
          <label>我的兑入交易方式：</label>
          <p>{{userInfo.IN_TYPE}}</p>
        </li>
        <li>
          <label>我的兑出交易方式：</label>
          <p>{{userInfo.OUT_TYPE}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return { 
        userInfo:''
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let p = this.$http.get('ajax_user/accountStatus')
        p.then(res => {
          console.log(res)
          let {result} = res
          this.userInfo = result
        }).catch(error => {
          return false
        })
      }
    },
  }
</script>
<style lang='scss' scoped>
  .userStatus {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
    .main {
      flex: 1;
      -webkit-overflow-scrolling: touch;
      background: #fff;
      display: flex;
      flex-direction: column;
      h1 {
        padding:10px 20px;
        font-size: 24px;
        // border-bottom: 1px solid #999;
      }
      ul {
        padding:0 20px 20px;
        li {
          display: flex;
          align-items: center;
          margin-top: 20px;
          padding: 10px 0;
          border-bottom: 1px dashed #ebeef5;
          label {
            min-width: 180px;
          }
          p {
            flex: 1;
            font-weight: 700;
          }
        }
      }
    }
  } 
</style>