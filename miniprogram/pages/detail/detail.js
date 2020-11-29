// pages/detail/detail.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command;
var that = null;
Page({
  onLoad(){
    that = this;
    that.setData({
      item:app.globalData.item
    });
  },
  onShow(){
    that.init();
    wx.getSetting({
      success(res){
        if(res.authSetting['scope.userInfo']==true){
          wx.getUserInfo({
            success(res){
              that.setData({
                myimg:res.userInfo.avatarUrl
              });
            }
          })
        }
      }
    })
  },
  init(){
    db.collection('comment').where({
      pid:that.data.item._id
    }).get()
    .then(result => {
      console.log(result);
      let items =result.data.map(item=>{
        item.data=app.nowdata(item.data);
        return item;
      })
      that.setData({
        comment:items,
        text:''
      })
      wx.hideLoading();
      wx.hideNavigationBarLoading();
    })
  },
  gettext(e){
    that.setData({
      text: e.detail.value
    })
  },
  comment(e){
    //提交评论
    if(e.detail.userInfo){
      that.authorname = e.detail.userInfo.nickName;
      that.authorimg = e.detail.userInfo.avatarUrl;
      if(that.data.text.length>=5){
        wx.showLoading({
          title: '评论中',
          mask:true
        })
      wx.cloud.callFunction({
        name:'textsec',
       data:{
         text:that.data.text
       } ,
       success(){
         db.collection('comment').add({
           data:{
             pid:that.data.item._id,
             contene:that.data.text,
             date:new DataCue(),

           }
         }).then(result=>{
           that.init();
         })
       },
       fail(e){
         wx.hideLoading();
         wx.showModal({
           title:'提示',
           content:'你的评论中有不安全内容，请修改后重试',
           showCancel:false
         })
       }
      })
      }
      else{
        wx.showModal({
          title:'提示',
          content:'需要写5个字以上才能发表评论',
          showCancel:false
        })
      }
    }
    else{
      wx.showModal({
        title:'提示',
        content:'为了实名安全考虑，你需要授权信息才可以发表评论',
        showCancel:false
      })
    }
  },
  removeitem(e){
    //删除自己的评论
    wx.showLoading({
      title: '删除中',
      mask:true
    })
    console.log(e);
    db.collection('comment').doc(e.currentTarget.dataset.item._id).remove()
    .then(res => {
        that.init();
    }).catch(err=>console.log(err))
  },
  previewimg(e) {
    //浏览图片
    wx.previewImage({
      urls: that.data.item.image,
      current: e.currentTarget.dataset.url
    })
  },
  removemain(e){
    wx.showModal({
      title:'提示',
      content:'是否需要删除该帖子',
      success(res) {
        if(res.confirm){
          wx.showLoading({
            title: '删除中',
            mask:true
          })
          console.log(e);
          db.collection('forum').doc(that.data.item._id).remove()
          .then(res => {
             wx.cloud.deleteFile({
               fileList:that.data.item.image
             }).then(result => {
               wx.navigateBack({
                 delta:1
               })
             });
          }).catch(err=>{
            wx.navigateBack({
              delta:1
            })
          })
        }
      }
    });
  }
})