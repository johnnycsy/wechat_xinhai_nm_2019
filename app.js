//app.js
App({
  globalData: {
    userInfo: null,
    appApi: "http://192.168.6.33:8080/",
    mapsKey: "7T7BZ-RK3RP-U3UDJ-L62QA-BIXWJ-R7F6B",
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录微信
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(this.globalData.appid)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          method: "GET",
          data: {
            appid: this.globalData.appid,
            secret: this.globalData.appsecret,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            // console.log(res.data)
            // var session_key = res.data.session_key;
            // openid = res.data.openid
            wx.setStorage({
              key: 'openid',
              data: res.data.openid,
            })
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})
