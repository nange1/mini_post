const app = getApp();
const utils = require("../../utils/util");
const http = require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //快递公司
    comp:0,
    complist:['中通','申通','韵达','天天快递','极速','圆通','百世'],
    goods:'',//物品信息
    goodslist: ['日用品','服饰','文件','食品','证件','数码家电','其他'],
    weights: 1,//重量
    goodspop:false,
    //日期
    dates:[],
    value:[0,0],
    timelists:['08:00--10:00','10:00--12:00','12:00--14:00','14:00--16:00','16:00--18:00','18:00--20:00'],
    daytime:[],
    isdatetime:false,
    datatimetext:'',
    //是否同意
    isagree:true,
    // 经纬度
    tolocation:'',
    formlocation:''
  },
  //选择快递公司
  selcomp(e){
    this.setData({
      comp: e.detail.value
    })
  },
  closegoodspop(e){
    if(e.currentTarget.dataset.type === 'goods'){
      this.setData({
        goods: ''
      })
    }
    this.setData({
      goodspop: false,
      isdatetime:false
    })
  },
  checkgood(){
    this.setData({
      goodspop: true
    })
  },
  stypenum(e){
    let num = this.data.weights;
    if(e.currentTarget.dataset.type === 'minus'){
      if(num > 1){
        num--
      }else{
        num = 1
      }
      this.setData({
        weights: num
      })
    }else{
      num++
      this.setData({
        weights: num
      })
    }
  },
  selitem(e){
    this.setData({
      goods: e.currentTarget.dataset.item
    })
  },
  confirmgoods(){
    if(this.data.goods === ''){
      wx.showToast({
        title: '请选择物品',
        icon: 'none'
      })
    }else{
      let that = this
      wx.request({
        url: `${http.URLS}/getPrice`,
        method:'POST',
        data:{
          from:that.data.formlocation,
          to:that.data.tolocation,
          weight:that.data.weights
        },
        success(res){
          // if(res.data.code == 1){
            that.setData({
              price:res.data.price?res.data.price:'--',
              goodspop: false
            })
          // }
        }
      })
    }
  },
  seldatetime(){
    this.setData({
      isdatetime: true
    })
  },
  confirmdatetime(){
    var today = new Date();
    var hour = today.getHours()
    let self = this
    if(8<=hour && hour<=18){
      self.setData({
        isdatetime: false,
        datatimetext: self.data.dates[self.data.value[0]].value + ' ' + self.data.timelists[self.data.value[1]]
      })
    }else{
      if(self.data.value[0] == 0){
        wx.showToast({
          title: '今日快递员已下班，请选择今日以后时间',
          icon:'none'
        })
      }else{
        self.setData({
          isdatetime: false,
          datatimetext: self.data.dates[self.data.value[0]].value + ' ' + self.data.timelists[self.data.value[1]]
        })
      }
    }
    
  },
  bindChange(e){
    let val = e.detail.value
    this.setData({
      value: val
    })
  },
  isagree(e){
    this.setData({
      isagree: !this.data.isagree
    })
  },
  placeorder(){
    let that = this
    if(that.data.username == ''){
      wx.showToast({
        title: '请填写寄件人信息',
        icon:'none'
      })
    }else if(that.data.susername == ''){
      wx.showToast({
        title: '请填写收件人信息',
        icon:'none'
      })
    }else if(that.data.goods == ''){
      wx.showToast({
        title: '请选择物品',
        icon:'none'
      })
    }else if(that.data.datatimetext == ''){
      wx.showToast({
        title: '请选择上门时间',
        icon:'none'
      })
    }else{
      wx.request({
        url: `${http.URLS}/createOrder`,
        method:'POST',
        data:{
          from_phone: that.data.usertell,
          from_name:that.data.username,
          from_address_id:that.data.fromcityid,
          from_address:that.data.useraddress,
          to_phone:that.data.stell,
          to_name:that.data.susername,
          to_address_id:that.data.tocityid,
          to_address:that.data.suseraddress,
          appointment_time:that.data.datatimetext,
          poster_type:that.data.complist[that.data.comp],
          package_name:that.data.goods,
          weight:that.data.weights,
          u_token: that.data.token
        },
        success(res){
          if(res.data.code == 1){
            wx.showToast({
              title: '下单成功',
              success(){
                wx.navigateTo({
                  url: '../orderlist/orderlist',
                })
              },
            })
          }
        },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载  
   */
  onLoad: function (options) {
    let dates=[];
    for(let i=0;i<3;i++){
      let text = i===0?'今天':i===1?'明天':'后天'
      var yesterday = utils.getDay(i, '-');
      let jsons={label:text,value:yesterday};
      dates.push(jsons)
    }
    var today = new Date();
    var hour = today.getHours()
    let arr = []
    let self = this
    if(8<=hour && hour<=18){
      if(hour%2 == 0){
        let num = (20-hour)/2
        for(let i=0;i<=num;i++){
          let H = hour >= 10 ? hour : '0'+hour
          arr.push(`${hour+(i*2)}--${hour+(i*2)+2}`)
        }
        self.setData({
          daytime:arr
        })
      }else{
        let num = (20-hour-1)/2
        for(let i=0;i<=num;i++){
          let H = hour >= 10 ? hour : '0'+hour
          arr.push(`${hour+(i*2)+1}--${hour+(i*2)+3}`)
        }
        self.setData({
          daytime:arr
        })
      }
    }else{
      arr[0] = '已下班'
      self.setData({
        daytime:arr
      })
    }
    wx.getStorage({
      key: 'token',
      success(res){
        self.setData({
          token: res.data
        })
      }
    })
    this.setData({
      dates
    })
  },
  addresslist(e){
    wx.navigateTo({
      url: '../addresslist/addresslist?tyep='+e.currentTarget.dataset.type+'&tolocation='+this.data.tolocation+'&formlocation='+this.data.formlocation+'&weights='+this.data.weights,
    })
  },
  newadded(e){
    wx.navigateTo({
      url: '../newadded/newadded?tyep='+e.currentTarget.dataset.type+'&tolocation='+this.data.tolocation+'&formlocation='+this.data.formlocation+'&weights='+this.data.weights,
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