jQuery(document).ready(function(){
    getDataList()
    function getDataList(){
        $.ajax({
            type: 'get',
            url: '/api/huayin/article?count=16',
            dataType: 'json',
            success:function(json){
                result = json.result
                var news = {result: []}
                var reports = {result: []}
                for(var i=0, len=result.length; i<len; i++){
                    if(result[i].type == "news"){
                        result[i].a = "<a href='page.html?type=news&&id=" + result[i].id + "'>" + result[i].title + "</a>"
                        news.result.push(result[i])
                    }else{
                        result[i].a = "<a href='page.html?type=report&&id=" + result[i].id + "'>" + result[i].title + "</a>"
                        reports.result.push(result[i])
                    }
                }
                console.log(news)
                console.log(reports)
                var html1 = template('tmplt1', news);
                $('#news').html(html1);
                var html2 = template('tmplt2', reports);
                $('#report').html(html2);
            }
        })
    }
})