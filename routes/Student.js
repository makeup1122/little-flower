var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('flower', 'root', '');
var Student = sequelize.import("../application/Models/StudentDefine");

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
module.exports = router;