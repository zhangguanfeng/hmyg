/
* @Author: dubbing
 * @Content: 我的->邀请好友
 * @Date: 2019-07-09 15:10:23
 * @Last Modified by: dubbing
 * @Last Modified time: 2019-07-17 14:55:10
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
        <div class="invite-footer">
            <p class="invite-footer__link" @click="shareLink">分享链接</p>
            <p class="invite-footer__image" @click="shareCapture" v-if="!isAnd">屏幕快照</p>
        </div>
    </div>
</template>
<script>
import QRCode from 'qrcode'
export default {
    data(){
        return{
            isAnd:false,
            link:'',
            inviteCode:'',
            name:'',
            qrcodeImgUrl:''

        }
    },
    methods:{
        getData(){
            this.$http2.post('/wallet/app/compstar/inviteShareInfo.do', {}, {needToken: true}).then(res => {
                const {inviteCode, name} = res.result.map;
                this.name=name
                this.inviteCode=inviteCode
                this.link=`${LocationPageURL}/registered.html?inviteCode=${inviteCode}`
                QRCode.toDataURL(this.link).then(url => {
                    //console.log(url)
                    this.qrcodeImgUrl=url
                }).catch(err => {
                    // console.error(err)
                })
                /* const obj = {
                    title: '邀请好友',
                    iconUrl: '',
                    jumpUrl: `${LocationURL}/#/inviteLand?inviteCode=${inviteCode}`,
                    content: `Hi～${name?'我是'+name:''}，邀请你一起注册AlphaWallet钱包，存币享收益，理财赚大钱，直通区块链财富梦想大陆!`
                }
                console.log(JSON.stringify(obj))
                window.app.shareLink(JSON.stringify(obj)); */
            })
        },
        shareLink() {
            if(!this.inviteCode){
                this.$http2.post('/wallet/app/compstar/inviteShareInfo.do', {}, {needToken: true}).then(res => {
                    const {inviteCode, name} = res.result.map;
                    const obj = {
                        title: '邀请好友',
                        iconUrl: '',
                        jumpUrl: `${LocationURL}/#/inviteLand?inviteCode=${inviteCode}`,
                        content: `Hi～${name?'我是'+name:''}，邀请你一起注册AlphaWallet钱包，存币享收益，理财赚大钱，直通区块链财富梦想大陆!`
                    }
                    if(window.app.shareLink){
                        window.app.shareLink(JSON.stringify(obj));
                    }
                })
            }else{
                const obj = {
                    title: '邀请好友',
                    iconUrl: '',
                    jumpUrl: `${LocationURL}/#/inviteLand?inviteCode=${this.inviteCode}`,
                    content: `Hi～${this.name?'我是'+this.name:''}，邀请你一起注册AlphaWallet钱包，存币享收益，理财赚大钱，直通区块链财富梦想大陆!`
                }
                if(window.app.shareLink){
                    window.app.shareLink(JSON.stringify(obj));
                }
            }

        },
        shareCapture(){
            if(!this.inviteCode){
                this.$http2.post('/wallet/app/compstar/inviteShareInfo.do', {}, {needToken: true}).then(res => {
                    const {inviteCode} = res.result.map;
                    var obj = {
                        webUrl:`${LocationURL}/#/invitePic?inviteCode=${inviteCode}`,
                        jumpUrl:`${LocationURL}/#/invitePic?inviteCode=${inviteCode}`,
                        title:'',
                        content:''
                    }
                    window.app.shareCapture(JSON.stringify(obj));
                })
            }else{
                var obj = {
                    webUrl:`${LocationURL}/#/invitePic?inviteCode=${this.inviteCode}`,
                    jumpUrl:`${LocationURL}/#/invitePic?inviteCode=${this.inviteCode}`
                }
                window.app.shareCapture(JSON.stringify(obj));
            }
        }
    },
    mounted(){
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            this.isAnd=true
            // if(isAndroid){
            //     this.isAnd=true
            // }else{
            //     this.isAnd=false
            // }
       /*  QRCode.toCanvas(document.getElementById('canvas'), 'sample text', function (error) {
                    if (error) console.error(error)
                    console.log('success!');
        }) */
        this.getData()
        document.title = '邀请好友';
        if(window.app.showShareIcon){
            window.app.showShareIcon(false);
        }

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
        max-height:calc(100vh - 170px);
        padding:10px 5%;
        text-align:center;
        img{
            width:95%;
            max-height: calc(100vh - 190px);
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
}
</style>


