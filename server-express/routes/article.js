var express = require('express');
var router = express.Router();

var Articles = require('../models/articles');
var Counts = require('../models/counts');

// var shell = require('shelljs')

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