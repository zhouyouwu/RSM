function StringBuffer() {
    this.arr = new Array();
    this.append = function (str) {
        this.arr.push(str);
    };
    this.toString = function () {
        return this.arr.join("");
    };
}

this.forEach = function forEach(callback, context) {
    context = context || window;

    //IE6-8下自己编写回调函数执行的逻辑
    var newAry = new Array();
    for (var i = 0; i < this.elements.length; i++) {
        if (typeof  callback === 'function') {
            var val = callback.call(context, this.elements[i].value, this.elements[i].key, this.elements);
            newAry.push(this.elements[i].value);
        }
    }
    return newAry;
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

