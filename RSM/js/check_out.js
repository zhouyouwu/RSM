layui.use(['jquery', 'element', 'form', 'layer', 'laydate', 'table', 'upload'], function () {
    var $ = layui.$
        , element = layui.element
        , form = layui.form
        , layer = layui.layer
        , laydate = layui.laydate
        , table = layui.table
        , upload = layui.upload
        , myDate = undefined;

    initDateModel();
    var opTime = $('#op-time').text();
    dishDataProcess(opTime);
    customDataProcess();

    function initDateModel() {
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
    }

    /**
     * 画用户购买图
     * @param dateList
     * @param yData
     */
    function initCustomChart(dateList, yData) {
        var customChart = echarts.init(document.getElementById('custom-chart'));
        var customChartOption = {
            title: {
                text: '顾客消费统计图'
            },
            tooltip: {
                formatter: '{b}<br/> 销量：{c}',
                trigger: 'item'
            },
            legend: {
                data:[]
            },
            xAxis: {
                name: '日期',
                data: dateList
            },
            yAxis: {
                name: '销量',//控制其显示

            },
            series: [{
                type: 'bar',
                data:yData
            }]
        }
        customChart.setOption(customChartOption);
    }

    /**
     * 画菜品销量图
     * @param dateList
     * @param dishList
     */
    function initDishesChart(dateList, dishList) {

        var dishesChart = echarts.init(document.getElementById('dishes-chart'));
        var dishesChartOption = {
            title: {
                text: '菜品销量统计图'
            },
            tooltip: {
                formatter: '{b}<br/> 销量：{c}',
                trigger: 'item'
            },
            legend: {
                data:[]
            },
            xAxis: {
                name: '日期',
                data: dateList
            },
            yAxis: {
                name: '销量',//控制其显示

            },
            series: []
        }
        //用变量为option赋值
        var legends=[];
        var series = [];
        var items = function () {
            return{
                name: '',
                type: 'line',
                smooth: true,
                data: []
            }
        }

        for(var i=0; i<dishList.length; i++){
            legends.push(dishList[i].dishesName);
            let item = new items();
            item.name = dishList[i].dishesName;
            item.data = dishList[i].yDate;
            series.push(item);
        }
        dishesChartOption.series = series;
        dishesChartOption.legend.data = legends;

        dishesChart.setOption(dishesChartOption);

    }

    function customDataProcess() {
        var data={"orderList":[{"orderId":3,"orderDiscount":10.0,"orderTotal":96.0,"orderReceive":100.0,"restaurantId":1,"cartId":2,"orderDetails":"[{\"dishesName\":\"红烧狮子头\",\"dishesPrice\":27,\"dishesCount\":2},{\"dishesName\":\"东坡肉\",\"dishesPrice\":21,\"dishesCount\":2}]","orderDate":"2020-06-13"},{"orderId":4,"orderDiscount":10.0,"orderTotal":48.0,"orderReceive":50.0,"restaurantId":1,"cartId":3,"orderDetails":"[{\"dishesName\":\"东坡肉\",\"dishesPrice\":21,\"dishesCount\":1},{\"dishesName\":\"红烧狮子头\",\"dishesPrice\":27,\"dishesCount\":1}]","orderDate":"2020-06-13"}],"total":144.0}
        let dateList = getDateList();
        let tempYData = [96,70,83];
        let customList = [{"orderId":3,"orderDiscount":10.0,"orderTotal":96.0,"orderReceive":100.0,"restaurantId":1,"cartId":2,"orderDetails":"[{\"dishesName\":\"红烧狮子头\",\"dishesPrice\":27,\"dishesCount\":2},{\"dishesName\":\"东坡肉\",\"dishesPrice\":21,\"dishesCount\":2}]","orderDate":"2020-06-13"},{"orderId":4,"orderDiscount":10.0,"orderTotal":48.0,"orderReceive":50.0,"restaurantId":1,"cartId":3,"orderDetails":"[{\"dishesName\":\"东坡肉\",\"dishesPrice\":21,\"dishesCount\":1},{\"dishesName\":\"红烧狮子头\",\"dishesPrice\":27,\"dishesCount\":1}]","orderDate":"2020-06-13"}];
        // for(let i=0; i<dateList.length; i++){
        //     $.ajax({
        //             type: "get",
        //             url: "www.zhouyouwu.club:9191/CheckOut/checkOutByCustomer",
        //             async: true,
        //             cache: false,
        //             data: {'date': dateList[i].replaceAll('/','-'), 'day': 1},
        //             dataType: "json",
        //             contentType: "application/x-www-form-urlencoded; charset=utf-8",
        //             success: function (v) {
        //                 if (v.total) {
        //                     tempYData.push(v.total);
        //                     customList.push(v.orderList);
        //                 } else {
        //                     console.log(v.result);
        //                 }
        //             },
        //             error: function (v) {
        //                 console.error('接口异常', v);
        //             }
        //         });
        // }
        initCustomChart(dateList,tempYData);
        renderCustomTable(customList);
    }

    /**
     * 数据处理，获取到的菜单，为每一个菜品添加其30天的销售额
     * @param date
     */
    function dishDataProcess(date) {
        let dishList = [{"dishesId":1,"dishesName":"东坡肉","dishesImageurl":"https://baike.baidu.com/pic/%E4%B8%9C%E5%9D%A1%E8%82%89/120740/16593158/4bed2e738bd4b31c31e6eea18ad6277f9f2ff8d6?fr\u003dlemma\u0026ct\u003dcover","dishesPrice":21},{"dishesId":2,"dishesName":"红烧狮子头","dishesImageurl":"https://baike.baidu.com/pic/%E7%BA%A2%E7%83%A7%E7%8B%AE%E5%AD%90%E5%A4%B4/1652307/0/4d4970063e62e230030881e0","dishesPrice":27}];
        let dateList = getDateList(date);
        let tempYData = [20,50,30];
        dishList.forEach(function (item) {
            // for(var i=0; i<dateList.length; i++){
            //     $.ajax({
            //             type: "get",
            //             url: "www.zhouyouwu.club:9191/CheckOut/checkOutByDishes",
            //             async: true,
            //             cache: false,
            //             data: {'date': dateList[i].replaceAll('/','-'), 'day': 1, 'dishesId': item.dishesId},
            //             dataType: "json",
            //             contentType: "application/x-www-form-urlencoded; charset=utf-8",
            //             beforeSend: function (v) {
            //                 indexMsg = layer.msg('处理中...', {
            //                     icon: 16
            //                     , shade: 0.3
            //                     , time: 0
            //                 });
            //             },
            //             success: function (v) {
            //                 if (v.total) {
            //                     tempYData.push(v.total);
            //                 } else {
            //                     console.log(v.result);
            //                 }
            //             },
            //             error: function (v) {
            //                 console.error('接口异常', v);
            //             },
            //             complete: function (v) {
            //                 layer.close(indexMsg);
            //             }
            //         })
            // }
            item.yDate = tempYData;
        });
        initDishesChart(dateList,dishList);
        renderDishTable(dishList);
    }

    function renderDishTable(data) {
        let tbody = $('#dishes-table tbody');
        tbody.empty();
        if (data){
            data.forEach(function (item) {
                let tr = new StringBuffer();
                tr.append('<tr>');
                tr.append('<td>'+item.dishesId+'</td>');
                tr.append('<td>'+item.dishesName+'</td>');
                tr.append('<td>'+item.dishesPrice+'</td>');
                tr.append('<td>'+item.yDate+'</td>');
                tr.append('</tr>');
                tbody.append(tr.toString());
            });
        }else {
            tbody.append('<tr><td class="text-center" colspan="9">无数据</td></tr>');
        }
    }

    function renderCustomTable(data) {
        let tbody = $('#custom-table tbody');
        tbody.empty();
        if (data){
            data.forEach(function (item, index) {
                let tr = new StringBuffer();
                tr.append('<tr>');
                tr.append('<td>'+item.orderId+'</td>');
                tr.append('<td>'+item.orderDiscount+'</td>');
                tr.append('<td>'+item.orderId+'</td>');
                tr.append('<td>'+item.orderTotal+'</td>');
                tr.append('<td>'+item.orderReceive+'</td>');
                tr.append('<td>'+item.restaurantId+'</td>');
                tr.append('<td>'+item.orderDate+'</td>');
                tr.append('<td lay-data="'+item.orderDetails+'">查看详细信息</td>');
                tr.append('</tr>');
                tbody.append(tr.toString());
            });
        }else {
            tbody.append('<tr><td class="text-center" colspan="9">无数据</td></tr>');
        }
    }

    function getDateList(date) {
        if(date === undefined){
            date = new Date().Format('yyyy/MM')
        }
        let dateList = [];
        let opTime = date;
        let nowMonth = new Date().getMonth()+1;
        if(nowMonth > 9){
            nowMonth = nowMonth.toString();
        }else {
            nowMonth = '0'+nowMonth.toString();
        }
        if(opTime.split('/')[1] === nowMonth){
            for(let i=1; i<=new Date().getDate(); i++){
                dateList.push(opTime.split('/')[0] + opTime.split('/')[1] + '/' + i);
            }
        }else {
            let lastDay = new Date(opTime.split('/')[0],opTime.split('/')[1],0);
            for(let i=1; i<=lastDay.getDate(); i++){
                dateList.push(opTime.split('/')[0] + opTime.split('/')[1] + '/' + i);
            }
        }
        return dateList;
    }
});
