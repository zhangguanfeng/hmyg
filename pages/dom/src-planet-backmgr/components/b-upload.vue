<!--
 * @ Author: Your name
 * @ Create Time: 2019-12-10 17:48:25
 * @ Modified by: Your name
 * @ Modified time: 2019-12-11 00:28:33
 * @ Description: 文件上传
 -->


<template>
  <div class="b-upload-wrap">
    <ul>
      <li
        v-for="(item, key) in imgList"
        :key="key"
        v-loading="loading[key]">
        <div class="img-view" :style="{background: `url(${item})`}" @click.stop="fileSelect(key)"></div>
        <i class="el-icon-delete-solid delete"  @click.stop="deleteFilekey(key)" />
        <i v-show="loading[key] === null" class="el-icon-check success"/>
      </li>
      <li
        v-if="type === 'list' || type === 'single' && !imgList.length"
        class="file-select"
        @click.stop="fileSelect">
        <i class="el-icon-upload" />
      </li>
    </ul>
    <input ref="input"  :multiple="type==='list'" accept="image/gif, image/jpeg" class="upload-input" @change="fileChange" type="file" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BUploadList extends Vue {
  @Prop({ default: () => [] }) protected value!: [];
  @Prop({ default: false }) protected auto!: boolean;
  @Prop({ default: 'single' }) protected type!: string;
  @Prop({ default: 'Common/uploadImage' }) protected remote!: string;
  protected base64: string[] = [];
  protected files: File[] = [];
  protected onUploading: boolean = false;
  protected selectedIndex: number|null = null;
  protected timmer: any = null;
  protected timeout: any = null;
  protected loading: any = []; // false 初始值 true 正在或者上传队列中 null 已经上传
  protected get uploadedUrl(): string[] {
    return this.value;
  }
  protected set uploadedUrl(val: string[]) {
    this.$emit('input', val);
  }

  protected get imgList(): string[] {
    const list: string[] = [];
    for (const i in this.value) {
      if (/^http/.test(this.value[i])) {
        list.push(this.value[i]);
      } else {
        list.push(this.base64[i]);
      }
    }
    return list;
  }
  protected set imgList(val) {
    this.$emit('input', val);
  }
  protected fileChange(e: Event) {
    const files: File[] = (this as any).$refs.input.files;
    const read = async (idx: number = 0) => {
      const file: File = files[idx];
      if (!file) {
        this.$forceUpdate();
        this.$nextTick(() => {
          this.$emit('change', files, this.imgList);
        })
        return;
      }
      const base64: string = await this.$util.readImgFileAsbase64(file);
      if (!base64) {
        return this.$message.error('文件读取错误');
      }
      let index = 0;
      if (this.selectedIndex !== null) {
        index = this.selectedIndex;
        this.uploadedUrl.splice(index, 1, '');
      } else {
        index = this.uploadedUrl.push('') - 1;
      }
      this.files[index] = file;
      this.base64[index]  = base64;
      this.loading[index] = !!this.auto;
      for (let i = 0; i < this.loading.length; i++) {
        this.loading[i] = typeof this.loading[i] === 'undefined' ? false : this.loading[i];
      }
      this.imgList = this.uploadedUrl;
      if (this.auto && !this.onUploading) {
        this.upload();
      }
      read(++idx);
    };
    read();
  }
  protected upload(): Promise<any> {
    let count = 0;
    return new Promise((resole: (tag: string[]) => void, reject: () => void) => {
      for (let i = 0; i <= this.imgList.length; i++) {
        if (this.$util.isBase64Img(this.imgList[i]) && this.loading[i] === false) {
          this.loading[i] = true;
        }
      }
      this.$forceUpdate();
      // 无上传内容
      if (!this.loading.filter((el: any) => el === true).length) {
        this.onUploading = false;
        resole(this.value);
      } else {
        const uploadHandle = (idx: number = 0) => {
          const file: File = this.files[idx];
          if (typeof this.value[idx] === 'undefined') {
            this.onUploading = false;
            resole(this.value);
          } else if (this.loading[idx] === null || /^http/.test(this.value[idx])) {
            uploadHandle(++idx);
          } else {
            this.loading[idx] = true;
            const form: FormData = new FormData();
            if (file) {
              form.append('image', file, file.name);
            }
            this.$post(this.remote, form, {
              headers: {
              'Content-Type': 'multipart/form-data',
              },
            }).then((res: any) => {
              count = 0;
              this.loading[idx] = null;
              this.uploadedUrl[idx] = res.data.file;
              this.imgList = this.uploadedUrl;
              this.$nextTick(() => {
                uploadHandle(++idx);
              });
            }).catch((e) => {
              if (count <= 5){
                count++;
                this.$nextTick(() => {
                  uploadHandle(idx);
                });
              } else {
                this.$notify.error({
                  title: '提示',
                  message: `图片${idx + 1}上传失败`,
                });
              }
            }).finally(() => {
              this.$forceUpdate();
            });
          }
        };
        uploadHandle();
      }
    });
  }
  protected deleteFilekey(key: number) {
    const list = this.value.slice();
    list.splice(key, 1);
    this.loading.splice(key, 1);
    this.files.splice(key, 1);
    this.base64.splice(key, 1);
    this.uploadedUrl.splice(key, 1);
    this.imgList = list;
  }
  private fileSelect(key: number|MouseEvent) {
    this.selectedIndex = typeof key === 'number' ? key : null;
    if (typeof key === 'number') {
      const curr: number = +new Date();
      if (curr - this.timeout > 300) {
        this.timeout = 0;
        clearTimeout(this.timmer);
      }
      if (!this.timeout) {
        this.timeout = +new Date();
        this.timmer = setTimeout(() => {
          const vm = this as any;
          vm.$refs.input.value = '';
          vm.$refs.input.click();
        }, 300);
      } else if (curr - this.timeout < 300) {
        clearTimeout(this.timmer);
        this.$store.commit('viewImage', this.imgList[key])
        this.timeout = 0;
      }
    } else {
      const vm = this as any;
      vm.$refs.input.value = '';
      vm.$refs.input.click();
    }
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .b-upload-wrap {
    @include wh();
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      user-select: none;
      li {
        list-style: none;
        width: 110px;
        height: 110px;
        border: 1px solid #e9e9e9;
        padding: 5px;
        @include flex();
        cursor: pointer;
        margin: 0 8px 8px 0;
        .img-view {
          width: 100%;
          height: 100%;
          background-repeat: no-repeat !important;
          background-size: contain !important;
          background-position: center !important;
        }
        .delete {
          color: rgb(221, 45, 45);
          font-size: 20px;
          width: 0;
          height: 0;
          position: absolute;
          transform: translate(34px, -55px);
          cursor: pointer;
        }
        .success {
          position: absolute;
          font-size: 30px;
          color: #19be6b;
        }
      }
      li:not(.file-select) {
        width: 90px;
        height: 90px;
        animation: scale-in .3s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
        opacity: .4;
      }
      .file-select {
        border-radius: 4px;
        border: 1px dashed #999;
        @include transition();
        i {
          font-size: 34px;
          color: #888;
          @include transition();
        }
        &:hover {
          color: #2db7f5;
          border-color: #2db7f5;
          i {
            color: #2db7f5;
          }
        }
      }
    }
    .upload-input {
      position: absolute;
      visibility: hidden;
      left: calc(-100% - 300px);
      top: calc(-100%);
    }
  }
  @keyframes scale-in {
    0% {
      width: 90px;
      height: 90px;
      opacity: 0;
      transform: translate(0px, 15px);
    }
    100% {
      width: 110px;
      height: 100px;
      opacity: 1;
      transform: translate(0, 0);
    }
  }
</style>
