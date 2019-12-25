/**
*  Created by   阿紫
*  On  2019/7/2 0002
*  Content
*/
<template>
  <el-dialog
    :close-on-click-modal="false"
    custom-class="regular-dialog"
    :title="titleMap[status]"
    :visible="visible"
    width="850px"
    @update:visible="val => $emit('update:visible', val)">
    <el-form ref="regularParams" :model="regularParams" :rules="rules" label-width="140px">

          <el-form-item label="币种名称：" prop="coinId" style="width: 100%;">
          <el-select
            style="width: 100%;"
            size="small"
            v-model="regularParams.coinId"
            placeholder="请选择币种名称">
            <el-option
              :label="coinInfo.coinName"
              :value="coinInfo.coinId"
              v-for="coinInfo in coinArr"
              :key="coinInfo.coinId"
            ></el-option>
          </el-select>
        </el-form-item>

          <el-form-item label="预计年化收益率：" prop="rate">
          <el-input size="small" v-model="regularParams.rate" placeholder="请输入预计年化收益率">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>

          <el-form-item label="违约金：" prop="penalRate">
            <el-input size="small" v-model="regularParams.penalRate" placeholder="请输入违约金">
              <span slot="suffix">%</span>
            </el-input>
          </el-form-item>

          <el-form-item label="图标:" prop="icon">
            <el-input style="width:100%" v-model="regularParams.icon" clearable size="small" placeholder="请输入图标地址">
              <el-upload
                :action="server_path + 'wallet/util/open/uploadFile.do'"
                multiple
                name="files"
                :data="{type:'img'}"
                :show-file-list="false"
                :on-success="upload" slot="append">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-input>
          </el-form-item>


          <el-form-item label="结算天数："  prop="bindCycle">
            <el-input size="small" v-model="regularParams.bindCycle" placeholder="请输入结算天数">
              <span slot="suffix">天</span>
            </el-input>
          </el-form-item>

          <el-form-item label="起购额度：" >
            <el-input size="small" v-model="regularParams.minAmount" placeholder="请输入起购额度">
            </el-input>
          </el-form-item>


          <el-form-item label="权重：" >
            <el-input size="small" v-model="regularParams.weight" placeholder="请输入权重"></el-input>
          </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="status === 'create'" type="primary" size="small" @click="create">确认创建</el-button>
      <el-button v-else-if="status === 'modify'" type="primary" size="small" @click="update">确认修改</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "regularDialog",
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
      colProList: {
        type: Array,
        default: () => []
      },
      regularParams: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      const checkNum = (rule, value, callback) => {
        if (isNaN(Number(value))) {
          callback(new Error('必须为数字值'))
        } else {
          callback()
        }
      }
      return {
        tagsArr:[],
        tags:'',
        titleMap: {
          create: '创建产品',
          modify: '修改产品'
        },
        rules: {
          coinId: [
            { required: true, message: '请选择币种名称', trigger: 'change' },
          ],
          rate: [
            { required: true, message: '请输入预计年化收益率', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '请输入图标地址', trigger: 'blur' },
          ],
          penalRate: [
            { required: true, message: '请输入违约金', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur' }
          ],
          bindCycle: [
            { required: true, message: '请输入结算天数', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur' }
          ]
        },
        server_path: "",
      }
    },
    watch:  {
      regularParams(val){
        this.tagsArr = val.proTags?val.proTags.split(','):[];
      }
    },
    methods: {
      resetFields () {
        this.$refs.regularParams && this.$refs.regularParams.resetFields()
      },
      // 创建定期
      async create () {
        let loading = this.$loading({ text: 'Loading', target: '.regular-dialog'})
        try {
          await this.$refs.regularParams.validate()
          let result = await this.$http.post('cloud/backmgr/financial/addIntervalFinancialPro', this.regularParams)
          this.$emit('update:visible', false)
          this.$emit('createSuccess')
          this.$notify.success({ title: '请求成功', message: '创建定期项目成功' });
          console.log(result)
        } catch (error) {} finally {
          loading.close()
        }
      },
      // 修改定期
      async update () {
        let loading = this.$loading({ text: 'Loading', target: '.regular-dialog'})
        try {
          await this.$refs.regularParams.validate()
          let result = await this.$http.post('cloud/backmgr/financial/updateIntervalFinancialPro',this.regularParams)
          this.$emit('update:visible', false)
          this.$emit('createSuccess')
          this.$notify.success({ title: '请求成功', message: '更新定期项目成功' });
          console.log(result)
        } catch (error) {} finally {
          loading.close()
        }
      },
      async fetchData () {
        let { result } = await this.$http.post('cloud/backmgr/financial/getAllColProList')
        this.list = result.list
      },
      upload(response, file, fileList) {
        this.$emit('upload', response.result.urls[0]);
      },
    },
    mounted () {
      this.server_path = SERVER_PATH;
    },
  }
</script>

