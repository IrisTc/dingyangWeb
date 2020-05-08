var express = require('express');
var router = express.Router();

var HyArticles = require('../../models/hyarticles');


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
    console.log(params)
    var articleModel = HyArticles.find(params).sort({'id':-1}).limit(count)
    articleModel.exec({}, function(err,doc){
        if(err){
            res.json({
                status: '1',
                msg: err.message
            });
        }else{
        	console.log(doc)
            res.json({
                status:'200',
                msg:'',
                result: doc
            })
        }
    })
})


router.post("/add", function(req, res, next){
    HyArticles.find({}, function(err,doc){
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
                "date": new Date().Format("yyyy.MM.dd"),
                "id": count+1
            }
            HyArticles.create(data,function(err1,doc1){
                if(err1){
                    res.json({
                        status: '1',
                        msg: err.message
                    });
                }else{
                    res.json({
                        status:'200',
                        msg:'add success',
                    })
                }
            })
        }

    })
})

module.exports = router;