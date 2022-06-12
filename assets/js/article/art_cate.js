$(function () {
  const form = layui.form
  // 获取文章分类列表
  const initArtCateList = () => {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        // console.log(res)
        // 调用模板引擎
        const htmlStr = template('tpl-table', res)
        $('tbody').empty().html(htmlStr)
      },
    })
  }

  // 给添加按钮绑定模态框
  let indexAdd = null
  $('#btnAddCate').click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(),
    })
  })

  // 添加文章分类，事件委托
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()

    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)

        // 重新渲染页面
        initArtCateList()

        // 关闭模态框
        layer.close(indexAdd)
      },
    })
  })

  // 通过代理方式，为 btn-edit 按钮绑定点击事件
  let indexedit = null
  $('tbody').on('click', '.btn-edit', function () {
    const id = $(this).attr('data-id')
    // 弹出修改文章分类的弹窗
    indexedit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html(),
    })

    $.ajax({
      type: 'GET',
      url: '/my/article/cates/' + id,
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        // 设置表单数据
        form.val('form-edit', res.data)
      },
    })
  })

  // 修改文章分类
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)

        initArtCateList()
        layer.close(indexedit)
      },
    })
  })

  // 删除文章分类
  $('tbody').on('click', '.btn-delete', function () {
    const id = $(this).attr('data-id')
    // 提示用户是否删除
    layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: 'GET',
        url: '/my/article/deletecate/' + id,
        success: (res) => {
          if (res.status !== 0) return layer.msg(res.message)
          layer.msg(res.message)
          initArtCateList()
          layer.close(index)
        },
      })
    })
  })

  initArtCateList()
})
