// pages/cart/index.js
import{ request }from '../../request/index.js'
import regeneratorRuntime from "../../lib/runtime/runtime";
import { showToast, showModal, requestPayment } from "../../utils/asyncWx";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    // 页面渲染数据
    cart: {},
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0
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
    const address = wx.getStorageSync("address") || {};
    const cart = wx.getStorageSync("cart") || {};
    this.setData({
      address,
      cart
    });
    this.setCart(cart);
  },
  // 封装计算总价格和数量的方法
  setCart(cart) {
    // 把本地存储的对象转换为数组
    let cartArr = Object.values(cart);
    // 计算出总价格和总数量
    let totalPrice = 0;
    let totalNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    });

    this.setData({
      totalPrice,
      totalNum,
      cart
    });
    // 将数据存入本地
    wx.setStorageSync("cart", cart);
  },
  // 点击支付
  // 支付需要订单编号参数数和token才能发送请求
  async handlepay() {
    try {
      const cart = this.data.cart 
      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: "/pages/auth/index"
        });
      } else {
        // 获取订单编号要的请求头参数
        let header = { Authorization:token };
        // 总价格
        let order_price = this.data.totalPrice
        let consignee_addr = this.data.address.all
        let goods = [];
        for (const key in cart) {
          if (cart.hasOwnProperty(key)) {
            if(cart[key].checked){
              goods.push({
                goods_id:cart[key].goods_id,
                goods_number:cart[key].num,  
                goods_price:cart[key].goods_price
              })
            }
          }
        }
        // 把获取订单编号要的数据封装成对象发送请求
        let orderParams = { order_price, consignee_addr, goods }
        // 订单编号
        const { order_number } = await request({
          url:'/my/orders/create',
          method:'POST',
          data:orderParams,
          header
        })
        // 获取支付参数
        const  {pay}  = await request({
          url:'/my/orders/req_unifiedorder',
          method:'POST',
          data:{order_number},
          header
        })
        // 调用微信支付api
        const res = await requestPayment(pay);
        // console.log(res);
        // 查询订单状态
        const res2 = await request({
          url:'/v1/my/orders/chkOrder',
          method:'POST',
          data:{order_number},
          header
        })
        await showToast({title:'支付成功'})
        wx.navigateTo({
          url: '/pages/order/index',
        });
          
        
      }
    } catch (error) {
      console.log(error,'123');
      await showToast({title:'支付失败'})
      
    }
  }
});
