// pages/category/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    // 左边数据
    leftList:[],
    // 右边数据
    rightList:[],
    titleIndex:0,
    // 刷新后页面内容回到顶部
    isTop:0
  },
  categoriesList:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cate = wx.getStorageSync('cate');
    if(!cate){
      this.getCategories()
    }else{
      if(Date.now()-cate.time>=1000000){
        this.getCategories()
      }else{
        this.categoriesList = cate.data
        const leftList = this.categoriesList.map((v) => {
          return v.cat_name
        })
        const rightList = this.categoriesList[0].children
        this.setData({
          leftList,
          rightList
        })
      }
    }
      
    
  },
  getCategories(){
    request({ url:'/categories' })
      .then((result) => {
        // console.log(result);
        this.categoriesList = result
        wx.setStorageSync('cate', {time:Date.now(),data:this.categoriesList});
        const leftList = this.categoriesList.map((v) => {
          return v.cat_name
        })
        const rightList = this.categoriesList[0].children
        this.setData({
          leftList,
          rightList
        })
      })
  },
  handleIndex(e){
    const {index} = e.currentTarget.dataset
    const rightList = this.categoriesList[index].children
    this.setData({
      titleIndex:index,
      rightList,
      isTop:0
    })
  }
  
})