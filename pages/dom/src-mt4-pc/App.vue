<template>
  <div
    id="app"
    class="app"
  >
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapState({
      isLoading: 'isLoading',
    }),
  },
  created() {
    this.$store.dispatch('getUserInfo');
  },
  mounted() {
    ;(function (W, D) {
      W.ec_corpid = '8579385';
      W.ec_cskey = 'j6GngpqRUhpmVjKhHw';
      W.ec_scheme = '2';
      var s = D.createElement('script');
      s.charset = 'utf-8';
      s.setAttribute('id', 'server');
      s.src = '//1.staticec.com/kf/sdk/js/ec_cs.js';
      D.getElementsByTagName('head')[0].appendChild(s);
    })(window, document);
  }
};
</script>

<style lang="scss">
  @import '~@/styles/app.scss';
</style>
