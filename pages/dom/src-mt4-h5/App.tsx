/**
 * @ Author: Diskfan
 * @ Create Time: 2019-10-19 17:49:31
 * @ Modified by: Your name
 * @ Modified time: 2019-11-28 19:06:31
 * @ Description: $root
 */

import { Component, Vue } from 'vue-property-decorator';
import { checkAddr } from '@/common/axios';

@Component
export default class App extends Vue {
  protected created() {
    sessionStorage.clear();
    this.$store.dispatch( 'getApiList' );
    checkAddr();
    // const token = this.$util.token();
    // if ( token ) {
    //   this.$store.commit( 'updateToken', token );
    // }
  }
  protected render( ) {
    return <div id='app'>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>;
  }
}
