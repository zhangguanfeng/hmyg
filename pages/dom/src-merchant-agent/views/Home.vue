<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content scroll">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from '@/components/common/Header.vue'
import vSidebar from '@/components/common/Sidebar.vue'
import vTags from '@/components/common/Tags.vue'
import bus from '@/components/common/bus'
export default {
	data(){
		return {
			tagsList: [],
			collapse: false
		}
	},
	components:{
		vHead, vSidebar, vTags
	},
	created(){
		bus.$on('collapse', msg => {
			this.collapse = msg;
		})

		// 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
		bus.$on('tags', msg => {
			let arr = [];
			for(let i = 0, len = msg.length; i < len; i ++){
				msg[i].name && arr.push(msg[i].name);
			}
			this.tagsList = arr;
		})
	}
}
</script>

<style lang="less" scoped>
.wrapper {
	.content-box {
		.scroll {
			overflow-y: scroll;
		}
	}
}
</style>

