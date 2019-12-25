<template>
  <div class="auth-upload"
       @mouseenter="addMouseEnter"
       @mouseleave="addMouseLeave">
    <vue-core-image-upload
      v-loading="imgLoading"
      class="upload-component"
      :compress="compress"
      :crop="crop"
      :inputOfFile="fileKey"
      :headers="allHeaders"
      :credentials="false"
      :isXhr="false"
      :extensions="extensions"
      :max-file-size="maxFileSize"
      @imageuploading="imageuploading">
      <div class="upload-img">
        <div v-if="!src" class="upload-before">
          <img class="upload-img__bg" :src="bgImg"/>
          <img class="upload-img__add" :src="addSrc"/>
        </div>
        <div v-else class="upload-after">
          <img class="upload-img__bg" :src="src"/>
        </div>
        <div v-show="src && mouseenter" class="upload-again">
          <img class="upload-again__icon " :src="require('@/assets/authentication/again.png')" alt="again"/>
          <p class="upload-again__capture">对此照片不满意？重新上传</p>
        </div>
      </div>
    </vue-core-image-upload>
  </div>

</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload';
import path from 'path';
import addImg from '../assets/authentication/add.png';
import addClickImg from '../assets/authentication/addClick.png';

export default {
  name: 'jk-upload-auth-image',
  components: {
    'vue-core-image-upload': VueCoreImageUpload,
  },
  props: {
    fileKey: String,
    bgImg: String,
    crop: {
      type: Boolean,
      default: false,
    },
    extensions: String,
    compress: {
      type: Number,
      default: 50,
    },
    headers: {
      type: Object,
      default: () => {
      },
    },
    src: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imgLoading: false,
      imgLoading: false,
      addSrc: addImg,
      mouseenter: false,
      maxFileSize: 1 * 1024 * 1024,
      allHeaders: {
        token: sessionStorage.getItem('cptToken'),
        ...this.headers,
      },
    };
  },
  methods: {
    addMouseEnter() {
      this.addSrc = addClickImg;
      this.mouseenter = true;
    },
    addMouseLeave() {
      this.addSrc = addImg;
      this.mouseenter = false;
    },
    imageuploading(res) {
      const file = res;
      const filesize = file.size;
      const filename = file.name;
      const filetype = file.type;
      if(/image/.test(filetype)) {
        if(filesize > 2097152) {
          this.$message.warning('图片超出限制大小,请保持2M以内');
          return
        }
      }else {
        this.$message.warning('请上传jpg/png格式文件');
        return
      }
      this.imgLoading = true;

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
        const file_content = e.target.result;
        this.$http.post('/CommonFun/uploadImage',{
          file_content
        }).then(res=>{
          this.$emit('uploadSuccess', res.img_url);
        }).finally(e => {
          this.imgLoading = false;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .auth {
    &-upload {
      position: relative;
      width: 287px;
      height: 194px;
      margin: 50px auto 40px;
      padding: 20px;
      box-sizing: border-box;
      border: 2px dashed #333360;

      /deep/ .el-loading-spinner {
        top: 50% !important;
      }

      &:hover {
       .upload-img__add {
         width: 40px;
       }
      }
    }
  }

  .upload-component {
    height: 100%;
    cursor: pointer;
  }

  .upload-img {
    height: 100%;

    &__bg,
    &__add {
      position: absolute;
      top: 50%;
      left: 50%;
      transition: width .3s;
      transform: translateX(-50%) translateY(-50%);
    }

    &__bg {
      width: 100%;
      height: 100%;
    }

    &__add {
      width: 35px;
    }
  }

  .upload-again {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgba(9, 9, 9, 0.4);

    &__icon {
      position: absolute;
      left: 50%;
      top: 58px;
      transform: translateX(-50%);
    }

    &__capture {
      position: absolute;
      top: 96px;
      width: 100%;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
  }
</style>
