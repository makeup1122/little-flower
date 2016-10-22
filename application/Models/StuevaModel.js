var Sequelize = require('sequelize');
var config = require('../../config/database');
var sequelize = new Sequelize(config.database,config.username,config.password);
var Student  = require("./StudentModel");
// var Class1 = require("./ClassModel");
var Evaluate = require("./EvaluateModel");

var Stueva = sequelize.define('stuEva',{
      // 'eva_id':Sequelize.INTEGER,
      'eva_stu_content':{
            type:Sequelize.TEXT,
            get:function(){
                  return  this.getDataValue('eva_stu_content');
            }    
      },
      // 'eva_class_id':Sequelize.INTEGER,
      // 'eva_student_id':Sequelize.INTEGER,
      'eva_stu_painting':{
            type:Sequelize.STRING(1024),      
            set:function(obj){
                  if(typeof(obj) !=='undefined'){
                        var files = {};
                  for(var i = 0 ; i<obj.length;i++){
                        files[i] = "/"+obj[i].path;
                  }
                  this.setDataValue('eva_stu_painting',JSON.stringify(files));
                  }else{
                        // this.setDataValue('eva_stu_painting','');
                  }
            },
            get:function(){
                  var value= this.getDataValue('eva_stu_painting');
                  if(value !=''){
                        
                  value = JSON.parse(this.getDataValue('eva_stu_painting'));
                  }
                  return value;
            }
      },
      'eva_stu_images':
      {
            type:Sequelize.STRING(1024),      
            set:function(obj){
                  if(typeof(obj) !=='undefined'){
                  var files = {};
                  for(var i = 0 ; i<obj.length;i++){
                        files[i] = "/"+obj[i].path;
                  }
                  this.setDataValue('eva_stu_images',JSON.stringify(files));
                  }else{
                        // this.setDataValue('eva_stu_images','');
                  }
            },
            get:function(){
                  var value= this.getDataValue('eva_stu_images');
                  if(value !=''){
                        value = JSON.parse(this.getDataValue('eva_stu_images'));
                  }
                  return value;
            }
      }
});

Stueva.belongsTo(Evaluate);
Evaluate.hasMany(Stueva);

Stueva.belongsTo(Student);
Student.hasMany(Stueva);

Stueva.sync();
module.exports = Stueva;