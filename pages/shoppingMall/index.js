const app = getApp()
// pages/shoppingMall/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSelectButLeft: "select-up",
    showSelectButRight: "",
    selectDirectionLeft: "1",
    selectDirectionRight: "0",
    proClassList: [],
    proListAll: [],
    productAll: [],
    cartSumNumber: 0,
    selectTargetClick: "",
    showSort: 0,
    showType: 0,
    termail_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      termail_id: options.termail_id
    })
    this.getProList()
    console.log("onload")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: '选购商品',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(event) {
    this.getCartSync()
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

  /**点击型号分类 */
  proClassButClick(event) {
    var targetId = event.target.dataset.id;
    //     console.log(targetId)
    this.setData({
      selectTargetClick: targetId
    })
  },
  /**减少 */
  cartButCut(event) {
    var target = this.data.productAll;
    var _this = event.target.dataset;
    // 商品ID,商品库存,input值,数据KEY    
    var index = _this.index;
    var inputValue = Number(target[index].proIdNumber);
    var endInventory = null;
    var endObj = [];
    //添加运算
    var inventory = Number(target[index].proInventory);
    //     console.log(inputValue)
    if (inputValue <= 0) {
      inputValue = 0;
      endInventory = inventory;
    } else {
      inputValue = inputValue - 50;
      //库存结算
      endInventory = inventory + 50;
    }
    //修改展示INPUT
    var inputShow = 'productAll[' + index + '].proIdNumber';
    var proInventory = 'productAll[' + index + '].proInventory';
    this.setData({
      [inputShow]: inputValue,
      [proInventory]: endInventory,
    })
    this.getCartList(); //结算统计
  },
  /**增加 */
  cartButPlus(event) {
    var target = this.data.productAll;
    var _this = event.target.dataset;
    // 商品ID,商品库存,input值,数据KEY    
    var index = _this.index;
    var inputValue = Number(target[index].proIdNumber);
    var endInventory = null;
    var endObj = [];
    //添加运算
    var inventory = Number(target[index].proInventory);
    if (inputValue >= inventory) {
      inputValue = inventory;
      //库存结算
      endInventory = 0;
    } else {
      inputValue = inputValue + 50;
      //库存结算
      endInventory = inventory - 50;
    }
    //修改展示INPUT
    var inputShow = 'productAll[' + index + '].proIdNumber';
    var proInventory = 'productAll[' + index + '].proInventory';
    this.setData({
      [inputShow]: inputValue,
      [proInventory]: endInventory,
    })
    this.getCartList(); //结算统计
  },
  /**直接输入 */
  cartInput(event) {
    //     console.log(event)
    var target = this.data.productAll;
    var _this = event.target.dataset;
    // var _input = event.detail.value;
    // 商品ID,商品库存,input值,数据KEY    
    var index = _this.index;
    var inputValue = Number(event.detail.value);
    var endInventory = null;
    var endObj = [];
    //添加运算
    var inventory = Number(target[index].fixationInventory);
    if (inputValue >= inventory) {
      inputValue = inventory;
      //库存结算
      endInventory = 0;
    } else {
      // inputValue = inputValue;
      //库存结算
      endInventory = inventory - inputValue;
    }
    //修改展示INPUT
    var inputShow = 'productAll[' + index + '].proIdNumber';
    var proInventory = 'productAll[' + index + '].proInventory';
    this.setData({
      [inputShow]: inputValue,
      [proInventory]: endInventory,
    })
    this.getCartList(); //结算统计
  },
  /**购物车结算统计 */
  getCartList(event) {
    //产品结算
    var target = this.data.productAll,
      classAll = this.data.proClassList,
      i, sumNumber = 0;
    // console.log(target)
    // console.log(classAll)
    for (i = 0; i < target.length; i++) {
      var rs = target[i],
        number = Number(rs.proMoney),
        proNumber = Number(rs.proIdNumber);
      if (proNumber > 0) {
        sumNumber += Number(number * proNumber);
      }
    }
    //分类统计
    for (var n = 0; n < classAll.length; n++) {
      var classRs = classAll[n]
      var targetSum = 0
      var targetData = "proClassList[" + n + "].proClassSum"
      this.setData({
        [targetData]: "",
      })
      // console.log(classRs)
      for (i = 0; i < target.length; i++) {
        var proRs = target[i]
        if (proRs.proClassId == classRs.proClassId) {
          // console.log(proRs)
          targetSum += Number(proRs.proIdNumber)
        }
      }
      if (targetSum > 0) {
        this.setData({
          [targetData]: targetSum,
        })
      }
    }
    // console.log(this.data.proClassList)
    this.setData({
      cartSumNumber: sumNumber.toFixed(2)
    })
  },
  orderClose(event) {
    var target = this.data.productAll,
      i, cartAll = [];
    for (i = 0; i < target.length; i++) {
      var rs = target[i],
        proNumber = Number(rs.proIdNumber);
      if (proNumber > 0) {
        // cartAll.push(JSON.stringify(rs))
        cartAll.push(rs)
      }
    }
    //提交跳转
    if (cartAll.length <= 0) {
      wx.showToast({
        title: '请至少选择一款商品',
        icon: 'none',
      })
      return false;
    }
    // console.log(cartAll)
    wx.setStorage({
      key: 'cartAll',
      data: JSON.stringify(cartAll),
    })
    // console.log(this.data)
    wx.navigateTo({
      url: '../cartClose/index?termail_id=' + this.data.termail_id,
    })
  },
  //线上产品获取 初始化
  getProList: function() {
    wx.showLoading({
      title: '加载数据...',
    })
    var access_token = wx.getStorageSync('access_token')
    var area_id = wx.getStorageSync('user_info').area_id
    var user_id = wx.getStorageSync('user_info').user_id
    var that = this
    app.callData.postRequest(app.globalData.appApi + 'user/listProduct.do', {
      data: JSON.stringify({
        'area_id': area_id,
        'user_id': user_id
      })
    }, {
      'content-type': 'application/x-www-form-urlencoded',
      'access_token': access_token
    }).then(res => {
      //     console.log(res)
      wx.hideLoading()
      if (res.data.code === 0) {
        var classList = that.data.proClassList
        var proList = res.data.productList
        for (var x = 0; x < proList.length; x++) {
          var arr = {
            'proClassId': proList[x]['pid'], //分类ID
            'proClassName': proList[x]['product_name'], //产品名称
            'proClassSum': '',
          }
          classList.push(arr)
        }
        var allList = new Array()
        var bagList = res.data.bagList
        for (var y = 0; y < bagList.length; y++) {
          var arr = {
            'proImage': bagList[y]['pb_img'], //商品图片
            'proName': bagList[y]['bag_name'], //包纸名称
            'proMoney': bagList[y]['origin_price'], //商吕价格
            'proInventory': bagList[y]['amount'], //商品库存
            'fixationInventory': bagList[y]['amount'], //商品实际库存
            'proid': bagList[y]['p_b_id'], //商品ID
            'proIdNumber': 0, //商品数量
            'proClassId': bagList[y]['pid'], //分类id
          }
          allList.push(arr)
        }
        that.setData({
          proClassList: classList,
          productAll: allList
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
  showSelectButClick1: function(e) {
    var sort = e.target.dataset.type
    var showType = this.data.showType
    var showSort = this.data.showSort
    if (sort === showSort) {
      if (showType === 1) {
        this.setData({
          showType: 0
        })
        this.sortMode(sort, 0)
      } else {
        this.setData({
          showType: 1
        })
        this.sortMode(sort, 1)
      }
      //   console.log(this.data.showType)
    } else {
      this.setData({
        showSort: sort,
        showType: 0
      })
      this.sortMode(sort, 0)

    }
  },
  sortMode: function(showSort, showType) {
    //   console.log(showSort)
    //   console.log(showType)
    var proList = this.data.productAll
    var len = this.data.productAll.length
    if (showSort == 1) {
      var key = "proInventory"
    } else {
      var key = "proMoney"
    }
    if (showType == 1) {
      for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
          if (proList[j][key] >= proList[j + 1][key]) {
            var x = proList[j + 1]
            proList[j + 1] = proList[j]
            proList[j] = x
          }
        }
      }
    } else {
      for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
          if (proList[j][key] <= proList[j + 1][key]) {
            var x = proList[j + 1]
            proList[j + 1] = proList[j]
            proList[j] = x
          }
        }
      }
    }
    this.setData({
      productAll: proList
    })
  },
  //购物车数据初始化 同步当前数据
  getCartSync() {
    var _this = this;
    var cartAll = wx.getStorageSync("cartAll");
    cartAll = JSON.parse(cartAll)
    // console.log(cartAll)
    var obj = this.data.productAll;
    // console.log(obj)
    for (var i = 0; i < obj.length; i++) {
      var objRs = obj[i];
      var target = "productAll[" + i + "].proIdNumber";
      var target_inventory = "productAll[" + i + "].proInventory";
      var fixationInventory = objRs.fixationInventory;
      _this.setData({
        [target]: 0,
        [target_inventory]: fixationInventory,
      })
      for (var n = 0; n < cartAll.length; n++) {
        var cartRs = cartAll[n];
        if (objRs.proid == cartRs.proid) {
          var targetUpdate = cartRs.proIdNumber;
          var target_inventory = cartRs.proInventory;
          _this.setData({
            [target]: targetUpdate,
            [target_inventory]: target_inventory,
          })
        }
      }
    }
    //重新结算购物车
    _this.getCartList();
  }
})