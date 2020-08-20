layui.use(['jquery', 'element', 'form', 'layer', 'laydate', 'table', 'upload'], function () {
    var $ = layui.$
        , element = layui.element
        , form = layui.form
        , layer = layui.layer
        , laydate = layui.laydate
        , table = layui.table
        , upload = layui.upload
        , data = [{
        'userId': '1',
        'password': '123456',
        'authority': '0',
        'entryDate': '2020-08-06',
        'workDate': '30',
        'salary': '2500'
    },
        {
            'userId': '2',
            'password': '123456789',
            'authority': '1',
            'entryDate': '2020-08-06',
            'workDate': '30',
            'salary': '2500'
        }];
    initTable();

    function initTable() {
        console.log('initTable')
        table.render({
            elem: '#table-data'
            // , method: 'get'
            // , url: 'http://localhost/User/getUser'
            // , where: {}
            , data: data
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

    function modify(row) {
        console.log(data[row])
        layer.open({
            type: 2,
            area: ['450px', '90%'],
            anim: 1,
            title: '修改用户信息',
            content: "./tips/user_form.html",
            success: function (layero, index) {
                var body = layer.getChildFrame('body', index);//建立父子联系
                var iframeWin = window[layero.find('iframe')[0]['name']];
                body.find('input[id="userId"]').val(data[row].userId);
                body.find('input[id="password"]').val(data[row].password);
                body.find('input[id="entryDate"]').val(data[row].entryDate);
                body.find('input[id="workDate"]').val(data[row].workDate);
                body.find('input[id="salary"]').val(data[row].salary);
            },
            btn: ['修改', '取消'],
            btn1: function (index, layero) {
                var obj = layero.find("iframe")[0].contentWindow;
                data[row].userId = obj.$('#userId').val();
                data[row].password = obj.$('#password').val();
                data[row].authority = obj.$('#authority').val();
                data[row].entryDate = obj.$('#entryDate').val();
                data[row].workDate = obj.$('#workDate').val();
                data[row].salary = obj.$('#salary').val();
                initTable();
                layer.close(index);
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

    function addUser(row) {
        layer.open({
            type: 2,
            area: ['450px', '90%'],
            anim: 1,
            title: '新增用户',
            content: "./tips/user_form.html",
            success: function (layero, index) {
                var body = layer.getChildFrame('body', index);//建立父子联系
                var iframeWin = window[layero.find('iframe')[0]['name']];
            },
            btn: ['新增', '取消'],
            btn1: function (index, layero) {
                var obj = layero.find("iframe")[0].contentWindow;
                let value = {
                    userId: obj.$('#userId').val(),
                    password: obj.$('#password').val(),
                    authority: obj.$('#authority').val(),
                    entryDate: obj.$('#entryDate').val(),
                    workDate: obj.$('#workDate').val(),
                    salary: obj.$('#salary').val()
                }
                data.push(value);
                initTable();
                layer.close(index);
            }
        });
    }

    table.on('tool(table-data)', function (obj) {
        switch (obj.event) {
            case 'mdf':
                var row = $(obj.tr).attr("data-index");
                modify(row);
                break;
            case 'del':
                delUser(obj)
                break;
            default:
                break;
        }
    });

    $('#add').click(function () {
        addUser(data.length);
    });

    $('#initTable').click(function () {
        initTable();
    })
});
