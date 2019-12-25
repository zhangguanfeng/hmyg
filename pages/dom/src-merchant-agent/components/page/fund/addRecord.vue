/*
 * @Author: Diskfan 
 * @Content: 手工提币，手动增加记录按钮
 * @Date: 2019-06-13 10:33:26 
 * @Last Modified by: Diskfan
 * @Last Modified time: 2019-06-14 17:19:53
 */
 <template>
     <el-dialog :visible.sync="visible" :close-on-click-modal="false" title="手动增加记录" id="recordWrap" width="450px">
         <el-form ref="form" :model="extractForm" :rules="rules" label-width="80px">
             <el-form-item label="类型：" prop="type">
                <el-select placeholder="请选择类型" v-model="extractForm.type" clearable size="small">
                    <el-option v-for="(item, key) in fundTypes" :key="key" :value="key" :label="item"></el-option>
                </el-select>
             </el-form-item>
             <el-form-item label="TXID：" prop="txid">
                 <el-input type="textarea" placeholder="请填写TXID" v-model="extractForm.txid" style="resize:none"></el-input>
             </el-form-item>
         </el-form>
         <div slot="footer">
             <el-button size="small" type="default" @click="visible=false">取消</el-button>
             <el-button size="small" type="primary" @click="addHandle">确定</el-button>
         </div>
     </el-dialog>
 </template>
<script>
export default {
    props: ['showDialog'],
    data () {
        const fundTypes = {}
        for (let i in this.$config.fundTypes) {
            const curr = this.$config.fundTypes[i]
            if (curr === '总计') continue
            fundTypes[i] = curr
        }
        return {
            fundTypes: fundTypes,
            rules: {
                type: [{ required: true, message: '请选择类型' }]
            },
            extractForm: {
                type: '',
                txid: ''
            },
        }
    },
    computed: {
        visible: {
            get () {
                return this.showDialog
            },
            set (val) {
                this.$emit('showExtractCoin', val)
            }
        }
    },
    methods: {
        addHandle () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    console.log('valid')
                } else {
                    this.$message.error('请选择类型')
                }
            })
        }
    }
}
</script>
<style lang="less">
    #recordWrap{
        .label {
            display: inline-block;
            width: 70px;
            font-size: 16px;
            margin: 5px 0;
        }
        textarea {
            resize: none
        }
    }
</style>