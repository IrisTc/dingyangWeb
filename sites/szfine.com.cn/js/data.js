jQuery(document).ready(function () {
    let type = getUrlParam("type")
    if (type == "report" || type =="news") {
        var params = {
            type: type,
            id: getUrlParam("id")
        }
        var url = '/api/huayin/article'
    } else {
        var params = {
            type: type
        }
        var url = '/api/huayin/other'
    }
    console.log(params)
    
    getData(params)
    function getData(params) {
        $.ajax({
            type: 'get',
            url: url,
            data: params,
            dataType: 'json',
            success: function (res) {
                if(res.result[0].type=="news"){
                    res.result[0].typeTitle = "新闻中心"
                }
                if(res.result[0].type=="report"){
                    res.result[0].typeTitle = "基金报告"
                }
                var html = template('tmplt', res);
                $('#article').html(html);
            }
        })
    }
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
})