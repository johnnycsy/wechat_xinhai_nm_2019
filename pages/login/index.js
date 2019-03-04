Page({
  data: {
    logoImage: "../../utils/image/login_top.png",
    loginTitle: ["帐号登录", "手机登录"],
    selectButOne: "login-select-form",
    formPhone: "start-from"
  },
  butFrom(event) {
    //点击切换显示效果
    console.log(event)
    console.log(this)
    var typeInt = event.target.dataset.startint;
    if (typeInt == 0) {
      this.setData({
        selectButOne: "login-select-form",
        selectButTwo: "",
        formUsername:"",
        formPhone: "start-from"
      })
    } else {
      this.setData({
        selectButOne: "",
        selectButTwo: "login-select-form",
        formUsername: "start-from",
        formPhone:""
      })
    }
  }
})