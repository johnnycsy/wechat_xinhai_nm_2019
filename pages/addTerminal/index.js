const app = getApp()
var resMap = null;
var latitude = null;
var longitude = null;
var speed = null;
var accuracy = null;
Page({
  data: {
    //周边地址
    mapPois: [],
    myLocationAddress: "",
    myAddress: "",
    mapListSelectAddressStype: false,
    //类型
    typeArray: ['a', 'b', 'c'],
    objectTypeArray: [{
      id: 0,
      name: "a"
    }, {
      id: 1,
      name: "b"
    }, {
      id: 2,
      name: "c"
    }],
    typeindex: 0,
    //分类
    channelArray: ['a00', 'b00', 'c00'],
    objectChannelindex: [{
        id: 0,
        name: "a00"
      },
      {
        id: 1,
        name: "b00"
      },
      {
        id: 2,
        name: "c00"
      }
    ],
    channelindex: 0,
    //面积picker
    areaArray: ['测试A', '测试B', '测试C', '测试D'],
    objectAreaArray: [{
        id: 0,
        name: '测试A'
      },
      {
        id: 1,
        name: '测试B'
      },
      {
        id: 2,
        name: '测试C'
      },
      {
        id: 3,
        name: '测试D'
      }
    ],
    areaindex: 0,
    //标签选择
    labelArr: [{
      id: 0,
      name: "label-0",
    }, {
      id: 1,
      name: "label-1"
    }, {
      id: 2,
      name: "label-2"
    }, {
      id: 3,
      name: "label-3"
    }],
    //竞品商品
    cgoodsArr: [{
      id: 0,
      name: "good-0",
    }, {
      id: 1,
      name: "good-1"
    }, {
      id: 2,
      name: "good-2"
    }, {
      id: 3,
      name: "good-3"
    }]
  },
  /**实始化 */
  onShow(event) {
    wx.setNavigationBarTitle({
      title: '新增终端',
    })
    // 获取坐标
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        resMap = res
        latitude = res.latitude
        longitude = res.longitude
        speed = res.speed
        accuracy = res.accuracy
        //进行地址转换
        var key = app.globalData.mapsKey;
        var latAndLong = latitude + ',' + longitude;
        console.log(key)
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latAndLong + '&get_poi=1&key=' + key,
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            console.log(res.data)
            var obj = res.data.result;
            _this.setData({
              myLocationAddress: obj.address,
              mapPois: obj.pois,
            })
          },
          fail(res) {
            console.log(res)
          }
        })
      }
    })


  },
  /**选择点击事件 */
  bindPickerArea(e) {
    console.log('area', e.detail.value)
    this.setData({
      areaindex: e.detail.value
    })
  },
  bindPickerType(e) {
    console.log('type', e.detail.value)
    this.setData({
      typeindex: e.detail.value
    })
  },
  bindPickerChannel(e) {
    console.log('channel', e.detail.value)
    this.setData({
      channelindex: e.detail.value
    })
  },
  labelClick(event) {
    console.log(event)
  },
  goodsClick(event) {
    console.log(event)
  },
  /**相机样式 */
  addCamera(event) {
    let ctx = wx.createCameraContext(this);
    ctx.takePhoto({
      quality: "mormal",
      success: function(e) {
        console.log(e)
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  getMapsAddressSelect(event) {
    this.setData({
      mapListSelectAddressStype: true,
    })
  },
  getSelectMapAddress(event) {
    console.log(event)
    var key = event.target.dataset.index;
    var pois = this.data.mapPois;
    this.setData({
      myAddress: pois[key].address,
      mapListSelectAddressStype: false,
    })
  }
})