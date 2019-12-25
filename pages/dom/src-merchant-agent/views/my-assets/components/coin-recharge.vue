<template>
	<div class="coin-recharge">
		<div class="main">
			<div class="radio-wrap">
				<span class="chainName">链名称：</span>
				<el-radio v-model="radio" :label="item" border v-for="(item,index) in typeList" :key="index" @change="getInfo">{{item}}</el-radio>
			</div>
			<div class="address-list">
				<p class="title">
					地址列表
					<span>以下地址均可以充币</span>
				</p>
				<el-table :data="list" border style="width: 100%" height="50px" size="mini">
					<el-table-column prop="type" label="序号" width="200" align="center" type="index">
						<div slot-scope="scope">
							<p>{{scope.$index+1}}</p>
						</div>
					</el-table-column>
					<el-table-column prop="type" label="充币地址" align="center">
						<div slot-scope="scope">
								<el-row>
									<span style="margin-right:20px;">{{scope.row.SECRET}}</span>
									<el-button 
									type="text" size="mini"
									v-clipboard:copy="scope.row.SECRET"
									v-clipboard:success="onSuccess"
									v-clipboard:error="onError">复制</el-button>
								</el-row>
						</div>
					</el-table-column>
					<el-table-column prop="type" label="二维码" width="100" align="center" type="index">
						<div slot-scope="scope" class="qrcodeBox">
							<el-popover
								placement="top"
								width="150"
								trigger="hover">
								<div>
									<img :src="scope.row.codeUrl" alt="" style="width:150px;height:150px;">
								</div>
								<el-button slot="reference">
									<img :src="scope.row.codeUrl" alt="" class="codeImg">
								</el-button>
							</el-popover>
						</div>
					</el-table-column>
				</el-table>
				<!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total*1">
        </el-pagination> -->
			</div>
		</div>
	</div>
</template>

<script>

import QRCode from 'qrcode'
export default {
	data() {
		return {
			typeList:[],
			radio: "OMNI",
			list:[],
			page:1,
			page_size:10,
			total:'',
		}
	},
	mounted() {
		this.getType()
		this.getInfo()
	},
	methods: {
		getType() {
			let p = this.$http.get('ajax_funds/coinPage')
			p.then(res => {
				let {result} = res
				this.typeList = result[0].COIN_TYPE
			}).catch(error => {
				console.log(error)
			})
		},
		getInfo() {
			let p = this.$http.post("/ajax_funds/coinAddress",{
				coin_name:'usdt',
				coin_type:this.radio,
				page_size:this.page_size,
				page:this.page
			})
			p.then(res => {
				let {result} = res
				this.list = result.data
				this.total = result.total_count || 0
				this.list.forEach((el,index)=>{
					console.log(el.SECRET.length)
					this.getQrcode(el)
				})
			}).catch(error => {
				return false
			})
		},
		handleSizeChange(size) {
			this.page_size = size
			this.getInfo()
		},
		handleCurrentChange(page) {
			this.page = page
			this.getInfo()
		},
		onSuccess() {
				this.$message({
						message:'复制成功',
						type:"success",
						duration:"2000"
				})
		},
		onError(){
				this.$message({
						message:'复制失败',
						duration:"2000"
				})
		},
		//生产二维码
		getQrcode(item){
				QRCode.toDataURL(item.SECRET,{errorCorrectionLevel: 'H'}, (err, url) => {
						item.codeUrl = url
				})
		},
	}
}
</script>

<style lang="less" scoped>
.coin-recharge {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 10px;
	.main {
		flex: 1;
		overflow: hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		background: #fff;
		display: flex;
		flex-direction: column;
		.el-radio {
			background-color: #fff;
			font-weight: 700;
		}
		.qrcode-wrap {
			width: 500px;
			margin: 40px 0;
			#qrcode {
				/deep/img {
					margin: 0 auto;
				}
			}
			h4 {
				text-align: center;
				margin-top: 20px;
			}
		}
		.radio-wrap {
			width: 500px;
			margin-bottom:20px;
			padding:20px;
			.chainName {
				font-size: 16px;
				font-weight: 400;
			}
		}
		.address-list {
			flex: 1;
			overflow: hidden;
			background: #fff;
			display: flex;
			flex-direction: column;
			.title {
				margin-bottom:20px;
				padding:0 20px;
				span {
					margin-left:10px;
					font-size:12px;
					color:#aaa;
				}
			}
			.el-table {
				overflow-y: auto;
				&::before{
					display: none;
				}
				.qrcodeBox {
					/deep/ .el-popover__reference {
						padding:0
					}
					.codeImg {
						width:40px;
						height:40px;
					}
				}
			}
		}
		
	}
	
}
</style>


