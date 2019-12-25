<template>
  <el-dialog
    custom-class="detail-dialog"
    :title="titleMap[status]"
    :visible="visible"
    :close-on-click-modal="false"
    width="80%"
    @update:visible="val => $emit('update:visible', val)">
    <el-form ref="detailForm" :model="detailParams" :rules="rules" label-width="120px">
      <el-form-item label="币种名称：" prop="coinId" style="width: 100%;">
        <el-select
          style="width: 100%;"
          size="small"
          v-model="detailParams.coinId"
          placeholder="请选择币种名称">
          <el-option
            :label="coinInfo.coinName"
            :value="coinInfo.coinId"
            v-for="coinInfo in coinArr"
            :key="coinInfo.coinId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易所币种ID：">
        <el-input size="small" v-model="detailParams.detailUrl" placeholder="请输入交易所币种ID"></el-input>
      </el-form-item>
      <el-form-item label="币种详情：" >
        <quill-editor  v-model.trim="detailParams.context" ref="myQuillEditor"></quill-editor>
        <el-upload class="upload"
                   :action="serverPath+'wallet/util/open/uploadFile.do'"
                   name="files"
                   :data="{type:'html'}"
                   :on-success='upScuccess'
                   :before-upload="beforeUpload"
                   ref="upload" style="display:none">
          <el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="status === 'create'" type="primary" size="small" @click="createDetail">确认创建</el-button>
      <el-button v-else-if="status === 'modify'" type="primary" size="small" @click="updateDetail">确认修改</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';

  import { quillEditor } from 'vue-quill-editor';
  import Quill from 'quill';

export default {
  props: {
    status: {
      type: String,
      default: 'create'
    },
    visible: Boolean,
    coinArr: {
      type: Array,
      default: () => []
    },
    detailParams: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    quillEditor,
  },
  data () {
    const checkNum = (rule, value, callback) => {
      if (!(/^\d+$/g.test(value))) {
        callback(new Error('只能输入交易所币种ID'))
      } else {
        callback()
      }
    }
    return {
      titleMap: {
        create: '新建项目详情',
        modify: '修改项目详情',
      },
      serverPath: '',
      fullscreenLoading: false,
      rules: {
        coinId: [
          { required: true, message: '请选择币种名称', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    resetFields () {
      this.$refs.detailForm && this.$refs.detailForm.resetFields()
    },
    // 创建活期
    async createDetail () {
      let loading = this.$loading({ text: 'Loading', target: '.detail-dialog'})
      try {
        await this.$refs.detailForm.validate()
        const {detailUrl, context} =  this.detailParams;
        if (detailUrl || context) {
          if (detailUrl && !(/^\d+$/g.test(detailUrl))) {
            this.$notify.error({ title: '提示', message: '只能输入交易所币种ID' });
            return ;
          }
          let result = await this.$http.post('/cloud/backmgr/financial/coin/addCoinDetail', this.detailParams)
          this.$emit('update:visible', false)
          this.$emit('createSuccess')
          this.$notify.success({ title: '请求成功', message: '创建项目详情成功' });
        } else {
          this.$notify.error({ title: '提示', message: '币种ID和币种详情必须选填一个' });
        }
      } catch (error) {} finally {
        loading.close()
      }
    },
    // 修改活期
    async updateDetail () {
      let loading = this.$loading({ text: 'Loading', target: '.detail-dialog'})
      // let params = Object.assign({}, this.detailParams)
      // let url = params.url
      // params.detailUrl = url.replace(/(.*id=)(\d)(.*)/g, `$1${params.detailUrl}$3`)
      // delete params.url
      // console.log(params)
      // return
      try {
        await this.$refs.detailForm.validate()
        let result = await this.$http.post('/cloud/backmgr/financial/coin/updateCoinDetail', this.detailParams)
        this.$emit('update:visible', false)
        this.$emit('createSuccess')
        this.$notify.success({ title: '请求成功', message: '更新项目详情成功' });
        console.log(result)
      } catch (error) {} finally {
        loading.close()
      }
    },
    // 图片大小限制
    beforeUpload(file) {
      if(file.size > 1048576) {
        this.$notify({
          title: '提示',
          message: '图片大小不得超过1M',
          type: 'warning'
        });
        return false
      }
    },
    // 图片上传成功回调   插入到编辑器中
    upScuccess(e, file, fileList) {
      this.fullscreenLoading = false
      let vm = this
      let url = ''
      if (this.uploadType === 'image') {    // 获得文件上传后的URL地址
        url = file.response.result.urls[0]
      } else if (this.uploadType === 'video') {
        // url = STATVIDEO + e.key
      }
      if (url != null && url.length > 0) {  // 将文件上传后的URL地址插入到编辑器文本中
        let value = url
        vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
        vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER)   // 调用编辑器的 insertEmbed 方法，插入URL
      } else {
        this.$message.error(`${vm.uploadType}插入失败`)
      }
      this.$refs['upload'].clearFiles()    // 插入成功后清除input的内容
    },
    // 点击图片ICON触发事件
    imgHandler(state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection()
      if (state) {
        let fileInput = document.getElementById('imgInput')
        fileInput.click() // 加一个触发事件
      }
      this.uploadType = 'image'
    },
    // 点击视频ICON触发事件
    videoHandler(state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection()
      if (state) {
        let fileInput = document.getElementById('imgInput')
        fileInput.click() // 加一个触发事件
      }
      this.uploadType = 'video'
    }
  },
  mounted() {
    this.serverPath = window.SERVER_PATH;
  }
}
</script>
