// pages/cart/index.js
import regeneratorRuntime from "../../lib/runtime/runtime";
import { openSetting, getSetting, chooseAddress, showToast, showModal } from "../../utils/asyncWx";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    // 页面渲染数据
    cart:{},
    // 总价格
    totalPrice:0,
    // 总数量
    totalNum:0,
    // 全选状态
    isAllChecked:false
  },
  async handleshouquan() {
    const res1 = await getSetting();
    // console.log(res1,'1');
    const scopeAddress = res1.authSetting["scope.address"];
    if (scopeAddress === true || scopeAddress === undefined) {
      // 直接获取用户的收货地址
      // const res2 = await chooseAddress();
      // console.log(res2);
    } else {
      const res3 = await openSetting();
    }
    const res2 = await chooseAddress();
    console.log(res2);
    res2.all =
      res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo;
    wx.setStorageSync("address", res2);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const address = wx.getStorageSync('address')|| {}
    const cart = wx.getStorageSync('cart') ||{};
    this.setData({
      address,
      cart
    });
    this.setCart(cart);
  },
  // 封装计算总价格和数量的方法
  setCart(cart){
    // 把本地存储的对象转换为数组
    let cartArr = Object.values(cart)
    // 计算出总价格和总数量
    let isAllChecked = true
    let totalPrice = 0
    let totalNum = 0
    cartArr.forEach((v) => {
       if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
       }else{
        isAllChecked = false
       }
    })
    isAllChecked = cartArr.length === 0 ? false:isAllChecked

    this.setData({
      totalPrice,
      totalNum,
      isAllChecked,
      cart
    })
    // 将数据存入本地
    wx.setStorageSync('cart', cart);
      
  },
  // 单选部分
  handleCartCheck(e){
    console.log(e);
    const { id }= e.currentTarget.dataset
    let { cart } = this.data
    // 把点选的数据修改
    cart[id].checked = !cart[id].checked
    // 把数据从新计算
    this.setCart(cart)
  },
  // 全选部分
  handleAllCheck(){
    let { isAllChecked,cart } = this.data
    isAllChecked = !isAllChecked
    for (const key in cart) {
      if (cart.hasOwnProperty(key)) {
        cart[key].checked = isAllChecked
        
      }
    }
    // 重新计算数据
    this.setCart(cart);
  },
  // 修改购买数量
  async handleEdit(e){
    // console.log(e);
    const { id, operation} = e.currentTarget.dataset
    let { cart } = this.data
    // 判断当前的操作是否删除操作
    if(cart[id].num ===1 && operation === -1){
      const res = await showModal({ content:'您确定删除吗？'})
      if(res.confirm){
        delete cart[id];
        this.setCart(cart);
      }else{
        console.log('取消了');
        
      }
      
    }else{
      // 正常改变数据
      cart[id].num += operation;
      this.setCart(cart)
    }
    
  },
  // 结算跳转到支付页面
  async handlepay(){
    const {address,totalNum } = this.data
    if(!address.all){
      await showToast({title:'您没有选择收货地址'})
    }else if(totalNum<=0){
      await showToast({title:'您没有要结算的商品'})
    }else{
      wx.navigateTo({
        url: '/pages/pay/index'
      });
        
    }
  }

});
