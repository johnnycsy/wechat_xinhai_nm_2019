const app = getApp()
var resMap = null;
var latitude = null;
var longitude = null;
var speed = null;
var accuracy = null;
Page({
  data: {
    //自动焦点
    focusUserName: false,
    focusPhone: false,
    qiniuToken: null,
    //拍照
    mainstyle: "",
    cameraSum: 0,
    cameraVal: [],
    cameraType: false,
    cameraTarget: false,
    //周边地址
    mapPois: [],
    myLocationAddress: "",
    myAddress: "",
    //店铺标签
    labels: [],
    //竞品
    goodsList: [],
    //类型
    typeArray: [],
    objectTypeArray: [],
    typeindex: "",
    //分类
    channelArray: ['终端店', '批发商', '连锁超市'],
    objectChannelindex: [{
        id: 1,
        name: "终端店"
      },
      {
        id: 2,
        name: "批发商"
      },
      {
        id: 3,
        name: "连锁超市"
      }
    ],
    channelindex: 0,
    //面积picker
    areaArray: [],
    objectAreaArray: [],
    areaindex: "",
    //标签选择
    labelArr: [],
    //竞品商品
    cgoodsArr: []
  },
  onLoad() {
    //初始化相机
    this.ctx = wx.createCameraContext();
    //获取 qiniuToken 上传图片使用
    var _this = this;
    wx.request({
      url: app.globalData.appApi + "user/qiniuToken.do", // 仅为示例，并非真实的接口地址
      method: "post",
      data: {
        data: JSON.stringify({
          method: "qiniu",
        })
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data)
        var data = res.data;
        if (data.code == "0") {
          _this.setData({
            qiniuToken: data.upToken
          })
        } else {
          wx.showToast({
            title: '上传图片凭证获取失败，无法上传图片',
            icon: 'none',
          })
        }
      }
    })
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '新增终端',
    })
    //终端类型
    var termList = wx.getStorageSync('dict').termList
    var typeList = this.data.typeArray
    var typeArr = this.data.objectTypeArray
    for (var i = 0; i < termList.length; i++) {
      var arr = {
        'id': termList[i]['term_id'],
        'name': termList[i]['name']
      }
      typeList.push(termList[i]['name'])
      typeArr.push(arr)
    }
    //面积分类
    var list = wx.getStorageSync('dict').proportionList
    var areaList = this.data.areaArray
    var listArr = this.data.objectAreaArray
    for (var i = 0; i < list.length; i++) {
      var arr = {
        'id': list[i]['proportion_id'],
        'name': list[i]['proportion_val']
      }
      areaList.push(list[i]['proportion_val'])
      listArr.push(arr)
    }
    //获取店铺标签
    var labelList = wx.getStorageSync('dict').labelList
    //   console.log(labelList)
    var labelarr = this.data.labelArr
    //   console.log(labelarr)
    for (var i = 0; i < labelList.length; i++) {
      var arr = {
        'id': labelList[i]['label_id'],
        'name': labelList[i]['label_name'],
        "labelSelecVal": false,
      }
      labelarr.push(arr)
    }

    //获取竞品标签
    var comList = wx.getStorageSync('dict').competeList
    console.log(comList)
    var cgoodsArr = this.data.cgoodsArr
    //   console.log(cgoodsArr)
    var noArr = [];
    for (var i = 0; i < comList.length; i++) {
      if (comList[i]['compete_name'] == "无") {
        // console.log(comList[i]['compete_name'])
        noArr = {
          'id': comList[i]['compete_id'],
          'name': comList[i]['compete_name'],
          "competeSelect": false,
        }
      } else {
        var arr = {
          'id': comList[i]['compete_id'],
          'name': comList[i]['compete_name'],
          "competeSelect": false,
        }
        cgoodsArr.push(arr)
      }
    }
    cgoodsArr.push(noArr)
    this.setData({
      cgoodsArr: cgoodsArr,
      labelArr: labelarr,
      typeArray: typeList,
      objectTypeArray: typeArr,
      typeindex: 0,
      areaArray: areaList,
      objectAreaArray: listArr,
      areaindex: 0
    })
  },
  /**实始化 */
  onShow(event) {
    var _this = this;
    //获取返回参数 addressListSelect
    var addressListSelect = wx.getStorageSync("addressListSelect")
    if (addressListSelect == "") {
      // 获取坐标      
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          // console.log(res)
          resMap = res
          latitude = res.latitude
          longitude = res.longitude
          speed = res.speed
          accuracy = res.accuracy
          //进行地址转换
          var key = app.globalData.mapsKey;
          var latAndLong = latitude + ',' + longitude;
          // console.log(key)
          wx.request({
            url: app.globalData.appApi + 'user/geoCoder.do',
            method: "post",
            data: {
              data: JSON.stringify({
                "location": latAndLong,
                "key": key
              })
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
              console.log(res.data)
              var obj = res.data.result;
              _this.setData({
                myLocationAddress: obj.ad_info.name,
                myAddress: obj.address,
                mapPois: obj.pois,
              })
            },
            fail(res) {
              // console.log(res)
            }
          })
        }
      })
    } else {
      _this.setData({
        myAddress: JSON.parse(addressListSelect).address
      })
      wx.removeStorageSync("addressListSelect")
    }
  },
  /**选择点击事件 */
  bindPickerArea(e) {
    // console.log('area', e.detail.value)
    this.setData({
      areaindex: e.detail.value
    })
  },
  bindPickerType(e) {
    //   console.log('e', e)
    //   console.log('type', e.detail.value)
    this.setData({
      typeindex: e.detail.value
    })
  },
  bindPickerChannel(e) {
    // console.log('channel', e.detail.value)
    this.setData({
      channelindex: e.detail.value
    })
  },
  labelClick(event) {
    // console.log(event)
    var key = event.target.dataset.index
    var dataObj = this.data
    var label = dataObj.labelArr
    var labelRs = dataObj.labels
    var targetSetData = "labelArr[" + key + "].labelSelecVal"
    if (label[key].labelSelecVal == false) {
      labelRs.push(label[key].id)
      //选中事件
      this.setData({
        labels: labelRs,
        [targetSetData]: true,
      })
    } else {
      labelRs.splice(labelRs.indexOf(label[key].id), 1)
      //未选中事件
      this.setData({
        labels: labelRs,
        [targetSetData]: false,
      })
    }
    console.log(labelRs)
  },
  goodsClick(event) {
    // console.log(event)
    var key = event.target.dataset.index
    var obj = this.data
    var target = obj.cgoodsArr[key]
    var goodsList = obj.goodsList
    var setTarget = "cgoodsArr[" + key + "].competeSelect"
    console.log(target)
    if (target.competeSelect == false) {
      goodsList.push(target.id)
      //未选中
      this.setData({
        [setTarget]: true,
        goodsList: goodsList,
      })
    } else {
      goodsList.splice(goodsList.indexOf(target.id), 1)
      //已选中
      this.setData({
        [setTarget]: false,
        goodsList: goodsList,
      })
    }
    console.log(goodsList)
  },
  /**相机样式 */
  addCameraGo(event) {
    // console.log("拍照事件")
    // console.log(event)
    var obj = this.data.cameraType
    var key = event.target.dataset.index
    console.log(key)
    if (typeof key == "undefined") {
      this.setData({
        cameraType: true,
        mainstyle: "display:none",
      })
    } else {
      this.setData({
        cameraType: true,
        cameraTarget: key,
        mainstyle: "display:none",
      })
    }
  },
  /**关闭拍照 */
  getSotpPhoto() {
    this.ctx.stopRecord({
      success: function(res) {
        // console.log(res)
      },
      fail: function(res) {
        // console.log(res)
      }
    })
    var cameraSum = this.data.cameraVal.length
    console.log(cameraSum)
    this.setData({
      cameraSum: cameraSum,
      cameraType: false,
      cameraTarget: false, //拍照结束，需要初始化拍照参数
      mainstyle: "",
    })
  },
  /**开始拍照 */
  getTakePhoto() {
    var _this = this;
    this.ctx.takePhoto({
      quality: "high",
      success: function(e) {
        // console.log(e)
        var obj = _this.data.cameraVal
        var image = e.tempImagePath
        wx.getImageInfo({
          src: e.tempImagePath,
          success: function(res) {
            // console.log(res)
          },
          fail: function(res) {
            // console.log(res)
          }
        })

        var nameImage = "wechat_nm_" + new Date().getTime() + ".jpg";
        var objUpload = {
          key: nameImage,
          name: nameImage,
          token: _this.data.qiniuToken,
          path: image,
        }
        app.getUploadFile(objUpload);
        var arr = {
          orderNumber: obj.length,
          src: app.globalData.qiniuSrc + nameImage,
          imageSrc: nameImage,
        }
        wx.showLoading({
          title: '拍照上传中...',
        })
        // console.log("================================================>"+_this.data.cameraTarget)
        setTimeout(function() {
          if (_this.data.cameraTarget === false) {
            //拍新图片          
            obj.push(arr)
            _this.setData({
              cameraVal: obj
            })
          } else {
            // console.log(_this.data.cameraTarget)
            //修改之前拍照的图片
            var target = "cameraVal[" + _this.data.cameraTarget + "].src";
            _this.setData({
              [target]: image
            })
          }
          //关闭拍照
          _this.getSotpPhoto();
          // console.log(_this.data.cameraVal)
          wx.hideLoading();
        }, 3000)
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  deleteCameraGo(event) {
    console.log('删除拍照图片事件')
    // console.log(event)
    var key = event.target.dataset.index
    var objAll = this.data.cameraVal
    // console.log(objAll)
    objAll.splice(key, 1)
    // console.log(objAll)
    this.setData({
      cameraVal: objAll,
    })
  },
  //获取地址列表
  getMapsAddressSelect(event) {
    // console.log(event )
    var key = event.target.dataset.index
    var pois = this.data.mapPois
    wx.navigateTo({
      url: '../addressSelect/index?pois=' + JSON.stringify(pois),
    })
  },
  //下一行事件
  inputInformations(e) {
    var inputName = e.currentTarget.dataset.name
    console.log("test==============================>" + inputName)
    switch (inputName) {
      case 'store_name':
        this.setData({
          focusUserName: true,
        })
        break;
      case 'store_represent':
        this.setData({
          focusPhone: true,
        })
        break;
    }
  },
  inputInformation: function(e) {
    var inputName = e.currentTarget.dataset.name
    console.log(inputName)
    switch (inputName) {
      case 'store_name':
        this.setData({
          store_name: e.detail.value,
          // focusUserName:true,
        })
        break;
      case 'store_represent':
        this.setData({
          store_represent: e.detail.value,
          // focusPhone:true,
        })
        break;
      case 'mobile':
        this.setData({
          mobile: e.detail.value
        })
        break;
      case 'area':
        this.setData({
          area: e.detail.value
        })
        break;
      case 'address':
        this.setData({
          address: e.detail.value
        })
        break;
      case 'remark':
        this.setData({
          remark: e.detail.value
        })
        break;
    }
  },
  addTerminal: function() {
    wx.showLoading({
      title: '数据提交... ',
    })
    var access_token = wx.getStorageSync('access_token')
    var user_id = wx.getStorageSync('user_info').user_id
    var term_id = this.data.objectTypeArray[this.data.typeindex]['id']

    if (!term_id) {
      wx.showToast({
        title: '终端类型不能为空',
        icon: 'none',
      })
      return false;
    }
    var address = this.data.myAddress
    if (!address) {
      wx.showToast({
        title: '地址不能为空',
        icon: 'none',
      })
      return false;
    }
    var area = wx.getStorageSync('user_info').area_id

    var mobile = this.data.mobile
    console.log(mobile)
    if (!mobile) {
      wx.showToast({
        title: '联系电话不能为空',
        icon: 'none',
      })
      return false;
    }
    var remark = this.data.remark
    var store_name = this.data.store_name
    if (!store_name) {
      wx.showToast({
        title: '店铺名称不能为空',
        icon: 'none',
      })
      return false;
    }
    var store_represent = this.data.store_represent
    if (!store_represent) {
      wx.showToast({
        title: '联系人姓名不能为空',
        icon: 'none',
      })
      return false;
    }
    var img_cert = 0
    var img_shop1 = 0
    var img_shop2 = 0
    var img_shop3 = 0
    var img_shop4 = 0
    var img_shop5 = 0
    var img_sign = 0
    var lon = longitude
    var lat = latitude
    var labels = this.data.labels
    if (labels.length <= 0) {
      wx.showToast({
        title: '店铺标签不能为空',
        icon: 'none',
      })
      return false;
    }
    var proportion = this.data.objectAreaArray[this.data.areaindex]['id']
    if (!proportion) {
      wx.showToast({
        title: '店铺面积不能为空',
        icon: 'none',
      })
      return false;
    }
    var competes = this.data.goodsList
    console.log(competes)
    if (competes.length <= 0) {
      wx.showToast({
        title: '竞品商品不能为空',
        icon: 'none',
      })
      return false;
    }
    var channel_type = this.data.objectChannelindex[this.data.channelindex]['id']
    var competes = this.data.goodsList
    if (!competes) {
      wx.showToast({
        title: '终端类型不能为空',
        icon: 'none',
      })
      return false;
    }
    /** 
       var data = JSON.stringify({ 
           'user_id': user_id, 
           'term_id': term_id, 
           'address': address,
           'area': area,
           'mobile': mobile,
           'remark': remark,
           'store_name': store_name,
           'store_represent': store_represent,
           'img_cert': img_cert,
           'img_shop1': img_shop1,
           'img_shop2': img_shop1,
           'img_shop3': img_shop1,
           'img_shop4': img_shop1,
           'img_shop5': img_shop1,
           'lon': lon,
           'lat': lat,
           'labels': labels,
           'proportion': proportion,
           'competes': competes,
           'channel_type': channel_type })
    */
    var _this = this;
    var cameraAll = _this.data.cameraVal;
    var times = new Date().getTime();
    if (cameraAll.length <= 0) {
      wx.showToast({
        title: '请至少拍摄一张店铺图片信息',
        icon: 'none',
      })
      return false;
    }
    // var qiniuImageArr = [];
    // console.log(cameraAll)
    // for (var i = 0; i < cameraAll.length; i++) {
    //   var rs = cameraAll[i];
    //   var nameImage = "WECHAT_NM_" + times + i;
    //   var obj = {
    //     key: nameImage,
    //     name: nameImage,
    //     token: _this.data.qiniuToken,
    //     path: rs.src,
    //   }
    //   qiniuImageArr.push(nameImage)
    //   app.getUploadFile(obj);
    // }
    // console.log(cameraAll)
    for (var i = 0; i < cameraAll.length; i++) {
      if (i == 0) {
        img_shop1 = cameraAll[i].imageSrc
      }
      if (i == 1) {
        img_shop2 = cameraAll[i].imageSrc
      }
      if (i == 2) {
        img_shop3 = cameraAll[i].imageSrc
      }
      if (i == 3) {
        img_shop4 = cameraAll[i].imageSrc
      }
      if (i == 4) {
        img_shop5 = cameraAll[i].imageSrc
      }
    }
    // if (user_id == "" || term_id == "" || address == "" || area == "" || mobile == "" ||
    //   remark == "" || store_name == "" || store_represent == "" || img_cert == "" || img_shop1 == "" ||
    //   img_shop2 == "" || img_shop3 == "" || img_shop4 == "" || img_sho == "" || p5 == "" || lon == "" ||
    //   lat == "" || labels == "" || proportion == "" || competes == "" || channel_type == "") {
    //   wx.showToast({
    //     title: '请填写完整参数信息',
    //     icon: "none",
    //   })
    //   return false;
    // }
    var postData = {
      data: JSON.stringify({
        'user_id': user_id,
        'term_id': term_id,
        'address': address,
        'area': area,
        'mobile': mobile,
        'remark': remark,
        'store_name': store_name,
        'store_represent': store_represent,
        'img_cert': img_cert,
        'img_shop1': img_shop1,
        'img_shop2': img_shop2,
        'img_shop3': img_shop3,
        'img_shop4': img_shop4,
        'img_shop5': img_shop5,
        'lon': lon,
        'lat': lat,
        'labels': labels.join(),
        'proportion': proportion,
        'competes': competes.join(),
        'channel_type': channel_type
      })
    }

    wx.request({
      url: app.globalData.appApi + 'user/addStore.do', // 仅为示例，并非真实的接口地址
      data: postData,
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data)
        if (res.data.code === 0) {
          wx.showToast({
            title: '终端新增成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function() {
            wx.switchTab({
              url: '../home/index'
            }, 2000)
            //跳转到商店详情页, 未确认返回信息暂时返回首页
            // wx.redirectTo({
            //   url: '../termainlDetails/index?termail_id=' + termail_id,
            // })
          })
        } else {
          wx.showToast({
            title: '终端新增失败:' + res.data.msg,
            icon: 'none',
          })
        }
      },
      fail(error) {
        // console.log(error)
        wx.showToast({
          title: '终端新增失败:' + error,
          icon: 'none'
        })
      }
    })
    /**
        app.callData.postRequest(app.globalData.appApi + 'user/addStore.do', {
          data: JSON.stringify({
            'user_id': user_id,
            'term_id': term_id,
            'address': address,
            'area': area,
            'mobile': mobile,
            'remark': remark,
            'store_name': store_name,
            'store_represent': store_represent,
            'img_cert': img_cert,
            'img_shop1': qiniuImageArr[0],
            'img_shop2': qiniuImageArr[1],
            'img_shop3': qiniuImageArr[2],
            'img_shop4': qiniuImageArr[3],
            'img_shop5': qiniuImageArr[4],
            'lon': lon,
            'lat': lat,
            'labels': labels.join(),
            'proportion': proportion,
            'competes': competes.join(),
            'channel_type': channel_type
          })
        }, {
          'content-type': 'application/x-www-form-urlencoded',
          'access_token': access_token
        }).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            setTimeout(function() {
              wx.switchTab({
                url: '../home/index'
              }, 3000)
            })
          } else {
            wx.showToast({
              title: '新增数据失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
     */
  }
})