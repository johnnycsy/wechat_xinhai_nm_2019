const app = getApp()
// pages/addOrder/index.js
Page({

  /**
   * 页面的初始数据
   * shopNameArr : 所有店铺信息
   * targetShop ：选中目标ID
   * termail_id ：商家ID
   */
  data: {
    shopNameArr: [],
    targetShop: 0,
    termail_id: 0,
    latitude: null,
    longitude: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '新增订单',
    })
    //查询店铺名称，id
    // this.setData({
    //   shopNameArr: [{
    //     shopName: "新海便利店",
    //     id: 1
    //   }, {
    //     shopName: "新海便利店1",
    //     id: 2
    //   }, {
    //     shopName: "新海便利店2",
    //     id: 3
    //   }, {
    //     shopName: "新海便利店3",
    //     id: 4
    //   }]
    // })
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '新增订单',
    })
    //获取坐标
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        //   console.log(res)
        //   resMap = res
        var latitude = res.latitude
        var longitude = res.longitude
        //   speed = res.speed
        //   accuracy = res.accuracy
        that.setData({
          latitude: latitude,
          longitude: longitude,
        })
        that.getDataList(longitude, latitude)
      }
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
  /**选中目标值 */
  getPlaceOrders(event) {
    var _this = event.target.dataset;
    var keyNumber = _this.index;
    var target = this.data.shopNameArr;
    this.setData({
      targetShop: target[keyNumber].id,
      termail_id: target[keyNumber].id,
    })
  },
  /**提交订单 */
  getCartGo(event) {
    if (this.data.termail_id == "0") {
      wx.showToast({
        title: '请选择进货店铺',
        icon: 'none'
      })
      return false;
    }
    wx.navigateTo({
      url: '../shoppingMall/index?termail_id=' + this.data.termail_id,
    })
  },
  /**监听input */
  bindKeyInput(event) {
    var _this = this
    var data = event.detail.value
    console.log("模糊查询参数值：" + data)
    if (data == "") {
      return "";
    }
    var userInfo = wx.getStorageSync("user_info")
    var postData = JSON.stringify({
      user_id: userInfo.user_id,
      page: 1,
      quantity: 20,
      lon: _this.data.longitude,
      lat: _this.data.latitude,
      search_con: data,
    })
    console.log(postData)
    wx.request({
      url: app.globalData.appApi + 'user/listStore.do',
      data: {
        data: postData
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res.data)
        var obj = res.data
        if (obj.code == 0) {
          var shopArr = []
          var storeList = obj.storeList
          // console.log(storeList)
          for (var x = 0; x < storeList.length; x++) {
            var arr = {
              'shopName': storeList[x]['store_name'],
              'id': storeList[x]['store_id']
            }
            shopArr.push(arr)
          }
          _this.setData({
            shopNameArr: shopArr
          })
        } else {
          wx.showToast({
            title: '温馨提示：服务器异常，' + obj.msg,
            icon: 'none',
          })
        }
      },
      fail(error) {
        console.log(error)
        wx.showToast({
          title: '温馨提示：连接服务器失败，' + error.errMsg,
          icon: 'none',
        })
      }
    })

  },
  //加载数据
  getDataList: function(lon, lat) {
    wx.showLoading({
      title: '查询周边店铺...',
    })
    var access_token = wx.getStorageSync('access_token')
    var user_id = wx.getStorageSync('user_info').user_id
    var page = 1
    var quantity = 10
    var store_id = ''
    var lon = lon
    var lat = lat
    var search_con = ''
    var sort = 'distance asc'
    var that = this
    app.callData.postRequest(app.globalData.appApi + 'user/listStore.do', {
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
        var shopArr = this.data.shopNameArr
        var storeList = res.data.storeList
        for (var x = 0; x < storeList.length; x++) {
          var arr = {
            'shopName': storeList[x]['store_name'],
            'id': storeList[x]['store_id']
          }
          shopArr.push(arr)
        }
        that.setData({
          shopNameArr: shopArr
        })
      } else {
        wx.showToast({
          title: '暂无',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 扫一扫下单
  getScanOrder() {
    if (this.data.termail_id == "0") {
      wx.showToast({
        title: '请选择进货店铺',
        icon: 'none'
      })
      return false;
    }
    wx.navigateTo({
      url: '../scanQr/index?termail_id=' + this.data.termail_id,
    })
  }
  
})