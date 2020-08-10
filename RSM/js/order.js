layui.use(['jquery', 'element', 'form', 'layer', 'laydate', 'table', 'upload'], function () {
    var $ = layui.$
        , element = layui.element
        , form = layui.form
        , layer = layui.layer
        , laydate = layui.laydate
        , table = layui.table
        , upload = layui.upload;
    initTable();

    function initTable() {
        console.log('initTable')
        table.render({
            elem: '#table-data'
            // , method: 'get'
            // , url: 'http://localhost:9191/Price/getDishes'
            // , where: {}todo:清除data数据
            , data: [{
                'dishesId': 1,
                'dishesName': '东坡肉',
                'dishesPrice': 21
            },{
                'dishesId': 1,
                'dishesName': '狮子头',
                'dishesPrice': 25
            },{
                'dishesId': 1,
                'dishesName': '糖醋排骨',
                'dishesPrice': 19
            },{
                'dishesId': 1,
                'dishesName': '西湖醋鱼',
                'dishesPrice': 53
            }]
            , cols: [[
                {field: 'dishesId', title: '菜品id', align: 'center'}
                , {field: 'dishesName', title: '菜品名', align: 'center'}
                , {field: 'dishesPrice', title: '价格', align: 'center'}
                , {field: 'count', title: '', hide: true}
                , {fixed: 'right', title: '操作', templet: '#toolTemp', align: 'center'}
            ]]
        });
    }

    function delDish(obj) {
        layer.confirm('确定要删除吗', function (index) {
            // $.ajax({
            //     type: "get",
            //     url: "www.zhouyouwu.club:9191/Price/deleteDishes",
            //     async: true,
            //     cache: false,
            //     data: {'userId': obj.userId},
            //     dataType: "json",
            //     contentType: "application/x-www-form-urlencoded; charset=utf-8",
            //     success: function (v) {
            //         obj.del();
            //     },
            //     error: function (v) {
            //         console.error('接口异常', v);
            //     }
            // });
            obj.layer.close(index);
        });
    }

    function addDish(obj) {
        var value = obj.event;
        var num = Number(span) + 1;
        span.text(num);
    }

    table.on('tool(table-data)', function (obj) {
        switch (obj.event) {
            case 'add':
                addDish();
                break;
            case 'reduce':
                delDish(obj)
                break;
            default:
                break;
        }
    });
});
