// pages/merchantScanPut/index.js
const app = new getApp()
var _this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sumCartonNumbers: 0,
    sumBoxNumber: 0,
    productAll: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '扫码收货'
    })

    _this = this
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
   * 扫码收货
   */
  getScanPut(event) {
    // console.log(event)
    wx.scanCode({
      onlyFromCamera: true,
      success: function(res) {
        console.log(res)
        let data = res.result;
        _this.getQueryProduct(data);
      },
      fail: function(res) {
        wx.showToast({
          title: '扫码失败',
          icon: 'none',
        })
      },
    })
  },
  /**
   * 在线获取数据
   */
  getQueryProduct(event) {
    let url = app.globalData.appApi + "qr/scanQrBox.do",
      userInfo = wx.getStorageSync("user_info"),
      postData = {
        data: JSON.stringify({
          qr_box: event,
          area_id: userInfo.area_id, //经销商区域ID
          dealer_id: userInfo.user_id, //经销商用户ID
        })
      }
    wx.request({
      url: url,
      data: postData,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  }
})