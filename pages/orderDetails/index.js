// pages/cartClose/index.js
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
      title: '购物车',
    })
    var order_id = options.order_id;
    var order_time = options.order_time;
    console.log(order_time)
    //根据订单ID获取订单

    //购物车显示 & 支付方式
    this.setData({
      order_id: order_id,
      payTimeNumber: order_time,
      cartAll: [{
        fixationInventory: 123456,
        proClassId: 1,
        proIdNumber: 1,
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proInventory: 123455,
        proMoney: "8888.00",
        proName: "商品名称",
        proid: 1,
      }, {
        fixationInventory: 123456,
        proClassId: 1,
        proIdNumber: 1,
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proInventory: 123455,
        proMoney: "8888.00",
        proName: "商品名称",
        proid: 1,
      }, {
        fixationInventory: 123456,
        proClassId: 1,
        proIdNumber: 1,
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proInventory: 123455,
        proMoney: "8888.00",
        proName: "商品名称",
        proid: 1,
      }],
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
    // console.log(cartAll)
    this.getCartStatistics(cartAll);
    if (this.data.payTimeNumber > 24) {
      this.setData({
        payName: "支付宝",
        proDeletType: "display:none",
      })
    } else {

    }
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
  getCartCloseSubmitPost(event) {
    console.log(event)
    //结束
    wx.navigateTo({
      url: '../orderPrint/index?orderCode=112233445566',
    })
  },
  /**选择支付方式 */
  paySelectType(event) {
    console.log(event)
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
    console.log(event)
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
  }

})