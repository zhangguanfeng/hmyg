<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  protected async created() {
   document.title = this.$store.state.appName;
   const userinfo = this.$util.userInfo();
   if (userinfo) {
     this.$store.commit('updateUserInfo', userinfo);
   }
  }
}
</script>
<style lang="scss">
@import '@/style/base.scss';
</style>
