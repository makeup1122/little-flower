var express = require('express');
var router = express.Router();
const util = require('util');
var TClass = require('../application/Models/ClassModel');
var Sequelize = require('sequelize');
var config = require('../config/database');
var sequelize = new Sequelize(config.database,config.username,config.password);
var Student = require("../application/Models/StudentModel");
var Evaluate = require("../application/Models/EvaluateModel");
  
// sequelize.sync();
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if(!isNaN(id)){
        TClass.findOne(id,function(result){
            Student.findAll({where:{'class_id':id}}).then(function(stu_result) {
                Evaluate.findAll({where:{'eva_class_id':id}}).then(function(eva_result){
                    res.render('Class/index',{'class_info':result,'students':stu_result,'evaluates':eva_result});
                })
            });
        });
    }else{
        next();
    }
});

//add
router.route('/add')
.all(function(req,res,next){
    next();
})
.get(function(req,res,next){
    res.render('Class/add');
})
.post(function(req,res,next){
    TClass.InsertOne(req.body);
    res.redirect('/');
});
//student
router.get('/:id/students',function(req,res,next){
    console.log(req.params.id);
    res.send('dasdasdas');
    // Student.findAll().then(function(students){
    //     res.render('Student/list');
    // });
});
module.exports = router;
