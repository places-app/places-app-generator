const user = require('../actions/user');
const post = require('../actions/post');
const walk = require('../actions/walk');

module.exports = (app) => {
  app.post('/api/users/create', user.createUser);
  app.post('/api/users/delete', user.deleteUser);
  app.post('/api/users/post', post.start);
  app.post('/api/users/post/stop', post.stop);
  app.post('/api/users/walk', walk.createWalker);
  app.post('/api/users/walk/stop', walk.stopWalker);
  app.get('/api/users', user.retrieveAll);
};
