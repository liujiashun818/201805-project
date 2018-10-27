'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/role/setUser', controller.role.setUser);
  router.get('/role/getUser', controller.role.getUser);
  router.post('/role/setResource', controller.role.setResource);
  router.get('/role/getResource', controller.role.getResource);
  router.resources('user', '/user', controller.user);
  router.resources('role', '/role', controller.role);
  router.resources('resource', '/resource', controller.resource);
  router.resources('roleResource', '/roleResource', controller.roleResource);
  router.resources('roleUser', '/roleUser', controller.roleUser);
};
