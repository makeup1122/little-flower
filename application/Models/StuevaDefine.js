var Sequelize = require('sequelize');
var sequelize = new Sequelize('flower','root','');
module.exports = function(sequelize,DataTypes){
  return sequelize.define('stuEva',{
      'eva_id':Sequelize.INTEGER,
      'eva_stu_content':Sequelize.TEXT('tiny'),
      'eva_class_id':Sequelize.INTEGER,
      'eva_student_id':Sequelize.INTEGER,
      'eva_stu_images':Sequelize.STRING(1024),      
  })  
};