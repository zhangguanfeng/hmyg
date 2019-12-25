<template>
  <div id="app">
    <Login v-if="$route.fullPath === '/login'" />
    <Frame v-else />
    <BCalendar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Frame from '@/views/frame.vue';
import Login from '@/views/user/login.vue';
import BCalendar from '@/components/h-calendar.vue';

@Component({
  components: {
    Login,
    Frame,
    BCalendar
  },
})
export default class App extends Vue {
  private created() {
    const userinfo = this.$util.userInfo();
    if (userinfo) {
      this.$store.commit('updateUserInfo', userinfo);
    }
  }
}
</script>

<style lang="scss">
	html,body,p {
		margin: 0;
		padding: 0;
  }
  html, body {
    width: 100%;
    height: 100%;
    background: #04052D;
  }
$color: #39C6B4 !important;

#app {
  
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  .van-tabs__line, .m-select {
    background-color: $color;
  }
  .van-picker__cancel, .van-picker__confirm {
    color: $color;
  }
  // margin-top: 60px;
}
.router-fade-in-enter-active {
  transition: all .1s ease-in;
  opacity: 0;
}
.router-fade-in-leave-active {
  transition: all .1s ease-in;
  opacity: 0;
}
.router-fade-in-enter, .router-fade-in-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
