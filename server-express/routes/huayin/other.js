var express = require('express');
var router = express.Router();

var HyOthers = require('../../models/hyothers');


router.get("/", function(req, res, next){
    params = {
        "type":req.param("type")
    }
    console.log(params)
    var otherModel = HyOthers.find(params).sort([['_id',-1]]).limit(1)
    otherModel.exec({}, function(err,doc){
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
    let data = {
        "type": req.body.type,
        "typeTitle": req.body.typeTitle,
        "content": req.body.content,
    }
    HyOthers.create(data,function(err1,doc1){
        if(err1){
            res.json({
                status: '1',
                msg: err.message
            });
        }else{
            res.json({
                status: '200',
                msg:'add success'
            })
        }
    })
})

module.exports = router;