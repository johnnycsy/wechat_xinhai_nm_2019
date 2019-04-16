var _this
// pages/continuous/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrArr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    _this = this
    _this.getScanCode()
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
  //连续扫码
  getScanCode(event) {
    let qrarr = this.data.qrArr

    wx.scanCode({
      onlyFromCamera: true,
      success: function(res) {
        console.log(res)

        qrarr.push(res.result)

        _this.setData({
          qrArr: qrarr
        })

        _this.getScanCode();

      }
    })
  },
  //可以进行直接查询返回，也可以返回查询
  getQrQuery(event) {
    console.log(event)

    //需要处理查询

    //需要处理返回
    wx.navigateBack({
      delta: 1,
    })

  }

})