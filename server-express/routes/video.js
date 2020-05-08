var express = require('express');
var router = express.Router();

// var shell = require('shelljs')

var mongoose = require('mongoose');
var Videos = require('../models/videos');
var Counts = require('../models/counts');

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
    let videoModel = Videos.find().sort({'id':-1})
    videoModel.exec({}, function(err,doc){
        if(err){
            res.json({
                status: '1',
                msg: err.message
            });
        }else{
            res.json({
                status:'200',
                msg:'',
                result:{
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})

router.post("/add", function(req, res, next){
    Videos.find({}, function(err,doc){
        if(err){
            res.json({
                status: '1',
                msg: err.message
            });
        }else{
            var id = doc.length + 1
            let data = {
                "title" : req.body.title,
                "coverUrl": req.body.coverUrl,
                "url": req.body.url,
                "date": new Date().Format("yyyy-MM-dd"),
                "id": id
            }
            Videos.create(data,function(err1,doc1){
                if(err1){
                    res.json({
                        status: '1',
                        msg: err.message
                    });
                }else{
                    Counts.create({
                        "id": id,
                        "type": "video",
                        "category": ""
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