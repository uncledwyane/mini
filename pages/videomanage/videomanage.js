// pages/videomanage/videomanage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videos: null
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this;
        self.getVideos()
    },
    getVideos(){
        var self = this;

        wx.request({
          url: 'http://localhost:3000/allvideo',
          method: "GET",
          success(res){
                self.setData({
                    videos: res.data.data
                })
          }
        })
    },
    deleteVideo(e){
        var self =  this;
        var vId = e.currentTarget.dataset.vid;
        console.log('delete video , ', vId)
        wx.showModal({
            cancelColor: 'cancelColor',
            cancelText: '取消',
            confirmColor: 'confirmColor',
            confirmText: '确认',
            content: '删除提示',
            showCancel: true,
            title: '确认删除该视频吗',
            success: (res) => {
              if(res.confirm){
                  wx.request({
                    url: 'http://localhost:3000/deletevideo',
                    data: {
                        v_id: vId
                    },
                    method: "POST",
                    success(res){
                        wx.showToast({
                          title: '删除成功',
                        })
  
                        self.getVideos()
                    }
                  })
              }
            }
          })
    }
})