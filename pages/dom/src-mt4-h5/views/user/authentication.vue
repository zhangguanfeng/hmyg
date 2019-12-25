<template>
    <div class="authentication has-header">
        <h-navbar title="实名认证" @backPage="backPage"/>
        <div class="authenticationAll" v-if='step==0'>
            <!-- 已实名 -->
            <div class="isVerified" v-if="status===300">
                <ul>
                    <li>
                        <span class="li-l">国家地区：</span>
                        <span class="li-r">{{userInfo && userInfo.user_nation_name}}</span>
                    </li>
                    <li>
                        <span class="li-l">真实姓名：</span>
                        <span class="li-r">
              <!-- *志贤 -->
              {{userInfo && userInfo.user_name}}
            </span>
                    </li>
                    <li>
                        <span class="li-l">证件号码：</span>
                        <span class="li-r">
              <!-- 4409****4038_old -->
             {{userInfo && userInfo.certificate_no | thumb}}
            </span>
                    </li>
                </ul>
            </div>
            <!-- 未实名 -->
            <div class="noVerified" v-if="status==100">
                <div class="tips">
                    为快速通过审核，请确保证件在有效期内，且照片采集完整清晰，点击查看
                    <span @click="modalBox=true">照片示例</span>
                </div>
                <div class="uploadCard">
                    <div class="uploadInvite">请上传您本人真实有效身份证照片</div>
                    <div class="idCard">
                        <div class="frontFace">
                            <uploadImgBase caption='身份证人面像' v-model="form.img_z" defaultImg='/img/user/default1.png'
                                           preHeight=''/>
                        </div>
                        <div class="reverseFace">
                            <uploadImgBase caption='身份证国徽像' v-model="form.img_f" defaultImg='/img/user/default2.png'
                                           preHeight=''/>
                        </div>
                    </div>
                    <div class="ft-btn" :class="isNext?'ft-btn-active':null" @click="next">下一步</div>
                </div>
                <!-- 拍照示例 -->
                <div class="suchModal" v-if="modalBox">
                    <div class="modal-cn">
                        <p class="cn-title">照片示例</p>
                        <p class="such-title">正确示列</p>
                        <div class="such-box">
                            <div class="such-l">
                                <img src="/img/user/such1.png" alt/>
                            </div>
                            <div class="line"></div>
                            <div class="text">清晰完整</div>
                        </div>
                        <p class="such-title">错误示列</p>
                        <div class="such-box">
                            <div class="such-l">
                                <img src="/img/user/such2.png" alt/>
                            </div>
                            <div class="line"></div>
                            <div class="text">手持身份证</div>
                        </div>
                        <div class="such-box">
                            <div class="such-l">
                                <img src="/img/user/such3.png" alt/>
                            </div>
                            <div class="line"></div>
                            <div class="text">四边不完整</div>
                        </div>
                        <div class="such-box">
                            <div class="such-l">
                                <img src="/img/user/such4.png" alt/>
                            </div>
                            <div class="line"></div>
                            <div class="text">字体不清晰</div>
                        </div>
                        <div class="modal-ft" @click="modalBox=false">我知道了</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="review" v-if="status==200">
            <div class="img-box">
                <img src="@/assets/review.png" alt/>
            </div>
            <p>审核中，请耐心等待</p>
        </div>
        <!-- 审核不通过 -->
        <div class="noPass" v-if="status==400">
            <div class="img-box">
                <img src="@/assets/nopass.png" alt/>
            </div>
            <p class="tips">审核未通过</p>
            <p class="info">身份信息未通过</p>
            <div class="noPassBtn" @click="resubmit">重新提交</div>
        </div>
        <!-- 选择国籍 姓名 证件号码 -->
        <div class="rg-form" v-if="step==1">
            <div class="tips">
                请确认信息真实有效，以免影响您的正常使用，如信息有误请点击修改。
            </div>
            <div class="form-box">
                <label>
                    <span></span>
                    选择国籍
                </label>
                <div class="enter-box nation" @click.stop='showNationList=!showNationList'>
                    {{ nationText }}
                </div>
            </div>
            <div class="form-box">
                <label>
                    <span></span>姓名
                </label>
                <div class="enter-box">
                    <input type="text" placeholder="请输入您的姓名" v-model="form.name"/>
                </div>
            </div>
            <div class="form-box">
                <label>
                    <span></span>证件号码
                </label>
                <div class="enter-box">
                    <input type="text" placeholder="请输入证件号码" v-model="form.certificate_no"/>
                </div>
            </div>
            <div class="ft-btn" :class="isUpload && form.name && form.certificate_no?'ft-btn-active':null"
                 @click="upload">提交
            </div>
        </div>
        <van-overlay :show="showNationList" @click="showNationList=false"/>
        <transition name="slide-fade">
            <van-picker 
                show-toolbar
                class="arealist-picker" v-show="showNationList"
                ref='nationList'
                value-key='nation_name'
                title="选择国籍"
                @click.native.stop="pickerClick"
                :columns="nationList"
                @cancel='showNationList=false'
                @confirm="onSelectConfirm"
            />
        </transition>
    </div>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import uploadImgBase from '@/components/unploadBase64.vue';
  import {Toast} from 'vant';

  // import HAuthUpload from '@/components/h-auth-upload.vue';

  interface IForm {
    nation: string; // 国籍
    name: string; // 姓名
    certificate_no: string; // 证件号码
    img_z: string; // 证件正面
    img_f: string; // 证件反面
  }

  interface IInfo {
    nation: string;
    name: string;
    verCode: string;
  }

  interface INation {
    nation_code: string;
    nation_name: string;
  }

  @Component({components: {uploadImgBase},filters:{
    thumb(url:string){
      return url.substr(0,4)+"**************"+ url.substr(14);
    }
  }})
  export default class Authentication extends Vue {
    protected status: number = 100; // 0未实名 1已实名 2审核中 3审核失败   //100  未认证,200 审核中,300 认证成功,400 审核失败
    protected step: number = 0;
    protected form: IForm = {
      nation: 'CN', // 国籍
      name: '', // 姓名
      certificate_no: '', // 证件号码
      img_z: '', // 证件正面
      img_f: '', // 证件反面
    };
    protected showNationList: boolean = false;

    // protected isUpload: boolean = true;
    protected get nationList(): INation[] {
      return this.$store.state.nationList;
    }

    protected get isUpload(): boolean {
      return !!(this.form.img_z && this.form.img_f);
    }
    protected get userInfo(): any {
      return this.$store.state.userInfo;
    }

    protected modalBox: boolean = false;

    protected backPage() {
      if (this.step === 1) {
        this.step = 0;
      } else {
        // const obj = {
        //   tabBarIndex: 4, // 刷新我的页面
        // };
        // window.noticeAllWebViewController('freshUserInfo');
        this.$nextTick(() => {
            window.closeWebView();
        });
        // window.selectTabBar(obj);
      }
    }

    protected get nationText(): string {
      for (const v of this.nationList) {
        if (v.nation_code === this.form.nation) {
          return v.nation_name;
        }
      }
      return '';
    }

    protected get isNext(): boolean {
      return !!(this.form.img_z && this.form.img_f);
    }

    protected next() {
      for (const v of this.nationList) {
        if (v.nation_name === this.userInfo.user_nation_name) {
          this.form.nation = v.nation_code;
          break;
        }
      }
      if (!this.isUpload) {
        return;
      }
      this.step = 1;
    }

    protected pickerClick(e: any | MouseEvent) {
      const value: string = e.target.innerHTML || '';
      for (const v of this.nationList) {
        if (v.nation_name === value) {
          this.onSelectConfirm(v);
          break;
        }
      }
    }

    protected onSelectConfirm(item: INation) {
      this.form.nation = item.nation_code;
      this.showNationList = false;
    }

    protected upload() {
      if (this.isUpload) {
        if (!this.form.img_z) {
          Toast('请上传身份证人面像');
          return;
        }
        if (!this.form.img_f) {
          Toast('请上传身份证背面像');
          return;
        }
        if (!this.form.name) {
          Toast('姓名不能为空');
          return;
        }
        if (!this.form.certificate_no) {
          Toast('证件号不能为空');
          return;
        }
        const params = Object.assign({}, this.form);
        this.$http.post('User/Authenticate', params).then((res: any) => {
          this.$dialog.alert({
            title: '资料上传成功',
            message: '资料审核约需1-3个工作日，请耐心等待，如有疑问请联系客服',
          }).then(() => {
            window.closeWebView();
          });
        });
      }
    }

    protected resubmit() {
      this.status = 100;
      this.$router.push({
        name: 'authentication',
        query: {
          status: '100'
        }
      })
    }

    protected activated() {
      this.status = +this.$route.query.status || 100;
    }

    protected created() {
      localStorage.setItem( 'pop_message_event_handle', 'getUserInfo' );
      this.$store.dispatch('getUserInfo');
      this.$store.dispatch('getNationList');
    }
  }

