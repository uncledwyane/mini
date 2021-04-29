// pages/upload/upload.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uploadType: 'photo',
        video_title: '',
        video_desc: '',
        video_cate: '测试',
        videoCate: [
          '测试',
          '语文',
          '数学',
          '其他'
        ],
        index: 0,
        role: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '上传',
      })

      var self = this;
      self.setData({
        role: wx.getStorageSync('userInfo').role
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

    setUploadType: function(e){
        console.log('setUploadType: ', e.currentTarget.dataset.name)
        var self = this;
        self.setData({
            uploadType: e.currentTarget.dataset.name
        })
    },
    bindPickerChange: function (e){
        var self = this;
        self.setData({
          index: e.detail.value
        })
        self.setData({
          video_cate: self.data.videoCate[e.detail.value]
        })
        console.log('+++bindPickerChange, e: ', e)
    },
    uploadPhoto: function(){
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
              console.log('upload success', res)
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
                },
                fail(err){
                    var tempPath = res.tempFilePaths[0];
                    var tempList = [];
                    tempList.push(tempPath);
                    wx.setStorage({
                      data: tempList,
                      key: 'tempImgList',
                    })
                }
              });
            },
            fail(err){
                console.log('upload faild')
                wx.showToast({
                  title: '上传失败' + JSON.stringify(err),
                  icon: "none"
                })
            }
        })
    },

    uploadVideo: function(){
        var self = this;
        if(!self.data.video_cate || !self.data.video_desc || !self.data.video_title){
            wx.showToast({
              title: '请输入完整信息!',
              icon: "none"
            })
        }else{
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = self.formatDate(date.getHours());
            var minutes = self.formatDate(date.getMinutes());
            var seconds = self.formatDate(date.getSeconds());
            var fullDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
            wx.chooseVideo({
                sourceType: ['album','camera'],
                maxDuration: 60,
                camera: 'back',
                success(res) {
                  // tempFilePath可以作为img标签的src属性显示图片
                  var videoObj = {
                      name: self.data.video_title,
                      desc: self.data.video_desc,
                      cate: self.data.video_cate,
                      url: res.tempFilePath,
                      date: fullDate,
                      username: wx.getStorageSync('userInfo').nickname
                  }
  
                  console.log('+++upload video: ', videoObj)

                  wx.showLoading({
                    title: '上传中'
                  })
                  wx.request({
                    url: 'http://localhost:3000/savevideo',
                    method: "POST",
                    data: videoObj,
                    success(res){
                        console.log('+++request /savevideo success: ', res)
                        wx.hideLoading({
                          success: (res) => {
                              wx.showToast({
                                title: '上传成功',
                                icon: "success"
                              })
                          },
                        })
                    },
                    fail(err){
                        console.log('+++request /savevideo err: ', err)
                        wx.showToast({
                          title: '上传失败！',
                          icon: "none"
                        })
                    }
                  })
                  wx.request({
                    url: 'url',
                  })

                },
                fail(err){
                    wx.showToast({
                      title: '上传视频失败' + err.errMsg,
                      icon: 'none'
                    })
                }
            })
        }
    },
    formatDate(value){
        return value < 10 ? '0' + value : value;
    },
    checkInput: function(e){
        console.log('checkInput: ', e)
        
    }
})