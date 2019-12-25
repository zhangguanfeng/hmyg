import { Component, Vue, Prop } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';

import './b-menu.scss';

interface IMenu {
  path: string;
  name: string;
  icon: string;
  children: any;
  menu: string;
}

@Component
export default class BMenu extends Vue {
  protected width: string = '260px';
  protected defaultActive: string = '';
  protected defaultOpeneds: string[] = [];
  protected get collapse(): boolean {
    return this.$store.state.collapse;
  }
  @Prop({ default: () => [], type: Array, required: true }) protected menu!: [];
  protected createCollapse(): VNode {
    const h: CreateElement = this.$createElement;
    return h('div', {
      domProps: {
        className: 'collapse-wrap',
      },
      on: {
        click: () => {
          this.$store.commit('updateCollapse', !this.$store.state.collapse);
        }
      },
    }, [
      h('img', {
        domProps: {
          src: this.collapse ? '/image/menu-icon-close.png' : '/image/menu-icon-open.png',
        }
      })
    ]);
  }
  protected createSubMenu(menu: IMenu[], path: string = '/', step: number = 0): VNode[] {
    const h: CreateElement = this.$createElement;
    const VNodes: VNode[] = [];
    for (const v of menu) {
      const iconVNode: VNode = h('i', {
        class: v.icon,
        style: {
          fontSize: '20px',
        }
      }, []);
      const titleVNode: VNode | string = step === 0 && this.collapse ? '' : h('span', {
        domProps: {
          className: 'title-span'
        }
      }, [v.menu]);
      if (v.children && v.children.length) {
        const title: VNode = h('template', {
          slot: 'title',
        }, [
          iconVNode,
          titleVNode,
        ]);
        VNodes.push(h('el-submenu', {
          props: {
            showTimeout: 0,
            index: (path + '/' + v.path).replace(/\/{2,}/, '/'),
          }
        }, [title, ...this.createSubMenu(v.children, (path + '/' + v.path), step + 1)]));
      } else {
        VNodes.push(h('el-menu-item', {
          props: {
            index: ((path + '/' + v.path).replace(/\//, '')).replace(/\/{2,}/g, '/'),
          }
        }, [iconVNode, titleVNode]));
      }
    }
    return VNodes;
  }
  protected createMenu(): VNode {
    const h: CreateElement = this.$createElement;
    return h('el-menu', {
      props: {
        collapse: this.collapse,
        router: true,
        defaultActive: this.$route.fullPath,
        uniqueOpened: true,
        backgroundColor: '#2B304A',
        textColor: '#fff',
        activeTextColor: '#fff',
        defaultOpeneds: [this.$route.fullPath.replace(/\/[^/]+$/, '')],
        ...this.$props,
      },
      ref: 'menu',
      domProps: {
        className: 'b-menu' + (this.collapse ? 'is-collapse' : ''),
      },
      on: {
        ...this.$listeners
      }
    }, this.createSubMenu(this.menu));
  }
  protected render() {
    const h: CreateElement = this.$createElement;
    return h('div', {
      domProps: {
        className: 'b-menu-wrap'
      },
      style: {
        width: this.collapse ? '80px' : '220px',
      },
    }, [
      this.createCollapse(),
      this.createMenu(),
    ]);
  }
}