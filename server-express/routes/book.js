var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Books = require('../models/books');

router.get("/", function(req, res, next){
    let bookModel = Books.find().sort({'id':-1})
    bookModel.exec({}, function(err,doc){
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