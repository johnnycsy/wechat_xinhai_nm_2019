//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: '欢迎使用新海国内销售系统',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    //获取用户数据
    if (app.globalData.userInfo) {
      console.log("======================================================0")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.getUserLogin();  //进行授后登录
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("======================================================1")     
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.getUserLogin();  //进行授后登录
      }
    } else {
      console.log("======================================================2")      
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          // console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.getUserLogin();  //进行授后登录
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.getUserLogin();  //进行授后登录
  },
  getUserLogin: function() {
    //用户登录
    wx.showLoading({
      title: '用户登录中....',
    })
    var apiSrc = app.globalData.appApi + "user/accessWx.do";
    var dataPost = {
      data: JSON.stringify({
        open_id: wx.getStorageSync('openid')
      })
    }
    // console.log(dataPost)
    wx.request({
      url: apiSrc, // 仅为示例，并非真实的接口地址
      method: "POST",
      data: dataPost,
      header: {
        // 'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        //console.log(res.data)
        setTimeout(function() {
          if (res.data.code === 0) {            
            wx.reLaunch({
              url: '../home/index',
            })
          } else {
            wx.reLaunch({
              url: '../home/index',
            })
          }
        }, 2000)
      },
      fail(error) {
        console.log(error)
        wx.hideLoading();
        wx.showModal({
          title: '登录失败',
          content: '当前登录失败：' + error.data,
        })
      }
    })
  }
})