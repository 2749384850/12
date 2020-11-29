// pages/lo/lo.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command;

Page({
  data: {
    focusVerificationCode: false,
    focusStuNumber: false,
    focusUserName: false,
    focusPassword: false,
    focusRePassword: false,
    verificationCode: "",
    stuNumber: "",
    userNumber: "",
    password: "",
    rePassword: "",
    ids:[],
    password1:''
  },

  phoneRegister: function () {
    this.setData({
      registerParam: 1,
    })
  },

  emailRegister: function () {
    this.setData({
      registerParam: 0
    })
  },

  focusPhoneNum: function () {
    this.setData({
      focusPhoneNum: true
    })
  },
  focusEmail: function () {
    this.setData({
      focusEmail: true
    })
  },
  focusVerificationCode: function () {
    this.setData({
      focusVerificationCode: true
    })
  },
  focusStuNumber: function () {
    this.setData({
      focusStuNumber: true
    })
  },
  focusUserName: function () {
    this.setData({
      focusUserName: true
    })
  },
  focusPassword: function () {
    this.setData({
      focusPassword: true
    })
  },
  focusRePassword: function () {
    this.setData({
      focusRePassword: true
    })
  },
  blurStuNumber: function (e) {
    this.setData({
      focusStuNumber: false,
      stuNumber: e.detail.value
    })
    let myreg = /^(201|202)\d{8}$/;
    if (e.detail.value == "") {
      wx.showToast({
        title: '请输入学号',
        icon: 'none',
        color:'red',
        duration: 1000
      })
    } else if (!myreg.test(e.detail.value)) {
      wx.showToast({
        title: '请输入正确的学号',
        icon: 'none',
        color:'red',
        duration: 1000
      })
    }
  },
  blurPassword: function (e) {
    this.setData({
      focusPassword: false,
      password: e.detail.value
    })
    if (e.detail.value == "") {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1000
      })
    } 
  },
  //提交时验证
  submit: function (event)  {
    let res = db.collection('pra').where({
      stuNumber:this.data.stuNumber
    }).get().then(res=>{
      this.setData({
        password1:res.data[0].password
      })
  });
    if (this.data.password1 == this.data.password) {   
      wx.showToast({
        title: '登录成功',
        icon: 'none',
        duration: 1000
      })
      wx.navigateTo({
        url: '/pages/index/index',
      })
    } else{
      wx.showToast({
        title: '密码错误',
        icon: 'none',
        duration: 1000
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {

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

  }
})