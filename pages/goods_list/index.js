// pages/goods_list/index.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Tabes:[
      {id:0 , title:'综合', isActive:true},
      {id:1 , title:'数量', isActive:false},
      {id:2 , title:'价格', isActive:false}
    ],
    goods_list:[]
  },
  QueryParams:{
    query:'',
    cid:5,
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPage:1,
  handleIndex(e){
    // console.log(e);
    const {index} = e.detail;
    let {Tabes} = this.data
    Tabes.forEach((v,i) => {
      if(i===index){
        v.isActive = true
      }else{
        v.isActive = false
      }
    })
    this.setData({
      Tabes
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    
    this.QueryParams.cid = options.cid
    this.getgoods_list()
  },
  getgoods_list(){
    request({ url:'/goods/search',data:this.QueryParams})
      .then((result) => {
        this.totalPage = Math.ceil(result.total / this.QueryParams.pagesize)
        // console.log(result);
        this.setData({
          goods_list:[...this.data.goods_list, ...result.goods]
        })
        wx.stopPullDownRefresh()
          
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.QueryParams.pagenum = 1;
    this.setData({
      goods_list:[]
    })
    this.getgoods_list();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum >= this.totalPage){
      // console.log('没有下一页数据了');
      wx.showToast({
        title: '没有更多商品了',
        icon: 'none',
      });
        
      
    }else{
      this.QueryParams.pagenum++;
      this.getgoods_list()

    }
  },

 
})