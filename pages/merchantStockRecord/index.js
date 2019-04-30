// pages/merchantStockRecord/index.js
const app = new getApp()
var _this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderAll: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '进货记录'
    })

    _this = this

    /**DEOM */
    _this.setData({
      orderAll: [{
        id: 1,
        type: 0,
        orderNo: 222,
        orderTime: 12111,
        orderIcon: '3.png',
      }, {
        id: 2,
        type: 1,
        orderNo: 222,
        orderTime: 12111,
        orderIcon: '7.png',
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

  /**
   * 点击查询详情
   */
  getOrderDetails(event) {
    let key = event.currentTarget.dataset.key,
      target = _this.data.orderAll[key]
    console.log(target)

    wx.navigateTo({
      url: '../merchantStockRecordDetails/index?id=' + target.id,
    })
  }

})