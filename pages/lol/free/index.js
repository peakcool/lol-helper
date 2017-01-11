var app = getApp()

Page({
    data : {
        title : "周免英雄",
        heroList : {}
    },
    onLoad: function () {
        console.log('onload')
        var self = this

        //调用应用实例的方法获取全局数据
            //更新数据
            wx.request({
                url : app.globalData.apiUrl + 'free',
                data : {},
                header : {
                    "DAIWAN-API-TOKEN" : app.globalData.token
                },
                success : function(res) {
                    self.setData({
                        heroList : res.data.data[0]
                    })
                },
                error : function (res) {
                    console.log(res);
                }
            })
            
    }
})