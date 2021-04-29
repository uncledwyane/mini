// pages/catemanage/catemanage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cates: null,
        cate: ''
    },

    onLoad(){
        var self = this;
        self.getAllCate()
    },

    deleteCate(e){
        var self = this;
        var catename = e.currentTarget.dataset.catename;
        wx.showModal({
            cancelColor: 'cancelColor',
            cancelText: '取消',
            confirmColor: 'confirmColor',
            confirmText: '确认',
            content: '删除提示',
            showCancel: true,
            title: '确认删除该分类吗',
            success: (res) => {
              if(res.confirm){
                wx.request({
                    url: 'http://localhost:3000/deletecate',
                    method: "POST",
                    data: {
                        catename: catename
                    },
                    success(res){
                      wx.showToast({
                        title: '删除成功',
                      })
                      self.getAllCate()
          
                    }
                  })
              }
            }
          })
        
    },
    getAllCate(){
        var self = this;
        wx.request({
          url: 'http://localhost:3000/allcate',
          method: "GET",
          success(res){
              self.setData({
                  cates: res.data.data
              })
          }
        })
    },
    addCate(){
        var self = this;
        wx.request({
          url: 'http://localhost:3000/addcate',
          data: {
              catename: self.data.cate
          },
          method: "POST",
          success(){
            wx.showToast({
              title: '添加成功',
            })
            self.getAllCate()
            self.setData({
                cate: ''
            })
          }
        })
    }
})