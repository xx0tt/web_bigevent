$(function () {
  // 点击去注册账号让 登录框隐藏，注册框显示
  $('#link_reg').click(() => {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击去登录让 注册框隐藏，登录框显示
  $('#link_login').click(() => {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 先得到layui的form对象
  const form = layui.form
  // 通过 form.verify() 方法自定义校验规则
  form.verify({
    // 数组方法创建一个自定义规则
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 函数方法创建一个自定义规则
    repwd: (value) => {
      // 1. 获取密码框的值
      const pwd = $('.reg-box [name=password]').val()
      // 2. 判断两次密码是否一致
      if (pwd != value) return '两次密码不一致'
    },
  })

  // 根路径
  //   const baseUrl = 'http://www.liulongbin.top:3007'
  //   const layer = layui.layer

  // 监听注册表单提交事件，发送注册请求
  $('#form_reg').submit((e) => {
    e.preventDefault()
    // 发起注册提交请求
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      success: function (res) {
        const { status, message } = res
        if (status !== 0) return layer.msg(message)
        layer.msg(message)

        // 跳转到登录框
        $('#link_login').click()
      },
    })
  })

  // 监听登录表单提交事件，发送登录请求
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: (res) => {
        const { message, status, token } = res
        if (status !== 0) return layer.msg(message)
        layer.msg(message)

        // 保存 token 到本地
        localStorage.setItem('token', token)

        // 跳转页面
        location.href = '/index.html'
      },
    })
  })
  // 入口函数结尾
})
