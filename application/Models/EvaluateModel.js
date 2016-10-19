var Sequelize = require('sequelize');
var config = require('../../config/database');
var sequelize = new Sequelize(config.database,config.username,config.password);
var Evaluate =  sequelize.define('evaluate',{
      'eva_title':Sequelize.STRING,
      'eva_type':Sequelize.STRING,
      'eva_content':Sequelize.TEXT('tiny'),
      'eva_class_id':Sequelize.INTEGER
});
Evaluate.sync();
module.exports = Evaluate;