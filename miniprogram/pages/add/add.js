const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
var that = null;
Page({
  data: {
    text: '',
    photo: []
  },
  onLoad(options) {
    that = this;
  },
  gettext(e) {
    that.setData({
      text: e.detail.value
    })
  },
  chooseimage() {
    //选择图片，一共8张
    wx.chooseImage({
      count: 8 - that.data.photo.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        //选择完成后，把图片列表追加到已有的列表中
        console.log('res.tempFilePaths:', res.tempFilePaths)

        that.setData({
          photo: that.data.photo.concat(res.tempFilePaths)
        })
      }
    })
  },
  previewimg(e) {
    wx.previewImage({
      urls: that.data.photo,
      current:e.currentTarget.dataset.url
    })
  },
  removeimg(e) {
    //删除图片
    wx.showModal({
      title: '提示',
      content: '是否要删除该图片',
      success(res) {
        if (res.confirm) {
          let url = e.currentTarget.dataset.url;
          let urls = that.data.photo;
          urls.splice(urls.indexOf(url), 1);
          that.setData({
            photo: urls
          })
        }
      }
    })
  },
  done(e){
    //开始执行上传
    console.log(e.detail.userInfo)
    if(e.detail.userInfo){
      that.authorname = e.detail.userInfo.nickName;
      that.authorimg = e.detail.userInfo.avatarUrl;
      if(that.data.text.length>=5){
            uploadimg(that.data.photo);       
        }
      }
      else{
        wx.showModal({
          title:'提示',
          content:'需要写5个字以上才能发表帖子',
          showCancel:false
        })}},
  async uploadimg(imgs){
    //帖子图片上传
    let result = [];
    for(let item of imgs){
      wx.showLoading({
        title: '图片上传中',
        mask: true
      })
      let files = await wx.cloud.uploadFile({
        cloudPath: `hole/${Date.now()}-${Math.floor(Math.random(0,1)*1000)}.png`,
        filePath: item
      });
      console.log('files:', files)
      wx.showLoading({
        title: '检测安全中',
        mask: true
      })
      let secres = await that.imagesec(files.fileID);
      console.log('secres:', secres)
      if(secres)
        result.push(files);
    }

    console.log('uploadimg res:', result)
    that.additem(result);
    //TODO 帖子图片上传
  },
  imagesec(fileID){
    //TODO 图片安全检查
    return new Promise((resolve, reject)=>{
     wx.cloud.callFunction({
       name:'imagesec',
       data:{
         img:fileID
       },
       success(res){
         resolve(true);
       },
       fail(e){
         console.log('e:',e)
         wx.cloud.deleteFile({
           fileList: [fileID]
         });
         resolve(false);
       }
     });
    })
  },
  additem(photos) {
    //TODO 新建帖子
    const albumPhotos = photos.map(photo => photo.fileID);
    console.log('albumPhotos', albumPhotos)
    db.collection('forum').add({
      data:{
        content:that.data.text,
        image:albumPhotos,
        data:new Data(),
        
      }
    }).then(result => {
      console.log(' result: ', result)
      wx.hideLoading();
      wx.navigateBack({
        delita:1
      })
    }).catch(err =>{
      wx.hideLoading();
    })
  },
})
