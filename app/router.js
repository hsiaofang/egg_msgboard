'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const oauthMiddleware = app.middleware.oauth();
  // router.get('/api/user', oauthMiddleware, controller.user.info);


  router.get('/', controller.user.index);
  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login);
  router.get('/manger', controller.user.list);
  router.delete('/user/delete/:id', controller.user.delete);


  router.get('/message', controller.message.index);
  router.post('/message/create', controller.message.createMessage);
  router.delete('/message/delete/:id', controller.message.deleteMessage);


  router.get('/message/:id', controller.message.getMessage);
  router.post('/message/edit/:id', controller.message.editMessage);


};
