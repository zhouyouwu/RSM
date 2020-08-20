layui.use(['jquery', 'element', 'form', 'layer', 'laydate', 'table', 'upload'], function () {
    var $ = layui.$
        , element = layui.element
        , form = layui.form
        , layer = layui.layer
        , laydate = layui.laydate
        , table = layui.table
        , upload = layui.upload
        , object = undefined
        , count = 0;
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
            }, {
                'dishesId': 2,
                'dishesName': '狮子头',
                'dishesPrice': 25
            }, {
                'dishesId': 3,
                'dishesName': '糖醋排骨',
                'dishesPrice': 19
            }, {
                'dishesId': 4,
                'dishesName': '西湖醋鱼',
                'dishesPrice': 53
            }]
            , cols: [[
                {type: 'checkbox', fixed: 'left'}
                , {field: 'dishesId', title: '菜品id', align: 'center'}
                , {field: 'dishesName', title: '菜品名', align: 'center'}
                , {field: 'dishesPrice', title: '价格', align: 'center'}
                , {field: 'num', title: '数量', hide: true}
                , {fixed: 'right', title: '操作', templet: '#toolTemp', align: 'center'}
            ]]
            , id: 'row'
        });
    }

    function delDish(obj) {
        var value = $(obj.tr).find('span').html();
        if (Number(value) !== 0) {
            switch ($(obj.tr).find('.laytable-cell-1-0-1').html()) {
                case '1':count -= 21;break;
                case '2':count -= 25;break;
                case '3':count -= 19;break;
                case '4':count -= 53;break;
                default:break;
            }
            $(obj.tr).find('span').html(Number(value) - 1);
        }
    }

    function addDish(obj) {
        var value = $(obj.tr).find('span').html();
        switch ($(obj.tr).find('.laytable-cell-1-0-1').html()) {
            case '1':count = count+21;break;
            case '2':count = count+25;break;
            case '3':count = count+19;break;
            case '4':count = count+53;break;
            default:break;
        }
        $(obj.tr).find('span').html(Number(value) + 1);
    }

    function total(data) {
        alert(count)
        layer.alert(JSON.stringify(data)+'<br>总计'+count);
    }

    $('#total').click(function () {
        var checkStatus = table.checkStatus('row');
        total(checkStatus.data);
    });

    table.on('tool(table-data)', function (obj) {
        object = obj;
        switch (obj.event) {
            case 'add':
                addDish(obj);
                break;
            case 'reduce':
                delDish(obj)
                break;
            default:
                break;
        }
    });
});
