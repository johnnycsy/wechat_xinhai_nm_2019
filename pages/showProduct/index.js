// pages/showProduct/index.js
Page({

  /**
   * 页面的初始数据
   * headerTarget : header 点击目标参数
   * headerType : 方向参数
   * productAll : 所有商品信息
   *    proId    产品ID
        proImage 产品图片
        proName  产品名称
        proMoney 产品金额
        proInventory  产品库存
   */
  data: {
    headerTarget: 1,
    headerType: 0,
    productAll: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '商品浏览',
    })
    //产品信息实始化
    var demo = [];
    for (var i = 0; i < 12; i++) {
      demo.push({
        proId: 1,
        proImage: 'http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0',
        proName: 1,
        proMoney: 1,
        proInventory: 1,
      })
    }
    this.setData({
      productAll: demo
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
  /**点击HEADER目标 */
  getHaderClick(event) {
    console.log(event)
    var _this = event.target.dataset;
    var target = _this.target,
      type = _this.type,
      endType, endTarget;
    var nowTarget = this.data.headerTarget;
    if (nowTarget == target && type == '0') {
      endType = 1;
      endTarget = target;
    } else {
      endType = 0;
      endTarget = target;
    }
    this.setData({
      headerTarget: endTarget,
      headerType: endType
    })
  }
})