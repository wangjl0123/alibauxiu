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
    });
    return false;
})