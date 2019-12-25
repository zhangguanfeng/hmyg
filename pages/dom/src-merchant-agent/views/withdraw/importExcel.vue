<template>
  <div class='importExcel-page'>
    <div class="main">
      <h3 class="title">批量添加兑出单</h3>
      <div class="example">
        <a href="/excel/example.xlsx" download="导入表格样本" >下载导入表格样本</a>
      </div>
      <p class="uploadBox">
        <span>Excel导入：</span>
        <!-- <el-upload
          class="upload-demo"
          ref="upload"
          :action="SERVER_PATH+'/ajax_trade/uploadimg'"
				  :headers="headers"
          :multiple="false"
          :before-upload="hangdleBrfore">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload> -->
        <input type="file" name="pic" ref="upload" @change="hangdleBrfore" />
      </p>
      <div class="googleBox">
        <span>google验证码：</span>
        <el-input  v-model="google_code" class="googleInput"></el-input>
      </div>
      <el-row>
        <el-button type="primary" size="medium" @click="importExcel">导入</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        SERVER_PATH:window.SERVER_PATH,
        headers:{
          'token':localStorage.getItem('token'),
          'lang':'cn',
          'wl_no':'Alphapay'
			  },
        google_code:'',
        file:'',
        loading:null,
      }
    },
    methods: {
      hangdleBrfore(file) {
        this.File = this.$refs.upload.files[0]
      },
      importExcel() {
        if (!this.File || !this.google_code) {
          this.$message.warning('请选择导入文件及填写验证码！')
          return
        }
        let formData = new FormData();
        formData.append('file_stu',this.File);
        formData.append('google_code',this.google_code);
        let config = {
            headers: Object.assign(this.headers,{
              'Content-Type': 'multipart/form-data'
            })
        }
        this.loading = this.$loading({
          lock:true,
          text:'上传文件中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let p = this.axios.post('/ajax_trade/uploadOutReport',formData,config)
        p.then(res => {
          if (res.data.code === 200) {
            this.loading.close()
            this.$message.success(res.data.msg)
            this.$router.push('/confirmExcel')
          } else if (res.data.code === 40008) {
            this.loading.close()
            localStorage.clear()
            this.$router.replace('/login')
          } else {
            this.loading.close()
            this.$notify({
              type: 'error',
              title: '请求失败',
              message: res.data.msg,
              duration: 5000
            })
          }
        }).catch( error => {
          this.loading.close()
          return false
        })
      }
    },
  }
</script>
<style lang='scss' scoped>
  .importExcel-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
    .main{
			flex: 1;
			overflow: hidden;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			background: #fff;
			display: flex;
			flex-direction: column;
      padding:20px;
      .title {
        margin-bottom:30px;
      }
      .example {
        margin-bottom:20px;
      }
      .uploadBox {
        display: flex;
        align-items: center;
        .upload-demo {
          display: inline-block;
          /deep/ .el-upload {
            width:auto;
            height:auto;
            border:none;
          }
        }
      }
      .googleBox {
        margin:20px 0 30px;
        .googleInput {
          width:300px;
        }
      }
    }
  }
</style>
