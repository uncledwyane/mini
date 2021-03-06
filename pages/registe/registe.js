// pages/registe/registe.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickName: '',
        stuId: '',
        password: '',
        avatarUrl: '',
        gender: '男',
        type: 'login'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '登录注册',
      })
    },
    login: function(){
        var self = this;
        if(!self.data.nickName || !self.data.password){
            wx.showToast({
              title: '信息不全！',
              icon: 'none'
            })
        }else{
            wx.request({
              url: 'http://localhost:3000/login',
              method: "POST",
              data: {
                  nickName: self.data.nickName,
                  password: self.data.password
              },
              success(res){
                if(res.data.code == 2007){
                    var user = res.data.data[0];
                    wx.setStorage({
                      data: true,
                      key: 'isLogin',
                    })
                    wx.setStorage({
                      data: user,
                      key: 'userInfo',
                    })
                    wx.showToast({
                      title: '登录成功',
                    })
                    wx.reLaunch({
                      url: '../index/index',
                    })
                }else if(res.data.code == 2006){
                    wx.showToast({
                      title: '密码错误',
                      icon: "none"
                    })
                }else if(res.data.code == 2001){
                    wx.showToast({
                      title: '用户不存在',
                      icon: "none"
                    })
                }
              },
              fail(err){
                wx.showToast({
                  title: '登录出错' + err,
                  icon: 'none'
                })
              }
            })
            wx.getStorage({
              key: 'loginUser',
              success(res){
                wx.setStorage({
                  data: res.data,
                  key: 'userInfo',
                })
                wx.setStorage({
                  data: true,
                  key: 'isLogin',
                })
                wx.showToast({
                  title: '登录成功',
                })
                wx.reLaunch({
                  url: '../index/index',
                })
              },
              fail(){
                wx.showLoading({
                  title: '登录出错',
                  icon: "none"
                })
              }
            })
        }
    },  
    
    getInfo: function(){
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              this.setData({
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl,
                gender: res.userInfo.gender == 1 ? '男' : '女'
              })
            }
          })
    },

    radioChange: function(e){
        console.log('radioChange: ', e.detail.value)
        this.setData({
            gender: e.detail.value
        })
    },
    changeType: function(e){
        var self = this;
        self.setData({
            type: e.currentTarget.dataset.name
        })
    },
    registe:function(){
        var self = this;
        var user = {
            nickName: self.data.nickName,
            password: self.data.password,
            avatarUrl: self.data.avatarUrl,
            gender: self.data.gender,
            stuId: self.data.stuId
        }
        console.log('resigte: ', user)
        if(self.data.nickName && self.data.password && self.data.avatarUrl &&self.data.gender && self.data.stuId){
            wx.request({
                url: 'http://localhost:3000/registe',
                method: 'POST',
                data: user,
                success(res){
                    console.log('requrest sccess: ', res)
                    if(res.data.code && res.data.code == 2002){
                        wx.showToast({
                          title: '用户名已存在~',
                          icon: 'none'
                        })
                        self.setData({
                            nickName: ''
                        })
                    }
                    else if(res.data.code && res.data.code == 2004){
                        wx.showToast({
                            title: '学号已存在~',
                            icon: 'none'
                          })
                          self.setData({
                              stuId: ''
                          })
                    }else{
                        wx.showToast({
                          title: '注册成功, 请登录',
                          icon: 'success'
                        })
                        self.setData({
                            type: "login"
                        })
                    }
                },
                fail(res){
                  console.log('requrest failed: ', res)
                }
              })

            wx.setStorage({
              data: user,
              key: 'loginUser',
              success(res){
                wx.showToast({
                      title: '注册成功, 请登录',
                      icon: 'success'
                    })
                    self.setData({
                        type: "login"
                    })
              }
            })
        }else{
            wx.showToast({
              title: '信息不全！',
              image: '../../resources/icon/error.png'
            })
        }
    }
})