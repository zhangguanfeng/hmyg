//Page Object
// 引入封装好的公共接口
import { request } from '../../request/index.js'
Page({
  data: {
    // 轮播图数据
    swiperList:[],
    // 导航栏数据
    navList:[],
    goodsLIst:[]
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiper()
    this.getNavList()
    this.getGoods()
  },
  // 获取轮播图数据
  getSwiper(){
    request({ url: "/home/swiperdata" })
      .then((result) => {
        this.setData({
          swiperList:result
        })
      })
  },
  // 获取导航栏数据
  getNavList(){
    request({ url: "/home/catitems" })
      .then((result) => {
        this.setData({
          navList:result
        })
      })
  },
  // 获取楼层商品数据
  getGoods(){
    request({ url: "/home/floordata" })
      .then((result) => {
        this.setData({
          goodsLIst:result
        })
      })
      
  }
});
  