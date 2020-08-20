layui.use(['jquery', 'element', 'form', 'layer', 'laydate', 'table', 'upload'], function () {
    var $ = layui.$
        , element = layui.element
        , form = layui.form
        , layer = layui.layer
        , laydate = layui.laydate
        , table = layui.table
        , upload = layui.upload
        , data = [{
        'ingredientId': 1,
        'ingredientDate': '2020-06-13',
        'ingredientName': '西红柿',
        'ingredientCount': 50.0,
        'ingredientPrice': 1.5,
        'addDecrease': 1
    }, {
        'ingredientId': 2,
        'ingredientDate': '2020-06-13',
        'ingredientName': '土豆',
        'ingredientCount': 50.0,
        'ingredientPrice': 2.5,
        'addDecrease': 1
    }, {
        'ingredientId': 3,
        'ingredientDate': '2020-06-13',
        'ingredientName': '大米',
        'ingredientCount': 50.0,
        'ingredientPrice': 3,
        'addDecrease': 1
    }

    ];
    initTable();

    function initTable() {
        table.render({
            elem: '#table-data'
            // , method: 'get'
            // , url: 'http://localhost:9191/Price/getDishes'
            // , where: {}todo:清除data数据
            , data: data
            , cols: [[
                {field: 'ingredientId', title: '原材料id', align: 'center'}
                , {field: 'ingredientDate', title: '账期', align: 'center'}
                , {field: 'ingredientName', title: '原材料名字', align: 'center'}
                , {field: 'ingredientCount', title: '原材料数量（kg）', align: 'center'}
                , {field: 'ingredientPrice', title: '原材料价格', align: 'center'}
                , {fixed: 'right', title: '操作', templet: '#toolTemp', align: 'center'}
            ]]
            , id: 'row'
        });
    }

    function modify(row) {
        layer.open({
            type: 2,
            area: ['450px', '70%'],
            anim: 1,
            title: '修改原料信息',
            content: "./tips/vegetable_form.html",
            success: function (layero, index) {
                var body = layer.getChildFrame('body', index);//建立父子联系
                var iframeWin = window[layero.find('iframe')[0]['name']];
                body.find('input[id="ingredientId"]').val(data[row].ingredientId);
                body.find('input[id="ingredientName"]').val(data[row].ingredientName);
                body.find('input[id="ingredientDate"]').val(data[row].ingredientDate);
                body.find('input[id="ingredientPrice"]').val(data[row].ingredientPrice);
                body.find('input[id="ingredientCount"]').val(data[row].ingredientCount);
            },
            btn: ['修改', '取消'],
            btn1: function (index, layero) {
                var obj = layero.find("iframe")[0].contentWindow;
                data[row].ingredientName = obj.$('#ingredientName').val();
                data[row].ingredientPrice = obj.$('#ingredientPrice').val();
                data[row].ingredientCount = obj.$('#ingredientCount').val();
                data[row].addDecrease = obj.$('#addDecrease').val();
                initTable();
                layer.close(index);
            }
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
            obj.del();
            layer.close(index);
        });
    }

    function addDish() {
        layer.open({
            type: 2,
            area: ['450px', '70%'],
            anim: 1,
            title: '新增原料信息',
            content: "./tips/vegetable_form.html",
            success: function (layero, index) {
                var body = layer.getChildFrame('body', index);//建立父子联系
                var iframeWin = window[layero.find('iframe')[0]['name']];
            },
            btn: ['新增', '取消'],
            btn1: function (index, layero) {
                var obj = layero.find("iframe")[0].contentWindow;
                let value = {
                    ingredientId: obj.$('#ingredientId').val(),
                    ingredientDate: obj.$('#ingredientDate').val(),
                    ingredientName: obj.$('#ingredientName').val(),
                    ingredientPrice: obj.$('#ingredientPrice').val(),
                    ingredientCount: obj.$('#ingredientCount').val()
                }
                data.push(value);
                initTable();
                layer.close(index);
            }
        });

    }

    laydate.render({
        elem: '#op-time'
        , format: 'yyyy/MM'
        , value: new Date()
        , max: '2099/12'
        , type: 'month'
        , done: function (value) {
            myDate = value
        }
    });

    table.on('tool(table-data)', function (obj) {
        switch (obj.event) {
            case 'mdf':
                var row = $(obj.tr).attr("data-index");
                modify(row);
                break;
            case 'del':
                delDish(obj)
                break;
            default:
                break;
        }
    });

    $('#add').click(function () {
        addDish();
    });

    $('#initTable').click(function () {
        initTable();
    })
});
