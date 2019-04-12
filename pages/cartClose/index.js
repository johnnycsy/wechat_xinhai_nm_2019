const app = new getApp()
// pages/cartClose/index.js 
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    termail_id: null,
    cartAll: [],
    cartEndNumber: 0,
    cartKindNumber: 0,
    cartProNumber: 0,
    paySelect: 1,
    payArr: [{
      id: 1,
      payName: "支付宝"
    }, {
      id: 2,
      payName: "微信支付"
    }, {
      id: 3,
      payName: "现金支付"
    }, {
      id: 4,
      payName: "欠款"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '购物车',
    })
    var termail_id = options.termail_id;
    //购物车显示
    var cartAll = wx.getStorageSync("cartAll");
    cartAll = JSON.parse(cartAll);
    this.setData({
      termail_id: termail_id,
      cartAll: cartAll,
    })
    //     console.log(cartAll)
    this.getCartStatistics(cartAll);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(event) {

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
  /**购物车删除商品 */
  cartDeleteProduct(event) {
    var targetKey = event.target.dataset.index;
    var data = this.data.cartAll;
    if (data.length <= 1) {
      wx.showToast({
        title: '商品数量至少保留1个',
        icon: 'none',
      })
      return false;
    }
    data.splice(targetKey, 1)
    this.setData({
      cartAll: data,
    })
    this.getCartStatistics(data);
    //并同步上一页选购数据
    wx.setStorage({
      key: 'cartAll',
      data: JSON.stringify(data),
    })
  },
  /**参数统计 */
  getCartStatistics(event) {
    // console.log(event)
    var cartSumNumber = 0,
      i, cartProNumber = 0;
    for (i = 0; i < event.length; i++) {
      var rs = event[i];
      var proNumber = rs.proIdNumber;
      var proMoney = rs.proMoney;
      cartSumNumber += Number(proNumber) * Number(proMoney);
      cartProNumber += Number(proNumber);
    }
    cartSumNumber = cartSumNumber.toFixed(2);
    // console.log(cartSumNumber + "===" + event.length + "====" + cartProNumber)
    this.setData({
      cartEndNumber: cartSumNumber,
      cartKindNumber: event.length,
      cartProNumber: cartProNumber,
    })
  },
  /**提交订单 */
  getCartCloseSubmitPost(event) {
    // console.log(event)
    // console.log(this.data)
    wx.showLoading({
      title: '正在提交订单',
    })
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (hours >= 0 && hours <= 9) {
      hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    var stock_time = year + seperator1 + month + seperator1 + strDate + ' ' + hours + seperator1 + minutes + seperator1 + seconds;
    var access_token = wx.getStorageSync('access_token')
    var store_id = this.data.termail_id
    var pay_method = 4
    var all_number = this.data.cartProNumber
    var all_money = this.data.cartEndNumber
    var cartAll = this.data.cartAll
    var user_id = wx.getStorageSync('user_info').user_id
    var stock = new Array()
    for (var i = 0; i < cartAll.length; i++) {
      stock.push({
        'p_b_id': cartAll[i].proid,
        'all_price': (cartAll[i].proIdNumber * cartAll[i].proMoney).toFixed(2),
        'price': (cartAll[i].proMoney).toFixed(2),
        'number': cartAll[i].proIdNumber
      })
    }
    var that = this
    console.log(stock)
    app.callData.postRequest(app.globalData.appApi + 'user/addStock.do', {
      data: JSON.stringify({
        'stock_time': stock_time,
        'store_id': store_id,
        'pay_method': pay_method,
        'all_money': all_money,
        'all_number': all_number,
        'stockInfoList': stock,
        'user_id': user_id
      })
    }, {
      'content-type': 'application/x-www-form-urlencoded',
      'access_token': access_token
    }).then(res => {
      // console.log(res)
      wx.hideLoading()
      if (res.data.code === 0) {
        wx.reLaunch({
          url: '../orderPrint/index?orderCode=' + res.data.nmStock.stock_no + '&orderId=' + res.data.nmStock.stock_id + '&pay_type=' + that.data.paySelect
        })
      } else {
        wx.showToast({
          title: '数据加载失败,错误码:' + res.data.code,
          icon: 'none',
          duration: 2000
        })
      }

    })
    // 结束

  },
  getStoreList: function() {
    wx.showLoading({
      title: '正在提交订单',
    })
    var access_token = wx.getStorageSync('access_token')
    var store_id = this.data.termail_id
    var page = this.data.page
    var quantity = 10
    var that = this
    app.callData.postRequest(app.globalData.appApi + 'user/listStock.do', {
      data: JSON.stringify({
        'access_token': access_token,
        'store_id': store_id,
        'page': page,
        'quantity': quantity
      })
    }, {
      'content-type': 'application/x-www-form-urlencoded'
    }).then(res => {
      //   console.log(res)
      wx.hideLoading()
      if (res.data.code === 0) {
        var list = that.data.orderListArr
        var stockList = res.data.stockList
        for (var x = 0; x < stockList.length; x++) {
          list.push(stockList[x])
        }
        that.setData({
          storeList: list
        })
      } else {
        wx.showToast({
          title: '订单提交失败',
          icon: 'none',
          duration: 2000
        })
      }

    })
  },
  /**选择支付方式 */
  paySelectType(event) {
    // console.log(this.data)
    var targetVal = event.target.dataset.index;
    var _this = this.data.payArr;
    var endTarget = _this[targetVal];
    console.log(endTarget)
    this.setData({
      paySelect: endTarget.id
    })
  },
  // 修改商品价格
  getUpdateMoney(e) {
    console.log(e)
    let _this = this,
      key = e.currentTarget.dataset.index,
      value = e.detail.value.split("￥"),
      updateCart = "cartAll[" + key + "].proMoney";
    //proMoney
    if (value.length > 1) {
      _this.setData({
        [updateCart]: Number(value[1])
      })
    } else {
      _this.setData({
        [updateCart]: Number(value[0])
      })
    }
    _this.getCartStatistics(_this.data.cartAll);
  }
})