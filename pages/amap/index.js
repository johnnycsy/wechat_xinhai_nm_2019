const QQMapWX = require("../../utils/qqmap-wx-jssdk.min.js");
var qqmapsdk, _this;
const app = new getApp();
// pages/amap/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: "",
    latitude: "",
    lon: "",
    lat: "",
    polyline: "",
    storeName: "",
    mode: "driving",
    alert: "",
    drivingClass: "selectDefaut",
    walkingClass: "",
    bicyclingClass: "",
    transitClass: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let longitude = options.log,
      latitude = options.lat,
      sname = options.sname,
      mapKey = app.globalData.mapsKey;
    _this = this;
    // map
    qqmapsdk = new QQMapWX({
      key: mapKey
    });
    //保存
    _this.setData({
      lon: longitude,
      lat: latitude,
      storeName: sname
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
    // 获取当前位置
    this.mapCtx = wx.createMapContext('myMap')
    _this.moveToLocation()
    wx.getLocation({
      success: function(res) {
        console.log(res);
        _this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        //开启调用
        wx.showLoading({
          title: '路线规划中...',
        })
        _this.getMapDirection();
      }
    })
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
  // 路线导航
  getMapDirectionList(res) {
    var ret = res,
      coors = ret.result.routes[0].polyline,
      pl = [],
      kr = 1000000;
    if (typeof coors == "undefined") {
      wx.hideLoading();
      wx.showToast({
        title: '温馨提示：暂无查询路线',
        icon: 'none'
      })
      return false;
    }
    console.log(coors)
    for (var i = 2; i < coors.length; i++) {
      coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
    }
    //将解压后的坐标放入点串数组pl中
    for (var i = 0; i < coors.length; i += 2) {
      pl.push({
        latitude: coors[i],
        longitude: coors[i + 1]
      })
    }
    // console.log(pl)
    //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
    _this.setData({
      latitude: pl[0].latitude,
      longitude: pl[0].longitude,
      polyline: [{
        points: pl,
        color: '#00B26A',
        width: 6
      }]
    })
    wx.hideLoading();
  },
  /**
   * 路线导航
   */
  getMapDirection(event) {
    //调用距离计算接口
    qqmapsdk.direction({
      mode: _this.data.mode,
      to: _this.data.lat + "," + _this.data.lon,
      success: function(res) {
        console.log(res);
        // _this.getMapDirectionList(res);
      },
      fail: function(error) {
        console.error("导航错误：" + error);
      },
      complete: function(res) {
        console.log(res);
        if (res.status == 0) {
          _this.getMapDirectionList(res);
        } else {
          wx.showToast({
            title: '导航调用失败',
            icon: 'none'
          })
          _this.setData({
            alert: res.message
          })
        }
      }
    });
  },
  //导航切换模式
  getUpdateMode(event) {
    console.log(event)
    let mode = event.target.dataset.mode;
    _this.setData({
      mode: mode
    })
    switch (mode) {
      case "driving":
        _this.setData({
          drivingClass: "selectDefaut",
          walkingClass: "",
          bicyclingClass: "",
          transitClass: "",
        })
        break;
      case "walking":
        _this.setData({
          drivingClass: "",
          walkingClass: "selectDefaut",
          bicyclingClass: "",
          transitClass: "",
        })
        break;
      case "bicycling":
        _this.setData({
          drivingClass: "",
          walkingClass: "",
          bicyclingClass: "selectDefaut",
          transitClass: "",
        })
        break;
      default:
        _this.setData({
          drivingClass: "",
          walkingClass: "",
          bicyclingClass: "",
          transitClass: "selectDefaut",
        })
        break;
    }
    wx.showLoading({
      title: '路线规划中...',
    })
    _this.getMapDirection();
  },
  //定位
  moveToLocation() {
    this.mapCtx.moveToLocation()
  },
})