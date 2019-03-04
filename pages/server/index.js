// pages/successTermainl/index.js
const app = getApp()
var resMap = null;
var latitude = null;
var longitude = null;
var speed = null;
var accuracy = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeSort: "select-up",
    timeNumber: 0,
    addressNumber: 1,
    salesNumber: 1,
    saleNumber: 1,
    debtNumber: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //导航设置
    wx.setNavigationBarTitle({
      title: '成功终端',
    })
    //获取坐标
    wx.getSetting({
      success(res) {
        wx.getLocation({
          type: 'wgs84',
          success(res) {
            console.log(res)
            resMap = res
            latitude = res.latitude
            longitude = res.longitude
            speed = res.speed
            accuracy = res.accuracy
          }
        })
      }
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
  /**
   * 排序选择事件
   */
  selectClick(event) {
    // console.log(event)
    let obj = event.target.dataset.state,
      typeMain = event.target.dataset.type;
    // console.log(obj)
    if (typeof obj == "undefined") {
      return false;
    }
    this.setData({
      timeSort: "",
      addressSort: "",
      salesSort: "",
      saleSort: "",
      debtSort: "",
      timeNumber: 1,
      addressNumber: 1,
      salesNumber: 1,
      saleNumber: 1,
      debtNumber: 1,
    })
    switch (typeMain) {
      case "timeSort":
        if (obj == "0") {
          this.setData({
            timeSort: "select-down",
            timeNumber: 1
          })
        } else {
          this.setData({
            timeSort: "select-up",
            timeNumber: 0
          })
        }
        break;
      case "addressSort":
        if (obj == "0") {
          this.setData({
            addressSort: "select-down",
            addressNumber: 1
          })
        } else {
          this.setData({
            addressSort: "select-up",
            addressNumber: 0
          })
        }
        break;
      case "salesSort":
        if (obj == "0") {
          this.setData({
            salesSort: "select-down",
            salesNumber: 1
          })
        } else {
          this.setData({
            salesSort: "select-up",
            salesNumber: 0
          })
        }
        break;
      case "saleSort":
        if (obj == "0") {
          this.setData({
            saleSort: "select-down",
            saleNumber: 1
          })
        } else {
          this.setData({
            saleSort: "select-up",
            saleNumber: 0
          })
        }
        break;
      case "debtSort":
        if (obj == "0") {
          this.setData({
            debtSort: "select-down",
            debtNumber: 1
          })
        } else {
          this.setData({
            debtSort: "select-up",
            debtNumber: 0
          })
        }
        break;
      default:
        wx.showToast({
          title: '系统获取参数异常',
          icon: 'cancel',
          duration: 2000
        })
        break;
    }
  },
  /**
   * 上拉加载事件
   */
  onReachBottom(event) {
    wx.showLoading({
      title: '数据加载中',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 3000)
  },
  /**下载刷新事件 */
  onPullDownRefresh() {
    wx.showLoading({
      title: '数据刷新中',
    })
    wx.startPullDownRefresh({
      success() {
        // console.log(2222)
        wx.hideLoading()
        wx.stopPullDownRefresh() //暂停刷新
      },
      fail() {
        // console.log(3333)
      }
    })
  },
  /**点击查看详情 */
  termainlDetails(event) {
    // console.log(event)
    var termail_id = event.currentTarget.dataset.termail_id;
    console.log(termail_id)
    // 打开店铺详情
    wx.navigateTo({
      url: '../termainlDetails/index?termail_id=' + termail_id,
    })
  }
})