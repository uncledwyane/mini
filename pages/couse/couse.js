// pages/couse/couse.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        vId: '',
        playUrl: '',
        title: '',
        role: '',
        questionContent: '',
        username: '',
        questionList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this;
        var role = wx.getStorageSync('userInfo').role;
        var username = wx.getStorageSync('userInfo').nickname;
        var eventChannel = self.getOpenerEventChannel();
        eventChannel.on('currentVid', function(data){
            console.log('received data: ', data);
            self.setData({
                vId: data.v_id,
                playUrl: data.playUrl,
                title: data.title,
                role: role,
                username: username
            })
            self.getQuestions();
        })
        wx.setNavigationBarTitle({
            title: '课程详情',
          })
    },
    sendQuestion(){
        var self = this;
        var question = {
            v_id: self.data.vId,
            q_content: self.data.questionContent,
            q_username: self.data.username
        }
        wx.request({
          url: 'http://localhost:3000/savequestion',
          data: question,
          method: "POST",
          success(res){
            wx.showToast({
              title: '提问成功',
              icon: "none"
            })
            self.setData({
                questionContent: ''
            })
            self.getQuestions()
          }
        })
    },
    getQuestions(){
        var self = this;
        wx.request({
            url: 'http://localhost:3000/getquestions',
            method: "POST",
            data: {
                v_id: self.data.vId
            },
            success(res){
                console.log('+++getQuestions: ', res.data)
                self.setData({
                    questionList: res.data.data
                })
            }
        })
    },
    viewquestion(e){
        var self = this;
        var question = e.currentTarget.dataset.question;
        wx.navigateTo({
          url: '../question/question',
          success(res){
              res.eventChannel.emit('question', question)
          }
        })
    }
})