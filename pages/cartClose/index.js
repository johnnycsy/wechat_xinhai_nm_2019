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
    payArr: [],
    paySelect: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '购物车',
    })
    var termail_id = options.termail_id;
    //购物车显示 & 支付方式
    var cartAll = wx.getStorageSync("cartAll");
    cartAll = JSON.parse(cartAll);
    console.log(cartAll)
    this.setData({
      termail_id: termail_id,
      cartAll: cartAll,
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
    console.log(event)
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
    console.log(cartSumNumber + "===" + event.length + "====" + cartProNumber)
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
  }
})