var Sequelize = require('sequelize');
var config = require('../../config/database');
var sequelize = new Sequelize(config.database, config.username, config.password);
// var Stueva = require('./StuevaModel');
var Student = sequelize.define('student', {
    'stu_name': {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    'stu_sex': {
        type: Sequelize.STRING(2),
        validate: {
            isIn: [
                ['男', '女']
            ]
        },
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    'stu_birthday': {
        type: Sequelize.DATEONLY,
        get: function() {
            var date = new Date(this.getDataValue('stu_birthday'));
            var month = date.getMonth() + 1;
            month = month >= 10 ? month : "0" + month;
            var day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
            var year = date.getFullYear();
            return year + '-' + month + '-' + day;
        }
    },
    'class_id': Sequelize.INTEGER,
    'stu_status': {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
});

Student.sync();
module.exports = Student;