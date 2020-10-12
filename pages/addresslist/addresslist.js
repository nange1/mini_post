const app = getApp();
const http = require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresslist:[],
    token:'',
    types:'',
    tolocation:'',
    formlocation:'',
    weights:'',
    price:''
  },
  //获取价格
  getPrice(from,to,weight){
    let that = this
    wx.request({
      url: `${http.URLS}/getPrice`,
      method:'POST',
      data:{
        from,
        to,
        weight
      },
      success(res){
        if(res.data.code == 1){
          that.setData({
            price:res.data.price
          })
        }
      }
    })
  },
  getaddress(e){
    let that = this
    console.log(that.data.price)
    let list = this.data.addresslist
    let i = e.currentTarget.dataset.dex
    const pages = getCurrentPages();
    const prevpage = pages[pages.length - 2]
    if(this.data.types == 1){
      prevpage.setData({
        username: list[i].user_name,
        usertell: list[i].phone,
        useraddress: list[i].province+list[i].area+list[i].areas,
        userdetailaddress: list[i].address_name,
        tolocation:list[i].point,
        price:that.data.price,
        fromcityid: list[i].address_id
      })
      wx.navigateBack()
    }else if(this.data.types == 2){
      prevpage.setData({
        susername: list[i].user_name,
        stell: list[i].phone,
        suseraddress: list[i].province+list[i].area+list[i].areas,
        suserdetailaddress: list[i].address_name,
        formlocation:list[i].point,
        price:that.data.price,
        tocityid: list[i].address_id
      })
      wx.navigateBack()
    }else{
      wx.navigateBack()
    }
  },
  defaultadd(e){
    let list = this.data.addresslist
    list.map(e=>{
      e.is_default = '0'
    })
    list[e.currentTarget.dataset.dex].is_default = '1'
    this.setData({
      addresslist: list
    })
    let that = this
    wx.request({
      url: `${http.URLS}/defaultAddress`,
      method:'post',
      data:{
        u_token:that.data.token,
        address_id:list[e.currentTarget.dataset.dex].address_id,
        is_default:list[e.currentTarget.dataset.dex].is_default
      },
      success(res){
        console.log(res)
      }
    })
  },
  remove(e){
    let that = this
    let list = this.data.addresslist
    let dex = e.currentTarget.dataset.dex
    wx.showModal({
      title: '确认删除吗？',
      content: '删除后不可恢复',
      confirmColor: '#F06261',
      success(res){
        if(res.confirm){
          wx.request({
            url: `${http.URLS}/delAddress`,
            method:'post',
            data:{
              u_token:that.data.token,
              address_id:list[e.currentTarget.dataset.dex].address_id,
            },
            success(res){
              console.log(res)
              if(res.data.code == 1){
                list.splice(dex,1)
                that.setData({
                  addresslist: list
                })
                wx.showToast({
                  title: '删除成功',
                })
              }
            }
          })
        }
      }
    })
  },
  newadded(){
    wx.navigateTo({
      url: '../newadded/newadded',
    })
  },
  editbtn(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../newadded/newadded?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let token = ''
    wx.getStorage({
      key: 'token',
      success(res){
        token = res.data
        wx.request({
          url: `${http.URLS}/getAddress`,
          method:'post',
          data:{u_token:token},
          success(res){
            if(res.data.code == 1){
              that.setData({
                addresslist: res.data.data
              })
            }
          },
        })
        that.setData({
          token: res.data
        })
      },
    })
    this.setData({
      types: options.tyep,
      tolocation:options.tolocation,
      formlocation:options.formlocation,
      weights:options.weights
    })
    if(options.tyep){
      this.getPrice(options.formlocation,options.tolocation,options.weights)
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