// pages/usermanage/usermanage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        users: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this;

        self.getUsers()
    },
    getUsers(){
        var self = this;

        wx.request({
          url: 'http://localhost:3000/alluser',
          method: "GET",
          success(res){
                self.setData({
                    users: res.data.data
                })
          }
        })
    },
    deleteUser(e){
        var self =  this;
        var nickname = e.currentTarget.dataset.username;
        console.log('delete user : ', nickname)
        if(nickname == wx.getStorageSync('userInfo').nickname){
            wx.showToast({
              title: '不能删除自己！',
              icon: "none"
            })
        }else{
            wx.showModal({
                cancelColor: 'cancelColor',
                cancelText: '取消',
                confirmColor: 'confirmColor',
                confirmText: '确认',
                content: '删除提示',
                showCancel: true,
                title: '确认删除该用户吗',
                success: (res) => {
                  if(res.confirm){
                      wx.request({
                        url: 'http://localhost:3000/deleteuser',
                        data: {
                            nickname: nickname
                        },
                        method: "POST",
                        success(res){
                            wx.showToast({
                              title: '删除成功',
                            })
      
                            self.getUsers()
                        }
                      })
                  }
                }
              })
        }
    }
})