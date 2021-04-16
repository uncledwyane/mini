// pages/upload/upload.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uploadType: 'photo'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    setUploadType: function(e){
        console.log('setUploadType: ', e.currentTarget.dataset.name)
        var self = this;
        self.setData({
            uploadType: e.currentTarget.dataset.name
        })
    },

    uploadPhoto: function(){
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
              // tempFilePath可以作为img标签的src属性显示图片
              wx.getStorage({
                key: 'tempImgList',
                success(imglist){
                    console.log('upload success')
                    var tempImgList = [];
                    tempImgList = imglist.data;
                    var tempFilePaths = res.tempFilePaths[0];
                    tempImgList.push(tempFilePaths);
                    wx.setStorage({
                        data: tempImgList,
                        key: 'tempImgList',
                        success(result){
                            wx.showToast({
                              title: '上传成功',
                            })
                            setTimeout(() => {
                                wx.hideToast({
                                  success: (res) => {},
                                })
                            }, 1000);
                        }
                    })
                }
              });
            },
            fail(err){
                console.log('upload faild')
                wx.showToast({
                  title: '上传失败' + err,
                  icon: "none"
                })
            }
        })
    },

    uploadVideo: function(){
        wx.chooseVideo({
            sourceType: ['album','camera'],
            maxDuration: 60,
            camera: 'back',
            success(res) {
              // tempFilePath可以作为img标签的src属性显示图片
              console.log(res.tempFilePath)
            }
        })
    },

    checkInput: function(e){
        console.log('checkInput: ', e)
        
    }
})