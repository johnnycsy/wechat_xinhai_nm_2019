//引入request
import request from './apis/request.js'
//app.js
App({
  globalData: {
    userInfo: null,
    appApi: 'https://java71.xinhaimobile.cn/applet/',
    // appApi: 'http://10.168.5.214:8088/', //测试地址
    mapsKey: "7T7BZ-RK3RP-U3UDJ-L62QA-BIXWJ-R7F6B",
    qiniuHttp: "https://upload-z2.qiniup.com",
    qiniuSrc: "http://neimao.qiniu.xinhai.com/",
  },
  onLaunch: function() {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

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
  },
  getUserSetting() {
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
  },
  getUserLoginSuccess(event) {
    if (event == 2) {
      wx.reLaunch({
        url: '../merchant/index',
      })
    } else {
      wx.reLaunch({
        url: '../home/index',
      })
    }
  },
  //上传七牛图片
  getUploadFile(event) {
    wx.uploadFile({
      url: this.globalData.qiniuHttp,
      filePath: event.path,
      name: "file",
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        'key': event.key,
        'x:<custom_name>': event.name,
        'custom_value': event.name,
        'token': event.token,
        'file': event.path,
      },
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  callData: new request
})