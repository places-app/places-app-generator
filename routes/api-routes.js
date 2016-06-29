const user = require('../actions/user');

module.exports = (app) => {
  app.post('/api/users/create', user.createUser);
  // app.post('/api/users/:userId/places', placeController.insertPlace);
};
