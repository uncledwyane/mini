// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    tempimg: []
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
        wx.navigateTo({
          url: '../registe/registe',
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

  upload: function(){
  }
})
