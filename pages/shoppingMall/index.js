// pages/shoppingMall/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    termail_id: null,
    showSelectButLeft: "select-up",
    showSelectButRight: "",
    selectDirectionLeft: "1",
    selectDirectionRight: "0",
    proClassList: [],
    proListAll: [],
    productAll: [],
    cartSumNumber: 0,
    selectTargetClick: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var termail_id = options.termail_id;
    console.log("======================="+termail_id)
    // 模拟数据信息
    this.setData({
      termail_id: termail_id,
      proClassList: [{
          proClassId: 1,
          proClassName: "XHD8025"
        },
        {
          proClassId: 2,
          proClassName: "XHD8899"
        },
        {
          proClassId: 3,
          proClassName: "XHF8019"
        },
        {
          proClassId: 4,
          proClassName: "XHF8019S"
        },
        {
          proClassId: 5,
          proClassName: "XHF8019S(P)"
        },
        {
          proClassId: 0,
          proClassName: "XHD118"
        },
        {
          proClassId: 7,
          proClassName: "XHD58"
        }
      ],
      productAll: [{
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 1,
        proIdNumber: 0,
        proClassId: 1,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 2,
        proIdNumber: 0,
        proClassId: 1,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 3,
        proIdNumber: 0,
        proClassId: 2,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 4,
        proIdNumber: 0,
        proClassId: 2,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 5,
        proIdNumber: 0,
        proClassId: 3,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 6,
        proIdNumber: 0,
        proClassId: 3,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 7,
        proIdNumber: 0,
        proClassId: 3,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 8,
        proIdNumber: 0,
        proClassId: 3,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 9,
        proIdNumber: 0,
        proClassId: 0,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 0,
        proIdNumber: 0,
        proClassId: 0,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 11,
        proIdNumber: 0,
        proClassId: 0,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 12,
        proIdNumber: 0,
        proClassId: 0,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 13,
        proIdNumber: 0,
        proClassId: 0,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 14,
        proIdNumber: 0,
        proClassId: 0,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 15,
        proIdNumber: 0,
        proClassId: 4,
      }, {
        proImage: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7dbYJO5jicsYYdpibVAfv60DO4IJTuzphicqCxuK4t8E1sg/64/0",
        proName: "商品名称",
        proMoney: "8888.00",
        proInventory: 123456,
        fixationInventory: 123456,
        proid: 16,
        proIdNumber: 0,
        proClassId: 4,
      }]
    });
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
    wx.setNavigationBarTitle({
      title: '选购商品',
    })
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
  /**点击切换内容样式 */
  showSelectButClick(event) {
    // console.log(event)
    var targetType = event.target.dataset.type;
    var direction = event.target.dataset.direction;
    this.setData({
      showSelectButLeft: "",
      showSelectButRight: "",
      selectDirectionLeft: "0",
      selectDirectionRight: "0",
    })
    if (targetType == "0") {
      if (direction == "0") {
        this.setData({
          showSelectButLeft: "select-up",
          showSelectButRight: "",
          selectDirectionLeft: "1",
          selectDirectionRight: "0",
        })
      } else {
        this.setData({
          showSelectButLeft: "select-down",
          showSelectButRight: "",
          selectDirectionLeft: "0",
          selectDirectionRight: "0",
        })
      }
    } else {
      if (direction == "0") {
        this.setData({
          showSelectButLeft: "",
          showSelectButRight: "select-up",
          selectDirectionLeft: "0",
          selectDirectionRight: "1",
        })
      } else {
        this.setData({
          showSelectButLeft: "",
          showSelectButRight: "select-down",
          selectDirectionLeft: "0",
          selectDirectionRight: "0",
        })
      }
    }
    // 获取对应的数据信息
    console.log("获取对应的数据信息")
  },
  /**点击型号分类 */
  proClassButClick(event) {
    var targetId = event.target.dataset.id;
    console.log(targetId)
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
    console.log(inputValue)
    if (inputValue <= 0) {
      inputValue = 0;
      endInventory = inventory;
    } else {
      inputValue = inputValue - 1;
      //库存结算
      endInventory = inventory + 1;
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
      inputValue = inputValue + 1;
      //库存结算
      endInventory = inventory - 1;
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
    console.log(event)
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
    var target = this.data.productAll,
      i, sumNumber = 0;
    for (i = 0; i < target.length; i++) {
      var rs = target[i],
        number = Number(rs.proMoney),
        proNumber = Number(rs.proIdNumber);
      if (proNumber > 0) {
        sumNumber += Number(number * proNumber);
      }
    }
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
    console.log("=========" + this.data.termail_id)
    wx.navigateTo({
      url: '../cartClose/index?termail_id=' + this.data.termail_id,
    })
  }
})