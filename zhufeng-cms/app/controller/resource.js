'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.model = 'resource';
  }
}

module.exports = UserController;
