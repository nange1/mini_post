const app = getApp();
const http = require('../../utils/http')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    switch1Checked: true,
    address:'',
    types:'',
    tolocation:'',
    formlocation:'',
    weights:'',
    uname:'',//用户名称
    tell:'',//电话
    detailaddress:'',//详细地址
  },
  switch1Change(e){
    this.setData({
      switch1Checked: e.detail.value
    })
  },
  location(){
    let that = this
    wx.chooseLocation({
      success(res){
        if(that.data.types == 1){
          that.setData({
            tolocation: res.longitude + ',' + res.latitude
          })
        }else if(that.data.types == 2){
          that.setData({
            formlocation: res.longitude + ',' + res.latitude
          })
        }
        that.setData({
          address: res.address,
        })
        that.getPrice(that.data.formlocation,that.data.tolocation,that.data.weights)
      },
    })
  },
  newadd(e){
    const reg = /^1[3456789]\d{9}$/;
    if(e.detail.value.uname === ''){
      wx.showToast({
        title: '请输入姓名',
        icon:'none'
      })
    }else if(e.detail.value.tell === ''){
      wx.showToast({
        title: '请输入手机号',
        icon:'none'
      })
    }else if(!reg.test(e.detail.value.tell)){
      wx.showToast({
        title: '手机号格式错误',
        icon:'none'
      })
    }else if(this.data.address === ''){
      wx.showToast({
        title: '请选择地址',
        icon:'none'
      })
    }else if(e.detail.value.detailaddress === ''){
      wx.showToast({
        title: '请填写详细地址',
        icon:'none'
      })
    }else{
      let self = this
      wx.request({
        url: `${http.URLS}/addAddress`,
        method:'POST',
        data:{
          name:e.detail.value.uname,
          phone: e.detail.value.tell,
          areas: self.data.address,
          address: e.detail.value.detailaddress,
          type:self.data.types?(self.data.types-1):'',
          is_save: self.data.switch1Checked?1:0,
          u_token: self.data.token,
          point:self.data.types == 1?self.data.tolocation:self.data.formlocation
        },
        success(res){
          const pages = getCurrentPages();
          const prevpage = pages[pages.length - 2]
          if(self.data.types == 1){
            prevpage.setData({
              username: e.detail.value.uname,
              usertell: e.detail.value.tell,
              useraddress: self.data.address,
              userdetailaddress: e.detail.value.detailaddress,
              tolocation:self.data.tolocation,
              price:self.data.price,
              fromcityid: res.data.data.address_id
            })
            wx.navigateBack()
          }else if(self.data.types == 2){
            prevpage.setData({
              susername: e.detail.value.uname,
              stell: e.detail.value.tell,
              suseraddress: self.data.address,
              suserdetailaddress: e.detail.value.detailaddress,
              formlocation:self.data.formlocation,
              price:self.data.price,
              tocityid: res.data.data.address_id
            })
            wx.navigateBack()
          }else{
            wx.navigateBack()
          }
        }
      })
    }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'token',
      success(res){
        that.setData({
          token: res.data
        })
        if(options.id){
          wx.request({
            url: `${http.URLS}/detailAddress`,
            method:'POST',
            data:{
              address_id:options.id,
              u_token: that.data.token
            },
            success(res){
              if(res.data.code == 1){
                that.setData({
                  uname:res.data.data.user_name,
                  tell:res.data.data.phone,
                  address:res.data.data.areas,
                  switch1Checked:res.data.data.status==1?true:false,
                  detailaddress:res.data.data.address_name 
                })
              }
            }
          })
        }
      },
    })
    this.setData({
      types: options.tyep,
      tolocation:options.tolocation,
      formlocation:options.formlocation,
      weights:options.weights
    })
  },

})