var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Articles = require('../models/articles');
var Counts = require('../models/counts');

// var shell = require('shelljs')

mongoose.connect('mongodb://root:root@39.105.94.140:27017/dingyang')
mongoose.connection.on("connected", function(){
    console.log('MongoDB connected success.')
})
mongoose.connection.on("error", function(){
    console.log("MongoDB connected fail.")
})
mongoose.connection.on("disconnected", function(){
    console.log("MongoDB connected disconnected.")
})

Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}


router.get("/", function(req, res, next){
    let count = parseInt(req.param("count"))
    let type = req.param("type")
    let id = req.param("id")
    let params = {}
    if(type !== undefined){
        console.log('ok')
        params.type = type
    }
    if(id !== undefined){
        params.id = id
    }

    var articleModel = Articles.find(params).sort({'id':-1}).limit(count)
    articleModel.exec({}, function(err,doc){
        if(err){
            res.json({
                status: '1',
                msg: err.message
            });
        }else{
            res.json({
                status:'200',
                msg:'',
                result: doc
            })
        }
    })
})


router.post("/add", function(req, res, next){
    Articles.find({}, function(err,doc){
        if(err){
            res.json({
                status: '1',
                msg: err.message
            });
        }else{
            var count = doc.length
            let data = {
                "title" : req.body.title,
                "description": req.body.desc,
                "content": req.body.content,
                "type": req.body.type,
                "coverUrl": req.body.coverUrl,
                "date": new Date().Format("yyyy-MM-dd"),
                "id": count+1
            }
            console.log(data)
            Articles.create(data,function(err1,doc1){
                if(err1){
                    res.json({
                        status: '1',
                        msg: err.message
                    });
                }else{
                    Counts.create({
                        "id": count+1,
                        "type": "article",
                        "category": req.body.type
                    }, function(err2, doc2){
                        if(err2){
                            res.json({
                                status: '1',
                                msg: err.message
                            })
                        }else{
                            // shell.cd('../dingyang-nuxt')
                            // if (shell.exec('npm run generate').code !== 0) {//执行npm run generate 命令
                            //     shell.echo('generate commit failed');
                            //     shell.exit(1);
                            // }
                            res.json({
                                status:'200',
                                msg:'count already +1',
                            })
                        }
                    })
                }
            })
        }

    })
})

module.exports = router;