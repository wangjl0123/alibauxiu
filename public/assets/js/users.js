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
            var id = $(this).attr('data-id')
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
        })
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
    })
})