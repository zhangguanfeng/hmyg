/**
*  Created by   阿紫
*  On  2019-03-04
*  Content 页脚
*/
<template>
  <div class='footerHome'>
    <div class="content">
      <img class="logo" src="@/assets/home/logo_cpt.png" alt="">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <div class="title" @click="goPage('aboutIndex')">关于我们</div>
            <div @click="getOpenwin">联系客服</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="title" @click="goPage('info')">新闻资讯</div>
            <div @click="goPage('news',{type:'0'})">热点新闻</div>
            <div @click="goPage('calenda')">财经日历</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="title" style="cursor: auto">下载APP</div>
            <img :src="qrcode" alt="">
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="title" @click="goPage('register')">我要开户</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import QRCode from 'qrcode'

  const PATH = `${location.origin}/down`

  export default {
    name: 'footerHome',
    data() {
      return {
        qrcode: ''
      }
    },
    methods: {
      goPage(name, query) {
        this.$router.push({
          name,
          query
        })
      },
      generateQrcode() {
        QRCode.toDataURL(PATH)
          .then((url) => {
            this.qrcode = url
          })
      },
      getOpenwin() {
        window.open('http://html.ecqun.com/kf/sdk/openwin.html?corpid=8579385&cstype=rand&mode=0&cskey=j6GngpqRUhpmVjKhHw&scheme=2');
      }
    },
    mounted() {
      this.generateQrcode()
    }
  }
</script>
<style lang="scss">
  .footerHome {
    background: #1E1E35;
    width: 100%;
    height: 220px;

    .content {
      position: relative;
      margin: 0 auto;
      padding: 40px 0 20px 0;
      width: 1200px;

      .logo {
        position: absolute;
        height: 30px;
        top: 47px;
        left: -80px;
      }

      .grid-content {
        div {
          line-height: 33px;
          color: #fff;
          opacity: 0.6;
          cursor: pointer;
        }

        img {
          border-radius: 7px;
          width: 95px;
          height: 86px;
        }

        .title {
          font-size: 18px;
          line-height: 40px;
          font-weight: 600;
          margin-bottom: 10px;
          opacity: 1;
        }
      }
    }

  }
</style>
