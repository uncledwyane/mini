// pages/modify/modify.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mypassword: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var self = this;
      self.setData({
        'mypassword': wx.getStorageSync('userInfo').password
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
    updatePass(){
        var self = this;
        wx.request({
          url: 'http://localhost:3000/updatepass',
          data: {
              username: wx.getStorageSync('userInfo').nickname,
              password: self.data.mypassword
          },
          method: "POST",
          success(res){
              wx.showToast({
                title: '修改成功,重新登录',
                icon: "none"
              })
              wx.clearStorage({
                success: (res) => {
                  console.log('clear storage success, res: ', res)
                },
              })
              wx.reLaunch({
                url: '../registe/registe',
              })
          }
        })
    }
})