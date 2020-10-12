const http = require('../../utils/http')
function IDCardCheck(num) {
  num = num.toUpperCase();
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
  if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
      wx.showToast({
        title: '身份证号码不正确！',
        icon: 'none'
      })
      return false;
  }
  //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
  //下面分别分析出生日期和校验位 
  var len, re;
  len = num.length;
  if (len == 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      var arrSplit = num.match(re);

      //检查生日日期是否正确 
      var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
      var bGoodDay;
      bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
          wx.showToast({
            title: '身份证号码不正确！',
            icon: 'none'
          })
          return false;
      }
      else {
          //将15位身份证转成18位 
          //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var nTemp = 0, i;
          num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
          for (i = 0; i < 17; i++) {
              nTemp += num.substr(i, 1) * arrInt[i];
          }
          num += arrCh[nTemp % 11];
          return true;
      }
  }
  if (len == 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
      var arrSplit = num.match(re);

      //检查生日日期是否正确 
      var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
      var bGoodDay;
      bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
          wx.showToast({
            title: '输入的身份证号里出生日期不对！',
            icon: 'none'
          })
          return false;
      }
      else {
          //检验18位身份证的校验码是否正确。 
          //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
          var valnum;
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var nTemp = 0, i;
          for (i = 0; i < 17; i++) {
              nTemp += num.substr(i, 1) * arrInt[i];
          }
          valnum = arrCh[nTemp % 11];
          if (valnum != num.substr(17, 1)) {
              wx.showToast({
                title: '18位身份证的校验码不正确！',
                icon: 'none'
              })
              return false;
          }
          return true;
      }
  }
  return false;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit(e){
    let token = wx.getStorageSync('token')
    if(e.detail.value.uname == ''){
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
    }else if(IDCardCheck(e.detail.value.idcard)){
      wx.request({
        url: `${http.URLS}/certifyID`,
        method:'POST',
        data:{
          name:e.detail.value.uname,
          ID_num: e.detail.value.idcard
        },
        success(res){
          console.log(res)
        }
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