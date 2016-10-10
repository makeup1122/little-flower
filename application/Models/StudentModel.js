var Sequelize = require('sequelize');
var sequelize = new Sequelize('flower', 'root', '');
var Student = sequelize.import('./StudentDefine');

sequelize.sync();