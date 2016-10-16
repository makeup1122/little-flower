var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var config = require('../config/database');
var sequelize = new Sequelize(config.database,config.username,config.password);
var Student = require('../application/Models/StudentModel');

router.get('/:id',function(req,res,next){
    if(!isNaN(req.params.id)){
        Student.findOne({where:{id:req.params.id}}).then(function(student){
            res.render('Student/info',{'student':student});
        });
    }else{
        next();
    }
});
router.get('/',function(req,res){
   res.send('test student info here'); 
});

//add
router.route('/add')
.all(function(req,res,next){
    next();
})
.get(function(req,res,next){
    res.render('Student/add',{'class_id':req.query.class_id});
})
.post(function(req,res,next){
    Student.create(req.body);
    res.redirect('/class/'+req.body.class_id);
});

router.route('/edit/:id')
.all(function(req,res,next){
    next();
})
.get(function(req,res,next){
    Student.findOne({where:{id:req.params.id}}).then(function(result){
       res.render('Student/edit',{'student':result});
    });
})
.post(function(req,res,next){
    Student.update(req.body,{where:{id:req.params.id}}).then(function(result){
        res.redirect('/class/'+req.body.class_id);
    });
});
module.exports = router;