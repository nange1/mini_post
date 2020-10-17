const http = require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infomsg:{},
    details:[
      {time:'16:51:23',data:'2020-09-28',message:'【上海市】到达【合肥中转站】'},
      {time:'23:51:23',data:'2020-09-27',message:'【上海市】到达【上海市】'},
      {time:'21:51:23',data:'2020-09-26',message:'【上海市】快件离开【嘉定】已发往【合肥中转部】'},
      {time:'21:51:23',data:'2020-09-25',message:'【上海市】【嘉定】的震威已揽件'},
    ],
  },
  calltell(){
    wx.makePhoneCall({
      phoneNumber: '123456789',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token')
    let that = this
    if(options.num){
      wx.request({
        url: `${http.URLS}/getDetail`,
        method:'POST',
        data:{
          com:options.com?options.com:'yuantong',
          num: options.com?options.num:'YT9246141330955',
          u_token: token
        },
        success(res){
          if(res.data.code==27){
            wx.clearStorage('token')
            wx.clearStorage('phone')
            wx.navigateBack()
          }
          if(res.data.status == 200){
            res.data.data.map(ele=>{
              ele.time = ele.time.split(" ")
            })
            that.setData({
              infomsg: res.data
            })
          }
        }
      })
    }
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