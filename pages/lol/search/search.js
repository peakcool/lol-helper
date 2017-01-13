var app = getApp();
var common = require('../../../utils/common.js');
Page({
  data:{
    inputShowed : false,
    inputVal: "",
    accountList : {},
    areaList : {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  showInput : function (){
    this.setData({
      inputShowed: true
    });
  },
  hideInput : function (){
    this.setData({
      inputVal : " ",
      inputShowed: false
    })
  },
  clearInput: function (){
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e){
    var self = this;
    var search = e.detail.value;

    self.areaList = common.returnAreaName();
    wx.request({
        url : app.globalData.apiUrl + 'UserArea',
        data : {
          keyword : encodeURI(search.account)
        },
        header : {
            "DAIWAN-API-TOKEN" : app.globalData.token
        },
        success : function(res) {

            var data = res.data.data;
            for(var val in data) {
              data[val]['area_name'] = self.areaList[data[val]['area_id'] - 1];
            }
            self.setData({
                accountList : data
            })
        },
        error : function (res) {
            console.log(res);
        }
    })
  },
  watchAccount: function (qquin, area_id) {
    console.log(qquin);
    console.log(area_id);
  }
})