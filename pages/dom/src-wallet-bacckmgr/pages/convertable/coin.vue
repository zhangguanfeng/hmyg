<template>
  <div class="convertable">
    <el-row style="width: 100%;display: flex;">
      <span class="type">支付币种</span>
      <el-button size="small" type="primary" @click="createCoin(0)">创建币种</el-button>
    </el-row>
    <sac-table :data="listData[1]">
      <el-table-column type="index" align="center" label="序号"></el-table-column>
      <el-table-column prop="coinName" align="center" label="支付币种"></el-table-column>
      <el-table-column prop="action" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="default" @click="modCoin(scope.row, 0)">修改</el-button>
          <el-button size="mini" type="warning" @click="deleteCoin(scope.row, 0)">删除</el-button>
        </template>
      </el-table-column>
    </sac-table>
    <span class="line"></span>
    <el-row style="width: 100%;display: flex;">
      <span class="type">兑换币种</span>
      <el-button size="small" type="primary" @click="createCoin(1)">创建币种</el-button>
    </el-row>
    <sac-table :data="listData[2]">
      <el-table-column type="index" align="center" label="序号"></el-table-column>
      <el-table-column prop="coinName" align="center" label="兑换币种"></el-table-column>
      <el-table-column prop="action" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="default"  @click="modCoin(scope.row, 1)">修改</el-button>
          <el-button size="mini" type="warning" @click="deleteCoin(scope.row, 1)">删除</el-button>
        </template>
      </el-table-column>
    </sac-table>
    <el-dialog :visible.sync="visible" :title="title" :close-on-click-modal="false">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item :label="type == 0 ? '支付币种' : '兑换币种'" prop="coin">
            <el-autocomplete
              class="inline-input"
              v-model="form.coin"
              :fetch-suggestions="selectCoins"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
            <el-button type="warning" size="mini" @click="newCoin">新增币种</el-button>
          </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" size="small" @click="confirmAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        listData: {
          1: [],
          2: []
        },
        form: {
          coin: '',
          obj: {}
        },
        // total: 0,
        // pageidx: 1,
        // pagenum: 10,
        visible: false,
        title: '创建支付币种',
        type: 0, // 0 支付， 1 兑换
        rules: {
          coin: [
            { required: true, message: '请输入币种名称' }
          ]
        },
        allCoins: [],
        loadingCoins: true
      }
    },
    methods: {
      getPaginationChange() {},
      // 新增币种
      newCoin() {
        this.visible = false
        this.$router.push({ name: 'currencySet', params: {
          backPath: this.$route.fillPath,
          coinName: this.form.coin
        } });
      },
      // 自动补全建议
      selectCoins(reg, cb) {
        const arr = []
        reg = new RegExp(reg.replace(/\s/g, ''), 'i')
        for (let v of this.allCoins) {
          if (reg.test(v.coinName.replace(/\s/g, ''))) {
            arr.push({
              value: v.coinName,
              address: v.coinName,
              obj: v
            })
          }
        }
        const check = this.listData[this.type + 1]
        cb(arr.filter(el => {
          for (let v of check) {
            if (v.coinName === el.address) {
              return false
            }
          }
          return true
        }))
      },
      // 自动不全选择
      handleSelect(item) {
        this.form.obj = item.obj
      },
      // 修改币种信息
      modCoin(row, type) {
        row.backPath = this.$route.fullPath
        this.$router.push({ name: 'currencySet', params: row });
      },
      confirmAdd() {
        if (this.loadingCoins) {
          this.$message.warning('正在载入币种信息，请稍等')
          return
        }
        let has = false
        for (let v of this.allCoins) {
          if (this.form.coin == v.coinName) {
            has =  true
            break
          }
        }
        if (!has) {
          this.$notify.error({
            title: '提示',
            message: '填写的币种不可用，请新建币种再使用'
          })
          return
        }
        const parsm = {
          coinId: this.form.obj.coinId,
          type: this.type + 1
        }
        this.$http.post(`/wallet/backmgr/trade/setConvertableCoin.do`, parsm).then(res => {
            this.$notify.success({
              title: '提示',
              message: '添加成功'
            })
            this.visible = false
            this.getData()
        })
      },
      // 递归载入币种
      getAllCoins(page = 1) {
        this.loadingCoins = true
        // 分页存在问题
        this.$http.post('/wallet/backmgr/coin/getCoinInfoList.do', {
          pageNum: page
        }).then( ({ result: { list } }) => {
          this.allCoins = this.allCoins.concat(list.list || [])
          if (this.allCoins.length < +list.total) {
            this.getAllCoins(++page)
          } else {
            this.loadingCoins = false
          }
        })
      },
      // 删除币种
      deleteCoin(row, type) {
        this.$confirm(`删除币种 ${row.coinName} ?`, '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
        .then(() => {
          const params = {
            coinId: row.coinId,
            type: type + 1
          }
          this.$http.post(`/wallet/backmgr/trade/delConvertableCoin.do`, params).then(res => {
            this.$notify.success({
              title: '提示',
              message: '删除成功'
            })
            this.getData()
          })
        })
        .catch(e => {  })
      },
      createCoin(type) {
        this.type = type
        this.title = ['创建支付币种', '创建兑换币种'][type]
        this.visible = true
        this.form.coin = ''
        this.$nextTick(() => {
          this.$refs.form.resetFields()
        })
      },
      getData() {
        this.$http.post(`/wallet/backmgr/trade/getConvertableCoin.do`, {

        }).then(res => {
          const { result: { result} } = res
          this.listData = {
            1: result[1] || [],
            2: result[2] || []
          }
        })
      }
    },
    activated() {
      this.getData()
      this.getAllCoins()
    }
  }
</script>
<style lang="less">
  .convertable {
    .type {
      width: 100%;
      font-weight: 600;
      flood-color: #373F74;
    }
    .line {
      display: block;
      height: 40px;
      width: 100%;
    }
  }
</style>
