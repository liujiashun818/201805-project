/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50561
Source Host           : localhost:3306
Source Database       : zhufeng-cms

Target Server Type    : MYSQL
Target Server Version : 50561
File Encoding         : 65001

Date: 2018-09-21 21:17:56
*/

SET FOREIGN_KEY_CHECKS=0;
CREATE DATABASE IF NOT EXISTS zhufeng-cms default charset utf8 COLLATE utf8_general_ci; 

USE zhufeng-cms;
-- ----------------------------
-- Table structure for `resource`
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `key` varchar(64) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES ('1', '权限管理', '/admin/permission', '0');
INSERT INTO `resource` VALUES ('2', '用户管理', '/admin/user', '1');
INSERT INTO `resource` VALUES ('3', '资源管理', '/admin/resource', '1');
INSERT INTO `resource` VALUES ('4', '角色管理', '/admin/role', '1');

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '管理员');
INSERT INTO `role` VALUES ('2', '超级管理员');
INSERT INTO `role` VALUES ('3', '游客');
INSERT INTO `role` VALUES ('4', '普通用户');

-- ----------------------------
-- Table structure for `role_resource`
-- ----------------------------
DROP TABLE IF EXISTS `role_resource`;
CREATE TABLE `role_resource` (
  `role_id` int(11) NOT NULL DEFAULT '0',
  `resource_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`resource_id`),
  CONSTRAINT `role_resource_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_resource
-- ----------------------------

-- ----------------------------
-- Table structure for `role_user`
-- ----------------------------
DROP TABLE IF EXISTS `role_user`;
CREATE TABLE `role_user` (
  `role_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`role_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_user
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `gender` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('24', '3', '1@qq.com', '1');
INSERT INTO `user` VALUES ('25', '44', '44@qq.com', '1');
INSERT INTO `user` VALUES ('26', '3', '3@q.com', '1');
INSERT INTO `user` VALUES ('27', 'ee', 'e@1.com', '1');
INSERT INTO `user` VALUES ('28', '3', '3@qq.com', '1');
INSERT INTO `user` VALUES ('29', '3', '3@q.com', '1');
INSERT INTO `user` VALUES ('30', '3', '3@q.com', '1');
