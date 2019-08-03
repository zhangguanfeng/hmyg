// components/tabes/tabes.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Tabes:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleIndex(e){
      // console.log(e);
      
      const {index} = e.currentTarget.dataset
      this.triggerEvent('handleIndex',{ index })
      
    }
  }
})
