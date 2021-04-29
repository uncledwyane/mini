
Page({

    /**
     * 页面的初始数据
     */
    data: {
        playRecords: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getRecords()
        wx.setNavigationBarTitle({
          title: '我的上传',
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
    deleteAll(){
        var self = this;
        wx.showModal({
            title: '提示',
            content: '确认删除全部记录？',
            success (res) {
              if (res.confirm) {
                wx.request({
                  url: 'http://localhost:3000/deleteallwatch',
                  data: {
                      username: wx.getStorageSync('userInfo').nickname
                  },
                  method: "POST",
                  success(res){
                      wx.showToast({
                        title: '删除成功',
                        icon: "success"
                      })
                      self.setData({
                          playRecords: null
                      })
                  }
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
    },
    getRecords(){
        var self = this;
        wx.request({
          url: 'http://localhost:3000/uploadbyusername',
          method: "GET",
          data: {
              username: wx.getStorageSync('userInfo').nickname
          },
          success(res){
            self.setData({
                playRecords: res.data.data
            })
          }
        })
    }
})