$(function() {
    //给添加按钮绑定事件
    $('#userForm').on('submit', function() {
        var formData = $(this).serialize();
        //发送ajax请求
        $.ajax({
            type: 'post',
            url: '/users',
            data: formData,
            //发送请求
            success: function() {
                location.reload();
            },
            //发送失败
            error: function() {
                alert('用户添加失败')
            }
        })
        return false;
    });

    //上传用户头像
    $('#modifyBox').on('change', '#avatar', function() {
            var formData = new FormData();
            formData.append('avatar', this.files[0])

            $.ajax({
                url: '/upload',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function(param) {
                    $('#youPhoto').attr('src', param[0].avatar)
                    $('#hidden').val(param[0].avatar)
                },
                error: function() {
                    alert('照片上传失败')
                }
            })
        })
        // 获取用户列表
    $.ajax({
        url: '/users',
        type: 'get',
        success: function(data) {
            var html = template('userTpl', { data: data })
            $('#userBody').html(html)
        }
    })

    //用户修改
    $('#userBody').on('click', '.edit', function() {
        var id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            url: `/users/${id}`,
            type: 'put',
            success: function(data) {
                // console.log(data);
                var html = template('modifyTpl', data);
                $('#modifyBox').html(html)
            }
        })
    });
    // 修改后的表单提交
    $('#modifyBox').on('submit', '#modifyForm', function() {
        var formData = $(this).serialize();
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'put',
            url: `/users/${id}`,
            data: formData,
            success: function(data) {
                location.reload()
            }
        })
        return false;
    });
    // 删除用户
    $('#userBody').on('click', '.delete', function() {
        var id = $(this).attr('data-id');
        if (confirm('确认删除？')) {
            $.ajax({
                url: `/users/${id}`,
                type: 'delete',
                success: function(data) {
                    location.reload();
                }
            })
        }
    });
    //批量删除用户

    var checkedAll = $('#checkedAll');
    var deleteMany = $('#deleteMany')
        // 1.点击全选按钮，决定全选和反选
    checkedAll.on('change', function() {
        //使用prop获取当前全选按钮的状态
        var status = $(this).prop('checked')
        if (status) {
            deleteMany.show()
        } else {
            deleteMany.hide()
        }
        //获取所有小的的复选框，并将全选按钮的状态使用prop赋值
        $('#userBody').find('.findOne').prop('checked', status)
    });
    // 2.点击每个小的复选框，实现全选与反选，需要使用事件委托
    $('#userBody').on('change', '.findOne', function() {
        var input = $('#userBody').find('.findOne')
            //当用户的数量与复选框勾选的数量一致，说明是全选，否则就不是选择
            //如果数量相等，那么让全选按钮勾上，否则取消全选按钮勾选
        if (input.length === input.filter(':checked').length) {
            checkedAll.prop('checked', true)
        } else {
            checkedAll.prop('checked', false)
        }
        if (input.filter(':checked').length > 0) {
            deleteMany.show();
        } else {
            deleteMany.hide();
        }
    });
    // 3.点击批量删除，删除用户
    deleteMany.on('click', function() {
        var checkedUser = $('#userBody').find('input').filter(':checked');

        var idArr = []
        checkedUser.each(function(index, dom) {
            idArr.push($(dom).attr('data-id'))
        })

        $.ajax({
            url: `/users/${idArr.join('-')}`,
            type: 'delete',
            success: function(data) {
                location.reload()
            }
        })
    })
})