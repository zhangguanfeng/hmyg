import Util from '@/common/util';
export default {
  updateCollapse( state: any, val: any ) {
    state.collapse = val;
  },
  viewImage(state: any, val: string) {
    state.singleViewerImages = [val];
  },
  viewImageTitle(state: any, val: string) {
    state.singleViewerTitle = val;
  },
  updateUserInfo(state: any, val: any) {
    Util.userInfo(val);
    state.userInfo = val;
  }
};