layui.use(['jquery', 'element', 'form', 'layer', 'laydate', 'table', 'upload'], function () {
    var $ = layui.$
        , element = layui.element
        , form = layui.form
        , layer = layui.layer
        , laydate = layui.laydate
        , table = layui.table
        , upload = layui.upload;

    $('#boss-btn').click(function () {
        var indexMsg;
        // $.ajax({
        //     type: "post",
        //     url: "",
        //     async: true,
        //     cache: false,
        //     data: {},
        //     dataType: "json",
        //     contentType: "application/x-www-form-urlencoded; charset=utf-8",
        //     beforeSend: function (v) {
        //         indexMsg = layer.msg('处理中...', {
        //             icon: 16
        //             , shade: 0.3
        //             , time: 0
        //         });
        //     },
        //     success: function (v) {
        //         if (v.resultStatus) {
        //             window.location.href='employee.html'
        //         } else {
        //             console.log(v.result);
        //         }
        //     },
        //     error: function (v) {
        //         console.error('接口异常', v);
        //     },
        //     complete: function (v) {
        //         layer.close(indexMsg);
        //     }
        // });
        window.location.href='../page/boss.html'
    });
    $('#employee-btn').click(function () {
        var indexMsg;
        // $.ajax({
        //     type: "post",
        //     url: "",
        //     async: true,
        //     cache: false,
        //     data: {},
        //     dataType: "json",
        //     contentType: "application/x-www-form-urlencoded; charset=utf-8",
        //     beforeSend: function (v) {
        //         indexMsg = layer.msg('处理中...', {
        //             icon: 16
        //             , shade: 0.3
        //             , time: 0
        //         });
        //     },
        //     success: function (v) {
        //         if (v.resultStatus) {
        //             window.location.href='employee.html'
        //         } else {
        //             console.log(v.result);
        //         }
        //     },
        //     error: function (v) {
        //         console.error('接口异常', v);
        //     },
        //     complete: function (v) {
        //         layer.close(indexMsg);
        //     }
        // });
        window.location.href='../page/employee.html'
    });

});
