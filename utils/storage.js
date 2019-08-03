// 封装获取本地存储方法
export const setStorageSync = (obj) => {
  wx.setStorageSync('cart' ,obj);
     
}
// 封装本地存储方法
export const getStorageSync = () => {
  return wx.getStorageSync('cart');
     
}