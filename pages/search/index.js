// pages/search/index.js
import regeneratorRuntime, { async } from "../../lib/runtime/runtime";
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    kong: ""
  },
  timeId: -1,
  handeSearchInput(e) {
    // console.log(e);
    const { value } = e.detail;
    console.log(value);
    this.setData({
      kong:value
    })
    if(this.data.kong==''){
      this.setData({
        goods: []
      });
    }
    if (!value.trim()) {
      return;
    }
    clearTimeout(this.timeId);
    this.timeId = setTimeout(() => {
      this.getQsearch(value);
    }, 1000);
    
  },
  handlekong() {
    this.setData({
      kong: "",
      goods: []
    });
  },
  async getQsearch(query) {

    const goods = await request({
      url: "/goods/qsearch",
      data: { query }
    });
    this.setData({
      goods
    });
  },
});

