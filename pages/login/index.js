const app = getApp();
var util = require('../../apis/md5.js');
Page({
  data: {
    userPhoneTel: "",
    phoneCodeNumberTime: "获取验证码",
    logoImage: "../../utils/image/login_top.png",
    loginTitle: ["帐号登录", "手机登录"],
    selectButOne: "login-select-form",
    formPhone: "start-from"
  },
  butFrom(event) {
    //点击切换显示效果 
    // console.log(event)
    // console.log(this)
    var typeInt = event.target.dataset.startint;
    if (typeInt == 0) {
      this.setData({
        selectButOne: "login-select-form",
        selectButTwo: "",
        formUsername: "",
        formPhone: "start-from"
      })
    } else {
      this.setData({
        selectButOne: "",
        selectButTwo: "login-select-form",
        formUsername: "start-from",
        formPhone: ""
      })
    }
  },
  getAccount: function(e) {
    if (e.detail.value) {
      this.setData({
        user_name: e.detail.value
      });
    }
  },
  getPwd: function(e) {
    if (e.detail.value) {
      this.setData({
        password: util.hexMD5(util.hexMD5(e.detail.value))
      });
    }
  },
  signIn: function() {
    let openid = wx.getStorageSync("openid"),
      userInfo = app.globalData.userInfo;
    if (!this.data.user_name) {
      wx.showToast({
        title: '账号不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!this.data.password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    console.log(userInfo)
    var nick_name = app.globalData.userInfo.nickName; //微信昵称
    var sex = app.globalData.userInfo.gender; //性别
    var province = app.globalData.userInfo.province; //省
    var city = app.globalData.userInfo.city; //市
    var country = app.globalData.userInfo.country; //国
    var heading_url = app.globalData.userInfo.avatarUrl; //头像
    app.callData.postRequest(app.globalData.appApi + 'user/accessBind.do', {
      data: JSON.stringify({
        'user_name': this.data.user_name,
        'passwd': this.data.password,
        'login_type': 'wx',
        'nick_name': nick_name,
        'province': province,
        'city': city,
        'country': country,
        'heading_url': heading_url,
        'open_id': openid
      })
    }, {
      'content-type': 'application/x-www-form-urlencoded'
    }).then(res => {
      console.log(res)
      if (typeof res.data == "undefined") {
        wx.showToast({
          title: '温馨提示：远程连接失败',
          icon: 'none',
          duration: 2000
        })
      }
      if (res.data.code === 0) {
        wx,
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
        wx.switchTab({
          url: '../home/index'
        })
      }
      else if (res.data.code === 6000) {
        wx.showToast({
          title: '温馨提示：远程操作失败',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '绑定失败：' + res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getUpdatePhoneNumber(e) {
    var myreg = /^1[34578]\d{9}$/;
    if (e.detail.value) {
      if (!(myreg.test(e.detail.value))) {
        wx.showToast({
          title: '手机号码格式错误',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.setData({
          userPhoneTel: e.detail.value
        });
      }
    }
  },
  //短信验证信息
  getAutoNumber(number = 60) {
    var _this = this;
    if (number < 0) {
      this.setData({
        phoneCodeNumberTime: "重新获取",
      })
    } else {
      var times = number - 1
      this.setData({
        phoneCodeNumberTime: times,
      })
      setTimeout(function() {
        _this.getAutoNumber(times)
      }, 1000)
    }
  },
  //获取短信验证码
  getPhoneSmsCode(event) {
    //获取短信验证码
    var _this = this
    var phone = _this.data.userPhoneTel
    var reg = /^1[0-9]{10}/;
    if (!reg.test(phone)) {
      wx.showToast({
        title: '请输入合法手机号码',
        icon: 'none',
      })
      return false
    }
    wx.request({
      url: app.globalData.appApi + 'user/sendSms.do',
      data: {
        data: JSON.stringify({
          phone: phone
        })
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data)
        var obj = res.data
        if (obj.code == 0) {
          _this.getAutoNumber() //开始倒计时
        } else {
          wx.showToast({
            title: '短信发送失败:' + obj.msg,
            icon: 'none',
          })
        }
      },
      fail(res) {
        console.log(res)
        wx.showToast({
          title: '短信发送失败:' + res,
          icon: 'none',
        })
      }
    })
  },
  getPhoneCode: function(e) {
    if (e.detail.value) {
      this.setData({
        phoneCode: e.detail.value
      });
    }
  },
  phoneSignIn: function() {
    var openid = wx.getStorageSync("openid");
    console.log("=======================>>>>>" + openid)
    if (typeof openid == "undefined") {
      wx.showToast({
        title: '温馨提示：用户授权获失败',
        icon: 'none'
      })
      return false;
    }
    if (!this.data.userPhoneTel) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!this.data.phoneCode) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    app.callData.postRequest(app.globalData.appApi + 'user/accessPhone.do', {
      data: JSON.stringify({
        'phone': this.data.userPhoneTel,
        'sms_code': this.data.phoneCode,
        'login_type': 'wx',
        'open_id': openid
      })
    }, {
      'content-type': 'application/x-www-form-urlencoded'
    }).then(res => {
      console.log(res)
      if (res.data.code === 0) {
        //缓存token
        wx.setStorage({
          key: 'access_token',
          data: res.data.access_token
        })
        //存储用户信息
        wx.setStorage({
          key: 'user_info',
          data: res.data.user
        })
        //"dict": {"areaList": 区域列表"termList": 终端类型列表"labelList": 终端标签列表"proportionList": 终端面积列表"competeList": 终端竞品列表 }
        wx.setStorage({
          key: 'dict',
          data: res.data.dict
        })
        wx.switchTab({
          url: '../home/index'
        })
      } else {
        wx.showToast({
          title: '绑定失败：' + res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})