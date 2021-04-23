// pages/myinfo/myinfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        role: '',
        showPlayRecord: false,
        showUpload: false,
        showModifyPass: false,
        showUserManage: false,
        showVideoManage: false,
        showCateManage: false,
        playRecord: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this;
        wx.getStorage({
          key: "userInfo",
          success(res){
            self.setData({
              userInfo: res.data,
              role: res.data.role
            })
          }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    
    getInfo: function(){
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              this.setData({
                userInfo: res.userInfo,
                role: res.role
              })
            }
          })
    },

    logout(){
      var self = this;
      wx.showModal({
        title: '退出',
        content: '确定要退出吗？',
        success (res) {
          if (res.confirm) {
            wx.clearStorage({
              success: (res) => {
                console.log('clear storage success, res: ', res)
              },
            })
            wx.showToast({
              title: '退出成功',
              icon: "success"
            })
            
            wx.reLaunch({
              url: '../registe/registe',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    playRecord(){
      wx.navigateTo({
        url: '../playrecord/playrecord',
      })
    },
    myUpload(){
      wx.navigateTo({
        url: '../myupload/myupload',
      })
    },
    modifyPass(){
      wx.navigateTo({
        url: '../modify/modify',
      })
    },
    userManage(){
      wx.navigateTo({
        url: '../usermanage/usermanage',
      })
    },
    videoManage(){
      wx.navigateTo({
        url: '../videomanage/videomanage',
      })
    },
    cateManage(){
      wx.navigateTo({
        url: '../catemanage/catemanage',
      })
    }
})