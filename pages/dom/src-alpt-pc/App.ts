/**
 * @ Author: Diskfan
 * @ Create Time: 2019-12-11 23:52:44
 * @ Modified by: Your name
 * @ Modified time: 2019-12-12 08:22:56
 * @ Description: App root组件
 */


import { Vue, Component } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import '@/style/app.scss';

@Component
export default class App extends Vue {
  render(h: CreateElement) {
    return h('div', {
      domProps: {
        id: 'app',
        className: this.$i18n.locale,
      },
    }, [
      h('div', { domProps: { className: 'background' } }),
      h('AlHeader'),
      h('div', {
        domProps: {
          className: `contain ${this.$i18n.locale}`,
        },
      }, [ h('transition', {
            props: {
              name: 'router-fade-in',
            },
          }, [ h('router-view') ]),
          h('AlFooter'),
        ]),
    ]);
  }
}