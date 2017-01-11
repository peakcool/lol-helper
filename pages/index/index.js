//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎回来，召唤师',
    userInfo: {},
    defaultSize : "default",
    loading : false,
    plain : false
  },
  //事件处理函数
  watchActions: function() {
    wx.navigateTo({
      url: '../lol/index/index'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
