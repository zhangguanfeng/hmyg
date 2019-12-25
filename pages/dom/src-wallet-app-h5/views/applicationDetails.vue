/**
*  Created by   阿紫
*  On  2018-12-13
*  Content
*/
<template>
  <div class='applicationDetails'>
    <div class="center">
      <div class="title">
        <div class="appIcon">
          <img :src="details.appIcon" alt="appIcon">
        </div>
        <div class="appTitle">
          <h3>{{$t('applicationDetails.appName')}}</h3>
          <p>{{$t('applicationDetails.appProp')}}</p>
          <p>{{terminal.android?details.adrSize:details.iosSize}}</p>
        </div>
      </div>
      <div class="app-preview" v-if="details.appPreviewPics">
        <h4>{{$t("applicationDetails.previewTitle")}}</h4>
        <swiper class='swiImgs' :options="swiperOption">
          <swiper-slide v-for="(item, index) in imgList" data-index="index" :key="index" class="item">
            <img class='swiImg' :src='item.src' @click="showImg(index)"/>
          </swiper-slide>
        </swiper>
        <div v-transfer-dom>
          <previewer :list="imgList" ref="previewer" :options="options"></previewer>
        </div>
        <h4>{{$t("applicationDetails.detailsTitle")}}</h4>
        <p>{{$t('applicationDetails.destext')}}</p>
      </div>
    </div>
    <div class="footer">
      <x-button type="default" class="btn-blue" v-if="+params.isload==0" @click.native="goDownload">
        {{$t("applicationDetails.download")}}
      </x-button>
      <x-button type="default" class="btn-blue" v-else @click.native="goOpenapp">{{$t("applicationDetails.openapp")}}
      </x-button>
    </div>
  </div>
</template>
<script>
  import en from '../locales/en';
  import zh from '../locales/zh';
  import { terminal } from 'common/unti';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css';
  import { Previewer, TransferDom } from 'vux';


  export default {
    name: "applicationDetails",
    data() {
      return {
        swiperItemIndex: 0,
        //设置属性
        swiperOption: {
          //显示分页
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          //开启无限循环
          loop: false,
          //设置点击箭头
          paginationClickable: true,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          //设置同屏显示的数量，默认为1，使用auto是随意的意思。
          slidesPerView: 1,
          //开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。
          mousewheel: true,
          slidesPerView: 'auto',
          spaceBetween: 13,
          //默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。
          // freeMode:true
        },
        imgList: [],
        details: {},
        params: {
          id: '',
          isload: '',
          lang: 'zh',
        },
        terminal,
        options: {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.swiImg')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    directives: {
      TransferDom
    },
    components: {
      swiper,
      swiperSlide,
      Previewer
    },
    methods: {
      getThirdAppInfoById(params) {
        const { id, isload, lang } = this.params;
        this.$http.post('wallet/open/app/third/getThirdAppInfoById.do', {
          id
        }).then(res => {
          const { result } = res;
          this.details = result;
          const imgList = result.appPreviewPics.split(',');
          imgList.forEach((item) => {
            this.imgList.push({
              msrc: item,
              src: item
            })
          });
          zh.applicationDetails.appName = result.appName;
          zh.applicationDetails.appProp = result.appProp;
          zh.applicationDetails.destext = result.destext;
          en.applicationDetails.appName = result.appNameEn;
          en.applicationDetails.appProp = result.appPropEn;
          en.applicationDetails.destext = result.destextEn;
        })
      },
      goDownload() {
        const { lang } = this.params;
        if (window.app.downLoadApp) {
          window.app.downLoadApp();
        } else {
          lang === 'zh' ? this.getAlert('请在AlphaWallet客户端打开', '提示', '确定') : this.getAlert('Open this on AlphaWallet', 'prompt', 'confirm');
        }
      },
      goOpenapp() {
        const { lang } = this.params;
        if (window.app.openApp) {
          window.app.openApp();
        } else {
          lang === 'zh' ? this.getAlert('请在AlphaWallet客户端打开', '提示', '确定') : this.getAlert('Open this on AlphaWallet', 'prompt', 'confirm');
        }
      },
      getAlert(content, title, sure) {
        this.$alert(content, title, {
          confirmButtonText: sure,
        });
      },
      showImg(index) {
        this.$refs.previewer.show(index)
      }
    },
    activated() {
      this.params = this.$route.query;
      this.getThirdAppInfoById();
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      document.title = lang === 'zh' ? ' 应用详情' : 'Application details';
    },
  };
</script>
<style lang="less">
  .applicationDetails {
    height: 100%;
    background: #F4F6FA;

    .swiper-container {
      width: 100%;
      height: auto;
    }

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      width: 55%;
      /*height: 150px;*/
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;

      img {
        width: 100%;
        height: 100%
      }
    }

    /* .swiper-slide:nth-child(2n) {
      width: 60%;
    }
    .swiper-slide:nth-child(3n) {
      width: 40%;
    } */

    .center {
      padding: 20px 20px 0 20px;
      height: calc(100vh - 80px);
      overflow: auto;
    }

    .title {
      display: flex;
    }

    .appIcon {
      width: 73px;
      height: 73px;

      img {
        width: 100%;
        border-radius: 10px;
      }
    }

    .appTitle {
      flex: 1;
      margin-left: 20px;

      h3 {
        margin: 0;
        font-size: 18px;
        color: #4F4F4F;
        line-height: 18px;
      }

      p {
        margin: 7px 0 0 0;
        font-size: 12px;
        color: #6C6C6C;
        line-height: 14px;
      }
    }

    .app-preview {
      margin-top: 20px;
      color: #575757;

      h4 {
        margin: 0;
        font-size: 16px;
        line-height: 18px;
        padding: 20px 0 10px 0;
      }

      p {
        margin: 0;
        font-size: 12px;
        line-height: 20px;
      }
    }

    .el-carousel__arrow {
      display: none;
    }

    .el-carousel__container {
      height: 250px;
    }

    @media (min-width: 320px) {
      .el-carousel__container {
        height: 300px;
      }
    }

    .el-carousel__item {
      img {
        height: 100%;
      }
    }

    .footer {
      position: fixed;
      display: flex;
      bottom: 0;
      width: 100%;
      height: 60px;
      justify-content: center;
      align-items: center;

      .el-button--primary {
        width: 70%;
      }
    }
  }

</style>
