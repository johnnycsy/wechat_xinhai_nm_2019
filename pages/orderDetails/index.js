// pages/cartClose/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据 
   * payTimeNumber 交易时间差，小时为单位
   */
  data: {
    order_id: 0,
    cartAll: [],
    cartEndNumber: 0,
    cartKindNumber: 0,
    cartProNumber: 0,
    payArr: [],
    paySelect: 1,
    payTimeNumber: 0,
    payName: "",
    proDeletType: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '订单详情',
    })
    var order_id = options.order_id;
    var order_time = options.order_time;
      var stock_no = options.stock_no
    //根据订单ID获取订单
      if (options.pay_type){
          var pay_type = options.pay_type;
          var type_name = ''
              switch (Number(pay_type)){
                case 1:
                    type_name = "支付宝"
                    break;
                case 2:
                    type_name = "微信支付"
                    break;
                case 3:
                    type_name = "现金支付"
                    break;
                case 4:
                    type_name = "欠款"
                    break;
            }
          this.setData({
              order_id: order_id,
              payTimeNumber: order_time,
              cartAll: [],
              payName: type_name
          })
      }else{
          //购物车显示 & 支付方式
          this.setData({
              order_id: order_id,
              payTimeNumber: order_time,
              stock_no: stock_no,
              cartAll: [],
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
          })
      }
    // this.getCartStatistics(cartAll);
    // if (this.data.payTimeNumber > 1) {
    // //   this.setData({
    // //     payName: "支付宝",
    // //     proDeletType: "display:none",
    // //   })
    // } else {

    // }
      this.getDataList(order_id)
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
  },
  /**参数统计 */
  getCartStatistics(event) {
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
    this.setData({
      cartEndNumber: cartSumNumber,
      cartKindNumber: event.length,
      cartProNumber: cartProNumber,
    })
  },
  /**提交订单 */
  getCartCloseSubmitPost() {
      var access_token = wx.getStorageSync('access_token')
      var user_id = wx.getStorageSync('user_info').user_id
      var stock_id = this.data.order_id
      var all_money = this.data.cartEndNumber
      var all_number = 0
      var stockInfoList = []
      var cartAll = this.data.cartAll
      for (var i = 0; i < cartAll.length; i++) {
          var arr = {
              'p_b_id': cartAll[i].p_b_id,
              'all_price': (cartAll[i].proMoney * cartAll[i].proIdNumber).toFixed(2),
              'price': cartAll[i].proMoney.toFixed(2),
              'number': cartAll[i].proIdNumber
          }
          all_number = all_number + cartAll[i].proIdNumber
          stockInfoList.push(arr)
      }
      console.log(JSON.stringify({
          'stock_id': stock_id,
          'user_id': user_id,
          'stock_id': stock_id,
          'all_money': all_money,
          'all_number': all_number,
          'stockInfoList': stockInfoList
      }))
      var that = this
      app.callData.postRequest(app.globalData.appApi + 'user/updateStock.do', {
          data: JSON.stringify({
              'stock_id': stock_id,
              'user_id': user_id,
              'stock_id': stock_id,
              'all_money': all_money,
              'all_number': all_number,
              'stockInfoList': stockInfoList
          })
      }, {
              'content-type': 'application/x-www-form-urlencoded',
              'access_token': access_token
          }).then(res => {
              console.log(res.data)
              if (res.data.code === 0) {
                  wx.navigateTo({
                      url: '../orderPrint/index?orderCode=' + that.data.stock_no + '&orderId=' + res.data.nmStock.stock_id + '&pay_type=' + that.data.paySelect
                  })
              } else {
                  wx.showToast({
                      title: '订单修改失败：'+res.data.msg,
                      icon: 'none',
                      duration: 2000
                  })
              }

          })
  },
  /**选择支付方式 */
  paySelectType(event) {
      console.log(this.data)
    var targetVal = event.target.dataset.index;
    var _this = this.data.payArr;
    var endTarget = _this[targetVal];
    console.log(endTarget)
    this.setData({
      paySelect: endTarget.id
    })
  },
  /**打印方式 */
  getCartCloseSubmitPrint(event) {
    console.log(this.data)
    wx.showToast({
      title: '打印功能未开通',
      icon: 'none',
    })
  },
  /**点击减少数据 */
  getUpdateNumberMins(event) {
    var key = event.target.dataset.index;
    var _this = this.data.cartAll;
    var targetNumber = _this[key].proIdNumber;
    var target = 'cartAll[' + key + '].proIdNumber';
    var endNumber = 0;
    if (targetNumber > 1) {
      endNumber = Number(targetNumber) - 1;
    } else {
      endNumber = targetNumber;
    }
    this.setData({
      [target]: endNumber,
    })
    // console.log(_this)
    this.getCartStatistics(_this)
  },
  /**点击修改数据 */
  getUpdateNumberMain(event) {
    // var key = event.target.dataset.index;
    console.log(event)
    var key = event.target.dataset.index;
    var _this = this.data.cartAll;
    var targetNumber = event.detail.value;
    var target = 'cartAll[' + key + '].proIdNumber';
    var proInventory = _this[key].proInventory;
    var endNumber = 0;
    if (targetNumber < proInventory) {
      endNumber = targetNumber;
    } else {
      endNumber = proInventory;
    }
    this.setData({
      [target]: endNumber,
    })
    // console.log(_this)
    this.getCartStatistics(_this)
  },
  /**点击添加数据 */
  getUpdateNumberPlus(event) {
    var key = event.target.dataset.index;
    var _this = this.data.cartAll;
    var targetNumber = _this[key].proIdNumber;
    var target = 'cartAll[' + key + '].proIdNumber';
    var proInventory = _this[key].proInventory;
    var endNumber = 0;
    if (targetNumber < proInventory) {
      endNumber = Number(targetNumber) + 1;
    } else {
      endNumber = targetNumber;
    }
    this.setData({
      [target]: endNumber,
    })
    // console.log(_this)
    this.getCartStatistics(_this)
  },
  getDataList:function(stock_id){
      var access_token = wx.getStorageSync('access_token')
      var user_id = wx.getStorageSync('user_info').user_id
      var quantity = 10
      var that = this
      app.callData.postRequest(app.globalData.appApi + 'user/listStockInfo.do', {
          data: JSON.stringify({
              'stock_id': stock_id,
              'user_id': user_id
          })
      }, {
              'content-type': 'application/x-www-form-urlencoded',
              'access_token': access_token
          }).then(res => {
              console.log(res.data)
              if (res.data.code === 0) {
                  if (res.data.stockInfoList) {
                      var alist = that.data.cartAll
                      var list = res.data.stockInfoList
                      for(var i = 0; i < list.length; i++){
                          var arr = {
                              'p_b_id': list[i]['p_b_id'],
                              'proIdNumber': list[i]['number'],
                              'proImage': list[i]['product_img'],
                              'proMoney': list[i]['price'],
                              'proName': list[i]['bag_name'],
                              'proName': list[i]['amount'] + list[i]['number'],
                              'proInventory': list[i]['amount']
                          }
                          alist.push(arr)
                      }
                      this.getCartStatistics(alist)
                      that.setData({
                          cartAll: alist
                      })
                  }
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