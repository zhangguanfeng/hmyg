// pages/order/index.js
import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabes: [
      { id: 0, title: "全部", isActive: true },
      { id: 1, title: "待付款", isActive: false },
      { id: 2, title: "待发货", isActive: false },
      { id: 3, title: "退款/退货", isActive: false }
    ],
    order:[]
  },
  handleIndex(e){
    console.log(e);
    const { index } = e.detail
    this.changeTitleByIndex(index)
    this.getOrdersList((index+1))
  },
  // 根据索引修改标题
  changeTitleByIndex(index){
    const { tabes } = this.data
    tabes.forEach((v) => {
      if(v.id==index){

        v.isActive = true
      }else{
        v.isActive = false
      }
    });
    this.setData({
      tabes
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow: function () {
    
    
    // 获取本地token
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
      

    // 根据页面栈找到上一页面传来的值
    // 修改标题栏的颜色状态
    let pageList =  getCurrentPages();
    let currentPage = pageList[pageList.length-1]
    const {type} = currentPage.options
    this.changeTitleByIndex(type)
    
    this.getOrdersList((type+1))
  },
  // 获取订单数组
  async getOrdersList(type){
    let herder = {
      Authorization: wx.getStorageSync('token')
    }
     let {orders} = await request({
      url:'/my/orders/all',
      data:{type},
      header:herder
    })
    orders.forEach(v => {
      v.create_time_cn = (new Date(v.create_time * 1000)).toLocaleString();
    })
    this.setData({
      orders
    })
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})