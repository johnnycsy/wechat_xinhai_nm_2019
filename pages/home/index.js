const app = getApp()
Page({
  data: {
    //首页统计数据 
    homeDataNumberOrder: 0,
    homeDataNumberTermainal: 0,
    homeDataNumberMoney: 0,
    homeDataNumberFire: "无",
    //产品数据
    storeList: [],
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    show: true
  },
  onLoad: function() {
    this.setData({
      username: wx.getStorageSync('user_info').represent_name
    })
    var that = this
    wx.getSetting({
      success(res) {
        wx.getLocation({
          type: 'wgs84',
          success(res) {
            // console.log(res)
            // resMap = res
            var latitude = res.latitude
            var longitude = res.longitude
            // speed = res.speed
            // accuracy = res.accuracy
            that.setData({
              lat: latitude,
              lon: longitude
            })
            that.getDataList()
          }
        })
      }
    })
    this.getStatistics()
  },
  buttonClick(event) {
    var target = event.currentTarget.dataset.url;
    switch (target) {
      case "addTerminal":
        wx.navigateTo({
          url: '../addTerminal/index',
        })
        break;
      case "addOrder":
        wx.navigateTo({
          url: '../addOrder/index',
        })
        break;
      case "getServer":
        wx.navigateTo({
          url: '../server/index',
        })
        break;
      case "getSuccess":
        wx.navigateTo({
          url: '../successTermainl/index',
        })
        break;
      case "getProduct":
        wx.navigateTo({
          url: '../showProduct/index',
        })
        break;
      default:
        wx.showToast({
          title: '未知事件',
          icon: "cancel",
          duration: 3000,
        })
        break;
    }
  },
  getDataList: function() {
    var access_token = wx.getStorageSync('access_token')
    var user_id = wx.getStorageSync('user_info').user_id
    var page = 1
    var quantity = 10
    var lon = this.data.lon
    var lat = this.data.lat
    var that = this
    app.callData.postRequest(app.globalData.appApi + 'user/listStoreMaintain.do', {
      data: JSON.stringify({
        'user_id': user_id,
        'page': page,
        'quantity': quantity,
        'lon': lon,
        'lat': lat
      })
    }, {
      'content-type': 'application/x-www-form-urlencoded',
      'access_token': access_token
    }).then(res => {
      // console.log(res)
      if (res.data.code === 0) {
        var storeList = res.data.storeMaintainList
        // console.log(storeList)
        if (typeof storeList == "undefined") {
          return false;
        }
        for (var x = 0; x < storeList.length; x++) {
          storeList[x]['distance'] = (Math.round(storeList[x]['distance'] / 1000))
          storeList[x]['time'] = storeList[x]['time'].substring(0, 10) + ' ' + storeList[x]['time'].substring(11, 19)
        }
        // console.log(storeList.length)
        if (storeList.length > 0) {
          that.setData({
            storeList: storeList
          })
        } else {
          that.setData({
            show: false
          })
        }
        setInterval(function() {
          that.getDataList()
        }, 30000);
      } else {
        that.setData({
          show: false
        })
        wx.showToast({
          title: '暂无维护店铺:' + res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getStatistics: function() {
    var access_token = wx.getStorageSync('access_token')
    var user_id = wx.getStorageSync('user_info').user_id
    var that = this
    app.callData.postRequest(app.globalData.appApi + 'user/todayCount.do', {
      data: JSON.stringify({
        'user_id': user_id
      })
    }, {
      'content-type': 'application/x-www-form-urlencoded',
      'access_token': access_token
    }).then(res => {
      if (res.data.code === 0) {
        var todayCount = res.data.todayCount,
          homeDataNumberMoneyv = 0;
        if (typeof todayCount.stock_money == "undefined") {
          homeDataNumberMoneyv = 0;
        } else {
          homeDataNumberMoneyv = todayCount.stock_money
        }
        that.setData({
          homeDataNumberOrder: todayCount.stock_num, //今日订单数
          homeDataNumberTermainal: todayCount.store_num, //今日终端数
          homeDataNumberMoney: homeDataNumberMoneyv, //今日订单金额
          homeDataNumberFire: todayCount.item_no //今日最火销售数量
        })
      } else if (res.data.code != 4005 && res.data.code != 0) {
        wx.showToast({
          title: '统计数据加载失败：' + res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }

    })
  },
  /**点击查看详情 */
  termainlDetails(event) {
    // console.log(event)
    var termail_id = JSON.stringify(event.currentTarget.dataset.termail_id);
    //  console.log(termail_id)
    // 打开店铺详情
    wx.navigateTo({
      url: '../termainlDetails/index?termail_id=' + termail_id,
    })
  }
})