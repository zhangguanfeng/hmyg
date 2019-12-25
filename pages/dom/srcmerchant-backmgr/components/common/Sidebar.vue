<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-openeds="openeds" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#00D1B2" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title"><i :class="subItem.icon"></i>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                <i :class="subItem.icon"></i>{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                openeds: ['fund'],
                collapse: false,
                items: [
                    {
                        index:'home-page',
                        icon:'el-icon-s-home',
                        title:'首页'
                    },
                    {
                        index: 'withdrawRecord',
                        icon: 'el-icon-s-order',
                        title: '交易管理',
                        subs: [
                            {
                                index:'rollInRecord',
                                title:'兑入记录'
                            },
                            {
                                index:'withdrawRecord',
                                title:'兑出记录'
                            }
                        ]
					},
					{
                        index: 'my-assets',
                        icon: 'el-icon-s-finance',
						title: '资金管理',
						subs: [
                            {
                                index: 'my-assets',
								title: '我的资产'
                            },
                            {
                                index: 'recharge-record',
								title: '充提流水'
                            },
                            {
                                index: 'transfer-record',
								title: '转账流水'
                            },
                            {
                                index: 'fund-record',
								title: '资金流水'
                            }
						]
                    },
                    {
                        index: 'userinfo',
                        icon: 'el-icon-user-solid',
						title: '用户中心',
						subs: [
							{
								index: 'userinfo',
								title: '账户与安全'
                            },
                            {
								index: 'userStatus',
								title: '账户状态'
							}
						]
					},
                    {
                        index: 'api-setting',
                        icon: 'el-icon-setting',
						title: '系统设置',
						subs: [
                            {
                                index: 'api-setting',
								title: 'API接入设置'
                            },
						]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
