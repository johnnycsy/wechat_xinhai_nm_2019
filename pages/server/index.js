// pages/successTermainl/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeSort: "select-up",
    timeNumber: 0,
    addressNumber: 1,
    salesNumber: 1,
    saleNumber: 1,
    debtNumber: 1,
    page: 2,
    storeList: [],
    lat: "",
    lon: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //导航设置
    wx.setNavigationBarTitle({
      title: '近期维护',
    })
    // //获取坐标
    // wx.getSetting({
    //     success(res) {
    //         var that = this
    //         wx.getLocation({
    //             type: 'wgs84',
    //             success(res) {
    //                 latitude = res.latitude
    //                 longitude = res.longitude
    // that.setData({
    //     lat: latitude,
    //     lon: longitude
    // })
    //             }
    //         })
    //     }
    // })
    //获取坐标
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
    this.setData({
      page: 1
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
  /**
   * 排序选择事件
   */
  selectClick(event) {
    // console.log(event)
    let obj = event.target.dataset.state,
      typeMain = event.target.dataset.type;
    // console.log(obj)
    if (typeof obj == "undefined") {
      return false;
    }
    this.setData({
      timeSort: "",
      addressSort: "",
      salesSort: "",
      saleSort: "",
      debtSort: "",
      timeNumber: 1,
      addressNumber: 1,
      salesNumber: 1,
      saleNumber: 1,
      debtNumber: 1,
    })
    switch (typeMain) {
      case "timeSort":
        if (obj == "0") {
          this.setData({
            timeSort: "select-down",
            timeNumber: 1,
            sort: 'store_no asc'
          })
        } else {
          this.setData({
            timeSort: "select-up",
            timeNumber: 0,
            sort: 'store_no desc'
          })
        }
        break;
      case "addressSort":
        if (obj == "0") {
          this.setData({
            addressSort: "select-down",
            addressNumber: 1,
            sort: 'distance asc'
          })
        } else {
          this.setData({
            addressSort: "select-up",
            addressNumber: 0,
            sort: 'distance desc'
          })
        }
        break;
      case "salesSort":
        if (obj == "0") {
          this.setData({
            salesSort: "select-down",
            salesNumber: 1,
            sort: 'number asc'
          })
        } else {
          this.setData({
            salesSort: "select-up",
            salesNumber: 0,
            sort: 'number desc'
          })
        }
        break;
      case "saleSort":
        if (obj == "0") {
          this.setData({
            saleSort: "select-down",
            saleNumber: 1,
            sort: 'money asc'
          })
        } else {
          this.setData({
            saleSort: "select-up",
            saleNumber: 0,
            sort: 'number desc'
          })
        }
        break;
      case "debtSort":
        if (obj == "0") {
          this.setData({
            debtSort: "select-down",
            debtNumber: 1,
            sort: 'debt asc'
          })
        } else {
          this.setData({
            debtSort: "select-up",
            debtNumber: 0,
            sort: 'debt desc'
          })
        }
        break;
      default:
        wx.showToast({
          title: '系统获取参数异常',
          icon: 'cancel',
          duration: 2000
        })
        break;
    }
    this.onLoad()
  },
  /**
   * 上拉加载事件
   */
  onReachBottom(event) {
    wx.showLoading({
      title: '数据加载中',
    })
    var page = this.data.page + 1
    this.setData({
      page: page
    })
    this.getStoreList()
    setTimeout(function() {
      wx.hideLoading()
    }, 3000)
  },
  /**下载刷新事件 */
  onPullDownRefresh() {
    wx.showLoading({
      title: '数据刷新中',
    })
    wx.startPullDownRefresh({
      success() {
        // console.log(2222)
        wx.hideLoading()
        wx.stopPullDownRefresh() //暂停刷新
      },
      fail() {
        // console.log(3333)
      }
    })
  },
  getStoreList: function() {
    wx.showLoading({
      title: '数据加载中...',
    })
    var access_token = wx.getStorageSync('access_token')
    var user_id = wx.getStorageSync('user_info').user_id
    var page = this.data.page
    var quantity = 10
    var store_id = ''
    var lon = this.data.lon
    var lat = this.data.lat
    var search_con = ''
    var sort = this.data.sort
    var that = this
    app.callData.postRequest(app.globalData.appApi + 'user/listStoreMaintain.do', {
      data: JSON.stringify({
        'user_id': user_id,
        'page': page,
        'quantity': quantity,
        'store_id': store_id,
        'lon': lon,
        'lat': lat,
        'search_con': search_con,
        'sort': sort
      })
    }, {
      'content-type': 'application/x-www-form-urlencoded',
      'access_token': access_token
    }).then(res => {
      //   console.log(res)
      wx.hideLoading()
      if (res.data.code === 0) {
        var list = that.data.storeList
        var storeList = res.data.storeMaintainList
        for (var x = 0; x < storeList.length; x++) {
          storeList[x]['distance'] = (storeList[x]['distance'] / 1000).toFixed(2)
          storeList[x]['time'] = storeList[x]['time'].substring(0, 10) + ' ' + storeList[x]['time'].substring(11, 19)
          list.push(storeList[x])
        }
        that.setData({
          storeList: list
        })
      } else {
        wx.showToast({
          title: '数据加载失败',
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
  },
  getDataList: function() {
    wx.showLoading({
      title: '数据加载中...',
    })
    var access_token = wx.getStorageSync('access_token')
    var user_id = wx.getStorageSync('user_info').user_id
    var page = 1
    var quantity = 10
    var store_id = ''
    var lon = this.data.lon
    var lat = this.data.lat
    var search_con = ''
    var sort = this.data.sort
    var that = this
    app.callData.postRequest(app.globalData.appApi + 'user/listStoreMaintain.do', {
      data: JSON.stringify({
        'user_id': user_id,
        'page': page,
        'quantity': quantity,
        'store_id': store_id,
        'lon': lon,
        'lat': lat,
        'search_con': search_con,
        'sort': sort
      })
    }, {
      'content-type': 'application/x-www-form-urlencoded',
      'access_token': access_token
    }).then(res => {
      wx.hideLoading()
      if (res.data.code === 0) {
        var storeList = res.data.storeMaintainList
        for (var x = 0; x < storeList.length; x++) {
          storeList[x]['distance'] = (Math.round(storeList[x]['distance'] / 1000))
        }
        that.setData({
          storeList: storeList
        })
      } else {
        wx.showToast({
          title: '数据加载失败',
          icon: 'none',
          duration: 2000
        })
      }

    })
  }
})