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
            , height: '100px'
            , data: [{
                'dishesId':1,
                'dishesName':'东坡肉',
                'dishesPrice':21
            }]
            , cols: [[
                {field: 'dishesId', title: '菜品id', align: 'center'}
                , {field: 'dishesName', title: '菜品名', align: 'center'}
                , {field: 'dishesPrice', title: '价格', align: 'center'}
                , {fixed: 'right', title: '操作', templet: '#toolTemp', align: 'center'}
            ]]
        });
    }

    function modify() {
        layer.open({
            type: 2,
            area: ['450px', '70%'],
            anim: 1,
            title: '修改用户信息',
            content: "./tips/price_form.html",
            success: function(layero, index){
                var body = layer.getChildFrame('body',index);//建立父子联系
                var iframeWin = window[layero.find('iframe')[0]['name']];
                var btn = body.find('#div-btn');
                btn.html(template('modify-btn'));
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
            title: '新增用户',
            content: "./tips/price_form.html",
            success: function(layero, index){
                var body = layer.getChildFrame('body',index);//建立父子联系
                var iframeWin = window[layero.find('iframe')[0]['name']];
                var btn = body.find('#div-btn');
                btn.html(template('add-btn'));
            }
        });
    }

    table.on('tool(table-data)', function (obj) {
        switch (obj.event) {
            case 'mdf':
                modify();
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
