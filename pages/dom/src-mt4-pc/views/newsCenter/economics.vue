/**
*  Created by   阿紫
*  On  2019/8/29 0029
*  Content 经济数据一栏
*/
<template>
  <div class="news-list">
    <div class="news-list_title el-icon-set-up">
      {{ currentTime}} 经济数据一览
    </div>
    <div class="table-header" :class="{isFixed:isFixed}">
       <span class="label" style="width:80px">时间</span>
       <span class="label" style="width:100px">国家/地区</span>
       <span class="label" style="width:239px">指标名称</span>
       <span class="label" style="width:150px">重要性</span>
       <span class="label" style="width:130px">前值</span>
       <span class="label" style="width:130px">预测值</span>
       <span class="label" style="width:130px">公布值</span>
      <span class="popover label" style="width:180px">
        <el-popover
          width="260"
          v-model="visible">
          <h4>利多利空品种选择 </h4>
          <div style="color:#F24724 ; font-size: 12px; font-weight: normal">提醒：不能跨品种选择</div>
          <h5>A类：</h5>
          <el-checkbox-group
            v-model="checkedListA"
            class="popover-a"
            :max="2">
            <el-row :gutter="20">
              <el-col :span="8" v-for="(item, index) in checkListA" :key="index">
                <el-checkbox :label="item" :disabled="checkedListB.length>0">{{item}}</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
          <h5>B类：</h5>
          <el-checkbox-group
            v-model="checkedListB"
            :max="2">
            <el-row :gutter="20">
              <el-col :span="8" v-for="(item, index) in checkListB" :key="index">
                <el-checkbox :label="item" :disabled="checkedListA.length>0">{{item}}</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="confirm">确定</el-button>
          </div>
          <div slot="reference">影响<i class="el-icon-arrow-down el-icon--right"></i></div>
        </el-popover>
      </span>
    </div>
    <el-table :data="data" border
              :span-method="objectSpanMethod"
              size="small"
              :show-header="false"
              style="width: 100%">
      <el-table-column prop="pub_time" label="时间" width="80px"></el-table-column>
      <el-table-column prop="country" label="国家/地区" width="100px"></el-table-column>
      <el-table-column prop="name" label="指标名称">
        <template slot-scope="scope">
          <div :class="{vital:scope.row.star>2}" style="text-align: left">
            {{scope.row.country}}{{scope.row.time_period}}{{scope.row.name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="star" label="重要性" width="150px">
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.star"
            :colors="colors"
            disabled>
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="previous" label="前值" width="130px">
        <template slot-scope="scope">
                <span :class="{vital:scope.row.star>2}">
                  {{scope.row.previous}} {{scope.row.unit}}
                </span>
        </template>
      </el-table-column>
      <el-table-column prop="consensus" label="预测值" width="130px">
        <template slot-scope="scope">
                <span :class="{vital:scope.row.star>2}">
                  <span v-if="scope.row.consensus">
                     {{scope.row.consensus}} {{scope.row.unit}}
                  </span>
                  <span v-else>
                    ---
                  </span>
                </span>
        </template>
      </el-table-column>
      <el-table-column prop="actual" label="公布值" width="130px">
        <template slot-scope="scope">
                <span :class="{vital:scope.row.star>2}">
                  <span v-if="scope.row.actual">
                    {{scope.row.actual}}{{scope.row.unit}}
                  </span>
                  <span v-else>未公布</span>
                </span>
        </template>
      </el-table-column>
      <el-table-column
        width="180px">
        <template slot-scope="scope">
          <div :class="{vital:scope.row.star>2}" class="affect">
            <div v-if="scope.row.actual" class="effect">
              <div v-if="+scope.row.affect===1"> <!--  正向-->
                <div v-if="scope.row.consensus"> <!--  有预测值-->
                  <!--                      预测值大于真是值-->
                  <div class="tags" v-if="+scope.row.consensus < +scope.row.actual"
                       :class="{badNews:checkedListA.length>0, badNewsbg:scope.row.star>2&&checkedListA.length>0,
                           goodNews:checkedListB.length>0,goodNewsbg:scope.row.star>2&&checkedListB.length>0}">
                    <span v-if="checkedListA.length>0">利空</span>
                    <span v-else-if="checkedListB.length>0">利多</span>
                    <span v-else>利空</span>
                    <span v-for="(item, index) in checkedList" :key="index">{{item}}</span>
                  </div>
                  <div class="tags" v-if="+scope.row.consensus > +scope.row.actual"
                       :class="{badNews:checkedListB.length>0, badNewsbg:scope.row.star>2&&checkedListB.length>0,
                           goodNews:checkedListA.length>0,goodNewsbg:scope.row.star>2&&checkedListA.length>0}">
                    <span v-if="checkedListB.length>0">利空</span>
                    <span v-else-if="checkedListA.length>0">利多</span>
                    <span v-else>利多</span>
                    <span v-for="(item, index) in checkedList" :key="index">{{item}}</span>
                  </div>
                  <div class="small tags" v-if="+scope.row.consensus === +scope.row.actual"
                       :class="{smallbg:scope.row.star>2}">影响小
                  </div>
                </div>
                <div v-else><!--  没有预测值-->
                  <div class="tags" v-if="+scope.row.previous < +scope.row.actual"
                       :class="{badNews:checkedListA.length>0, badNewsbg:scope.row.star>2&&checkedListA.length>0,
                           goodNews:checkedListB.length>0,goodNewsbg:scope.row.star>2&&checkedListB.length>0}">
                    <span v-if="checkedListA.length>0">利空</span>
                    <span v-else-if="checkedListB.length>0">利多</span>
                    <span v-else>利空</span>
                    <span v-for="(item, index) in checkedList" :key="index">{{item}}</span>
                  </div>
                  <div class="tags" v-if="+scope.row.previous > +scope.row.actual"
                       :class="{badNews:checkedListB.length>0, badNewsbg:scope.row.star>2&&checkedListB.length>0,
                           goodNews:checkedListA.length>0,goodNewsbg:scope.row.star>2&&checkedListA.length>0}">
                    <span v-if="checkedListB.length>0">利空</span>
                    <span v-else-if="checkedListA.length>0">利多</span>
                    <span v-else>利多</span>
                    <span v-for="(item, index) in checkedList" :key="index">{{item}}</span>
                  </div>
                  <div class="small tags" v-if="+scope.row.previous === +scope.row.actual"
                       :class="{smallbg:scope.row.star>2}">影响小
                  </div>
                </div>
              </div>
              <div v-else>  <!--  反向-->
                <div v-if="scope.row.consensus"> <!--  有预测值-->
                  <!--                      预测值大于真是值-->
                  <div class="tags" v-if="+scope.row.consensus > +scope.row.actual"
                       :class="{badNews:checkedListA.length>0, badNewsbg:scope.row.star>2&&checkedListA.length>0,
                           goodNews:checkedListB.length>0,goodNewsbg:scope.row.star>2&&checkedListB.length>0}">
                    <span v-if="checkedListA.length>0">利空</span>
                    <span v-else-if="checkedListB.length>0">利多</span>
                    <span v-else>利空</span>
                    <span v-for="(item, index) in checkedList" :key="index">{{item}}</span>
                  </div>
                  <div class="tags" v-if="+scope.row.consensus < +scope.row.actual"
                       :class="{badNews:checkedListB.length>0, badNewsbg:scope.row.star>2&&checkedListB.length>0,
                           goodNews:checkedListA.length>0,goodNewsbg:scope.row.star>2&&checkedListA.length>0}">
                    <span v-if="checkedListB.length>0">利空</span>
                    <span v-else-if="checkedListA.length>0">利多</span>
                    <span v-else>利多</span>
                    <span v-for="(item, index) in checkedList" :key="index">{{item}}</span>
                  </div>
                  <div class="small tags" v-if="+scope.row.consensus === +scope.row.actual"
                       :class="{smallbg:scope.row.star>2}">影响小
                  </div>
                </div>
                <div v-else> <!--  没有预测值-->
                  <div class="tags" v-if="+scope.row.previous > +scope.row.actual"
                       :class="{badNews:checkedListA.length>0, badNewsbg:scope.row.star>2&&checkedListA.length>0,
                           goodNews:checkedListB.length>0,goodNewsbg:scope.row.star>2&&checkedListB.length>0}">
                    <span v-if="checkedListA.length>0">利空</span>
                    <span v-else-if="checkedListB.length>0">利多</span>
                    <span v-else>利空</span>
                    <span v-for="(item, index) in checkedList" :key="index">{{item}}</span>
                  </div>
                  <div class="tags" v-if="+scope.row.previous < +scope.row.actual"
                       :class="{badNews:checkedListB.length>0, badNewsbg:scope.row.star>2&&checkedListB.length>0,
                           goodNews:checkedListA.length>0,goodNewsbg:scope.row.star>2&&checkedListA.length>0}">
                    <span v-if="checkedListB.length>0">利空</span>
                    <span v-else-if="checkedListA.length>0">利多</span>
                    <span v-else>利多</span>
                    <span v-for="(item, index) in checkedList" :key="index">{{item}}</span>
                  </div>
                  <div class="small tags" v-if="+scope.row.previous === +scope.row.actual"
                       :class="{smallbg:scope.row.star>2}">影响小
                  </div>
                </div>
              </div>
            </div>
            <span v-else> ---</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'economics',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    currentTime: {
      type: String,
      default: '',
    },
    sameTimeCountry: {},
    isFixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      colors: ['#FF9900', '#F24724', '#F24724', '#F24724'],
      checkListA: ['金银', '原油', '欧元', '铂钯', '铜', '日元', '瑞郎', '澳元'],
      checkListB: ['美元', '加元'],
      checkedListA: ['金银', '原油'],
      checkedListB: [],
      checkedList: ['金银', '原油'],
      visible: false,
      isConfirm: false,
    };
  },
  watch: {
    visible(val) {
      val && (this.isConfirm = false);
      if (!this.isConfirm && !val) {
        if (this.checkedListA.length === 0 && this.checkedListB.length === 0) {
          this.checkedListA = ['金银', '原油'];
        } else if (this.checkListB.includes(this.checkedList[0])) {
          this.checkedListB = this.checkedList;
        } else {
          this.checkedListA = this.checkedList;
        }
      }
    },
  },
  methods: {
    objectSpanMethod({
      row, column, rowIndex, columnIndex,
    }) {
      if (columnIndex === 0 || columnIndex === 1) {
        const num = this.sameTimeCountry[row.country + row.pub_time].length;
        if (this.sameTimeCountry[row.country + row.pub_time][0].id === row.id) {
          return {
            rowspan: num,
            colspan: 1,
          };
        }
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
    confirm() {
      this.visible = false;
      this.isConfirm = true;
      if (this.checkedListA.length === 0 && this.checkedListB.length === 0) {
        this.checkedListA = ['金银', '原油'];
      }
      this.checkedList = this.checkedListA.length > 0 ? this.checkedListA : (this.checkedListB.length > 0 ? this.checkedListB : ['金银', '原油']);
    },
  },
};
</script>
<style lang="scss" scoped>
  .vital {
    color: #F24724
  }

  .news-list {
    margin-bottom: 40px;
    &_title {
      color: #333;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    /deep/ .el-table--border {
      border-radius: 4px;
    }

    /deep/ .el-table th {
      background: $color;
      border-right-color: $color;
      border-bottom-color: $color;
      color: #fff;
      text-align: center;
    }

    /deep/ .el-table .cell {
      text-align: center;
    }

    .affect {
      .effect {
        .tags {
          border-radius: 2px;
          display: inline-block;
          padding: 1px 15px;
          font-size: 12px;

          span {
            margin: 0 3px;
          }
        }

        .badNews {
          border: 1px solid #24b166;
          color: #24b166;
        }

        .badNewsbg {
          background: #24b166;
          color: #fff;
        }

        .goodNews {
          border: 1px solid #F24724;
          color: #F24724;
        }

        .goodNewsbg {
          background: #F24724;
          color: #fff;
        }

        .small {
          border: 1px solid #FF9900;
          color: #FF9900;
        }

        .smallbg {
          background: #FF9900;
          color: #fff;
        }
      }
    }
  }
  .popover {
    position: relative;
  }

  /deep/ .el-popover__reference {
    position: absolute;
    top: -10px;
    right: 60px;
    z-index: 3;
    line-height: 0;
    cursor: pointer;
    color: #fff;
    font-size: 12px;
  }
  .el-popover {
    h5 {
      margin: 15px 0 5px 0;
    }
  }

  .popover-a {
    border-bottom: 1px solid #efefef;
    padding-bottom: 10px;
  }

  .el-checkbox {
    margin-bottom: 5px;
  }
  .isFixed {
    position: fixed;
    top: 60px;
    z-index: 8;
  }
  .table-header {
    height: 40px;
    line-height: 40px;
    background: #5B0EB2;
    font-size: 12px;
    color: #fff;
    font-weight: 600;
    .label {
      border-right-color: #5B0EB2;
      border-bottom-color: #5B0EB2;
      display: inline-block;
      text-align: center;
    }
  }
</style>
