$(function () {
  const form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: (value) => {
      if (value === $('[name=oldPwd]').val()) return '新旧密码不能相同！'
    },
    rePwd: (value) => {
      if (value !== $('[name=newPwd]').val()) return '两次密码不一致！'
    },
  })

  // 监测form表单提交
  $('.layui-form').submit(function (e) {
    e.preventDefault()

    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: (res) => {
        const { message, status } = res
        if (status !== 0) return layer.msg(message)
        layer.msg(message)

        // 清空token
        localStorage.removeItem('token')

        // 跳转父级页面
        window.parent.location.href = '/login.html'
      },
    })
  })
})
