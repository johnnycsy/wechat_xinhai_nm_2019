const app = new getApp
var _this
// pages/scanQr/index.js
Page({

  /**
   * 页面的初始数据
   * productAll = {proName:'商品名称',proNumber:'商品数量',proPrice:'商品单价',proModel:'商品型号'}
   */
  data: {
    termail_id: '',
    lon: '',
    lat: '',

    paySelect: ["支付宝", "微信支付", "现金支付", "其它支付"],
    paySelectIndex: 0,

    proNumberSelect: ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50'],
    proNumberSelectIndex: 0,

    productAll: [],

    sumPrice: 0,
    sumKind: 0,
    sumPackage: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    _this = this;
    _this.setData({
      termail_id: options.termail_id,
      lon: options.lon,
      lat: options.lat,
      termailPic: '',
      termailName: '',
      termailAddress: '',
    })
    _this.getTermailInfo();
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
    let rs = wx.getStorageSync('qrcode')
    //查询缓存数据是否生成缓存数据，进行数据查询
    wx.showLoading({
      title: '数据生成中...'
    })
    if (rs) {
      //有数据进行直接查询
      _this.getScanCodeData(rs)
    } else {
      wx.hideLoading();
    }


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
   * 显示终端信息
   */
  getTemailShow(event) {
    console.log(event)
    let termailPic = event.img_head + event.img_shop1,
      termailName = event.store_name,
      termailAddress = event.address;
    _this.setData({
      termailPic: termailPic,
      termailName: termailName,
      termailAddress: termailAddress,
    })
  },
  /**
   * POST 获取终端店铺信息
   */
  getTermailInfo(event) {
    let userInfo = wx.getStorageSync('user_info'),
      data = {
        data: JSON.stringify({
          user_id: userInfo.user_id,
          store_id: _this.data.termail_id,
          lon: _this.data.lon,
          lat: _this.data.lat,
          page: 1,
          quantity: 10,
        })
      };
    wx.request({
      url: app.globalData.appApi + 'user/listStore.do',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        let rs = res.data
        // console.log(rs)
        if (rs.code == 0) {
          let obj = rs.storeList[0]
          _this.getTemailShow(obj)
        } else {
          wx.showToast({
            title: '温馨提示:网络异常[' + rs.code + ']',
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  /**
   * 获取数量
   */
  bindChange() {

  },
  /**
   *支付方式选择 
   */
  getPaySelect(event) {
    //console.log(event)
    _this.setData({
      paySelectIndex: event.detail.value
    })
  },
  /**
   * 弹窗选择
   */
  getOpenConfirm(event) {
    let arr = event.detail.value,
      key = event.target.dataset.index,
      arrTarget = _this.data.proNumberSelect;

    let productAll = 'productAll[' + key + '].proNumber'

    _this.setData({
      [productAll]: arrTarget[arr]
    })

  },
  //重新统计
  getProductStatistics() {

    let productAll = _this.data.productAll,
      sumPrice = 0,
      sumSpecies = 0,
      sumNumber = 0,
      proModel = [];

    for (let i = 0; i < productAll.length; i++) {
      let rs = productAll[i]
      sumPrice += Number(rs.proPrice)
      sumNumber += Number(rs.proNumber)
      if (proModel.indexOf(rs.proModel) < 0) {
        sumSpecies++
        proModel.push(rs.proModel)
      }
    }

    _this.setData({
      sumPrice: sumPrice,
      sumKind: sumSpecies,
      sumPackage: sumNumber,
    })

  },
  //删除事件
  getDeleteStart(event) {
    let key = event.currentTarget.dataset.index,
      productAll = _this.data.productAll;

    productAll.splice(key, 1)

    _this.setData({
      productAll: productAll
    })

  },
  //单独扫码
  getScanOne(event) {

    wx.scanCode({
      onlyFromCamera: true,
      success(res) {

        let target = res.result
        _this.getScanCodeData(target)

      }
    })

  },
  //连续扫码
  getScanEven(event) {
    //连续扫码需要跳转到另一个页面进行操作
    console.log(event)
    wx.navigateTo({
      url: '../continuous/index',
    })
  },
  //扫码数据进行整理
  getScanCodeData(event) {
    let ev = event,
      productAll = _this.data.productAll

    //从服务器获取数据
    let postData = {
      data: JSON.stringify({
        qrCode: event
      })
    }

    wx.request({
      url: app.globalData.appApi + '',
      data: postData,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        console.log(res)

        let rs = res.data

        if (typeof rs.code == "undefined" || rs.code != 0) {
          wx.showToast({
            title: '温馨提示：网络连接失败/数据异常',
            icon: 'none'
          })
          return false
        }

        //demo start
        let newTarget = {
          proNumber: 50,
          proPrice: 2.00,
          proName: event
        }
        //demo end 

        productAll.push(newTarget)
        _this.setData({
          productAll: productAll
        })

      },
      fail: function(res) {
        //console.log(res)
        wx.showToast({
          title: '温馨提示：网络异常【' + res.errMsg + '】',
          icon: 'none'
        })

      }
    })

  },
  //提交订单
  getOrderSubmit(event) {
    let rs = _this.data,
      obj = {
        payment: rs.paySelect[rs.paySelectIndex],
        product: rs.productAll
      };

    if (rs.productAll.length <= 0) {
      wx.showToast({
        title: '未扫码商品,请扫码',
        icon: 'none'
      })
      return false;
    }

    console.log("提交订单")
    console.log(obj)

  }

})