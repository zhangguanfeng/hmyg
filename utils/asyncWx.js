// 打开授权模式
export const openSetting = () => {
  return new Promise((resolve,reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
    
  }) 
}
// 获取授权信息
export const getSetting = () => {
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
       
  }) 
}
// 获取收货地址
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
      
  }) 
}
export const showToast = ({ title}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title:title,
      icon:'none',
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
      
  }) 
}
export const showModal = ({ content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title:'提示',
      content:content,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
      
  }) 
}
