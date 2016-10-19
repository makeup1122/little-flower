var Sequelize = require('sequelize');
//数据库对象
var config = require('../../config/database');
// console.log(config.database);
var sequelize = new Sequelize(config.database,config.username,config.password);
//表定义
var Class = sequelize.define('class', {
    'cla_name': Sequelize.STRING,
    'cla_teacher': {type:Sequelize.STRING,defaultValue:'Flower'}
}, {
    ClassMethods: {
        Count: function() {

        }
    }
});
//同步创建表结构
sequelize.sync();
//总是先删除表结构再重新创建
// sequelize.sync({force:true});
//同步删除表
// sequelize.drop();

//CountAll
// exports.findAndCountAll = function(callback) {
//     Class.findAndCountAll({}).then(function(result) {
//         callback(result);
//     });
// };
// exports.findOne = function(id,callback){
//     Class.findById(id).then(function(result){
//         callback(result);  
//     });
// };
// exports.InsertOne = function(data){
//     Class.create(data);
// }
// Class.findAndCountAll();
//Setter
// Class.create({ 'cla_name': 'class1', 'cla_teacher': 'flower1' });
// Class.create({ 'cla_name': 'class2', 'cla_teacher': 'flower2' });
// Class.create({ 'cla_name': 'class3', 'cla_teacher': 'flower3' });
// console.log(this.getDataValue('cla_name'));
module.exports = Class;