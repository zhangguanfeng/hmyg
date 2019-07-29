//Page Object
Page({
  data: {
    // 轮播图数据
    swiperList:[]
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiper()
  },
  getSwiper(){
    var reqTask = wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
        console.log(result);
        
      }
    });
      
  }
});
  