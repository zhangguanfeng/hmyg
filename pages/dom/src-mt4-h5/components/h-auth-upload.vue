<template>
  <div class="h-auth-upload" :style="{width: width, height: height}">
    <h-img
      @click.stop.prevent="fileChose"
      :src='src'
      :width="img.showWidth"
      :height="img.showHeight">
    </h-img>
    <input 
      type="file"
      @change="fileChange"
      :accept="accept"
      ref='input'/>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Toast, Image } from 'vant';
@Component({ name: 'h-auth-upload' })
export default class HAuthUpload extends Vue {
  @Prop({ type: String, default: '/img/user/default1.png' }) protected default!: string;
  @Prop({ type: [String, Number], default: '100%' }) protected width!: string|number;
  @Prop({ type: [String, Number], default: '100%' }) protected height!: string|number;
  @Prop({ type: String, default: 'image/gif, image/jpeg, image/png, image/bmp' }) protected accept!: string;
  protected loading: boolean = false;
  protected base64: string | ArrayBuffer | null = null;
  protected mWidth: number = 120;
  protected mHeight: number = 80;
  protected get src(): string {
    if (typeof this.base64 === 'string') {
      return this.base64;
    }
    return this.default;
  }
  protected img: any = {
    showWidth: '100%',
    showHeight: '100%',
  };
  protected fileChose() {
    const vm = this as any;
    vm.$refs.input.value = '';
    vm.$refs.input.click();
  }
  protected fileChange(e: Event) {
    const target: any = e.target;
    const reader: FileReader = new FileReader();
    const file = target.files[0];
    this.loading = true;
    reader.onload = () => {
      let img: any = new Image();
      img.onload = () => {
        const { width, height } = img;
        const resize: { width: number, height: number } =
          this.$util.autoImgSize(width, height, this.mWidth, this.mHeight);
        this.base64 = reader.result;
        file.base64 = reader.result;
        this.img = img;
        img.showWidth = width + 'px';
        img.showHeight = height + 'px';
        img = null;
        this.loading = false;
        this.$emit('input', this.base64);
      };
      img.onError = () => {
        Toast.fail('解析图片失败');
        this.loading = false;
      };
      img.src = reader.result;
    };
    reader.onerror = () => {
      Toast.fail('解析图片失败');
      this.loading = false;
    };
    reader.readAsDataURL(file);
  }
}
</script>
<style lang="scss">
  @import '@/styles/mixin.scss';
  .h-auth-upload {
    width: 100%;
    height: 100%;
    @include flex();
    >img {
      width: 100%;
      height: 100%;
    }
    input {
      position: fixed;
      left: -1000vw;
      height: -1000vh;
      visibility: hidden;
    }
  }
</style>
