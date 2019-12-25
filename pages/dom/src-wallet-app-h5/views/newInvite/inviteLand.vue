/*
 * @Author: dubbing
 * @Content: 我的->落地页
 * @Date: 2019-07-09 15:10:23
 * @Last Modified by: dubbing
 * @Last Modified time: 2019-07-11 18:25:30
 */

<template>
    <div class="invite">
        <div class="imgbox">
            <img src="@/assets/img/newInvite/cn.png" alt="">
        </div>
        <div class="invite-content">
            <div class="cn-l">
                <span class="span-top">财富伙伴</span>
                <span>投资更好的未来</span>
            </div>
            <div class="cn-r">
                <img :src="qrcodeImgUrl" alt="">
            </div>

        </div>
        <div class="invite-landing__footer">
            <div class="footer-button" @click="goRegistered">立即注册</div>
        </div>
        <!-- <div class="imgbox">
            <img src="@/assets/img/newInvite/cn_1.png" alt="">
        </div>
        <div class="invite-landing__footer">
            <div class="footer-button" @click="goRegistered">立即注册</div>
        </div> -->
        <!-- <div class="invite-landing__footer">
            <div class="footer-content">
                <img class="footer-content__logo" src="@/assets/img/newInvite/icon.png" alt="logo">
                <div class="footer-content__intro">
                <p class="footer-content__title">AlphaWallet</p>
                <p class="footer-content__detail">
                    <span>一款智能数字化，轻便快捷的多链钱包</span>
                </p>
                </div>
            </div>
            <div  class="footer-button" @click="$router.push('/downloadWalletApp')">下载App</div>
        </div> -->
    </div>
</template>
<script>
import QRCode from 'qrcode'
export default {
    data(){
        return{
            registerLink:'',
            qrcodeImgUrl:''
        }
    },
    methods:  {
        goRegistered() {
            location.href = this.registerLink
        }
    },
    mounted(){
        this.registerLink = `${LocationPageURL}/registered.html?inviteCode=${this.$route.query.inviteCode}`
        QRCode.toDataURL(this.registerLink).then(url => {
            this.qrcodeImgUrl=url
        }).catch(err => {
            // console.error(err)
        })
    }
}
</script>
<style lang="less" scoped>
.invite{
    height:100vh;
    overflow: hidden;
    background: url('../../assets/img/newInvite/bg.jpg') no-repeat;
    background-size:100% 100%;
    width:100%;
    .imgbox{
        max-height:calc(100vh - 160px);
        padding:10px 5%;
        text-align:center;
        img{
            width:95%;
            max-height: calc(100vh - 180px);
        }
    }
    .invite-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 10%;
        .cn-l{
            width:50%;
            span{
                display:block;
                color:#fff;
                font-size:16px;
                font-weight: 500;
            }
            .span-top{
                margin-bottom:15px;
            }
        }
        .cn-r{
            width:50%;
            display: flex;
            justify-content: flex-end;
            img{
                width:100px;
                display: block;
                height:100px;

            }
        }
    }
    .invite-landing__footer {
        position: fixed;
        height: 40px;
        color: #fff;
        text-align: center;
        background:linear-gradient(90deg,rgba(137,42,255,1) 0%,rgba(37,94,255,1) 100%);
        line-height: 40px;
        bottom: 0;
        left: 0;
        right:0;
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
        background: linear-gradient(
            130deg,
            rgba(138, 108, 254, 1) 0%,
            rgba(84, 126, 244, 1) 100%
        );
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
            content: '';
            position: absolute;
            top: 5px;
            left: 0;
            width: 1px;
            height: 40px;
            background-color: #fff;
            }
        }
    }
    /* .invite-landing {
        &__poster {
            width: 100%;
        }
        &__footer {
            position: fixed;
            left: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 70px;
            padding: 0 15px;
            background: linear-gradient(
            130deg,
            rgba(138, 108, 254, 1) 0%,
            rgba(84, 126, 244, 1) 100%
            );
        }
        }
        .footer {
        &-content {
            display: flex;
            align-items: center;
            &__logo {
            width: 40px;
            height: 40px;
            }
            &__intro {
            margin-left: 3px;
            }
            &__title {
            font-size: 18px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 25px;
            }
            &__detail {
            font-size: 12px;
            font-family: PingFangSC-Light;
            font-weight: 300;
            color: rgba(255, 255, 255, 1);
            line-height: 15px;
            span {
                display: block;
                transform: scale(0.83333333);
                transform-origin: left;
                white-space: nowrap;
                transform: scale(10/12);
            }
            }
        }
        &-button {
            width: 116px;
            height: 36px;
            font-size: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            background: rgba(255, 255, 255, 1);
            color: #4C15DC;
            border-radius: 18px;
            line-height: 36px;
            text-align: center;
        }
    } */
}
</style>


