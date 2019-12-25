/**
*  Created by   阿紫
*  On  2019/10/25
*  Content 添加银行卡
*/
<template>
    <div class='addCards'>
        <h-navbar title='取款银行卡' @backPage="backPage"/>
        <div class="upload" v-if="isUpload">
            <div class="tip">
                请上传您本人真实有效身份证照片
            </div>
            <div class="upload-wrap">
                <uploadImgBase preWidth="200px" ref="bank_img_z" preHeight="120px" caption="银行卡正面" :defaultImg="defaultImg0"
                               v-model="form.bank_img_z"/>
            </div>
            <div class="upload-wrap">
                <uploadImgBase preWidth="200px" ref="bank_img_f" preHeight="120px" caption="带本人签名的银行卡背面" :defaultImg="defaultImg1"
                               v-model="form.bank_img_f"/>
            </div>
            <van-button class="btn" type="primary"
                        :disabled="form.bank_img_z=='' ||form.bank_img_f==''"
                        @click="isUpload=false" size="large">
                下一步
            </van-button>
        </div>
        <div class="info" v-else>
            <div class="tip">
                请确认信息真实有效，以免影响您的正常使用，如信息有误请点击修改。
            </div>
            <van-cell-group>
                <van-field
                    v-model="form.bank_user_name"
                    required
                    clearable
                    label="持卡人"
                    @blur="changeField('bank_user_name')"
                    :error="error.bank_user_name"
                    placeholder="请输入"
                />
                <van-field
                    required
                    v-model="form.bank_no"
                    type="number"
                    clearable
                    label="卡号"
                    placeholder="请输入"
                    :error="error.bank_no"
                    @blur="changeField('bank_no')"
                    />
                <van-field
                    v-model="form.bank_name"
                    required
                    clearable
                    label="银行"
                    :error="error.bank_name"
                    placeholder="请输入"
                    @blur="changeField('bank_name')"
                />
                <van-field
                    v-model="form.swif_code"
                    required
                    clearable
                    label="Swif Code"
                    placeholder="请输入"
                    :error="error.swif_code"
                    @blur="changeField('swif_code')"
                />
                <van-cell title="币种" is-link arrow-direction="down"
                          @click="showCurrencyList=true"
                          :value="form.user_currency"/>
                <van-cell title="国家" is-link arrow-direction="down"
                          @click="NationClick"
                          :value="form.bank_nation"/>
                <van-field
                    v-model="form.bank_address"
                    required
                    clearable
                    label="支行地址"
                    @blur="changeField('bank_address')"
                    placeholder="请输入"
                    :error="error.bank_address"
                />
            </van-cell-group>
            <van-button class="btn" type="primary"
                        :disabled="isDisabled"
                        @click="confirmation" size="large">
                确认并提交
            </van-button>
            <van-action-sheet v-model="showCurrencyList" title="选择币种">
                <van-radio-group v-model="form.user_currency">
                    <van-cell-group>
                        <van-cell v-for="(item,index) in currencyList"
                                  :key="index"
                                  clickable
                                  @click="exchanCurrency(item)"
                                  :title="item">
                            <van-radio slot="right-icon" :name="item"/>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </van-action-sheet>
            <van-action-sheet v-model="showNationList" title="选择国家或地区">
                <van-search placeholder="请输入国家或地区" @input="changeInput" v-model="search"/>
                <van-radio-group v-model="radioNation">
                    <van-cell-group>
                        <van-cell v-for="(item,index) in searchList"
                                  :key="index"
                                  clickable
                                  @click="exchanNation(item)"
                                  :title="item.nation_name">
                            <van-radio slot="right-icon" :name="item.nation_code"/>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </van-action-sheet>
        </div>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';
  import uploadImgBase from "../../components/unploadBase64.vue";

  interface Form {
    bank_img_z?: string; // 银行卡正面
    bank_img_f?: string; // 银行卡反面
    bank_user_name: any; // 持卡人
    bank_no: any; // 账户,卡号
    bank_name: any; // 银行
    swif_code: any; // Swif Code
    user_currency: any; // 币种,货币类型
    bank_nation: any; // 国家
    bank_address: any; // 支行地址
  }

  @Component({components: {uploadImgBase}})
  export default class AddCard extends Vue {
    protected isUpload: boolean = true;
    protected defaultImg0: string = '/img/user/default3.png';
    protected defaultImg1: string = '/img/user/default4.png';
    protected showNationList: boolean = false;
    protected nationList: any = [];
    protected searchList: any = [];
    protected search: any = '';
    protected radioNation: any = '';
    protected showCurrencyList: boolean = false;
    protected currencyList: any = [];
    protected radioCurrency: any = '';
    protected isDisabled: boolean = true;

    protected form: Form = {
      bank_img_z: '', // 银行卡正面
      bank_img_f: '', // 银行卡反面
      bank_user_name: '', // 持卡人
      bank_no: '', // 账户,卡号
      bank_name: '', // 银行
      swif_code: '', // Swif Code
      user_currency: '', // 币种,货币类型
      bank_nation: '', // 国家
      bank_address: '', // 支行地址
    };
    protected error: Form = {
      bank_user_name: false, // 持卡人
      bank_no: false, // 账户,卡号
      bank_name: false, // 银行
      swif_code: false, // Swif Code
      user_currency: false, // 币种,货币类型
      bank_nation: false, // 国家
      bank_address: false, // 支行地址
    };

    // 返回
    protected backPage() {
      if (this.isUpload) {
        this.$router.go(-1);
      } else {
        this.isUpload = true;
      }

    }

    // 选择币种
    protected exchanCurrency(res: any) {
      this.showCurrencyList = false;
      this.form.user_currency = res;
    }

    // 选择国家
    protected NationClick(res: any) {
      this.showNationList=true
      this.search = '';
      this.searchList = this.nationList;
    }
    protected exchanNation(res: any) {
      this.showNationList = false;
      this.radioNation = res.nation_code;
      this.form.bank_nation = res.nation_name;
    }

    // 搜索
    protected changeInput() {
      const reg = new RegExp(this.search, 'i');
      this.searchList = this.nationList.filter((res: any) => reg.test(res.nation_name));
    }

    // 获取货币类型
    protected getCurrency() {
      this.$http.get('/Assets/getCurrency').then((res: any) => {
        const data = res.data.currency
        if (data.indexOf(',') > -1) {
          this.currencyList = data.split(',')
          this.form.user_currency = this.currencyList[0]
        } else {
          this.currencyList = [res.data.currency]
          this.form.user_currency = res.data.currency
        }
      })
    }

    // 控制确认并提交按钮是否显示
    protected getIsDisabled() {
      const {bank_user_name, bank_no, bank_name, swif_code, bank_address} = this.form;
      this.isDisabled = true;
      if (bank_user_name && bank_no && bank_name && swif_code && bank_address) {
        this.isDisabled = false;
      }
    }


    // 输入框改变
    protected changeField(name: any) {
      (this as any).error[name] = (this as any).form[name] ? false : true;
      this.getIsDisabled();
    }

    // 确定添加卡
    protected confirmation() {
      this.$http.post('/Assets/addBank', this.form).then( (res: any) => {
        this.$toast('新增卡成功');
        this.$router.go(-1);
      });
    }

    // 获取国家
    protected getNation() {
      this.$http.post('/CommonFun/getNation').then((res: any) => {
        this.nationList = res.data || [];
        this.searchList = res.data || [];
        if (res.data.length > 0) {
          this.form.bank_nation = res.data[0].nation_name;
          this.radioNation = res.data[0].nation_code;
        }
      });
    }

    protected activated() {
      this.isUpload = true;
      this.form = {
        bank_img_z: '', // 银行卡正面
        bank_img_f: '', // 银行卡反面
        bank_user_name: '', // 持卡人
        bank_no: '', // 账户,卡号
        bank_name: '', // 银行
        swif_code: '', // Swif Code
        user_currency: '', // 币种,货币类型
        bank_nation: '', // 国家
        bank_address: '', // 支行地址
      };
      this.error = {
        bank_user_name: false, // 持卡人
        bank_no: false, // 账户,卡号
        bank_name: false, // 银行
        swif_code: false, // Swif Code
        user_currency: false, // 币种,货币类型
        bank_nation: false, // 国家
        bank_address: false, // 支行地址
      };
      const vm = this as any;
      vm.$refs.bank_img_z.inputVal = '';
      vm.$refs.bank_img_f.inputVal = '';
      this.getCurrency();
      this.getNation();
    }
  };
</script>
<style lang='scss'>
    .addCards {
        padding: 56px 20px 0 20px;

        .tip {
            color: #333333;
            text-align: left;
            height: 50px;
            font-size: 13px;
        }

        .upload {

            .upload-wrap {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                margin-bottom: 20px;
            }
        }

        .btn {
            background: $color;
            border: none;
            margin-top: 50px;
            height: 42px;
            line-height: 42px;
            width: calc(100vw - 40px);
        }

        /deep/ .van-action-sheet__content {
            height: 400px;

            .van-radio-group {
                max-height: 320px;
                overflow-y: scroll;
                padding-bottom: 10px;
            }

            .addCard {
                margin: 20px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: $color;
                border-radius: 4px;
                border: 1px dashed $color;
            }
        }

        .info {
            .van-field__control {
                text-align: right;
            }
        }
    }
</style>
取款银行卡
