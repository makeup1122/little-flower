var Sequelize = require('sequelize');
var sequelize = new Sequelize('flower', 'root', '');
var Student = sequelize.define('student', {
    'stu_name': Sequelize.STRING(12),
    'stu_sex': {
        type: Sequelize.STRING(2),
        validate: {
            isIn: [
                ['男', '女']
            ]
        }
    },
    'stu_birthday': Sequelize.DATE,
    'class_id': Sequelize.INTEGER,
    'stu_status': Sequelize.INTEGER
});

sequelize.sync();