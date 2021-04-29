// pages/question/question.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        question: null,
        replayContent: '',
        role: wx.getStorageSync('userInfo').role,
        currentUserName: wx.getStorageSync('userInfo').nickname,
        replays: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var eventChannel = this.getOpenerEventChannel();
        var self = this;
        eventChannel.on('question', function(res){
            self.setData({
                question: res
            })

            self.getAllReplay()
        })

        wx.setNavigationBarTitle({
            title: '问答',
          })
    },
    
    sendAnswer(){
        var self = this;
        var replayObj = {
            content: self.data.replayContent,
            q_id: self.data.question.q_id,
            username: self.data.currentUserName
        }
        wx.request({
          url: 'http://localhost:3000/savereplay',
          data: replayObj,
          method: 'POST',
          success(res){
              self.setData({
                    replayContent: ''
              })
            self.getAllReplay();
          },
          fail(err){
            wx.showToast({
              title: '回复出错！',
              icon: "none"
            })
          }
        })
    },
    getAllReplay(){
        var self = this;
        wx.request({
            url: 'http://localhost:3000/allreplay',
            method: 'GET',
            data: {
                q_id: self.data.question.q_id
            },
            success(res){
                self.setData({
                    replays: res.data.data
                })
            }
          })
    }
})