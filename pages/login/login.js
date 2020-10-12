const app = getApp();
const http = require('../../utils/http')
const reg = /^1[3456789]\d{9}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 60,
    tells:'',
    ifcode:false,
    openid:''
  },
  //填写手机号
  gettell(e){
    this.setData({
      tells: e.detail.value
    })
  },
  //获取验证码
  getcode(){
    if(this.data.tells == ''){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
    }else if(!reg.test(this.data.tells)){
      wx.showToast({
        title: '手机号格式错误',
        icon:'none'
      })
    }else {
      let num = this.data.num
      let that = this
      wx.request({
        url: `${http.URLS}/sendSms`,
        method:'POST',
        data:{phone:this.data.tells},
        success(res){
          if(res.data.code == 1){
            wx.showToast({
              title: '获取成功',
            })
            let times = setInterval(function(){
              if(num > 0){
                num--
                that.setData({
                  num,
                  ifcode:true
                })
              }else{
                clearInterval(times)
                that.setData({
                  num: 60,
                  ifcode:false
                })
              }
            },1000)
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
          }
        }
      })
    }
  },
  formSubmit(e){
    let that = this
    if(this.data.tells == ''){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
    }else if(!reg.test(this.data.tells)){
      wx.showToast({
        title: '手机号格式错误',
        icon:'none'
      })
    }else if(e.detail.value.authorder == ''){
      wx.showToast({
        title: '验证码不能为空',
        icon:'none'
      })
    }else{
      wx.request({
        url: `${http.URLS}/xcxLogin`,
        method:'POST',
        data:{
          phone:this.data.tells,
          code: e.detail.value.authorder,
          xcx_opid:that.data.openid
        },
        success(res){
          if(res.data.code == 1){
            // wx.setStorageSync('token', res.data.data.token)
            wx.setStorage({
              key:"token",
              data:res.data.data.token
            })
            wx.switchTab({
              url: '../index/index',
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
          }
        }
      })
    }
  },

  login(){
    let that = this
    wx.login({
      success(res){
        if(res.code){
          wx.request({
            url: `${http.URLS}/getMiniCode`,
            method:'POST',
            data:{code:res.code},
            success(res){
              if(res.data.data.openid){
                that.setData({
                  openid: res.data.data.openid
                })
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.login()
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