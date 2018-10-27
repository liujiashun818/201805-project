'use strict';
const BaseService = require('./base');
class UserService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'resource';
  }
}

module.exports = UserService;
/**
 *  "affectedRows": 1,
    "insertId": 1,
 */
