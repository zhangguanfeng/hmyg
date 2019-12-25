/**
*  Created by   阿紫
*  On  2019/7/2 0002
*  Content  创建集合产品
*/
<template>
  <el-dialog
    :close-on-click-modal="false"
    custom-class="gather-dialog"
    :title="titleMap[status]"
    :visible="visible"
    width="850px"
    @update:visible="val => $emit('update:visible', val)">
    <el-form ref="gatherParams" :model="gatherParams" :rules="rules" label-width="140px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="币种：" prop="getCoinId"  style="width: 100%;">
            <el-select
              style="width: 100%;"
              size="small"
              v-model="gatherParams.coinId"
              placeholder="请选择币种">
              <el-option
                :label="coinInfo.coinName"
                :value="coinInfo.coinId"
                v-for="coinInfo in coinArr"
                :key="coinInfo.coinId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预计年化收益率：" prop="rate">
          <el-input size="small" v-model="gatherParams.rate" placeholder="请输入预计年化收益率">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="图标:" prop="icon">
            <el-input style="width:100%" v-model="gatherParams.icon" clearable size="small" placeholder="请输入图标地址">
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
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否定制" prop="resource">
            <el-radio-group v-model="gatherParams.isCustom">
              <el-radio :label=true>定制</el-radio>
              <el-radio :label=false>非定制</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="起购额度："  prop="minAmount">
            <el-input size="small" v-model="gatherParams.minAmount" placeholder="请输入起购额度"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权重："   prop="weight" >
            <el-input size="small" v-model="gatherParams.weight" placeholder="请输入权重"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="status === 'create'" type="primary" size="small" @click="create">确认创建</el-button>
      <el-button v-else-if="status === 'modify'" type="primary" size="small" @click="update">确认修改</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "gatherDialog",
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
      gatherParams: {
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
        titleMap: {
          create: '创建',
          modify: '修改'
        },
        rules: {
          coinId: [
            { required: true, message: '请选择币种', trigger: 'change' },
          ],
          rate: [
            { required: true, message: '请输入预计年化收益率', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '请输入图标地址', trigger: 'blur' },
          ],
          weight: [
            { required: true, message: '请输入权重', trigger: 'blur' },
          ],
          minAmount: [
            { required: true, message: '请输入最小计息数量', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur' }
          ]
        },
        server_path: "",
        coinName:''
      }
    },
    watch:  {
      gatherParams(val){
        this.tagsArr = val.proTags?val.proTags.split(','):[];
      }
    },
    methods: {
      resetFields () {
        this.$refs.gatherParams && this.$refs.gatherParams.resetFields()
      },
      // 创建
      async create () {
        let loading = this.$loading({ text: 'Loading', target: '.gather-dialog'})
        try {
          await this.$refs.gatherParams.validate();
          let result = await this.$http.post('cloud/backmgr/financial/addColPro', this.gatherParams)
          this.$emit('update:visible', false)
          this.$emit('createSuccess')
          this.$notify.success({ title: '请求成功', message: '创建集合产品成功' });
        } catch (error) {} finally {
          loading.close()
        }
      },
      // 修改
      async update () {
        let loading = this.$loading({ text: 'Loading', target: '.gather-dialog'})
        try {
          await this.$refs.gatherParams.validate()
          let result = await this.$http.post('cloud/backmgr/financial/updateColPro', this.gatherParams)
          this.$emit('update:visible', false)
          this.$emit('createSuccess')
          this.$notify.success({ title: '请求成功', message: '更新集合产品成功' });
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
