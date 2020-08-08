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
            // , url: 'http://localhost/User/getUser'
            // , where: {}
            , height: '100px'
            , data: [{
                'userId': '1',
                'password': '123456',
                'authority': '0',
                'entryDate': '2020-08-06',
                'workDate': '30',
                'salary': '2500'
            }]
            , cols: [[
                {field: 'userId', title: '用户编号', align: 'center'}
                , {field: 'password', title: '密码', align: 'center'}
                , {field: 'authority', title: '权限', align: 'center', templet: '#judge'}
                , {field: 'entryDate', title: '入职时间', align: 'center'}
                , {field: 'workDate', title: '工作天数', align: 'center'}
                , {field: 'salary', title: '薪水', align: 'center'}
                , {fixed: 'right', title: '操作', templet: '#toolTemp', align: 'center'}
            ]]
        });
    }

    function modify() {
        layer.open({
            type: 2,
            area: ['450px', '90%'],
            anim: 1,
            title: '修改用户信息',
            content: "./tips/user_form.html",
            success: function(layero, index){
                var body = layer.getChildFrame('body',index);//建立父子联系
                var iframeWin = window[layero.find('iframe')[0]['name']];
                var btn = body.find('#div-btn');
                btn.html(template('modify-btn'));
            }
        });
    }

    function delUser(obj) {
        layer.confirm('确定要删除吗', function (index) {
            // $.ajax({
            //     type: "get",
            //     url: "www.zhouyouwu.club:9191/User/deleteUser",
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

    function addUser() {
        layer.open({
            type: 2,
            area: ['450px', '90%'],
            anim: 1,
            title: '新增用户',
            content: "./tips/user_form.html",
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
                delUser(obj)
                break;
            default:
                break;
        }
    });

    $('#add').click(function () {
        addUser();
    });

    $('#initTable').click(function () {
        initTable();
    })
});
