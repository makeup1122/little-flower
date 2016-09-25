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
  db.all("CREATE TABLE `flower`.`lf_class` (\
    `cla_id` INT NOT NULL AUTO_INCREMENT,\
    `cla_name` VARCHAR(45) NULL,\
    `cla_teacher` VARCHAR(45) NULL COMMENT '班主任姓名',\
    `status` INT(1) NULL DEFAULT 0 COMMENT '状态位',\
    `createtime` DATETIME NULL,\
    `updatetime` DATETIME NULL,\
    PRIMARY KEY (`cla_id`))\
    ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 COMMENT = '班级信息表';");
  return null;
};

exports.down = function(db) {
  db.all('drop table `flower`.lf_class IF EXISTS;');
  return null;
};
