
<template>
    <div class='complaint-page'>
		<!-- 查询栏 -->
        <el-form :inline="true" :model="params" class="demo-form-inline">
            <el-form-item label="处理状态：">
                <el-select size="small" v-model="params.state" clearable placeholder="请选择处理状态">
                    <el-option v-for="(item,index) in stateList" :key="index" :label="item.lable"
                               :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请求种类：">
                <el-select size="small" v-model="params.type_id" clearable placeholder="请选择请求种类">
                    <el-option v-for="(item,index) in typeList" :key="index" :label="item.lable"
                               :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="getListData('query')">查询</el-button>
            </el-form-item>
        </el-form>
		<!-- 列表 -->
        <el-table border :data="listData" style="width: 100%; height: calc(100% - 110px)">
            <el-table-column label="ID" width="50" prop="id" align="center"></el-table-column>
            <el-table-column label="发起方" width="80" align="center">
                <template slot-scope="scope">
                    {{side[scope.row.app_or_agent]}}
                </template>
            </el-table-column>
			<el-table-column label="发起时间" width="160" align="center">
                <template slot-scope="scope">
                    {{scope.row.created_at | isDateFormat}}
                </template>
            </el-table-column>
			<el-table-column label="商户/商户ID" width="160" align="center">
                <template slot-scope="scope">{{agentIds[scope.row.app_id] || scope.row.app_id}} / {{scope.row.app_id}}</template>
            </el-table-column>
			<el-table-column label="流水号" prop="shipment_no" align="center"></el-table-column>
			<el-table-column label="交易状态" align="center">
               <template slot-scope="scope">
                   <div>{{shipment[scope.row.shipment_state]}}</div>
                   <!-- <el-button type="primary" size="mini" v-if="+scope.row.state!=2  &&  scope.row.shipment_state!='-1000'" @click="freeze(scope.row.id)">冻结交易状态</el-button> -->
               </template>
           </el-table-column>
            <el-table-column label="请求种类" align="center" prop="name">
                <template slot-scope="scope">{{type[scope.row.type]}}</template>
            </el-table-column>
            <el-table-column label="处理状态" width="150" align="center" prop="state">
                <template slot-scope="scope">
                    {{state[scope.row.state]}}
                    <el-button type="primary" @click="handleClick(scope.row,'state')" v-if="+scope.row.state!=2" size="small">修改处理状态</el-button>
                </template>
            </el-table-column>
           <!-- <el-table-column label="结束订单" width="150" align="center" prop="state">
               <template slot-scope="scope">
                   <el-button type="primary" @click="orderEnd(scope.row,'state')" v-if="+scope.row.state!=2 && scope.row.shipment_state!='-1000'" size="small">结束订单
                   </el-button>
               </template>
           </el-table-column> -->
           
            <el-table-column label="处理结果" align="center">
                <template slot-scope="scope">
                    <div>{{result[scope.row.result]}}</div>
                    <el-button type="primary" @click="handleClick(scope.row)" v-if="+scope.row.state==2" size="small">修改处理结果</el-button>
                </template>
            </el-table-column>
			<el-table-column label="处理人" align="center">
                <template slot-scope="scope">
                    <div>{{scope.row.hotline_user_id== -1?'未处理': service[scope.row.hotline_user_id]}}</div>
                </template>
            </el-table-column>
			<el-table-column  label="操作" type="expand"  width="100">
                <template slot-scope="scope" class="box">
					<h2>交易信息</h2>
					<ul class="transaction-info">
						<li>
							<label class="item-name">商户信息</label>
							<div class="content">
								<span class="ctm-cell">商铺: <i>{{ agentIds[scope.row.app_id] || scope.row.app_id }}</i></span>
								<span class="ctm-cell">商铺用户ID: <i>{{scope.row.agent_id}}</i></span>
								<span class="ctm-cell">买卖类型: <i>{{direction[scope.row.direction]}}</i></span>
							</div>
						</li>
						<li>
							<label class="item-name">卡商信息</label>
							<div class="content">
								<span class="ctm-cell">卡商电话: <i>{{agentId[scope.row.agent_id] || '--'}}</i></span>
								<span class="ctm-cell">卡商实际收款金额: <i>{{scope.row.agent_confirmed_cash_amount}}</i></span>
								<el-button type="primary" size="mini" :disabled="!(scope.row.agent_confirmed_cash_amount != scope.row.cash_amount && +scope.row.state!=2 &&  scope.row.shipment_state!='-1000')" @click="modify(true,scope.row)">修改现金数</el-button>
								<el-button type="primary" size="small" :disabled="+scope.row.state == 2 || scope.row.shipment_state == '-1000'" @click="orderEnd(scope.row,'state')">结束订单</el-button>
							</div>
						</li>
						<li>
							<label class="item-name">交易详情</label>
							<div class="content">
								<span class="ctm-cell">交易金额: <i>{{scope.row.cash_amount?`${scope.row.cash_amount}元`:''}}</i></span>
								<span class="ctm-cell">USDT: <i>{{scope.row.token_amount}}</i></span>
								<span class="ctm-cell">手续费: <i>{{scope.row.fee?`${scope.row.fee} USDT`:''}}</i></span>
								<span class="ctm-cell">交易状态: <i>{{shipment[scope.row.shipment_state]}}</i></span>
								<el-button type="primary" size="mini" v-if="+scope.row.state!=2  &&  scope.row.shipment_state!='-1000'" @click="freeze(scope.row.id)">冻结交易状态</el-button>
								<span class="ctm-cell">过期时间: <i>{{scope.row.timeout_at | isDateFormat}}</i></span>
								<el-button type="primary" size="mini" :disabled="scope.row.state == 2 || scope.row.shipment_state == '-1000'" @click="modify(false,scope.row)">修改过期时间</el-button>
							</div>
						</li>
					</ul>
					<div class="complain-info">
						<div class="user">
							<h2>上诉信息</h2>
							<ul>
								<li>
									<label class="item-name">上诉原因:</label>
									<div class="content">
										<span>{{scope.row.description}}</span>
									</div>
								</li>
								<li>
									<label class="item-name">上诉图片:</label>
									<div class="content" v-if="scope.row.file_path">
										<img v-viewer :src="`https://api.paidd.io:8889/user-image/${scope.row.file_path}`" alt="">
									</div>
								</li>
								<li>
									<label class="item-name">上诉时间:</label>
									<div class="content">
										<span>{{scope.row.created_at | isDateFormat}}</span>
									</div>
								</li>
								<li>
									<label class="item-name">上传凭证:</label>
									<div class="content">
										<el-button type="primary" size="small" :disabled="true">上传</el-button>
									</div>
								</li>
							</ul>
						</div>
						<!-- <div class="card">
							<h2>卡商上诉信息</h2>
							<ul>
								<li>
									<label class="item-name">上诉原因:</label>
									<div class="content">
										<span>--</span>
									</div>
								</li>
								<li>
									<label class="item-name">上诉图片:</label>
									<div class="content" v-if="scope.row.file_path">
									</div>
								</li>
								<li>
									<label class="item-name">上诉时间:</label>
									<div class="content">
										<span>--</span>
									</div>
								</li>
								<li>
									<label class="item-name">上传凭证:</label>
									<div class="content">
										<el-button type="primary" size="small" :disabled="true">上传</el-button>
									</div>
								</li>
							</ul>
						</div> -->
					</div>
                    <!-- <el-form label-position="left" inline class="demo-table-expand">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="投诉原因:">
                                    <span>{{scope.row.description}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="图片:" v-if="scope.row.file_path">
                                    <img v-viewer :src="`https://api.paidd.io:8889/user-image/${scope.row.file_path}`" alt="">
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form> -->
                </template>
            </el-table-column>
        </el-table>

        <el-button class="more" type="primary" @click="getMore" size="small" :loading="isMore">{{isMore?'加载中……':'加载更多'}}</el-button>

        <el-dialog :visible.sync="isDialogVisible" :close-on-click-modal="false">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :inline="true">
                <el-form-item label="修改代理商已确认收妥的现金数："
                              prop="cash"
                              v-if="isCash">
                    <el-input-number v-model="ruleForm.cash"></el-input-number>
                </el-form-item>
                <el-form-item label="过期时间：" v-else>
                    <el-date-picker
                            size="small"
                            v-model="ruleForm.timeout_at"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="submitForm">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
                :title="`修改${labelVisible}`"
                :visible.sync="dialogVisible"
                width="30%">
            <el-form :model="ruleFormVisible" :rules="rulesVisible" ref="ruleFormVisible" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item :label="labelVisible" prop="value">
                    <el-select v-model="ruleFormVisible.value" :placeholder="`请选择${labelVisible}`">
                        <el-option :label="item.lable" :value="item.value" v-for="(item,index) in listVisible"
                                   :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitFormVisible('ruleFormVisible')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

		<a href="javascript:;" class="float-btn" @mouseover="isShowImg = true" @mouseout="isShowImg = false">
			<img src="../../public/specification_icon.png" alt="">
		</a>

		<img src="../../public/img01.jpg" v-show="isShowImg" alt="" class="specification-img">
    </div>
</template>
<script>
import { dateFormat } from "@/common/util";

export default {
  name: "complaint",
  data() {
	const valiNumber = (rule, value, callback) => {
	if (value === "") {
		callback("请输入现金数");
		return;
	} else if (isNaN(value)) {
		callback("现金数必须为数字");
		return;
	}
	callback();
	};
	const checkOldPwd = (rule, value, callback) => {
	if (!value) {
		return callback(new Error("请输入旧登录密码"));
	}
	callback();
	};
	const validatePass = (rule, value, callback) => {
	if (!value) {
		return callback(new Error("请输入新登录密码"));
	}
	if (value == this.ruleFormPwd.old_password) {
		callback(new Error("新旧密码不能一致!"));
	}
	if (this.ruleFormPwd.new_password_2 !== "") {
		this.$refs.ruleFormPwd.validateField("checkPass");
	}
	callback();
	};
	const checkPass = (rule, value, callback) => {
	if (value === "") {
		callback(new Error("请再次输入密码"));
	} else if (value !== this.ruleFormPwd.new_password) {
		callback(new Error("两次输入密码不一致!"));
	} else {
		callback();
	}
	};
    return {
		isShowImg: false,
		dialogFormVisible: false, // 修改密码
		listData: [], // 列表数据
		params: {
			state: "", // 处理状态
			since_id: "", // 加载更多
			type_id: "" // 请求种类
		},
		state: {},
		stateList: [], // 处理状态
		direction: {
			"1": "买", // BUY
			"2": "卖" // SELL
		},
		// directionList: [], // 买卖情况
		type: {},
		typeList: [], // 请求种类
		service: {}, // 客服名称
		result: {
			"0": "处理中", // WAITING
			"1": "已审核", // APPROVED
			"2": "拒绝", // REJECTED
			"3": "取消" //  CANCELED
		},
		resultList: [
			{
			value: 0,
			lable: "处理中",
			text: "WAITING"
			},
			{
			value: 1,
			lable: "已审核",
			text: "APPROVED"
			},
			{
			value: 2,
			lable: "拒绝",
			text: "REJECTED"
			},
			{
			value: 3,
			lable: "取消",
			text: "CANCELED"
			}
		], // 处理结果
		side: {
			"1": "代理商", // AGENT
			"2": "APP", // APP
			"3": "HOTLINE" //  HOTLINE
		},
		// sideList: [],// 发起方
		shipment: {
			"1": "创建", // CREATED
			"2": "用户设定数额", // USER_SET_GOAL
			"4": "用户已付款", // USER_PAID
			"5": "部分放行", // AGENT_APPROVED
			"7": "用户投诉", // USER_APPEAL
			"3": "匹配", // MATCHED
			"-1000": "已结束", // FINISHED
			"-1": "已拒绝", // AGENT_REJECTED
			"-2": "用户拒绝", // USER_REJECTED
			"-3": "已拒绝", // USER_CANCELED
			"-4": "用户取消" // FROZEN
		},
		agentId: {}, // 代理商ID
		agentIds: {}, // 商铺用户ID
		// agentIdList: [],// 代理商ID
		// userId: {},
		// userIdList: [],// 商铺ID
		isMore: false, // 加载更多
		isDialogVisible: false,
		isCash: false,
		ruleForm: {
			timeout_at: "",
			cash: ""
		},
		rules: {
			cash: [{ required: true, validator: valiNumber, trigger: "blur" }]
		},
		current: {}, //当前数据
		ruleFormPwd: {
			old_password: "",
			new_password: "",
			new_password_2: ""
		},
		rulesPwd: {
			old_password: [
			{ required: true, validator: checkOldPwd, trigger: "blur" }
			],
			new_password: [
			{ required: true, validator: validatePass, trigger: "blur" }
			],
			new_password_2: [
			{ required: true, validator: checkPass, trigger: "blur" }
			]
		},
		dialogVisible: false,
		labelVisible: "申诉状态",
		listVisible: [],
		ruleFormVisible: {
			value: null
		},
		rulesVisible: {
			value: [{ required: true, message: "请选择", trigger: "change" }]
		}
		};
  },
  filters: {
    //转换时间
    isDateFormat(val) {
		if (!val) return "";
		return dateFormat(val * 1000, "YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    handleClick(row, res) {
		this.dialogVisible = true;
		this.current = row;
		this.ruleFormVisible.value = 0;
		if (res == "state") {
			this.labelVisible = "处理状态";
			this.listVisible = this.stateList.filter(
			res => +res.value > +row.state
			);
			this.ruleFormVisible.value = +row.state + 1;
		} else {
			this.ruleFormVisible.value = +row.result;
			this.labelVisible = "处理结果";
			this.listVisible = this.resultList;
		}
    },
    orderEnd(row) {
		this.$http.post(`/hotline/finalize/${row.id}`).then(res => {
			this.getListData();
		});
    },
    submitFormVisible() {
      	const { value } = this.ruleFormVisible;
      	if (this.labelVisible == "处理状态") {
			this.$http.post(`/hotline/set-state/${this.current.id}`, {
				value
			}).then(res => {
				this.getListData();
			}).finally(res => {
				this.dialogVisible = false;
			});
      	} else {
			this.$http.post(`/hotline/set-result/${this.current.id}`, {
				value
			}).then(res => {
				this.getListData();
			}).finally(res => {
				this.dialogVisible = false;
			});
      	}
    },
    // 获取更多数据
    getMore() {
		this.isMore = true;
		this.getListData("more");
    },
    //获取列表数据
    getListData(name) {
		if (!name) {
			this.listData = [];
		}
		const since_id = this.listData.length > 0 ? this.listData[this.listData.length - 1].id : "";
		this.params.since_id = name == "more" ? since_id : "";
		this.$http.get(`/hotline/list`, this.params).then(res => {
			this.isMore = false;
			if (name == "query") {
				this.listData = res.data;
			} else if (res.data) {
				res.data.forEach(e => {
				this.listData.push(e);
				});
			}
		}).catch(res => {
			this.isMore = false;
		});
    },
    //获取state数据
    get_state() {
      this.$http.get(`/mapping/state`).then(res => {
        const get_data = res.data;
        let new_list = {
          "0": "投诉中", //  CREATED
          "1": "处理中", // IN_PROGRESS
          "2": "完成" //  FINISHED
        };
        // let new_list = {};
        let new_list2 = [];
        // 0: 创建   2:完成   1:处理中
        for (let item in get_data) {
          // console.log(item);
          // new_list[get_data[item].toString()] = item
          new_list2.push({
            value: get_data[item],
            text: item,
            lable: new_list[get_data[item]]
          });
        }
        this.state = new_list;
        this.stateList = new_list2;
      });
    },
    // 买卖情况
    // get_direction() {
    //     this.$http.get(`/mapping/direction`).then(res => {
    //         const get_data = res.data
    //         let new_list = {
    //             "1": "代理商", // AGENT
    //             "2": "APP", // APP
    //         }
    //         let new_list2 = []
    //         for (let item in get_data) {
    //             new_list[get_data[item].toString()] = item
    //             new_list2.push({value: get_data[item], text: item})
    //         }
    //         this.direction = new_list
    //         this.directionList = new_list2
    //     })
    // },
    //获取请求种类数据
    get_type() {
      this.$http.get(`/mapping/type`).then(res => {
        const get_data = res.data;
        let new_list = {
          "1": "代理请求冻结", // AGENT_REQUEST_FREEZE
          "2": "代理请求延长", // AGENT_REQUEST_LENGTHEN
          "3": "代理请求上诉", // AGENT_REQUEST_APPEAL
          "4": "用户请求延长", // USER_REQUEST_LENGTHEN
          "5": "用户请求上诉" // USER_REQUEST_APPEAL
        };
        let new_list2 = [];
        for (let item in get_data) {
          // new_list[get_data[item].toString()] = item
          new_list2.push({
            value: get_data[item],
            text: item,
            lable: new_list[get_data[item]]
          });
        }
        this.type = new_list;
        this.typeList = new_list2;
      });
    },
    // 处理结果result
    // get_result() {
    //     this.$http.get(`/mapping/result`).then(res => {
    //         const get_data = res.data
    //         let new_list = {
    //                 "0": "处理中", // WAITING
    //                 "1": "已审核", // APPROVED
    //                 "2": "拒绝", // REJECTED
    //                 "3": "取消", //  CANCELED
    //         }
    //         let new_list2 = []
    //         for (let item in get_data) {
    //             new_list[get_data[item].toString()] = item
    //             new_list2.push({value: get_data[item], text: item})
    //         }
    //         this.result = new_list
    //         // this.resultList = new_list2
    //     })
    // },
    // 发起方
    // get_side() {
    //     this.$http.get(`/mapping/side`).then(res => {
    //         const get_data = res.data
    //         let new_list = {}
    //         let new_list2 = []
    //         for (let item in get_data) {
    //             new_list[get_data[item].toString()] = item
    //             new_list2.push({value: get_data[item], text: item})
    //         }
    //         this.side = new_list
    //         this.sideList = new_list2
    //     })
    // },
    // 交易状态
    // get_shipment() {
    //     this.$http.get(`/mapping/shipment_state`).then(res => {
    //         const get_data = res.data;
    //         let new_list = {
    //             "1": "创建", // CREATED
    //             "2": "用户设定数额", // USER_SET_GOAL
    //             "4": "用户已付款", // USER_PAID
    //             "5": "部分放行", // AGENT_APPROVED
    //             "7": "用户投诉", // USER_APPEAL
    //             "3": "匹配", // MATCHED
    //             "-1000": "已结束", // FINISHED
    //             "-1": "已拒绝", // AGENT_REJECTED
    //             "-2": "用户拒绝", // USER_REJECTED
    //             "-3": "已拒绝", // USER_CANCELED
    //             "-4": "用户取消", // FROZEN
    //         }
    //         // let new_list2 = [];
    //         // for (let item in get_data) {
    //         //     // new_list[get_data[item].toString()] = item
    //         //     new_list2.push({value: get_data[item], text: item, lable:new_list[get_data[item]]})
    //         // }
    //         this.shipment = new_list
    //     })
    // },
    // 代理商ID
    get_name() {
      // type :商户2，卡商1
      	this.$http.get(`/mapping/name`, {
          	type: 1
        }).then(res => {
			const get_data = res.data;
			let new_list = {};
			for (let item in get_data) {
				new_list[get_data[item]] = item;
			}
			this.agentId = new_list;
        });
		this.$http.get(`/mapping/name`, {
			type: 2
		}).then(res => {
			const get_data = res.data;
			let new_list = {};
			for (let item in get_data) {
				new_list[get_data[item]] = item;
			}
			this.agentIds = new_list;
		});
    },
    // 客服名称
    get_service() {
      this.$http.get(`/mapping/service-name`).then(res => {
        const get_data = res.data;
        let new_list = {};
        for (let item in get_data) {
          new_list[get_data[item]] = item;
        }
        this.service = new_list;
        console.log(this.service, 888);
      });
    },
    // 冻结交易状态
    freeze(hotline_id) {
      this.$http.post(`/hotline/freeze_shipment/${hotline_id}`).then(res => {
        this.$notify({
          title: "成功",
          message: "冻结成功",
          type: "success"
        });
        this.getListData();
      });
    },
    // 修改
    modify(isCash, row) {
      this.current = row;
      this.isDialogVisible = true;
      this.isCash = isCash;
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      if (isCash) {
        this.ruleForm.cash = 0;
      } else {
        this.ruleForm.timeout_at = row.timeout_at
          ? dateFormat(row.timeout_at * 1000, "YYYY-MM-DD HH:mm:ss")
          : "";
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const hotline_id = this.current.id;
          // 修改现金
          if (this.isCash) {
            const cash = (+this.ruleForm.cash).toFixed(2);
            this.$http
              .post(
                `/hotline/approve_shipment_on_behalf_of_agent/${hotline_id}`,
                {
                  cash
                }
              )
              .then(res => {
                this.isDialogVisible = false;
                this.getListData();
                this.$notify({
                  title: "成功",
                  message: "修改金额成功",
                  type: "success"
                });
              })
              .catch(res => {
                this.isDialogVisible = false;
              });
          } else {
            const timeout_at = +new Date(this.ruleForm.timeout_at) / 1000;
            this.$http
              .post(`/hotline/reset_timeout/${hotline_id}`, {
                timeout_at
              })
              .then(res => {
                this.isDialogVisible = false;
                this.getListData();
                this.$notify({
                  title: "成功",
                  message: "修改到期时间成功",
                  type: "success"
                });
              })
              .catch(res => {
                this.isDialogVisible = false;
              });
          }
        }
      });
    },
    // 退出登录
    goLogout() {
      this.$http.post("/auth/logout").then(res => {
        localStorage.removeItem("didi_session");
        this.$router.push("login");
      });
    },
    // 修改密码
    submitFormPwd() {
      this.$refs.ruleFormPwd.validate(valid => {
        if (valid) {
          this.$http.post("/user/password", this.ruleFormPwd).then(res => {
            this.$notify({
              title: "成功",
              message: `密码修改成功`,
              type: "success"
            });
          });
          this.$refs.ruleFormPwd.resetFields();
          this.dialogFormVisible = false;
        }
      });
    }
  },
  mounted() {
    this.getListData(); // 获取列表数据
    this.get_state(); // 获取状态
    this.get_service(); // 客服
    // this.get_direction(); // 买卖情况
    this.get_type(); // 请求种类
    // this.get_result(); // 处理结果
    // this.get_side(); // 发起方
    // this.get_shipment(); // 交易状态
    this.get_name(); // 代理商ID - 商铺ID
  }
};
</script>
<style lang="scss">
.complaint-page {
	margin: 10px;
	height: calc(100% - 20px);
	.el-select {
		width: 250px;
	}

	.more {
		margin: 10px auto;
		display: inherit;
	}

	.el-table__expanded-cell {
		// background: #d6d0d066;

		.el-form--inline .el-form-item {
		margin-right: 45px;
		}
	}

	.el-table {
		.el-button {
		margin-left: 10px;
		}
		.el-table__body-wrapper {
			height: calc(100% - 40px);
    		overflow-x: hidden;
			overflow-y: auto;
		}
	}

	.el-form-item__content {
		span {
		color: red;
		}
		.el-button {
		span {
			color: #fff;
		}
		}
		img {
		max-width: 70px;
		max-height: 70px;
		}
	}
	.specification-img {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 10px #999;
	}
  	.float-btn {
		position: fixed;
		top: 110px;
		right: 40px;
		img {
			width: 30px;
			// background-color: #fff;
		}
	}
	.transaction-info {
		margin: 0;
		padding: 0;
		border: 1px solid #999;
		li {
			display: flex;
			list-style: none;
			align-items: center;
			line-height: 40px;
			border-bottom: 1px solid #999;
			&:last-child {
				border: none;
			}
			.item-name {
				width: 140px;
				text-align: center;
				font-weight: bold;
			}
			.content {
				flex: 1;
				padding: 20px;
				border-left: 1px solid #999;
				.ctm-cell {
					display: inline-block;
					margin-right: 40px;
					i {
						display: inline-block;
						margin-left: 5px;
						font-size: 16px;
						font-style: normal;
						color: red;
					}
				}
			}
		}
	}
	.complain-info {
		display: flex;
		.user {
			flex: 1;
			margin-right: 10px;
			
		}
		.card {
			flex: 1;
			margin-left: 10px;
		}
		ul {
			margin: 0;
			padding: 0;
			display: flex;
			flex-wrap: wrap;
			li {
				width: 50%;
				display: flex;
				list-style: none;
				align-items: center;
				line-height: 40px;
				&:last-child {
					border: none;
				}
				.item-name {
					width: 100px;
					font-size: 16px;
				}
				.content {
					flex: 1;
					padding: 20px;
					img {
						width: 200px;
						height: 200px;
					}
					span {
						color: red;
					}
					button {
						margin-left: 0;
						margin-right: 10px;
						span {
							color: #fff;
						}
					}
				}
			}
		}
	}
}
</style>
