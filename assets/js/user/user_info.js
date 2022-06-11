$(function () {
  const form = layui.form
  // 自定义校验规则
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return '昵称长度不能超过6个字符'
    },
  })

  // 获取用户基本信息
  const initUserInfo = () => {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: (res) => {
        const { status, message, data } = res
        if (status !== 0) return layer.msg(message)
        layer.msg(message)
        // console.log(res)
        // 填充表单
        form.val('formUserInfo', data)
      },
    })
  }

  // 重置表单
  $('#btnReset').click((e) => {
    e.preventDefault()
    initUserInfo()
  })

  // 更新用户信息
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: (res) => {
        const { status, message } = res
        if (status !== 0) return layer.msg(message)
        layer.msg(message)

        // 通知父页面，更新用户信息
        window.parent.getUserInfo()
      },
    })
  })

  initUserInfo()
})
