const http = require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    tablist:[
      {text:'全部', id:'all'},
      {text:'未派单', id:'0'},
      {text:'已派单', id:'1'},
      {text:'待核验', id:'2'},
      {text:'待支付', id:'3'},
      {text:'运输中', id:'4'},
      {text:'已收货', id:'5'},
      {text:'已取消', id:'-1'}
    ],
    tabdex:'all',
    orderlist:[],
  },
  orderclick(e){
    this.setData({
      tabdex:e.currentTarget.dataset.i
    })
    this.getorderlist(this.data.token)
  },
  orderdetail(e){
    wx.navigateTo({
      url: '../orderInfo/orderInfo?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token')
    let that = this
    that.getorderlist(token)
    this.setData({
      token
    })
  },
  getorderlist(token){
    let that = this
    let orderlist = []
    wx.request({
      url: `${http.URLS}/orderList?u_token=${token}&order_status=${that.data.tabdex}`,
      method:'get',
      success(res){
        if(res.data.code==27){
          wx.clearStorage('token')
          wx.clearStorage('phone')
          wx.navigateBack()
        }
        if(res.data.code == 1){
          res.data.data.rows.map(ele=>{
            ele.from_address = ele.from_address.split('市')[0]+'市'
            ele.to_address = ele.to_address.split('市')[0]+'市'
          })
          that.setData({
            orderlist: res.data.data.rows
          })
        }
      }
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