var Sequelize = require('sequelize');
var config = require('../../config/database');
var sequelize = new Sequelize(config.database,config.username,config.password);
var Student  = require("./StudentModel");
// var Class1 = require("./ClassModel");
var Evaluate = require("./EvaluateModel");

var Stueva = sequelize.define('stuEva',{
      // 'eva_id':Sequelize.INTEGER,
      'eva_stu_content':Sequelize.TEXT('tiny'),
      // 'eva_class_id':Sequelize.INTEGER,
      // 'eva_student_id':Sequelize.INTEGER,
      'eva_stu_images':Sequelize.STRING(1024),      
});

Stueva.belongsTo(Evaluate);
Evaluate.hasMany(Stueva);

Stueva.belongsTo(Student);
Student.hasMany(Stueva);

Stueva.sync();
module.exports = Stueva;