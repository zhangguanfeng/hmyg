<template>
	<span @click="send">{{text}}</span>
</template>

<script>
export default {
	props: {
		s: {
			default: 60,
			type: Number
		},
		disabled: {
			default: false,
			type: Boolean
		}
	},
	model: {
		prop: "disabled",
		event: "change"
	},
	data() {
		return {
			text: "获取验证码",
			second: this.s,
			timer: null
		}
	},
	mounted() {
		this.disabled && this.start()
	},
	methods: {
		send() {
			!this.disabled && this.$emit("click")
		},
		start() {
			this.timer = setTimeout(() => {
				this.text = this.second + "s"
				this.second--
				if(this.second > 0) {
					this.start()
				}else {
					this.text = "获取验证码"
					this.second = 60
					this.$emit("change", false)
				}
			}, 1000)
		}
	},
	watch: {
		disabled(newVal, oldVal) {
			if(newVal) {
				this.start()
			}else {
				clearTimeout(this.timer)
				this.text = "获取验证码"
				this.second = 60
			}
		}
	}
}
</script>

