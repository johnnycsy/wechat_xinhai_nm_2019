//index.js 
//获取应用实例
const app = getApp()
var _this
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
    _this = this
    //获取用户数据
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      // console.log('===========================' + 1)
      _this.getUserOpenid();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // console.log('===========================' + 2)
        _this.getUserOpenid();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          // console.log('===========================' + 3)
          _this.getUserOpenid();
        }
      })
    }
  },
  //获取openid [requery]
  getUserOpenid(event) {
    // 登录微信    
    var apiSrc = app.globalData.appApi
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log("自动获取数据======================================》" + JSON.stringify(res))
        wx.request({
          url: apiSrc + 'user/wxAuthor.do',
          method: "POST",
          data: {
            data: JSON.stringify({
              jscode: res.code
            })
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            // console.log(res)
            if (res.data.openid != '') {
              wx.setStorage({
                key: 'openid',
                data: res.data.openid,
              })
              //进行授后登录
              _this.getUserInfo(res.data.openid);
            } else {
              wx.showToast({
                title: '温馨提示:授权登录失败！',
                icon: 'none'
              })
            }

          },
          fail(error) {
            wx.showToast({
              title: '服务器异常：' + JSON.stringify(error.errMsg),
              icon: 'none',
            })
          }
        })
      }
    })
  },
  //用户信息分解 
  getUserInfo: function(openid) {
    let userInfo = app.globalData.userInfo
    if (userInfo == null || typeof userInfo == "undefined") {
      // _this.onLoad();
      app.getUserSetting();
      return false;
    }
    if (typeof openid == "undefined") {
      wx.showToast({
        title: '温馨提示：服务器更新中',
        icon: 'none'
      })
      return false
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
    if (openid.type) {
      _this.getUserOpenid()
    } else {
      _this.getUserLogin(openid) //进行授后登录
    }
  },
  //用户登录 [requery]
  getUserLogin: function(openid) {
    if (typeof openid == "undefined" || openid == "") {
      _this.getUserOpenid()
    }
    //用户登录
    wx.showLoading({
      title: '用户登录中....',
    })
    let apiSrc = app.globalData.appApi + "user/accessWx.do",
      openidStorage = wx.getStorageSync('openid');
    if (openidStorage != '' || openid != '') {
      var dataPost = {
        data: JSON.stringify({
          // open_id: wx.getStorageSync('openid')
          open_id: openid
        })
      }
    } else {
      wx.hideLoading()
      wx.showModal({
        title: '温馨提示',
        content: '1.请返回微信首页\r\n2.下拉查看小程序\r\n3.长按小程序点击删除\r\n4.再重新进入'
      })
      return false;
    }

    // console.log("========================================================>"+JSON.stringify(dataPost))
    wx.request({
      url: apiSrc, // 仅为示例，并非真实的接口地址
      method: "POST",
      data: dataPost,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        // console.log(res.data)
        if (res.data.code === 0) {
          wx.setStorage({
            key: 'access_token',
            data: res.data.access_token
          })
          wx.setStorage({
            key: 'user_info',
            data: res.data.user
          })
          wx.setStorage({
            key: 'dict',
            data: res.data.dict
          })

          //延时跳转，因为需要对缓存数据进行一次保存
          // if (res.data.user.type == 2) {
          //   wx.reLaunch({
          //     url: '../merchant/index',
          //   })
          // } else {
          //   wx.reLaunch({
          //     url: '../home/index',
          //   })
          // }
          app.getUserLoginSuccess(res.data.user.type)
        } else {
          wx.reLaunch({
            url: '../login/index',
          })
        }
      },
      fail(error) {
        console.log(error)
        wx.hideLoading();
        wx.showModal({
          title: '异常错误',
          content: '异常错误：' + error.errMsg,
        })
      }
    })
  }
})