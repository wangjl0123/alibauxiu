$(function() {
    $('#logout').on('click', function() {
        var isConfirm = confirm('您确认离开吗？');
        if (isConfirm) {
            $.ajax({
                url: '/logout',
                type: 'post',
                success: function(data) {
                    location.href = 'login.html'
                },
                error: function() {
                    alert('退出失败')
                }
            })
        }
    })
})