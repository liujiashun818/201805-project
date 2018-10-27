'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.model = 'roleResource';
  }
}

module.exports = UserController;
