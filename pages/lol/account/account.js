var app = getApp();
var wxchart = require("../../../utils/wxchart.js");

Page({
    data: {
        text: "Page account",
        accountInfo: {},
        accountKDA: {},
        accountNumKill: {},
        accountMvp: {},
        accountOther: {}
    },
    onLoad: function(options) {
        var self = this;

        //班德尔 "草莓哥哥i"
        // options.uid = "U8194925994472563608";
        // options.area_id = "5";

        wx.request({
                url: app.globalData.apiUrl + 'UserExtInfo',
                data: {
                    qquin: options.uid,
                    vaid: options.area_id
                },
                header: {
                    "DAIWAN-API-TOKEN": app.globalData.token
                },
                success: function(res) {

                    var data = res.data.data;
                    var useNum = data[0].items[0].recent_position;
                    console.log(data);
                    self.setData({
                        accountInfo: data,
                        accountKDA: data[0].items[0].recent_kda,
                        accountNumKill: data[1],
                        accountMvp: data[2],
                        accountOther: data[3],
                        accountUse: data[0].items[0].recent_position
                    });

                    //各位置使用次数图
                    new wxchart({
                        canvasId: 'pie-canvas',
                        type: 'pie',
                        series: [{
                            name: '打野使用' + useNum.jungle_use_num + '次',
                            data: useNum.jungle_use_num,
                        }, {
                            name: 'ADC使用' + useNum.adc_use_num + '次',
                            data: useNum.adc_use_num,
                        }, {
                            name: '上单使用' + useNum.up_use_num + '次',
                            data: useNum.up_use_num,
                        }, {
                            name: '中单使用' + useNum.mid_use_num + '次',
                            data: useNum.mid_use_num,
                        }, {
                            name: '辅助使用' + useNum.aux_use_num + '次',
                            data: useNum.aux_use_num,
                        }],
                        width: 360,
                        height: 300,
                        dataLabel: true
                    });

                    //各位置胜率柱形图
                    new wxchart({
                        canvasId: 'win-percentage',
                        type: 'column',
                        categories: ['打野', 'ADC', '上单', '中单', '辅助'],
                        series: [{
                            name: '各位置胜率',
                            data: [
                                useNum.jungle_win_num / useNum.jungle_use_num * 100, 
                                useNum.adc_win_num / useNum.adc_use_num * 100, 
                                useNum.up_win_num / useNum.up_use_num * 100, 
                                useNum.mid_win_num / useNum.mid_use_num * 100, 
                                useNum.aux_win_num / useNum.aux_use_num * 100
                            ],
                            format: function(val) {
                                return val.toFixed(2) + '%';
                            }
                        }],
                        yAxis: {
                            format: function(val) {
                                return val + '%';
                            }
                        },
                        width: 360,
                        height: 300,
                        dataLabel: true
                    });
                },
                error: function(res) {
                    console.log(res);
                }
            })
            // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})
