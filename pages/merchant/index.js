// pages/merchant/index.js
const app = new getApp()
var _this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantsName: '',
    grids: [{
      name: '扫码收货',
      url: '../merchantScanPut/index',
      icon: '../../utils/image/scan_20190411.png'
    }, {
      name: '业务员列表',
      url: '../merchantSalesman/index',
      icon: '../../utils/image/20190418_02.png'
    }, {
      name: '进货记录',
      url: '../merchantStockRecord/index',
      icon: '../../utils/image/order_20190409.png'
    }, {
      name: '客服中心',
      url: 'server',
      icon: '../../utils/image/server_20190409.png'
    }, {
      name: '信息统计',
      url: '',
      icon: '../../utils/image/20190418_01.png'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    _this = this

    let userInfo = wx.getStorageSync("user_info"),
      userName = userInfo.represent_name;
    _this.setData({
      merchantsName: userName
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

  }
})