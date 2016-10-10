var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('flower', 'root', '');
var Evaluate = sequelize.import("../application/Models/EvaluateDefine");
var Student = sequelize.import("../application/Models/StudentDefine");
var multer  = require('multer');
const path = require('path');
const fs = require('fs');
require('date-utils');
var dt = new Date();
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        var upload_path = path.join('files/',dt.toFormat('YYYYMM'));
        fs.mkdir(upload_path,function(){
            cb(null,upload_path);
        });
    },
    // filename:function(req,file,cb){
    //     // cb(null,file.fieldname + '-'+Date.now())
    // }
});
//单个文件
// var upload = multer({ dest: 'files/' })
var upload = multer({storage:storage});
sequelize.sync();
router.route('/add')
.all(function(req,res,next){
      var dt = new Date();
        console.log(dt.toFormat('YYYY'));
        // console.log(Date.yesterday());
    next();
})
.get(function(req,res,next){
     Student.findAll({where:{'class_id':req.query.class_id}}).then(function(stu_result) {
        res.render('Evaluate/add',{'class_id':req.query.class_id,'students':stu_result});
     });
})
.post(function(req,res,next){
    Evaluate.create(req.body);
    res.redirect('/class/'+req.body.eva_class_id);
});

router.post('/upload',upload.array('eva_stu_images',12),function(req,res,next){
    console.log(req.body);
    res.send('finish here!');
});
module.exports = router;