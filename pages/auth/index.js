// pages/auth/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from '../../utils/asyncWx'
Page({

  async handleGetUserInfo(e){
    // console.log(e);
    
    const {encryptedData, rawData, iv, signature} = e.detail
    const {code} = await login()
    const postParams = {encryptedData, rawData, iv, signature,code}
    // console.log(code);
    const{ token } = await request({
      url:'/users/wxlogin',
      method:'POST',
      data:postParams
    })
    // console.log(token);
    // 将token存入到缓存中
    wx.setStorageSync('token', token);
    // 跳转回上一页
    wx.navigateBack({
      delta: 1
    });
  }
})