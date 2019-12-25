<template>
  <div class="merchant">
    <div class="content">
      <el-form :inline="true" ref="filterForm" :model="filterForm" size="mini">
        <el-form-item label="商户名称:">
          <el-input placeholder="请输入商户名称" v-model="filterForm.search_mer_name" size="small"></el-input>
        </el-form-item>
        <el-button type="primary" size="small" @click.native="getData">查询</el-button>
        <el-button
          style="float: right; margin-right: 50px"
          type="primary"
          size="small"
          @click="invite"
        >邀请商户入驻</el-button>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      size="mini"
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="user_name" label="商户名称" align="center"></el-table-column>
      <el-table-column prop="user_call" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="in_commission_fee" align="center" label="兑入收益比例"></el-table-column>
      <el-table-column prop="out_commission_fee" align="center" label="兑出收益比例"></el-table-column>
      <el-table-column prop="usdt" align="center" label="贡献佣金USDT"></el-table-column>
      <el-table-column prop="reg_time" align="center" label="注册时间"></el-table-column>
      <el-table-column prop="user_status" align="center" label="账户状态"></el-table-column>
    </el-table>
    <el-dialog title :visible.sync="visible" width="500px" :close-on-click-modal="false" center>
      <center>
        <font style="font-size: 18px">
          <strong>邀请商户入驻</strong>
        </font>
      </center>
      <div
        style="margin: 20px 0; font-size: 14px"
      >将您的邀请码发送给商户，商户在商户后台（网址：https://merchant.alpayex.com/register）提交注册信息后，您将会在商户管理列表看到此商户的信息及状态，平台审核通过并接入成功后，商户每次成交您可获得一定比例的交易佣金。</div>
      <p style="margin: 20px 0; text-align: center; font-size: 20px">{{userInfo.NODE_NO}}</p>
      <!-- <el-form
        style="width: 300px; margin: 0 auto"
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
      >
        <el-form-item
          label
          prop="in_slave_mail"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input placeholder="请输入商户提供的注册邮箱" v-model="dynamicValidateForm.in_slave_mail">
            <i class="el-icon-message" style="font-size: 25px; margin-top: 7px" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item
          label
          prop="in_code"
          :rules="{ required: true, message: '验证码不能为空', trigger: 'blur' }"
        >
          <div class="verify">
            <el-input placeholder="请输入验证码" v-model="dynamicValidateForm.in_code"></el-input>
            <img
              :src="SERVER_PATH+'/ajax_common/createCodeImg?randow='+random"
              alt
              class="codeImg"
              ref="codeImg"
              @click="changeCodeUrl"
            />
          </div>
        </el-form-item>
      </el-form> -->
      <div class="dialog-button" @click="visible=false">我知道了</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo:'',
      tableLoading: false,
      tableData: [],
      visible: false,
      SERVER_PATH: window.SERVER_PATH,
      random: Math.random(),
      filterForm: {
        search_mer_name: "",
        search_mer_part: ""
      },
      dynamicValidateForm: {
        in_randow: "",
        in_code: "",
        in_slave_mail: ""
      }
    };
  },
  methods: {
    changeCodeUrl() {
      this.random = Math.random();
      this.$refs.codeImg.src = `${SERVER_PATH}/ajax_common/createCodeImg?randow=${this.random}`;
    },
    // 邮箱验证的旧代码
    // confirm() {
    //   this.dynamicValidateForm.in_randow = this.random;
    //   this.$refs.dynamicValidateForm.validate(valid => {
    //     if (valid) {
    //       this.$http
    //         .post("AjaxMerchant/CreateInvite", this.dynamicValidateForm)
    //         .then(res => {
    //           this.$message.success(
    //             "邮件已发送成功，请及时通知商户提交注册信息"
    //           );
    //         })
    //         .finally(res => {
    //           this.visible = false;
    //         });
    //     }
    //   });
    // },
    load(tree, treeNode, resolve) {
      this.filterForm.search_mer_part = tree.id;
      this.$http.post("/AjaxMerchant/GetMerlist", this.filterForm).then(res => {
        resolve([...res.result.pageData]);
      });
    },
    getUserInfo() {
			let p = this.$http.post('ajax_user/myAccount')
			p.then(res => {
				let {result} = res
				this.userInfo = result
			})
		},
    getData() {
      this.$http.post("/AjaxMerchant/GetMerlist", this.filterForm).then(res => {
        this.tableData = res.result.pageData;
      });
    },
    invite() {
      this.getUserInfo();
      this.$refs.dynamicValidateForm &&
        this.$refs.dynamicValidateForm.resetFields();
      this.in_slave_mail = "";
      this.in_code = "";
      this.visible = true;
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss">
.merchant {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;

  .content {
    background: #fff;

    .el-form {
      padding: 20px;
    }
  }

  .dialog-button {
    width: 300px;
    height: 40px;
    background: #2e415a;
    color: #f8f8f8;
    border-radius: 4px;
    user-select: none;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    margin: 0 auto;
    margin-top: 20px;
    
  }

  .verify {
    display: flex;
    justify-content: center;
    align-items: center;

    .el-input {
      display: inline-block;
      margin-right: 5px;
    }

    img {
      height: 38px;
    }
  }
}
</style>
