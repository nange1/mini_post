Page({

  /**
   * 页面的初始数据
   */
  data: {
    //快递公司
    comp:0,
    complist:[
      {title:'中通',pinyin:'zhongtong'},
      {title:'圆通',pinyin:'yuantong'},
      {title:'申通',pinyin:'shentong'},
      {title:'德邦',pinyin:'debangkuaidi'},
      {title:'EMS',pinyin:'ems'},
      {title:'百世汇通',pinyin:'huitongkuaidi'},
      {title:'京东',pinyin:'jd'},
      {title:'顺丰',pinyin:'shunfeng'},
      {title:'韵达',pinyin:'yunda'},
      {title:'邮政',pinyin:'youzhengguonei'},
      {title:'天天',pinyin:'tiantian'},
      {title:'宅急送',pinyin:'zhaijisong'},
    ],
  },
  //选择快递公司
  selcomp(e){
    this.setData({
      comp: e.detail.value
    })
  },
  formSubmit(e){
    if(e.detail.value.ordernum == ''){
      wx.showToast({
        title: '请输入订单号',
        icon: 'none'
      })
    }else{
      wx.navigateTo({
        url: '../orderdetail/orderdetail?num='+e.detail.value.ordernum+'&com='+this.data.complist[this.data.comp].pinyin,
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