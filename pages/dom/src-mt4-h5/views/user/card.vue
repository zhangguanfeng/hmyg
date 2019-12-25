/**
*  Created by   阿紫
*  On  2019/10/24
*  Content 银行卡管理
*/
<template>
    <div class='card'>
        <h-navbar title='收款地址' @backPage="onClickLeft"/>
        <div class="content">
            <van-swipe-cell :on-close="onClose"
                            v-for="(item,index) in bankList"
                            :name="item.bank_id"
                            :key="index">
                <template slot="default">
                    <div class="list" :class="{review:item.bank_status == 100,notThrough:item.bank_status == 110}">
                        <div class="left">
                            <div class="title">
                                <div>
                                    {{item.bank_name}}（{{item.bank_last}}）
                                </div>

                                <div class="right">
                                    <span v-if="item.bank_status == 100" style="color:#6F520C">审核中</span>
                                    <span v-if="item.bank_status == 110" style="color:#FF5B00">审核未通过</span>
                                </div>
                            </div>
                            <h4>{{item.bank_no}}</h4>
                        </div>
                    </div>
                </template>
                <template slot="right">
                    <van-button square type="danger" text="删除"/>
                </template>
            </van-swipe-cell>
        </div>
        <div class="addCard" @click="addCard">
                <span>
                    + 使用新的卡收款
                </span>
        </div>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Card extends Vue {
    protected bankList: any = [];

    onClickLeft() {
      window.closeWebView();
    }

    onClose(clickPosition: any, instance: any, detail: any) {
      switch (clickPosition) {
        case 'outside':
          instance.close();
          break;
        case 'right':
          this.$dialog.confirm({
            message: '确定删除此银行卡吗？'
          }).then(() => {
            this.onConfirm(detail.name)
            instance.close();
          });
          break;
      }
    }

    getBank() {
      this.$http.post('/Assets/getBank').then((res: any) => {
        
        this.bankList = res.data;
      })
    }

    //删除银行卡
    onConfirm(bank_id: any) {
      this.$http.post('/Assets/delBank', {
        bank_id
      }).then(res => {
        this.$toast('删除成功');
        this.getBank();
      })
    };

    addCard() {
      this.$router.push({
        name: 'addCard'
      })
    }

    activated() {
      this.getBank();
    }
  };
</script>
<style lang='scss'>
    .card {
        background: $bg-color;
        padding: 0 20px;
        height: 100%;

        .content {
            padding-top: 56px;
            height: calc(100vh - 120px);
            overflow-y: scroll;
        }

        .list {
            width: 100%;
            height: 80px;
            border-radius: 4px;
            background: #fff;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
                width: 100%;
            }

            .title {
                padding: 0 20px;
            }

            h4 {
                margin: 0;
                padding: 0 20px;
                line-height: 40px;
                font-size: 18px;
                color: #333;
                font-weight: 800;
            }

            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }

        .review {
            background: #FFF6D1;
            position: relative;

            &:after {
                position: absolute;
                content: '';
                top: 0;
                width: 5px;
                height: 100%;
                background: #FFCB00;
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
                left: 0;
            }
        }

        .notThrough {
            background: #FFD4BD;

            &:after {
                position: absolute;
                content: '';
                top: 0;
                width: 5px;
                height: 100%;
                background: #FF5B00;
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
                left: 0;
            }
        }

        /deep/ .van-swipe-cell__right {
            height: 100%;

            .van-button {
                height: 100%;
            }
        }

        .addCard {
            width: 100%;
            height: 60px;
            background: #fff;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;

            span {
                width: calc(100% - 42px);
                line-height: 40px;
                height: 40px;
                display: inline-block;
                margin: 10px 20px;
                text-align: center;
                color: $color;
                border-radius: 4px;
                border: 1px dashed $color;
            }
        }
    }
</style>
