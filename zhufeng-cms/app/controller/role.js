'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.model = 'role';
  }

  async getResource() {
    const { app, ctx, service } = this;
    const result = await service[this.model].getResource();
    ctx.body = result;
  }
  async setResource() {
    const { app, ctx, service } = this;
    let body = ctx.request.body;//{roleId,resourceIds
    const result = await service[this.model].setResource(body);
    ctx.body = result;
  }
  async getUser() {
    const { app, ctx, service } = this;
    const result = await service[this.model].getUser();
    ctx.body = result;
  }
  async setUser() {
    const { app, ctx, service } = this;
    let body = ctx.request.body;//{roleId,userIds}
    const result = await service[this.model].setUser(body);
    ctx.body = result;
  }
}

module.exports = UserController;
