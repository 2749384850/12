const app = getApp();
const db = wx.cloud.database()
const _ = db.command;
var that = null;
Page({
  onLoad(){
    that = this;
  },
  onShow(){
    wx.showNavigationBarLoading()
    that.init();
    // that.toadmin();
  },
  toAdd(){
    // 此处需跳转至发帖页面 （待实现）
    wx.navigateTo({
      url: '../add/add', 
    })
  },
  todetail(e){
    app.globalData.item=e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  init(){
    db.collection('forum').get()
    .then(result =>{
      console.log(result);
      let items =result.data.map(item =>{
        item.data=app.nowdata(item.data);
        return item;
      })
      that.setData({
        items:items
      })
      wx.hideLoading();
      wx.hideNavigationBarLoading();
    })
  }
})