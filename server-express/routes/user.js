var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = require('../models/users');

router.get('/', function(req, res, next){
    let name = req.param("name")
    let password = req.param("password")
    let params = {
        'name': name,
        'password': password
    }
    console.log(params)
    Users.find(params, function(err, doc){
        if(err){
            res.json({
                status: "2",
                msg: err.message
            })
        }else{
            res.json({
                status: "200",
                msg: "",
                result: doc
            })
        }
    })
})

module.exports = router