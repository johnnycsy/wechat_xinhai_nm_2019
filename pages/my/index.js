// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   * successTerminal : 成功终端
   * failureTerminal : 失败终端
   * orderSumMoney : 订单总金额
   * userImage：用户头像
userName：用户姓名
userTel：用户电话
   */
  data: {
    successTerminal: 0,
    failureTerminal: 0,
    orderSumMoney: 0,
    userImage: "",
    userName: "未登录",
    userTel: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
    //获取个信中心信息
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
  /**个人数据 */
  getMyClickData(event) {
    console.log(event)
  },
  /**关于我们 */
  getMyClickAbout(event) {
    console.log(event)
  }
})