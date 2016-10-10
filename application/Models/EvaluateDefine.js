var Sequelize = require('sequelize');
var sequelize = new Sequelize('flower','root','');
module.exports = function(sequelize,DataTypes){
  return sequelize.define('evaluate',{
      'eva_title':Sequelize.STRING,
      'eva_content':Sequelize.TEXT('tiny'),
      'eva_class_id':Sequelize.INTEGER
  })  
};
// sequelize.sync();