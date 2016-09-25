'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.all("CREATE TABLE `flower`.`lf_student` (\
  `stu_id` INT NOT NULL AUTO_INCREMENT,\
  `stu_name` VARCHAR(8) NULL,\
  `stu_sex` ENUM('男', '女') NOT NULL,\
  `stu_birthday` DATE NULL,\
  `class_id` INT NULL COMMENT '班级外键',\
  `stu_mother` VARCHAR(8) NULL,\
  `stu_father` VARCHAR(8) NULL,\
  `stu_phone` VARCHAR(14) NULL,\
  `stu_addr` VARCHAR(45) NULL,\
  `stu_school` VARCHAR(45) NULL,\
  `status` INT(1) NULL,\
  `createtime` DATETIME NULL,\
  `updatetime` DATETIME NULL,\
  PRIMARY KEY (`stu_id`),\
  INDEX `class_idx` (`class_id` ASC),\
  CONSTRAINT `class`\
    FOREIGN KEY (`class_id`)\
    REFERENCES `flower`.`lf_class` (`cla_id`)\
    ON DELETE CASCADE\
    ON UPDATE CASCADE)ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 \
  COMMENT = '学生信息表';");
  return null;
};

exports.down = function(db) {
  return null;
};
