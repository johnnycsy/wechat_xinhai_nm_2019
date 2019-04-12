const app = getApp()
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
dataTimes 时间数组
dataTimesIndex 时间选择器数组
   */
  data: {
    successTerminal: 0,
    failureTerminal: 0,
    orderSumMoney: 0,
    userImage: "",
    userName: "未登录",
    userTel: "",
    array: [],
    objectArray: [],
    index: 5,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
    //时间计算
    var time = new Date()
    var time = time.getFullYear()
    var objTimes = []
    var objTimesIndex = []
    var objObey = []
    var objAgainst = []
    for (var i = 1; i < 6; i++) {
      objObey.push(time - i);
      objAgainst.push(time + i);
    }
    var obj = (objObey.sort()).toString() + "," + time + "," + (objAgainst.sort()).toString()
    var obj = obj.split(',')
    objTimes = obj;
    for (var i = 0; i < obj.length; i++) {
      objTimesIndex.push({
        id: i,
        name: obj[i],
      })
    }
    //获取个信中心信息
    this.setData({
      userName: wx.getStorageSync('user_info').represent_name,
      userImage: wx.getStorageSync('user_info').logo,
      userTel: wx.getStorageSync('user_info').phone,
      array: objTimes,
      objectArray: objTimesIndex,
    })
      this.getStatistics(objTimes[this.data.index]);
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
  },
  /**选择器 */
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
      this.getStatistics(this.data.array[e.detail.value])
    },
    getStatistics: function (timer) {
        var access_token = wx.getStorageSync('access_token')
        var user_id = wx.getStorageSync('user_info').user_id
        var that = this
        app.callData.postRequest(app.globalData.appApi + 'user/personCenterCount.do', {
            data: JSON.stringify({
                'user_id': user_id,
                'user_year': timer
            })
        }
            , { 'content-type': 'application/x-www-form-urlencoded', 'access_token': access_token }).then(res => {
                // console.log(res);
                if (res.data.code === 0) {
                    var count = res.data.personCenterCount
                    that.setData({
                        successTerminal: count.success_term_num,
                        failureTerminal: count.fail_term_num,
                        sale_order_num: count.sale_order_num,
                        sale_num: count.sale_num,
                        orderSumMoney: count.sale_money,
                        debt_num: count.debt_num,
                        debt_money: count.debt_money
                    })
                    
                } else if (res.data.code === 4005) {
                    that.setData({
                        successTerminal: 0,
                        failureTerminal: 0,
                        sale_order_num: 0,
                        sale_num: 0,
                        orderSumMoney: 0,
                        debt_num: 0,
                        debt_money: 0
                    })
                } else if (res.data.code != 4005 && res.data.code != 0) {
                    wx.showToast({
                        title: '数据加载失败：'+res.data.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }

            })
    }
})