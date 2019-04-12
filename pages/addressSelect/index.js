// pages/addressSelect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapPois: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      mapPois: JSON.parse(options.pois),
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
   * 选择内容
   */
  getSelectMapAddress(event) {
    // console.log(event)
    var key = event.target.dataset.index
    var obj = this.data.mapPois
    var target = obj[key]
    // console.log(target)
    wx.setStorage({
      key: 'addressListSelect',
      data: JSON.stringify(target),
    })
    wx.navigateBack({
      delta: 1
    })
  }
})