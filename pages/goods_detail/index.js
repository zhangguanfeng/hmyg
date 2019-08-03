import { getStorageSync, setStorageSync} from '../../utils/storage.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList:{}
  },
  // 全局的数据
  GoodsObj:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiper(options.goods_id)
  },
  
  async getSwiper(goods_id){
    const result = await request({ url:'/goods/detail',data:{goods_id}})
    this.GoodsObj = result
    this.setData({
      detailList:{
        pics:result.pics,
        goods_price:result.goods_price,
        goods_introduce:result.goods_introduce.replace(/\.webp/g,'.jpg'),
        goods_name:result.goods_name

      }
    })
  },
  // 点击轮播图放大图片
  handleBigImage(e){
    console.log(e);
    const { index } = e.currentTarget.dataset
    const urls = this.data.detailList.pics.map((v) => {
      return v.pics_big_url
    })
    const current = urls[index];
    wx.previewImage({
      current,
      urls
    });
      
  },
  // 添加到购物车
  handleAddCart(){
    let cart = getStorageSync() || {}
    if(cart[this.GoodsObj.goods_id]){
      cart[this.GoodsObj.goods_id].num++
    }else{
      // 第一次添加
      cart[this.GoodsObj.goods_id] = this.GoodsObj;
      cart[this.GoodsObj.goods_id].num = 1
    }
    setStorageSync(cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask:true
    });
      
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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