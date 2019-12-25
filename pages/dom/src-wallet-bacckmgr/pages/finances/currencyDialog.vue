<template>
  <el-dialog
    :close-on-click-modal="false"
    custom-class="currency-dialog"
    :title="titleMap[status]"
    :visible="visible"
    @open="openDialog"
    @update:visible="val => $emit('update:visible', val)">
    <el-form ref="currencyForm" :model="currencyParams" :rules="rules" label-width="140px">
      <el-form-item label="币种名称：" prop="coinId" style="width: 100%;">
        <el-select
          style="width: 100%;"
          size="small"
          v-model="currencyParams.coinId"
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
        <el-input size="small" v-model="currencyParams.rate" placeholder="请输入预计年化收益率">
          <span slot="suffix">%</span>
        </el-input>
      </el-form-item>
      <el-form-item label="类型" prop="buttonType">
        <el-radio-group v-model="currencyParams.buttonType">
          <el-radio :label=0>充值</el-radio>
          <el-radio :label=1>存入</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图标:" prop="icon">
        <el-input style="width:100%" v-model="currencyParams.icon" clearable size="small" placeholder="请输入图标地址">
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
      <el-form-item label="最小计息数额：" prop="minAmount">
        <el-input size="small" v-model="currencyParams.minAmount" placeholder="请输入最小计息数额"></el-input>
      </el-form-item>
      <el-form-item label="权重：" prop="weight">
        <el-input size="small" v-model="currencyParams.weight" placeholder="请输入权重"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="status === 'create'" type="primary" size="small" @click="createCurrency">确认创建</el-button>
      <el-button v-else-if="status === 'modify'" type="primary" size="small" @click="updateCurrency">确认修改</el-button>
    </span>
  </el-dialog>
</template>

<script>
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
      currencyParams: {
        type: Object,
        default: () => {
        }
      },
      colProList: {
        type: Array,
        default: () => []
      },
    },
    data() {
      const checkNum = (rule, value, callback) => {
        if (isNaN(Number(value))) {
          callback(new Error('必须为数字值'))
        } else {
          callback()
        }
      }
      return {
        titleMap: {
          create: '创建产品',
          modify: '修改产品'
        },
        server_path: "",
        rules: {
          coinId: [
            {required: true, message: '请选择币种名称', trigger: 'change'},
          ],
          rate: [
            {required: true, message: '请输入预计年化收益率', trigger: 'blur'},
            {validator: checkNum, trigger: 'blur'}
          ],
          minAmount: [
            {required: true, message: '请输入最小计息数额', trigger: 'blur'},
            {validator: checkNum, trigger: 'blur'}
          ],
          weight: [
            {required: true, message: '请输入权重', trigger: 'blur'},
            {validator: checkNum, trigger: 'blur'}
          ],
          icon: [
            {required: true, message: '请输入图标地址', trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      openDialog() {
        console.log(this.currencyParams)
      },
      resetFields() {
        this.$refs.currencyForm && this.$refs.currencyForm.resetFields()
      },
      // 创建活期
      async createCurrency() {
        let loading = this.$loading({text: 'Loading', target: '.currency-dialog'})
        try {
          await this.$refs.currencyForm.validate()
          let result = await this.$http.post('/cloud/backmgr/financial/financial/addCurrentFinancialPro', this.currencyParams)
          this.$emit('update:visible', false)
          this.$emit('createSuccess')
          this.$notify.success({title: '请求成功', message: '创建活期项目成功'});
          console.log(result)
        } catch (error) {
        } finally {
          loading.close()
        }
      },
      // 修改活期
      async updateCurrency() {
        let loading = this.$loading({text: 'Loading', target: '.currency-dialog'})
        try {
          await this.$refs.currencyForm.validate()
          let result = await this.$http.put('/cloud/backmgr/financial/financial/updateCurrentFinancialPro', this.currencyParams)
          this.$emit('update:visible', false)
          this.$emit('createSuccess')
          this.$notify.success({title: '请求成功', message: '更新活期项目成功'});
          console.log(result)
        } catch (error) {
        } finally {
          loading.close()
        }
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