</script>
<style lang="scss">
    @import '@/styles/mixin.scss';

    @include slide-fade();
    .authentication {
        height: 100%;

        .h-navbar.van-nav-bar.van-hairline--bottom {
            height: 46px;

            .van-nav-bar__title.van-ellipsis {
                position: absolute;
                bottom: 0;
                left: 153.5px;
            }
        }

        .review {
            .img-box {
                text-align: center;
                padding-top: 70px;

                img {
                    width: 70px;
                }
            }

            p {
                text-align: center;
                color: #5777a6;
                font-size: 14px;
                margin-top: 15px;
            }
        }

        .noPass {
            .img-box {
                text-align: center;
                padding-top: 70px;

                img {
                    width: 70px;
                }
            }

            .tips {
                text-align: center;
                color: #5777a6;
                font-size: 14px;
                margin-top: 15px;
            }

            .info {
                font-size: 16px;
                text-align: center;
                margin-top: 30px;
                color: #1d4582;
                padding: 0 20px;
                font-weight: 500;
            }

            .noPassBtn {
                background: #0064ff;
                height: 42px;
                line-height: 42px;
                text-align: center;
                width: 54%;
                color: #fff;
                font-size: 14px;
                border-radius: 3px;
                position: absolute;
                bottom: 20%;
                z-index: 1;
                left: 23%;
            }
        }

        .arealist-picker {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 10;
            width: 100vw;
        }

        .authenticationAll {
            background: rgba(244, 246, 250, 1);

            .tips {
                padding: 14px 18px;
                font-size: 12px;
                font-weight: 500;

                span {
                    color: $color;
                }
            }

            .isVerified {
                ul {
                    padding-top: 5px;

                    li {
                        border-bottom: 1px solid #d8d8d8;
                        padding: 10px 19px;
                        background: #fff;

                        .li-l {
                            color: #7f7f7f;
                            font-size: 13px;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                        }

                        .li-r {
                            color: #1d2c80;
                            font-size: 13px;
                            padding-left: 5px;
                            font-weight: 500;
                        }
                    }
                }
            }

            .noVerified {
                height: 100%;

                .uploadCard {
                    width: 100%;
                    height: calc(100% - 99px);
                    background: #fff;

                    .uploadInvite {
                        font-size: 14px;
                        font-family: PingFang-SC-Medium, PingFang-SC;
                        font-weight: 500;
                        color: #333333;
                        line-height: 20px;
                        padding-top: 8px;
                        padding-left: calc(50% - 105px);
                        padding-right: calc(50% - 105px);
                    }

                    .idCard {
                        .frontFace {
                            text-align: center;

                            img {
                                width: 230px;
                                height: 154px;
                                margin-top: 33px;
                            }
                        }

                        .reverseFace {
                            text-align: center;

                            img {
                                width: 230px;
                                height: 154px;
                                margin-top: 30px;
                            }
                        }

                        p {
                            font-size: 12px;
                            font-family: PingFang-SC-Medium, PingFang-SC;
                            font-weight: 500;
                            padding-top: 4px;
                        }
                    }

                    .ft-btn {
                        width: 339px;
                        height: 42px;
                        background: #d4dfe9;
                        border-radius: 1.5px;
                        font-size: 14px;
                        font-family: PingFang-SC-Bold, PingFang-SC;
                        font-weight: bold;
                        color: rgba(255, 255, 255, 1);
                        text-align: center;
                        line-height: 42px;
                        margin-left: calc(50% - 169.5px);
                    }

                    .ft-btn-active {
                        background: $color;
                    }
                }

                .suchModal {
                    background: rgba(0, 0, 0, 0.8);
                    position: fixed;
                    top: 46px;
                    left: 0;
                    height: 100%;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    width: 100%;
                    z-index: 111;

                    .modal-cn {
                        .cn-title {
                            font-size: 17px;
                            text-align: center;
                            font-weight: 500;
                            line-height: 40px;
                            color: #fff;
                            letter-spacing: 1px;
                            margin: 5px 0 5px;
                        }

                        .such-title {
                            font-size: 14px;
                            color: #fff;
                            font-weight: 500;
                            padding-left: 53px;
                            margin-bottom: 3px;
                            margin-top: 5px;
                        }

                        .such-box {
                            display: flex;
                            align-items: center;
                            margin: 0 18px 8px;

                            .such-l {
                                width: calc(52% - 32px);
                                padding-left: 32px;

                                img {
                                    width: 100%;
                                }
                            }

                            .line {
                                width: 20%;
                                height: 1px;
                                background: #fff;
                                margin-left: 2px;
                            }

                            .text {
                                padding-left: 10px;
                                font-size: 14px;
                                font-weight: 500;
                                color: #fff;
                            }
                        }

                        .such-box:first-of-type {
                            border-bottom: 1px solid #d8d3d3;
                            padding-bottom: 10px;
                        }

                        .modal-ft {
                            background: #42495f;
                            height: 42px;
                            line-height: 42px;
                            text-align: center;
                            border: 1px solid #c5c5c7;
                            width: 53%;
                            margin: 17px auto 30px;
                            color: #fff;
                            font-size: 14px;
                            border-radius: 3px;
                        }
                    }
                }
            }
        }

        .rg-form {
            .tips {
                color: #666666;
                background: #F4F6FA;
                width: calc(100% - 40px);
                padding: 18px 20px;
                font-size: 12px;
            }

            .form-box {
                padding: 18px 20px 15px 20px;

                label {
                    display: block;
                    color: #333333;
                    font-size: 13px;
                    margin-bottom: 7px;

                    span {
                        color: #f24724;
                        margin-right: 5px;
                        width: 6px;
                        display: inline-block;
                    }
                }

                .enter-box {
                    padding: 0 10px;

                    input {
                        border: 1px solid #c1c1c1;
                        width: 100%;
                        line-height: 33px;
                        border-radius: 5px;
                        text-indent: 10px;
                    }
                }

                .nation {
                    border: 1px solid #c1c1c1;
                    line-height: 37px;
                    border-radius: 5px;
                    text-indent: 10px;
                    height: 37px;
                    display: block;
                    margin-right: 3%;
                    margin: 0 auto;
                    width: calc(100% - 40px);
                }
            }

            .ft-btn {
                background: #d4dfe9;
                height: 42px;
                line-height: 42px;
                text-align: center;
                width: calc(100% - 40px);
                color: #fff;
                font-size: 14px;
                border-radius: 3px;
                margin: 30px 20px 15px 20px;
            }

            .ft-btn-active {
                background: $color;
            }
        }
    }
</style>
