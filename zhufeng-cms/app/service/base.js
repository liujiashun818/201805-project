const Service = require('egg').Service;

class BaseService extends Service {
    async list(pageNum, pageSize, where) {
        const { app } = this;
        const list = await app.mysql.select(this.model, {
            where,
            orders: [['id', 'desc']],
            offset: (pageNum - 1) * pageSize,
            limit: pageSize,
        });

        //count用来统计总条数
        const total = await app.mysql.count(this.model, where);
        return { list, total };
    }
}
    async create(user) {
        const { app } = this;
        const result = await app.mysql.insert(this.model, user);
        const affectedRows = result.affectedRows;
        return affectedRows > 0 ? result.insertId : 'error';
    }
    async update(updateUser) {
        const { app } = this;
        const result = await app.mysql.update(this.model, updateUser);
        const affectedRows = result.affectedRows;
        return affectedRows > 0 ? 'success' : 'error';
    }
    async destroy(ids) {
        const { app } = this;
        const result = await app.mysql.delete(this.model, { id: ids });
        const affectedRows = result.affectedRows;
        return affectedRows > 0 ? 'success' : 'error';
    }
}

module.exports = BaseService;
/**
 *  "affectedRows": 1,
    "insertId": 1,
 */
