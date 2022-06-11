// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象

// ajax请求拦截器
$.ajaxPrefilter((option) => {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  option.url = 'http://www.liulongbin.top:3007' + option.url
  if (option.url.includes('/my/')) {
    option.headers = {
      Authorization: localStorage.getItem('token'),
    }
  }
  //不论成功还是失败，最终都会调用 complete 回调函数
  option.complete = (res) => {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      // 清除本地token
      localStorage.removeItem('token')
      // 跳转到登录页面
      location.href = '/login.html'
    }
  }
})
