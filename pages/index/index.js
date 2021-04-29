// index.js
// 获取应用实例
const app = getApp()
const config = require('../../config')
Page({
  data: {
    tempimg: [],
    allcate: null,
    cateType: '测试',
    videos: null,
    keyword: ''
  },
  // 事件处理函数
  bindViewTap() {
  },
  onLoad() {
    var self = this;
    self.getImgListFromStorage();
    wx.getStorage({
      key: 'isLogin',
      success(res){

      },
      fail(res){
        wx.showToast({
          title: '请登录！',
        })
        wx.reLaunch({
          url: '../registe/registe',
        })
      }
    })

    wx.setNavigationBarTitle({
      title: '首页',
    })

    self.getAllCate()

    self.getVideo(self.data.cateType);
  },
  onShow(){
    var self =this;
    self.getAllCate()
  },
  searchvideo(){
    var self = this;
    var keyword = self.data.keyword;
    wx.request({
      url: 'http://localhost:3000/searchvideo',
      data: {
        keyword: keyword
      },
      method: "POST",
      success(res){
        console.log(res.data.data)
        if(res.data.data){
          self.setData({
            videos: res.data.data
          })
        }else{
          self.setData({
            videos: null
          })
        }
      }
    })
  },
  getAllCate(){
    var self = this;
    wx.request({
      url: 'http://localhost:3000/allcate',
      method: 'GET',
      success(res){
        wx.setStorage({
          data: res.data.data,
          key: 'allcate',
        })

        self.setData({
          allcate: res.data.data
        })
      }
    })

  },
  getImgListFromStorage(){
    var self = this;
    wx.getStorage({
      key: 'tempImgList',
      success(res){
        self.setData({
          tempimg: res.data
        })
      }
    })
  },

  onShow() {
    console.log('homepage show')
    var self = this;
    self.getImgListFromStorage();
  },

  onHide() {
    console.log('homepage hide')
  },

  saveToWatch(vId){
      var videoObj = {
        v_id: vId,
        username: wx.getStorageSync('userInfo').nickname
      }

      wx.request({
        url: 'http://localhost:3000/watch',
        data: videoObj,
        method: "POST",
        success(res){
          console.log(res)
        },
        fail(err){
          console.log(err)
        }
      })
  },
  upload: function(){
  },
  setCateType(e){
    var self = this;
    self.setData({
      cateType: e.target.dataset.name
    })
    self.getVideo(e.target.dataset.name);
  },

  getVideo(cate){
    console.log(cate)
    var self = this;
    wx.request({
      url: 'http://localhost:3000/getvideobycate',
      data: {
        cate: cate
      },
      method: 'GET',
      success(res){
        console.log('+++getVideo success: ', res.data.data)
        if(res.data.data){
          self.setData({
            videos: res.data.data
          })
        }else{
          self.setData({
            videos: null
          })
        }
      },

      fail(err){
        console.log('+++getVideo err: ', err)

      }
    })
  },
  showDetail(e){
    var self = this;
    var v_id = e.currentTarget.dataset.name;
    var playUrl = e.currentTarget.dataset.playurl;
    var title = e.currentTarget.dataset.title;
    console.log(e)
    self.saveToWatch(v_id);
    wx.navigateTo({
      url: '../couse/couse',
      success(res){
        res.eventChannel.emit('currentVid', {
          v_id: v_id,
          title: title,
          playUrl: playUrl
        })
      }
    })
  }
})
