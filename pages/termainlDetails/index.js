// pages/termainlDetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerSelectClassLeft: "header-select",
    headerSelectClassRight: "",
    storeImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
    termail_id: null,
    userCode: "",
    userAddress: "",
    userName: "",
    userTel: '888888',
    date: new Date,
    detailsTarget: "targetShow",
    orderTarget: "",
    orderListArr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '终端详情',
    })
    //获取参数
    var termail_id = options.termail_id;
    console.log(termail_id)
    this.setData({
      termail_id: termail_id
    })
    //订单列表demo
    this.setData({
      orderListArr: [{
        orderOneNumber: 0,  //订单数
        orderOneMoney: 0, //订单总金额
        orderOneTime: 0, //订单时间
        orderListId: 0, //订单ID
        orderTimeExceed: true,  //订单时间差超过24小时：flash，24小时以内：true ；可调用 this.getTimeDifference(time)
      }, {
        orderOneNumber: 0,
        orderOneMoney: 0,
        orderOneTime: 0,
        orderListId: 0,
        orderTimeExceed: true,
      }, {
        orderOneNumber: 0,
        orderOneMoney: 0,
        orderOneTime: 0,
        orderListId: 0,
        orderTimeExceed: true,
      }, {
        orderOneNumber: 0,
        orderOneMoney: 0,
        orderOneTime: 0,
        orderListId: 0,
        orderTimeExceed: false,
      }, {
        orderOneNumber: 0,
        orderOneMoney: 0,
        orderOneTime: 0,
        orderListId: 0,
        orderTimeExceed: false,
      }, {
        orderOneNumber: 0,
        orderOneMoney: 0,
        orderOneTime: 0,
        orderListId: 0,
        orderTimeExceed: true,
      }, {
        orderOneNumber: 0,
        orderOneMoney: 0,
        orderOneTime: 0,
        orderListId: 0,
        orderTimeExceed: true,
      }, {
        orderOneNumber: 0,
        orderOneMoney: 0,
        orderOneTime: 0,
        orderListId: 0,
        orderTimeExceed: true,
      }, {
        orderOneNumber: 0,
        orderOneMoney: 0,
        orderOneTime: 0,
        orderListId: 0,
        orderTimeExceed: true,
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
  /**header 选中事件 */
  headerSelectClick(event) {
    this.setData({
      headerSelectClassLeft: "",
      headerSelectClassRight: "",
    })
    var target = event.target.dataset.select;
    if (target == "0") {
      this.setData({
        headerSelectClassLeft: "header-select",
        headerSelectClassRight: "",
        detailsTarget: "targetShow",
        orderTarget: "",
      })
      console.log("店铺信息详情")
    } else {
      this.setData({
        headerSelectClassLeft: "",
        headerSelectClassRight: "header-select",
        detailsTarget: "",
        orderTarget: "targetShow",
      })
      console.log("订单信息详情")
    }
  },
  /**修改事件 */
  updateStoreClick(event) {
    console.log(this.termail_id)
  },
  /**拜访设置 */
  userButSee(event) {
    console.log('拜访设置')
    console.log(event.detail.value)
  },
  /**新增订单 */
  userButAddOrder(event) {
    console.log('新增订单')
    wx.navigateTo({
      url: '../shoppingMall/index?termail_id=' + this.data.termail_id,
    })
  },
  /**拨打电话 */
  userButTel(event) {
    console.log('拨打电话')
    var targetTel = this.userTel;
    wx.makePhoneCall({
      phoneNumber: targetTel
    })
  },
  /**导航地图 */
  userButMap(event) {
    console.log('导航地图')
    wx.showToast({
      title: '暂不支持调用APP',
      icon: 'none'
    })
  },
  /**上拉加载 */
  onReachBottom() {
    console.log("上拉加载数据")
    wx.showLoading({
      title: '数据加载中。。。',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 3000)
  },
  /**订单编辑 */
  orderListEide(event) {
    var order_time = event.currentTarget.dataset.order_time;
    var order_id = event.currentTarget.dataset.order_id;
    order_time = this.getTimeDifference(order_time);
    wx.navigateTo({
      url: '../orderDetails/index?order_id=' + order_id + '&order_time=' + order_time,
    })
  },
  /**订单详情 */
  orderListLook(event) {
    var order_time = event.currentTarget.dataset.order_time;
    var order_id = event.currentTarget.dataset.order_id;
    order_time = this.getTimeDifference(order_time);
    wx.navigateTo({
      url: '../orderDetails/index?order_id=' + order_id + '&order_time=' + order_time,
    })
  },
  /**时间差运行 */
  getTimeDifference(start) {
    var count = 1;
    var date1 = new Date(start);
    var date2 = new Date();
    var s1 = date1.getTime();
    var s2 = date2.getTime();
    var total = (s2 - s1) / 1000 - count;
    var day = parseInt(total / (24 * 60 * 60));
    var afterDay = total - day * 24 * 60 * 60;
    var hour = parseInt(afterDay / (60 * 60));
    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;
    var min = parseInt(afterHour / 60);
    var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;
    return hour;
  }
})