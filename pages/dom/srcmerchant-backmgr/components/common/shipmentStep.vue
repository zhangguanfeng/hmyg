<template>
	<div class="shipment-step">
		<span @click.stop="show = true">{{current}}</span>
		<div class="fixed-popup" v-show="show" @click.stop="show = false">
			<div class="popup-content" @click.stop="show = true">
				<div class="step-list">
					<div class="step-item" :class="{'active': item === current}" v-for="(item,index) in list" :key="index">
						<div class="item-line"></div>
						<div class="item-dot"></div>
						<div class="item-ctn">{{item}}</div>
					</div>
				</div>
			</div>
			<div class="shipment-step_tips">点击阴影关闭</div>
		</div>
	</div>
</template>

<script>
/*
* @Author: shanks
* @Content: 状态时间轴
* @Date: 2019-05-25 14:00:00
* @props: [current] 当前状态  [list] 总状态数组
*/
export default {
	props: {
		current: {
			type: String,
			default: ""
		},
		list: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			show: false
		}
	}
}
</script>


<style lang="less" scoped>
.shipment-step {
    text-align: left;
    display: inline-block;
	.fixed-popup {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 20121212;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.3);
		.popup-content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;
			min-width: 60%;
			max-height: 85%;
			overflow-y: auto;
			padding: 40px 40px 10px 10px;
			border-radius: 4px;
			.step-list {
				.step-item {
					position: relative;
					min-height: 40px;
					.item-line {
						position: absolute;
						left: 4px;
						top: 2px;
						height: 100%;
						border-left: 2px solid #e4e7ed;
					}
					.item-dot {
						position: absolute;
						top: 2px;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						background-color: #d2d4d6;
					}
					.item-ctn {
						padding: 0 0 0 20px;
						font-weight: 400;
						font-size: 14px;
						line-height: normal;
					}
					&.active {
						.item-dot {
							background-color: #1F78E4;
						}
						.item-ctn {
							font-weight: 700;
							color: #1F78E4;
						}
					}
					&:last-child {
						.item-line {
							display: none;
						}
					}
				}
			}
		}
		.shipment-step_tips {
			position: absolute;
			width: 100%;
			text-align: center;
			bottom: 2%;
			line-height: normal;
			color: #fff;
		}
	}
}
</style>

