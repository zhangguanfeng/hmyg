import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Util from '@/common/util';

Vue.use( VueI18n );

const messages: any = {
  en: require( './en' ),
  cn: require('./cn'),
};

export default new VueI18n( {
 locale: Util.locale(),
  messages,
} );
