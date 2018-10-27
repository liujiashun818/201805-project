'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {

  it('测试功能是否正常', async () => {
    const user = {
      name: '测试用户',
      email: '测试邮箱',
      gender: 1,
    };
    let result = await app.httpRequest()
      .get('/user?pageSize=100');
    let oldUsers = result.body;
    let oldLen = oldUsers.length;

    result = await app.httpRequest()
      .post('/user')
      .type('json')
      .send(user);
    let insertedId = result.body;
    assert(!isNaN(insertedId));

    user.id = insertedId;

    result = await app.httpRequest()
      .get('/user?pageSize=100');
    let newUsers = result.body;
    let newLen = newUsers.length;
    assert(newLen == oldLen + 1);
  });
});
