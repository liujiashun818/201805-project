const Controller = require('egg').Controller;

class BaseController extends Controller {
  // 分页 关键字查询 排序
  async index() {
    const { app, ctx, service } = this;
    const { pageNum, pageSize, ...where } = ctx.query;
    const result = await service[this.model].list(isNaN(pageNum) ? 1 : parseInt(pageNum), isNaN(pageSize) ? this.config.PAGE_SIZE : parseInt(pageSize), where);
    ctx.body = result;
  }
  async create() {
    const { app, ctx, service } = this;
    const body = ctx.request.body;
    const result = await service[this.model].create(body);
    ctx.body = result;
  }
  async update() {
    const { app, ctx, service } = this;
    const id = ctx.params.id;
    const body = ctx.request.body;
    body.id = id;
    const result = await service[this.model].update(body);
    ctx.body = result;
  }
  async destroy() {
    const { app, ctx, service } = this;
    const id = ctx.params.id;
    let ids = ctx.request.body;
    if (!ids || ids.length == 0 || Object.keys(ids).length == 0) {
      ids = [id];
    }
    const result = await service[this.model].destroy(ids);
    ctx.body = result;
  }
}

module.exports = BaseController;
