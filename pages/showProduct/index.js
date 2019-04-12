// pages/showProduct/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   * headerTarget : header 点击目标参数
   * headerType : 方向参数
   * productAll : 所有商品信息
   *    proId    产品ID
        proImage 产品图片
        proName  产品名称
        proMoney 产品金额
        proInventory  产品库存
   */
  data: {
    headerTarget: 1,
    headerType: 0,
    productAll: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '商品浏览',
    })
    //产品信息实始化
    this.getProList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
  getProList: function() {
    var access_token = wx.getStorageSync('access_token')
    var area_id = wx.getStorageSync('user_info').area_id
    var user_id = wx.getStorageSync('user_info').user_id
    var that = this
    wx.showLoading({
      title: '数据加载...',
    })
    app.callData.postRequest(app.globalData.appApi + 'user/listProduct.do', {
      data: JSON.stringify({
        'area_id': area_id,
        'user_id': user_id
      })
    }, {
      'content-type': 'application/x-www-form-urlencoded',
      'access_token': access_token
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      if (res.data.code === 0) {
        that.setData({
          productAll: res.data.bagList
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
  showSelectButClick: function(e) {
    //   headerTarget: 1,
    //       headerType: 0,
    var sort = e.target.dataset.target
    var showType = this.data.headerType
    var showSort = this.data.headerTarget
    //   console.log(showSort)
    if (sort === showSort) {
      if (showType === 1) {
        this.setData({
          headerType: 0
        })
        this.sortMode(sort, 0)
      } else {
        this.setData({
          headerType: 1
        })
        this.sortMode(sort, 1)
      }
      //   console.log(this.data.showType)
    } else {
      this.setData({
        headerTarget: sort,
        headerType: 0
      })
      this.sortMode(sort, 0)

    }
  },
  sortMode: function(showSort, showType) {
    var proList = this.data.productAll
    var len = this.data.productAll.length
    if (showSort == 1) {
      var key = "origin_price"
    } else if (showSort == 2) {
      var key = "amount"
    } else {
      var key = "item_no"
    }
    if (showType == 0) {
      for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
          if (proList[j][key] >= proList[j + 1][key]) {
            var x = proList[j + 1]
            proList[j + 1] = proList[j]
            proList[j] = x
          }
        }
      }
    } else {
      for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
          if (proList[j][key] <= proList[j + 1][key]) {
            var x = proList[j + 1]
            proList[j + 1] = proList[j]
            proList[j] = x
          }
        }
      }
    }
    this.setData({
      productAll: proList
    })
  },
  // 查看浏览图片
  getShowImage(e) {
    let image = e.target.dataset.image;
    wx.previewImage({
      urls: [image],
    })
  }
})