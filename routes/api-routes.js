const user = require('../actions/user');
const post = require('../actions/post');

module.exports = (app) => {
  app.post('/api/users/create', user.createUser);
  app.post('/api/users/delete', user.deleteUser);
  app.post('/api/users/post', post.start);
  app.post('/api/users/post/stop', post.stop);
};
