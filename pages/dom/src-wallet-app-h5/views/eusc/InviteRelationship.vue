/**
*  Created by   阿紫
*  On  2019/6/30 0030
*  Content 邀请关系
*/
<template>
  <div class='InviteRelationship'>
    <!-- <div style="width: 100%; height:calc(100vh); text-align: center; background: #fff; line-height: calc(100vh)">
      敬请期待
    </div> -->
   <div class="title">
     <span><!-- 我的邀请关系 --></span>
     <span>社区人数：{{list.length}}人</span>
   </div>
   <tab bar-active-color="#5E87D8" active-color="#5E87D8">
     <tab-item selected @on-item-click="onItemClick">邀请人</tab-item>
     <tab-item @on-item-click="onItemClick">社区</tab-item>
     <!-- <tab-item @on-item-click="onItemClick">三级</tab-item> -->
   </tab>
   <x-table :cell-bordered="false" style="background-color:#fff;    "  v-show="activeTab==0" >
     <thead>
      <tr style="background-color: #F4F6FA; font-size:12px; height:34px; line-height:34px;">
        <th style="width:35%">账号</th>
        <th style="width:15%">级别</th>
        <th style="width:50%">时间</th>
      </tr>
     </thead>
     <tbody>
     <tr v-for="(item, index) in list" :key="index">
       <td style="color:#999999; font-size: 13px;width:35%">{{item.phone}}</td>
       <td style="color:#5E87D8; font-size: 13px;font-weight:500;width:15%">{{item.rank}}</td>
       <td style="color:#5E87D8; font-size: 13px;width:50%">{{item.registTime}}</td>
     </tr>
     </tbody>
   </x-table>
   <div v-show="activeTab==1" style="width: 100%; height:calc(100vh - 80px); text-align: center; background: #fff; line-height: calc(100vh - 80px)">
      敬请期待
    </div>
    <div class="button">
        <div class="primary" @click="getInviteShareInfo">邀请好友</div>
      </div>
  </div>
</template>
<script>
  import {Tab, TabItem, XTable} from 'vux'

  export default {
    name: "InviteRelationship",
    components: {
      Tab,
      TabItem,
      XTable,
    },
    data() {
      return {
        activeTab:0,
        list: [
          /* {phone:15112288358,rank:20,registTime:'2018-08-13 19:38:02'},
          {phone:15112288358,rank:20,registTime:'2018-08-13 19:38:02'},
          {phone:15112288358,rank:20,registTime:'2018-08-13 19:38:02'},
          {phone:15112288358,rank:20,registTime:'2018-08-13 19:38:02'},
          {phone:15112288358,rank:20,registTime:'2018-08-13 19:38:02'},
          {phone:15112288358,rank:20,registTime:'2018-08-13 19:38:02'},
          {phone:15112288358,rank:20,registTime:'2018-08-13 19:38:02'},
          {phone:15112288358,rank:20,registTime:'2018-08-13 19:38:02'}, */
        ]
      };
    },
    methods: {
      onItemClick(val) {
        this.activeTab=val
      },
      getInviteShareInfo() {
        this.$http2.post('/wallet/app/compstar/inviteShareInfo.do', {}, {needToken: true}).then(res => {
          const {inviteCode, name} = res.result.map;
          const obj = {
            title: '邀请好友',
            iconUrl: '',
            jumpUrl: `${LocationURL}/#/EUSCInviteLanding?inviteCode=${inviteCode}`,
            content: `Hi～${name?'我是'+name:''}，邀请你一起存EUSC赚钱，存币收益超高。活期理财，定期理财，节点奖励，每日分红......助你财富自由，快来一起赚收益!`,
          }
          window.app.shareLink(JSON.stringify(obj));
        })
      },
      /* transferShareParams(inviteCode='', name=""){
        const obj = {
          title: '邀请好友',
          iconUrl: '',
          jumpUrl: `${LocationURL}/#/EUSCInviteLanding?inviteCode=${inviteCode}`,
          content:`Hi～我是${name}，邀请你一起存EUSC赚钱，存币收益超高。活期理财，定期理财，节点奖励，每日分红......助你财富自由，快来一起赚收益!`,
        }
        window.app.transferShareParams(JSON.stringify(obj));
      },
      getInviteShareInfo  ()  {
        this.$http2.post('/wallet/app/compstar/inviteShareInfo.do', {}, {needToken: true}).then(res=>{
          const {inviteCode, name} = res.result.map;
          this.transferShareParams(inviteCode, name);
        })
      } */
    },
    mounted(){
      document.title = '邀请关系';
      this.$http2.get('/cloud/app/eusc/getInviteUsers', {}, {needToken: true}).then(res=>{
        this.list=res.result.list
      })
      window.app.showShareIcon(false); 
      /* this.transferShareParams('', '');
      this.getInviteShareInfo(); */
      /* window.app.showShareIcon(false); */
    }
  };
</script>
<style lang="less">
  .InviteRelationship {
    background: #F4F6FA;
    height: 100%;
    /* overflow-y: scroll; */
    .title {
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #666666;
    }
    tbody{
      display:block;
      height: calc(100vh - 174px);
      overflow: auto;
    }
    tr{
      display: flex;
      width:100%;
    }
    .button {
      background: #fff;
      position: fixed;
      height: 60px;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0 50px;

      .primary {
        margin-top: 10px;
        background-color: #5E87D8;
        border-radius: 40px;
        color: #fff;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      }
    }
  }
</style>
