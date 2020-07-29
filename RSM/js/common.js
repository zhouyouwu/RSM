layui.use(['jquery', 'element', 'form', 'layer', 'laydate', 'table', 'upload'], function () {
    var $ = layui.$
        , element = layui.element
        , form = layui.form
        , layer = layui.layer
        , laydate = layui.laydate
        , table = layui.table
        , upload = layui.upload;

    $('.layui-nav-item a').click(function () {
        var src = $(this).attr('data-src');
        alert(src);
        $('iframe').attr('src',src);
    });
});
