layui.use(['jquery', 'element', 'form', 'layer', 'laydate', 'table', 'upload'], function () {
    var $ = layui.$
        , element = layui.element
        , form = layui.form
        , layer = layui.layer
        , laydate = layui.laydate
        , table = layui.table
        , upload = layui.upload;

    getRestaurant();

    function getRestaurant() {
        // $.ajax({
        //     type: "get",
        //     url: "http://localhost:9191/Restaurant/getRestaurant",
        //     async: true,
        //     cache: false,
        //     dataType: "json",
        //     contentType: "application/x-www-form-urlencoded; charset=utf-8",
        //     success: function (v) {
        //         v = JSON.parse(v)
        //         console.log(v)
        //         $('#restNo').val(v.restaurantId);
        //         $('#restName').val(v.restaurantName);
        //         $('#restAddr').val(v.restaurantAddress);
        //         $('#restPhone').val(v.restaurantPhone);
        //         $('#restDiscount').val(v.discount);
        //     },
        //     error: function (v) {
        //         console.error('接口异常', v);
        //     }
        // });
        var v = {
            "restaurantId": 1,
            "restaurantName": "中餐厅",
            "restaurantAddress": "四川省会东县",
            "restaurantPhone": 13356478914,
            "discount": 10.0
        };
        $('#restNo').val(v.restaurantId);
        $('#restName').val(v.restaurantName);
        $('#restAddr').val(v.restaurantAddress);
        $('#restPhone').val(v.restaurantPhone);
        $('#restDiscount').val(v.discount);
    }

    $('#mdf').click(function () {
        let restaurantId = $('#restNo').val();
        let restaurantName = $('#restName').val();
        let restaurantAddress = $('#restAddr').val();
        let restaurantPhone = $('#restPhone').val();
        let discount = $('#restDiscount').val();
        $.ajax({
            type: "get",
            url: "http://localhost:9191/Restaurant/updateRestaurant",
            async: true,
            cache: false,
            data: {'restaurantId':restaurantId,'restaurantName':restaurantName,
                    'restaurantAddress':restaurantAddress, 'restaurantPhone':restaurantPhone,'discount':discount},
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (v) {
                getRestaurant();
                alert('修改成功');
            },
            error: function (v) {
                console.error('接口异常', v);
            }
        });
    });
});
