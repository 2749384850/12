// pages/login/login.js
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
    phoneNum: "",
    email: "",
    verificationCode: "",
    stuNumber: "",
    userNumber: "",
    password: "",
    rePassword: "",
    ids:[]
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
        title: '学号不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (!myreg.test(e.detail.value)) {
      wx.showToast({
        title: '请输入正确的学号',
        icon: 'none',
        duration: 1000
      })
    }
  },
  blurUserName: function (e) {
    this.setData({
      focusUserName: false,
      userNumber: e.detail.value
    })
    if (e.detail.value == "") {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
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
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.length < 6) {
      wx.showToast({
        title: '密码不得少于6位',
        icon: 'none',
        duration: 1000
      })
    }
  },
  blurRePassword: function (e) {
    console.log(this.data.password);
    this.setData({
      focusRePassword: false,
      rePassword: e.detail.value
    })
    if (e.detail.value == "") {
      wx.showToast({
        title: '请确认密码',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value != this.data.password) {
      wx.showToast({
        title: '与第一次输入密码不同，请再次确认密码',
        icon: 'none',
        duration: 1000
      })
    }
  },
  //提交时验证
  submit: function () {
    if ( this.data.password.length >= 6 && this.data.password == this.data.rePassword) {
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 1000
      })
      const albumIds = ({
        stuNumber:'',
        UserName:'',
        password:''
      });
      db.collection('pra').add({
        data: {
          stuNumber:this.data.stuNumber,
          UserName:this.data.userNumber,
          password:this.data.password,
          type:'students'
        }
      })
    }else {
      wx.showToast({
        title: '注册失败',
        icon: 'none',
        duration: 1000
      })
    }
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