layui.use(['jquery', 'element', 'form', 'layer', 'laydate', 'table', 'upload'], function () {
    var $ = layui.$
        , element = layui.element
        , form = layui.form
        , layer = layui.layer
        , laydate = layui.laydate
        , table = layui.table
        , upload = layui.upload;

    $('#boss-btn').click(function () {
        var userId = $('#bossId').val();
        var password = $('#bossPw').val();
        var indexMsg;
        $.ajax({
            type: "post",
            url: "http://localhost:9191/User/login",
            async: true,
            cache: false,
            data: {'userId': userId, 'password': password},
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (v) {
                indexMsg = layer.msg('处理中...', {
                    icon: 16
                    , shade: 0.3
                    , time: 0
                });
            },
            success: function (v) {
                if (v.resultStatus) {
                    window.location.href= 'boss.html';
                } else {
                    console.log(v.result);
                }
            },
            error: function (v) {
                console.error('接口异常', v);
            },
            complete: function (v) {
                layer.close(indexMsg);
            }
        });
        window.location.href= 'boss.html';
    });

    $('#employee-btn').click(function () {
        var userId = $('#employeeId').val();
        var password = $('#employeePw').val();
        var indexMsg;
        $.ajax({
            type: "post",
            url: "http://localhost:9191/User/login",
            async: true,
            cache: false,
            data: {'userId': userId, 'password': password},
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (v) {
                indexMsg = layer.msg('处理中...', {
                    icon: 16
                    , shade: 0.3
                    , time: 0
                });
            },
            success: function (v) {
                if (v.resultStatus) {
                    window.location.href= 'employee.html';
                } else {
                    console.log(v.result);
                }
            },
            error: function (v) {
                console.error('接口异常', v);
            },
            complete: function (v) {
                layer.close(indexMsg);
            }
        });
        window.location.href= 'employee.html';
    });
});
