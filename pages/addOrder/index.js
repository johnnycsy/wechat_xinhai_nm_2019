// pages/addOrder/index.js
var resMap, latitude, longitude, speed, accuracy;
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '新增订单',
    })
    //获取坐标
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        resMap = res
        latitude = res.latitude
        longitude = res.longitude
        speed = res.speed
        accuracy = res.accuracy
      }
    })
    //查询店铺名称，id
    this.setData({
      shopNameArr: [{
        shopName: "新海便利店",
        id: 1
      }, {
        shopName: "新海便利店1",
        id: 2
      }, {
        shopName: "新海便利店2",
        id: 3
      }, {
        shopName: "新海便利店3",
        id: 4
      }]
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
    wx.navigateTo({
      url: '../shoppingMall/index?termail_id=' + this.data.termail_id,
    })
  },
  /**监听input */
  bindKeyInput(event) {
    var data = detail.value;
    console.log("模糊查询参数值：" + data)
  }

})