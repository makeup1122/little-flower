var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var config = require('../config/database');
var sequelize = new Sequelize(config.database,config.username,config.password);
var Evaluate = require("../application/Models/EvaluateModel");
var Student = require("../application/Models/StudentModel");
var StuEva  = require("../application/Models/StuevaModel");
var multer  = require('multer');
const path = require('path');
const fs = require('fs');
require('date-utils');
var dt = new Date();
//递归创建多级目录
var mkdirs = function(dirpath, callback) {
    fs.exists(dirpath, function(exists) {
        if(exists) {
                callback(dirpath);
        } else {
                //尝试创建父目录，然后再创建当前目录
                mkdirs(path.dirname(dirpath), function(){
                        fs.mkdir(dirpath, callback);
                });
        }
    });
};
//本地
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        var upload_path = path.join('files/' ,req.body.evaluateId , "/",req.body.studentId ,"/", dt.toFormat("YYYYMMDD"));
        mkdirs(upload_path,function(){
            cb(null,upload_path);
        });
    },
    filename:function(req,file,cb){
        // console.log(file);
        cb(null,file.originalname);
    }
});

router.get("/:id",function(req,res,next){
    if(!isNaN(req.params.id)){
        Evaluate.findOne({where:{'id':req.params.id}}).then(function(eva_result){
            StuEva.findAll({where:{'eva_id':req.params.id}}).then(function(eva_stu_result){
               res.render('Evaluate/show',{eva_result:eva_result,eva_stu_result:eva_stu_result});
            });
        });
    }else{
        next(); 
    }
});

router.route('/add')
.all(function(req,res,next){
    next();
})
.get(function(req,res,next){
     res.render('Evaluate/add',{class_id:req.query.class_id});
})
.post(function(req,res,next){
    Evaluate.create(req.body).then(function(record){
        res.redirect('/class/'+req.body.eva_class_id);
    });
});

//Edit
router.route('/edit/:id')
.all(function(req,res,next){
    next();
})
.get(function(req,res,next){
    var id = req.params.id;
    Evaluate.findById(id).then(function(evaluate){
       res.render('Evaluate/edit',{evaluate:evaluate.dataValues});
    });
})
.post(function(req,res,next){
    Evaluate.update(req.body,{where:{id:req.body.id}}).then(function(result){
       res.redirect('/class/'+req.body.class_id); 
    });
});

//删除
router.route('/delete/:id')
.all(function(req,res,next){
    next();
})
.get(function(req,res,next){
    Evaluate.findById(req.params.id).then(function(result){
       result.destroy().then(function(result){
           res.redirect('/class/'+result.dataValues.eva_class_id);
       }) ;
    });
})
.post(function(req,res,next){
    next();
});

//跳转路由
router.get('/addStu/:eva_id',function(req,res){
    Evaluate.findById(req.params.eva_id).then(function(evaluate){
        Student.findAll({where:{'class_id':evaluate.dataValues.eva_class_id}}).then(function(students) {
            res.redirect('/Evaluate/addStu/'+req.params.eva_id+'/student/'+students[0].dataValues.id);
         }); 
    });
})

//单个文件
// var upload = multer({ dest: 'files/' })
var upload = multer({storage:storage});

router.route('/addStu/:eva_id/student/:stu_id')
.all(function(req,res,next){
    next();
})
.get(function(req,res){
    Evaluate.findById(req.params.eva_id).then(function(evaluate){
        Student.findAll({where:{'class_id':evaluate.dataValues.eva_class_id}}).then(function(students) {
            Student.findOne({where:{'id':req.params.stu_id},include:[{model:StuEva,where:{evaluateId:req.params.eva_id},required:false}]}).then(function(stu_evaluate){
                // console.log(stu_evaluate.dataValues.stuEvas);
                res.render('Evaluate/addStu',{students:students,evaluate:evaluate,stu_evaluate:stu_evaluate});
            });
         }); 
    });
});

router.post("/addStu",upload.fields([{name:'eva_stu_images',maxCount:12},{name:'eva_stu_painting',maxCount:12}]),function(req,res,next){
    req.body.eva_stu_images = req.files['eva_stu_images'];
    req.body.eva_stu_painting = req.files['eva_stu_painting'];
    StuEva.findOne({where:{studentId:req.body.studentId,evaluateId:req.body.evaluateId}}).then(function(result,error){
        if(result == null){
            StuEva.create(req.body);   
        }else{
            StuEva.update(req.body,{where:{studentId:req.body.studentId,evaluateId:req.body.evaluateId}});
        }
        res.redirect('/Evaluate/addStu/'+req.body.evaluateId+'/student/'+req.body.studentId); 
    });
});

//preview
router.get('/preview/:eva_id',function(req,res){
    Evaluate.findOne({where:{id:req.params.eva_id}}).then(function(evaluate){
        StuEva.findAll({where:{'evaluateId':req.params.eva_id},include:[{model:Student,required:false}]}).then(function(stu_evaluate){
            console.log(stu_evaluate);
            res.render('Evaluate/preview',{evaluate:evaluate,stu_evaluate:stu_evaluate}) ;
        });
    });
});
module.exports = router;