// pages/orderPrint/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCode: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '下单成功',
    })
    this.setData({
      orderCode: options.orderCode,
    })
    //此处可以进行订单查询，并进行排列内容，后续操作打印
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
  /**打印事件 */
  getPrintData(event) {
    console.lo(event)
    wx.showToast({
      title: '打印功能未完善',
      icon: 'none',
    })
  },
  /**返回事件 */
  getReturn(event) {
    wx.reLaunch({
      url: '../home/index',
    })
  }
})