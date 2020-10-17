const URLS = 'https://api.xgnjclm.cn'
function checkLogin(pageObj){
  if (pageObj.onShow){
      let _onShow = pageObj.onShow;
      pageObj.onShow = function(){
          console.log('中间件');
          console.log(wx.getStorageSync('token') );
          if (wx.getStorageSync('token').length == 0){
            wx.clearStorage('phone')
              wx.redirectTo({
              url: '/pages/login/login',
              })
          }
      }
  }
  return pageObj;
}

module.exports = {
  URLS,
  checkLogin: checkLogin,

}