const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('phone')
    })
  },
  tellphont(){
    wx.makePhoneCall({
      phoneNumber: '123456',
    })
  },
  authentication(){
    wx.navigateTo({
      url: '../authentication/authentication',
    })
  },
  orderlist(){
    wx.navigateTo({
      url: '../orderlist/orderlist',
    })
  },
  searchorder(){
    wx.navigateTo({
      url: '../searchorder/searchorder',
    })
  },
  exit(){
    wx.clearStorage({
      success: (res) => {
        wx.reLaunch({
          url: '../login/login',
        })
      },
    })
  },
  addresslist(){
    wx.navigateTo({
      url: '../addresslist/addresslist',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成  authentication
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