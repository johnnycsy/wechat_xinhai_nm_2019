const QQMapWX = require("../../utils/qqmap-wx-jssdk.min.js");
var qqmapsdk, _this;
const app = new getApp();
// pages/maps/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: null,
    latitude: null,
    search_typea: "",
    search_typeb: "",
    search_typec: "",
    markers: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    _this = this;
    var mapKey = app.globalData.mapsKey;
    qqmapsdk = new QQMapWX({
      key: mapKey
    });
    wx.getLocation({
      success: function(res) {
        _this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
        _this.mapCtx = wx.createMapContext('maps')
        _this.mapCtx.moveToLocation()
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**获取当前位置，并移动到中心 */
  moveToLocation(event) {
    console.log(event)
    this.mapCtx.moveToLocation()
  },
  getSearch(event) {
    wx.showLoading({
      title: '目标查询中...',
    })
console.log(event)
    let searchVal = event.target.dataset.search;
    _this.setData({
      search_typea: "",
      search_typeb: "",
      search_typec: "",
    })

    switch (searchVal.trim()) {
      case "0":
        _this.setData({
          search_typea: "search_type",
        })
        break;
      case "1":
        _this.setData({
          search_typeb: "search_type",
        })
        break;
      case "2":
        _this.setData({
          search_typec: "search_type",
        })
        break;
    }

    qqmapsdk.search({
      keyword: searchVal,
      success: function(res) {
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "../../utils/image/shop_add.png", //图标路径
            width: 20,
            height: 20
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks
        })

        wx.hideLoading();
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  }
})