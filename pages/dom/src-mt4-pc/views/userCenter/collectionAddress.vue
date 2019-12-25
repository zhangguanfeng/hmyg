/**
*  Created by   阿紫
*  On  2019/8/16 0016
*  Content  收款地址
*/
<template>
  <div class='collectionAddress'>
    <div class="center">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item,index) in bagetList" :key="index">
          <div class="list"
               :style="{backgroundColor:obj[item.bank_status].bgColor, borderLeftColor:obj[item.bank_status].borderColor, boxShadow:obj[item.bank_status].shadowColor}">
            <div class="left">
              <p class="title">{{item.bank_name}}</p>
              <h3 class="bank">{{ item.bank_no }}</h3>
            </div>
            <div class="right">
              <span>{{obj[item.bank_status].name}}</span>
              <img src="@/assets/userCenter/dele.png" alt="" @click="del(item.bank_id)">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="add" @click="add">
      + 使用新的卡收款
    </div>
  </div>
</template>
<script>
export default {
  name: 'collectionAddress',
  data() {
    return {
      bagetList:[],
      obj: {
        111: {
          bgColor: '#DEEAFF',
          borderColor: '#5B0EB2',
          shadowColor: '0px 0px 7px 0px rgba(0, 0, 0, 0.17)',
          name: '',
        },
        100: {
          bgColor: '#FFF6D1',
          borderColor: '#FFCB00',
          shadowColor: '0px 0px 7px 0px rgba(58,58,57,0.26);',
          name: '审核中',
        },
        110: {
          bgColor: '#FFD4BD',
          borderColor: '#FF5B00',
          shadowColor: '0px 0px 7px 0px rgba(108,8,8,0.35)',
          name: '审核未通过',
        },
      },
    };
  },
  methods: {
    del(bank_id) {
      this.$confirm('此操作将删除该银行卡信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$http.post('Assets/delBank',{bank_id}).then(res=>{
          this.getBank();
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
      });
    },
    add() {
      this.$router.push({
        name: 'addBank',
      });
    },
    getBank() {
      this.$http.post('Assets/getBank').then(res => {
        this.bagetList = res.data;
      })
    },
  },
  activated() {
    this.getBank();
  }
};
</script>
<style lang="scss" scoped>
  .collectionAddress {
    text-align: left;
    background: #fff;
    padding: 20px;

    .add {
      color: #1D2C80;
      font-size: 20px;
      text-align: center;
      width: 360px;
      height: 60px;
      line-height: 60px;
      border-radius: 4px;
      border: 1px dashed #0064FF;
      margin: 20px auto;
      cursor: pointer;
    }

    .list {
      display: flex;
      border-radius: 4px;
      box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.17);
      background: #DEEAFF;
      padding: 10px 20px;
      height: 70px;
      margin-bottom: 20px;
      justify-content: space-between;
      border-left-width: 5px;
      border-left-style: solid;
      border-left-color: #5B0EB2;

      .title {
        color: #5C5C5C;
        font-size: 14px;
        margin: 0;
      }

      .bank {
        color: #333;
        font-size: 18px;
      }

      .right {
        display: flex;
        align-items: center;
      }

      img {
        width: 24px;
        height: 24px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
</style>
