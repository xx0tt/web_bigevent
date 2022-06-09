// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    success: (res) => {
      const { status, message, data } = res
      if (status !== 0) return layer.msg(message)
      layer.msg(message)
      // 调用渲染函数
      renderAvatar(data)
    },
  })
}

const renderAvatar = (user) => {
  const name = user.nickname || user.username
  // 渲染欢迎语
  $('#welcome').html(`欢迎 ${name}`)
  // 按需渲染头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}

// 退出功能
$('#btnLogout').click(() => {
  layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
    // 1. 清除本地token、
    localStorage.removeItem('token')
    // 2. 切换到登录页面
    location.href = '/login.html'
  })
})

// 获取用户列表
getUserInfo()
