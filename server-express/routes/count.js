var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Counts = require('../models/counts');


router.get("/", function(req, res, next){
    let countModel = Counts.find().sort({'id':-1})
    countModel.exec({}, function(err,doc){
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

module.exports = router;