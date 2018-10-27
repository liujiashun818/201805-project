'use strict';
const BaseService = require('./base');
class RoleService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'role';
  }
  async list(pageNum, pageSize, where) {
    const { app } = this;
    const list = await app.mysql.select(this.model, {
      where,
      orders: [['id', 'desc']],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    });
    //list  resourceIds=代表这个角色所拥有的资源ID数组
    for (let i = 0; i < list.length; i++) {
      let rows = await app.mysql.select('role_resource', {
        where: { role_id: list[i].id }
      });//[{role_id:1,resource_id:2},{role_id:1,resource_id:3}]
      list[i].resourceIds = rows.map(item => item.resource_id);//[2,3]

      rows = await app.mysql.select('role_user', {
        where: { role_id: list[i].id }
      });//[{role_id:1,resource_id:2},{role_id:1,resource_id:3}]
      list[i].userIds = rows.map(item => item.user_id);//[2,3]
    }
    /* let rows = await app.mysql.select('role_resource', {
      where: { role_id: list.map(item => item.id) }
    }); */

    //count用来统计总条数
    const total = await app.mysql.count(this.model, where);
    return { list, total };
  }

  async getResource() {
    const { app } = this;
    const list = await app.mysql.select('resource');
    let rootMenus = [];
    let map = {};
    list.forEach(item => {
      item.children = [];
      map[item.id] = item;//创建了一个Key-Value,key就是对象的ID，值就是对象本身
      if (item.parent_id == 0) {
        rootMenus.push(item);
      } else {
        map[item.parent_id].children.push(item)
      }
    });
    return rootMenus;
  }
  async setResource(values) {
    const { app } = this;
    await app.mysql.query(`DELETE FROM role_resource WHERE role_id = ?`, [values.roleId]);
    for (let i = 0; i < values.resourceIds.length; i++) {
      await this.app.mysql.insert('role_resource', {
        role_id: values.roleId,
        resource_id: values.resourceIds[i]
      });
    }
    return '修改权限成功';
  }
  async getUser() {
    const { app } = this;
    const list = await app.mysql.select('user');
    return list;
  }
  async setUser(values) {
    const { app } = this;
    await app.mysql.query(`DELETE FROM role_user WHERE role_id = ?`, [values.roleId]);
    for (let i = 0; i < values.userIds.length; i++) {
      await this.app.mysql.insert('role_user', {
        role_id: values.roleId,
        user_id: values.userIds[i]
      });
    }
    return '分配用户成功';
  }
}

module.exports = RoleService;
/**
 *  "affectedRows": 1,
    "insertId": 1,
 */
