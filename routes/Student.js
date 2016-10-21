var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var config = require('../config/database');
var sequelize = new Sequelize(config.database,config.username,config.password);
var Student = require('../application/Models/StudentModel');
var stuEvas = require('../application/Models/StuevaModel');
router.get('/:id',function(req,res,next){
    if(!isNaN(req.params.id)){
        Student.findOne({
            where:{id:req.params.id},
            include:[{model:stuEvas,required:false}]
        }).then(function(student){
            //判断客户端类型
            var client_type = req.headers['user-agent']; 
            var mobile = false;
            if (/mobile/i.test(client_type)) {
                mobile = true;
            }
            res.render('Student/info',{'student':student,mobile:mobile});
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
router.route('/delete/:id')
.all(function(req,res,next){
    next();
})
.get(function(req,res,next){
    Student.findOne({where:{id:req.params.id}}).then(function(student){
       student.destroy().then(function(result){
           res.redirect('/class/'+result.dataValues.class_id);
       });
    });
})
.post(function(req,res,next){
    next();
});
module.exports = router;