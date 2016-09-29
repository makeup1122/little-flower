var Sequelize = require('sequelize');
//数据库对象
var sequelize = new Sequelize('flower', 'root', '');
//表定义
var Class = sequelize.define('class', {
    'cla_name': Sequelize.STRING,
    'cla_teacher': Sequelize.STRING
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
exports.findAndCountAll = function(callback) {
    Class.findAndCountAll({}).then(function(result) {
        callback(result);
    });
};
// Class.findAndCountAll();
//Setter
// Class.create({ 'cla_name': 'class1', 'cla_teacher': 'flower1' });
// Class.create({ 'cla_name': 'class2', 'cla_teacher': 'flower2' });
// Class.create({ 'cla_name': 'class3', 'cla_teacher': 'flower3' });
// console.log(this.getDataValue('cla_name'));