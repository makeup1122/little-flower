var Sequelize = require('sequelize');
var sequelize = new Sequelize('flower', 'root', '');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('student',{
    'stu_name': Sequelize.STRING(12),
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
    'stu_birthday': Sequelize.DATE,
    'class_id': Sequelize.INTEGER,
    'stu_status': {
        type:Sequelize.INTEGER,
        defaultValue:1
    }
})
};

// sequelize.sync();