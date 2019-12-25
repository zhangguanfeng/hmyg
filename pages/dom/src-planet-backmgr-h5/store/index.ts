import Vue from 'vue';
import Vuex from 'vuex';
import Util from '@/common/util';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapse: false,
    date: [],
    showDateSelect: false,
    multipleSelectDate: true,
    userInfo: null,
    title: '',
    invate: null,
  },
  mutations: {
    updatCollapse(state, val) {
      state.collapse = val;
    },
    updateDate(state, val) {
      state.date = val;
    },
    showDateSelect(state, val) {
      state.showDateSelect = val;
    },
    multipleSelectDate(state, val) {
      state.multipleSelectDate = val;
    },
    updateUserInfo(state: any, val: any) {
      Util.userInfo(val);
	    state.userInfo = val;
    },
    updateTitle(state, val) {
      state.title = val;
    },
    updateInvate(state, val) {
      state.invate = val;
    },
  },
  actions: {
  },
  modules: {
  },
});
