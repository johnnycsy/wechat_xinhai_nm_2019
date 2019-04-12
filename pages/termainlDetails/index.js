const app = getApp();
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
    mobile: "",
    landline: "",
    date: new Date,
    detailsTarget: "targetShow",
    orderTarget: "",
    orderListArr: [],
    countStore: [],
    page: 1,
    orderTimeExceed: true,
    remain_day: 0,
    days: 0,
    maintain: 0,
    storeImageArr: [],
    longitude: "",
    latitude: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '终端详情',
    })
    //获取参数
    var termail = JSON.parse(options.termail_id),
      imgArr = [];
    console.log(termail)
    if (termail.img_shop1 != "" && termail.img_shop1 != "0") {
      imgArr.push(termail.img_head + termail.img_shop1);
    }
    if (termail.img_shop2 != "" && termail.img_shop2 != "0") {
      console.log(termail.img_shop2)
      imgArr.push(termail.img_head + termail.img_shop2);
    }
    if (termail.img_shop3 != "" && termail.img_shop3 != "0") {
      imgArr.push(termail.img_head + termail.img_shop3);
    }
    if (termail.img_shop4 != "" && termail.img_shop4 != "0") {
      imgArr.push(termail.img_head + termail.img_shop4);
    }
    if (termail.img_shop5 != "" && termail.img_shop5 != "0") {
      imgArr.push(termail.img_head + termail.img_shop5);
    }
    this.setData({
      storeImage: termail.img_head + termail.img_shop1,
      termail_id: termail.store_id, //终端ID
      userCode: termail.store_no,
      userAddress: termail.address,
      userName: termail.store_represent,
      mobile: termail.mobile,
      landline: termail.landline == null ? "" : termail.landline,
      storeName: termail.store_name,
      channel_type: termail.channel_type,
      distance: termail.distance,
      remain_day: termail.remain_day,
      days: termail.days,
      storeImageArr: imgArr,
      longitude: termail.lon,
      latitude: termail.lat
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
      //  console.log("店铺信息详情")
    } else {
      this.setData({
        headerSelectClassLeft: "",
        headerSelectClassRight: "header-select",
        detailsTarget: "",
        orderTarget: "targetShow",
      })
      //  console.log("订单信息详情")
      var access_token = wx.getStorageSync('access_token')
      var store_id = this.data.termail_id
      var page = this.data.page
      var user_id = wx.getStorageSync('user_info').user_id
      var quantity = 10
      var that = this
      app.callData.postRequest(app.globalData.appApi + 'user/listStock.do', {
        data: JSON.stringify({
          'store_id': store_id,
          'page': page,
          'quantity': quantity,
          'user_id': user_id
        })
      }, {
        'content-type': 'application/x-www-form-urlencoded',
        'access_token': access_token
      }).then(res => {
        console.log(res.data)
        if (res.data.code === 0) {

          if (res.data.stockList) {
            var stockList = res.data.stockList
            for (var i = 0; i < stockList.length; i++) {
              stockList[i]['stock_times'] = that.getTimeDifference(stockList[i]['stock_time'])
              console.log(that.getTimeDifference(stockList[i]['stock_time']))
            }
            that.setData({
              orderListArr: stockList,
              countStore: res.data.countStore
            })
          }
        } else {
          wx.showToast({
            title: '数据加载失败',
            icon: 'none',
            duration: 2000
          })
        }

      })
    }
  },
  /**修改事件 */
  updateStoreClick(event) {
    // console.log(this.termail_id)
  },
  /**拜访设置 */
  userButSee(event) {
    var times = event.detail.value
    var _this = this
    var userInfo = wx.getStorageSync('user_info')
    wx.request({
      url: app.globalData.appApi + 'user/updateStoreMaintain.do',
      data: {
        data: JSON.stringify({
          user_id: userInfo.user_id,
          store_id: _this.data.termail_id,
          maintain_time: times,
        })
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access_token': userInfo.access_token,
      },
      success(res) {
        var obj = res.data
        if (obj.code == "0") {
          wx.showToast({
            title: '设置成功',
          })

          var timer = (_this.getTime(times)) * -1
          _this.setData({
            remain_day: timer
          })
        } else {
          wx.showToast({
            title: '设置失败：' + obj.msg,
            icon: 'none',
          })
        }
      },
      fail(res) {
        console.log("连接服务器异常：" + res)
        wx.showToast({
          title: "连接服务器异常：" + res,
          icon: 'none',
        })
      }
    })
  },
  /**新增订单 */
  userButAddOrder(event) {
    console.log('新增订单')
    // console.log(this.data.termail_id)
    wx.navigateTo({
      url: '../shoppingMall/index?termail_id=' + this.data.termail_id,
    })
  },
  /**拨打电话 */
  userButTel(event) {
    console.log('拨打电话')
    var targetTel = this.data.mobile;
    console.log(targetTel)
    wx.makePhoneCall({
      phoneNumber: targetTel
    })
  },
  /**导航地图 */
  userButMap(event) {
    console.log('导航地图')
    // wx.showToast({
    //   title: '此功能暂未开放',
    //   icon: 'none',
    // })
    let _this = this,
      target = _this.data;
    // longitude
    // latitude
    wx.navigateTo({
      url: '../amap/index?log=' + target.longitude + "&lat=" + target.latitude + "&sname=" + target.storeName,
    })
  },
  /**上拉加载 */
  onReachBottom() {
    console.log("上拉加载数据")
    wx.showLoading({
      title: '数据加载中。。。',
    })
    var page = this.data.page + 1
    this.setData({
      page: page
    })
    this.getStoreList()
    setTimeout(function() {
      wx.hideLoading()
    }, 3000)
  },
  getStoreList: function() {
    wx.showLoading({
      title: '数据加载中',
    })
    var access_token = wx.getStorageSync('access_token')
    var store_id = this.data.termail_id
    var page = this.data.page
    var user_id = wx.getStorageSync('user_info').user_id
    var quantity = 10
    var that = this
    app.callData.postRequest(app.globalData.appApi + 'user/listStock.do', {
      data: JSON.stringify({
        'store_id': store_id,
        'page': page,
        'quantity': quantity,
        'user_id': user_id
      })
    }, {
      'content-type': 'application/x-www-form-urlencoded',
      'access_token': access_token,
    }).then(res => {
      //   console.log(res)
      wx.hideLoading()
      if (res.data.code === 0) {
        var list = that.data.orderListArr
        var stockList = res.data.stockList
        for (var x = 0; x < stockList.length; x++) {
          list.push(stockList[x])
        }
        that.setData({
          storeList: list
        })
      } else {
        wx.showToast({
          title: '数据加载失败',
          icon: 'none',
          duration: 2000
        })
      }

    })
  },
  /**订单编辑 */
  orderListEide(event) {
    // console.log("================================")
    // console.log(event)
    wx.navigateTo({
      url: '../orderDetails/index?order_id=' + event.currentTarget.dataset.order_id + '&order_time=' + event.currentTarget.dataset.timer + '&stock_no=' + event.currentTarget.dataset.stock_no,
    })
  },
  /**订单详情  */
  orderListLook(event) {
    wx.navigateTo({
      url: '../orderDetails/index?order_id=' + event.currentTarget.dataset.order_id + '&order_time=' + event.currentTarget.dataset.timer + '&pay_type=' + event.currentTarget.dataset.type,
    })
  },
  /**时间差运行 */
  getTimeDifference(start) {
    var count = 1;
    var date1 = new Date(start.replace(/-/g, "/"));
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
    return day;
  },
  /**获取拜访时间差 */
  getTime(start) {
    var count = 0;
    var oDate = new Date();
    var year = oDate.getFullYear(); //获取系统的年；
    var month = oDate.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
    var day = oDate.getDate(); // 获取系统日，
    var timer = year + '-' + month + '-' + day
    var date1 = new Date(start.replace(/-/g, "/"));
    var date2 = new Date(timer.replace(/-/g, "/"));
    var s1 = date1.getTime();
    var s2 = date2.getTime();
    var total = (s2 - s1) / 1000;
    var day = parseInt(total / (24 * 60 * 60));
    var afterDay = total - day * 24 * 60 * 60;
    var hour = parseInt(afterDay / (60 * 60));
    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;
    var min = parseInt(afterHour / 60);
    var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;
    return day;
  },
  // 点击查看店铺照片
  getShowImage(e) {
    //storeImageArr
    let target = this.data.storeImageArr;
    console.log(target)
    wx.previewImage({
      urls: target
    })
  }
})