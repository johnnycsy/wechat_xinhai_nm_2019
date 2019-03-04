const app = getApp()
Page({
  data: {
    imgUrls: [
      'http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0',
      'http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0',
      'http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  buttonClick(event) {
    var target = event.currentTarget.dataset.url;
    switch (target) {
      case "addTerminal":
        wx.navigateTo({
          url: '../addTerminal/index',
        })
        break;
      case "addOrder":
        wx.navigateTo({
          url: '../addOrder/index',
        })
        break;
      case "getServer":
        wx.navigateTo({
          url: '../server/index',
        })
        break;
      case "getSuccess":
      wx.navigateTo({
        url: '../successTermainl/index',
      })
        break;
      case "getProduct":
        wx.navigateTo({
          url: '../showProduct/index',
        })
        break;
      default:
        wx.showToast({
          title: '未知事件',
          icon: "cancel",
          duration: 3000,
        })
        break;
    }
  }
})