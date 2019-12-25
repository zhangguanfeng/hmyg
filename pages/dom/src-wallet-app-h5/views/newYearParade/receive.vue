/**
*  Created by   阿紫
*  On  2019-01-03
*  Content 领取页
*/
<template>
  <div class='receive'>
    <div class="content">

      <x-button type="default" class="btn-blue" @click.native="toImage">分享快照</x-button>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="showDialogBox" class="dialog-receive">
        <div class="imageWrapper" ref="imageWrapper">
          <div>1222</div>
        </div>
        <img class="real_pic" crossOrigin='anonymous' v-if="false" :src="dataURL"/>
        <div class="share">

          <grid :show-lr-borders="false" :show-vertical-dividers="false">
            <grid-item link="/component/cell" label="微信好友">
              <img slot="icon" src="../../assets/img/newYearParade/portrait.png">
            </grid-item>
            <grid-item link="/component/cell" label="朋友圈">
              <img slot="icon" src="../../assets/img/newYearParade/portrait.png">
            </grid-item>
          </grid>

          <div class="cancel" @click="showDialogBox = false">
            取消
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import html2canvas from 'html2canvas';
  import { TransferDom, XDialog,  Grid, GridItem } from 'vux'

  export default {
    name: "receive",
    data() {
      return {
        dataURL: '',
        showDialogBox: false,
      };
    },
    directives: {
      TransferDom
    },
    components: {
      XDialog,
      Grid,
      GridItem
    },
    methods: {
      toImage() {
        this.showDialogBox = true;
        const imageWrapper = this.$refs.imageWrapper;
        let imgHeight = imageWrapper.offsetHeight // 获取DOM高度
        let imgWidth = imageWrapper.offsetWidth // 获取DOM宽度
        let scale = window.devicePixelRatio // 获取设备像素比

        html2canvas(imageWrapper, {
          backgroundColor: null,
          useCORS: true,
          scale: scale,
          width: imgWidth,
          height: imgHeight
        }).then((canvas) => {
          // imageWrapper.remove();
          this.dataURL = canvas.toDataURL("image/png");
        });
      }
    }
  };
</script>
<style lang="less">
  .receive {
    .imageWrapper {
      padding: 0;

      .pic {
        width: 100%;
      }
    }
  }

  .real_pic {
    width: 100%;
  }

  .dialog-receive {
    .weui-dialog {
      background-color: rgba(0, 0, 0, 0);
      width: 100%;
      height: 100%;
      max-width: 100%;
      border-radius: 0;
      .share {
        width: 100%;
        position: absolute;
        bottom: 0;
        background: #fff;
      }
      .cancel {
        color: #000;
        height: 40px;
        line-height: 40px;
      }
    }
  }

</style>
