const http = require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:{}
  },
  getdetail(e){
    wx.navigateTo({
      url: '../orderdetail/orderdetail?num='+e.currentTarget.dataset.num,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token')
    let that = this
    if(options.id){
      wx.request({
        url: `${http.URLS}/orderDetail?order_id=${options.id}&u_token=${token}`,
        method:'GET',
        success(res){
          if(res.data.code==27){
            wx.clearStorage('token')
            wx.clearStorage('phone')
            wx.navigateBack()
          }
          if(res.data.code == 1){
            that.setData({
              orderInfo: res.data.data
            })
          }
        }
      })
    }
  },
  paymonery(){
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success (res) { },
      fail (res) { }
    })
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