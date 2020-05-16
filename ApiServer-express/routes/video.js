var express = require('express');
var router = express.Router();

// var shell = require('shelljs')

var Videos = require('../models/videos');
var Counts = require('../models/counts');


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