//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getHeroIcon : function(id) {
      var self = this;
      wx.request({
          url : self.globalData.apiUrl + 'GetChampionIcon',
          data : { id : id},
          header : {
              "DAIWAN-API-TOKEN" : self.globalData.token
          },
          success : function(res) {
              console.log(res.data);
              return res;
          },
          error : function (res) {
              console.log(res);
          }
      })
  },
  globalData:{
    userInfo:null,
    apiUrl : "http://lolapi.games-cube.com/",
    token : "4054F-2444B-AB010-A7100"
  }
})