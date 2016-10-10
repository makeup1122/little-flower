var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('flower', 'root', '');
var Evaluate = sequelize.import("../application/Models/EvaluateDefine");
var Student = sequelize.import("../application/Models/StudentDefine");
var StuEva  = sequelize.import("../application/Models/StuevaDefine");
var multer  = require('multer');
const path = require('path');
const fs = require('fs');
require('date-utils');
var dt = new Date();
sequelize.sync();
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        var upload_path = path.join('files/',dt.toFormat('YYYYMM'));
        fs.mkdir(upload_path,function(){
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
            StuEva.findAll({where:{}}).then(function(eva_stu_result){
               res.render('Evaluate/show',{eva_result:eva_result,eva_stu_result:eva_stu_result});
            });
        });
    }else{
        next(); 
    }
});

//单个文件
// var upload = multer({ dest: 'files/' })
var upload = multer({storage:storage});
router.route('/add')
.all(function(req,res,next){
    next();
})
.get(function(req,res,next){
     res.render('Evaluate/add',{class_id:req.query.class_id});
})
.post(function(req,res,next){
    Evaluate.create(req.body).then(function(record){
        res.redirect('/evaluate/addStu?class_id='+req.body.eva_class_id+"&eva_id="+record.id);
    });
});




router.get('/addStu',function(req,res){
    Student.findAll({where:{'class_id':req.query.class_id}}).then(function(stu_result) {
        res.render('Evaluate/addStu',{'class_id':req.query.class_id,'students':stu_result,'eva_id':req.query.eva_id});
     });
});
router.post('/addStu',upload.array('eva_stu_images',12),function(req,res,next){
    var files = {};
    for(var i = 0 ; i<req.files.length;i++){
        files[i] = req.files[i].path + '.jpg';
    }
    req.body.eva_stu_images = JSON.stringify(files);
    StuEva.create(req.body);
    res.redirect('/evaluate/addStu?class_id='+req.body.eva_class_id+"&eva_id="+req.query.eva_id);
});
module.exports = router;